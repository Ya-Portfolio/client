import './AdminContent.css';
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, darkDefaultTheme, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor } from '@blocknote/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useMediaQuery } from 'react-responsive';
import axiosPrivate from '../../api/axios';
import FileUpload from '../Components/fileupload/FileUpload';
import { useSelector } from 'react-redux';

const lightTheme = {
    colors: {
        editor: {
            text: "#22303F",
            background: "#E7E8E7",
        },
        menu: {
            text: "#22303F",
            background: "#E7E8E7",
        },
        tooltip: {
            text: "#22303F",
            background: "#8FBFDA",
        },
        hovered: {
            text: "#22303F",
            background: "#8FBFDA",
        },
        selected: {
            text: "#22303F",
            background: "#AAAAAA",
        },
        disabled: {
            text: "#8FBFDA",
            background: "#AAAAAA",
        },
        border: "#22303F",
        sideMenu: "#E7E8E7",
        highlights: lightDefaultTheme.colors.highlights,
    },
    borderRadius: 4,
};

const darkTheme = {
    ...lightTheme,
    colors: {
        ...lightTheme.colors,
        editor: {
            text: "#E7E8E7",
            background: "#22303F",
        },
        sideMenu: "#22303F",
        highlights: darkDefaultTheme.colors.highlights,
    }
};

const customTheme = {
    light: lightTheme,
    dark: darkTheme,
};

export default function AdminBlog() {
    const [upload, setUpload] = useState({ cover: false, icon: false });
    const color = useSelector(state => state.color.color);
    const [image, setImage] = useState(null);
    const [icon, setIcon] = useState(null);
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

    const getInitialContent = () => {
        return [
            { type: "heading", content: location.state.title },
            { type: "paragraph", content: "" },
        ];
    };

    const editor = useMemo(() => {
        return BlockNoteEditor.create({
            initialContent: getInitialContent(),
        });
    }, []);

    const loadContentFromDB = async () => {
        try {
            const res = await axiosPrivate.get(`/file/`, {
                params: { _id: params.id }
            });
            const content = res.data?.data?.file;

            if (content && content.content) {
                console.log(content)
                const blocks = JSON.parse(content.content);
                editor.replaceBlocks(editor.document, blocks);
                setImage(content.coverPhoto.location || null);
                setIcon(content.iconImage || null);
                setUpload({
                    cover: !!content.coverPhoto.location,
                    icon: !!content.iconImage,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!location.state.isNew) {
            loadContentFromDB();
        }
    }, [location.state.isNew]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('_id', params.id);
        formData.append('cover-photo', file);

        await axiosPrivate.post('/file/cover-photo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            toast.message("Cover photo uploaded successfully");
        }).catch(e => {
            toast.error("Failed to upload cover photo");
        });

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setUpload(prev => ({ ...prev, cover: true }));
        }
    };

    const handleIconChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setIcon(imageUrl);
            setUpload(prev => ({ ...prev, icon: true }));
        }
    };

    const saveToCloud = async () => {
        const title = editor.document[0]?.content[0]?.text || null;
        const jsonContent = JSON.stringify(editor.document);
        await axiosPrivate.put(`/file/`, {
            content: jsonContent,
            type: "blogs",
            title: title,
            _id: params.id
        }).then((res) => {
            toast.message("Saved Successfully");
            navigate(`/public/${params.id}`);
        }).catch(err => {
            console.log(err);
        });
    };

    if (!editor) {
        return 'loading';
    }

    return (
        <div className="bn-container adminBlog">
            <div className="contentType">
                {upload.cover && location.state?.category && (
                    <h1 className='ebGaramond'>
                        {location.state.category.charAt(0).toUpperCase() + location.state.category.slice(1)}
                    </h1>
                )}
            </div>
            <div className="coverImageContainer">
                {upload.cover && <FileUpload handleFileChange={handleFileChange} image={image} />}
                {upload.icon && (
                    <label htmlFor="icon">
                        <div className={upload.cover ? "iconUpload" : "iconUpload adminTopIcon"}>
                            {icon ? (
                                <img src={icon} alt="Icon" className="iconImage" />
                            ) : (
                                <svg viewBox="0 0 640 512" height="1em">
                                    <path
                                        d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                                    ></path>
                                </svg>
                            )}
                            <input id="icon" type="file" onChange={handleIconChange} />
                        </div>
                    </label>
                )}
            </div>

            <div className="buttonsAdminPanel">
                <div className="accessoryButtons nunito">
                    <button className="coverButton" onClick={() => {
                        setUpload(prev => ({ ...prev, icon: !prev.icon }))
                    }}>Add Icon</button>
                    <button className="iconButton" onClick={() => {
                        setUpload(prev => ({ ...prev, cover: !prev.cover }))
                    }}>Add Cover</button>
                </div>
                <div className="actionButtons nunito">
                    <button className="saveButton" onClick={saveToCloud}>Save to cloud</button>
                </div>
            </div>
            <BlockNoteView theme={color === "#22303F" ? customTheme.dark : customTheme.light} editor={editor} />
        </div>
    );
}
