import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, darkDefaultTheme, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useCreateBlockNote } from '@blocknote/react';
import FileUpload from '../admin/Components/fileupload/FileUpload';
import { ToggleIconForAdmin } from "../admin/navbar/AdminNavbar";

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
    fontFamily: "Helvetica Neue, sans-serif",
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
    try {
        if (id) {
            const data = localStorage.getItem(id);
            return data ? JSON.parse(data) : null;
        }
        else {
            return null;
        }
    } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        return null;
    }
};

const dummyData = [
    [
        {
            type: "heading",
            content: 'No Results Found',
        },
        {
            type: "paragraph",
            content: "This might have been a wrong path"
        },
    ]
];

export default function PublicBlog() {
    const color = useSelector(state => state.color.color);
    const [image, setImage] = useState(null);
    const [icon, setIcon] = useState(null);
    const [contentData, setContentData] = useState(dummyData);
    const params = useParams();

    const [upload, setUpload] = useState({
        cover: false,
        icon: false
    });
    const [size, setSize] = useState()

    useEffect(() => {
        const handleResize = () => {
            const iconSize = getComputedStyle(document.documentElement).getPropertyValue('--icon-size');
            setSize(iconSize)
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])


    useEffect(() => {
        const data = getInitialContent(`${params.id ? params.id : null}`);
        if (data) {
            const { iconImage, coverImage, content } = data;
            if (iconImage && coverImage) {
                setIcon(iconImage);
                setImage(coverImage);
                setUpload({
                    cover: true,
                    icon: true
                });
            }
            else if (iconImage || coverImage) {
                if (coverImage) {
                    setImage(coverImage);
                    setIcon(null);
                    setUpload({
                        cover: true,
                        icon: false
                    })
                }
                else {
                    setImage(null);
                    setIcon(iconImage);
                    setUpload({
                        cover: false,
                        icon: true
                    })
                }
            }
            else {
                setUpload({
                    cover: false,
                    icon: false
                })
            }
            if (content) {
                setContentData(content);
            }
            else {
                setContentData(dummyData);
            }
        }
        else {
            setIcon(null);
            setImage(null);
            setContentData(dummyData);
            setUpload({
                cover: null,
                icon: null
            });
        }
    }, [params.id]);

    const editor = useCreateBlockNote();

    useEffect(() => {
        async function loadInitialHTML() {
            if (editor && typeof editor.tryParseHTMLToBlocks === 'function') {
                try {
                    const blocks = await editor.tryParseHTMLToBlocks(contentData ? contentData : dummyData);
                    editor.replaceBlocks(editor.document, blocks);
                }
                catch (e) {
                    console.log(e)
                }
            }
        }
        loadInitialHTML();
    }, [editor, contentData]);
    ;


    if (!editor) {
        return 'loading';
    }


    return (
        <div className="publicPageContainer">
            <ToggleIconForAdmin size={size} />
            <div className="bn-container PublicBlog">
                <div className="coverImageContainer">
                    {upload.cover && <FileUpload image={image} isPublic={true} />}
                    {
                        upload.icon && <label htmlFor="file">
                            <div className="iconUpload">
                                {
                                    icon ?
                                        <img src={icon} alt="Icon" className="iconImage" /> :
                                        null
                                }
                            </div>
                        </label>
                    }
                </div>

                <div className="nonEditableContent">
                    <BlockNoteView
                        editor={editor}
                        editable={false}
                        theme={color === "#22303F" ? customTheme.dark : customTheme.light}
                    />
                </div>
            </div>
        </div>
    );
}
