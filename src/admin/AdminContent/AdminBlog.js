import './AdminContent.css';
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, darkDefaultTheme, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor } from '@blocknote/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, defaultState, setInitialState } from '../../redux/blogSlice';
import FileUpload from '../Components/fileupload/FileUpload';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useMediaQuery } from 'react-responsive';

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

const getInitialContent = (id) => {
    const data = localStorage.getItem(id);
    try {
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        return null;
    }
};

const saveToLocalStorage = (content, image, icon, id) => {
    localStorage.setItem(id, JSON.stringify({
        content,
        coverImage: image,
        iconImage: icon,
    }));
};

export default function AdminBlog() {
    const color = useSelector(state => state.color.color);
    const dispatch = useDispatch();
    const [upload, setUpload] = useState({
        cover: false,
        icon: false,
    });
    const [image, setImage] = useState(null);
    const [icon, setIcon] = useState(null);
    const location = useLocation();
    const params = useParams();
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });


    useEffect(() => {
        const handlePaddingChange = () => {
            const block = document.querySelector('.ProseMirror');
            if (block) {
                block.style.padding = '11px'; 
            }
        };

        if (isMobile) {
            handlePaddingChange();
        }

    }, [isMobile]);

    const getInitialContentNotDefault = () => {
        if (location.state?.title && location.state.title.toLowerCase().includes('untitled')) {
            return defaultState;
        } else {
            return [
                { type: "heading", content: location.state?.title || "Untitled" },
                { type: "paragraph" },
                { type: "paragraph" },
                { type: "paragraph" },
            ];
        }
    };

    const editor = useMemo(() => {
        return BlockNoteEditor.create({ initialContent: getInitialContentNotDefault() });
    }, []);

    useEffect(() => {
        const loadInitialHTML = async () => {
            const content = getInitialContent(params.id);
            if (content) {
                const blocks = await editor.tryParseMarkdownToBlocks(content.content);
                editor.replaceBlocks(editor.document, blocks);
                setImage(content.coverImage || null);
                setIcon(content.iconImage || null);
                setUpload({
                    cover: !!content.coverImage,
                    icon: !!content.iconImage,
                });
            } else {
                const defaultContent = getInitialContentNotDefault();
                dispatch(setInitialState(defaultContent));
            }
        };
        loadInitialHTML();
    }, [editor, dispatch, params.id]);

    const handleEditorChange = async () => {
        const html = await editor.blocksToHTMLLossy(editor.document);
        dispatch(addBlog(html));
        saveToLocalStorage(html, image, icon, params.id);
    };

    if (!editor) {
        return 'loading';
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setUpload(prev => ({ ...prev, cover: true }));
            saveToLocalStorage(editor.blocksToHTMLLossy(editor.document), imageUrl, icon, params.id);
        }
    };

    const handleIconChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setIcon(imageUrl);
            setUpload(prev => ({ ...prev, icon: true }));
            saveToLocalStorage(editor.blocksToHTMLLossy(editor.document), image, imageUrl, params.id);
        }
    };

    const saveToCloud = async () => {
        const html = await editor.blocksToHTMLLossy(editor.document);
        saveToLocalStorage(html, image, icon, params.id);
        toast.message("Saved Successfully");
    };

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

            <BlockNoteView
                editor={editor}
                onChange={handleEditorChange}
                data-theming-css-demo
                theme={color === "#22303F" ? customTheme.dark : customTheme.light}
            />

            <div className="galleryContainer">
                {
                    location?.state?.category.toLowerCase() === 'blogs' ? 'Published on ' : location?.state?.category.toLowerCase() === 'projects' ? 'Last updated on ' : location?.state?.category.toLowerCase() === 'internships' ? 'Internship started on ' : ''
                }
                {location.state?.date}
            </div>
        </div>
    );
}
