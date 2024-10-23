import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, darkDefaultTheme, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useCreateBlockNote } from '@blocknote/react';
import FileUpload from '../admin/Components/fileupload/FileUpload';
import { ToggleIconForAdmin } from "../admin/navbar/AdminNavbar";
import axiosPrivate from "../api/axios";

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
    const [contentData, setContentData] = useState([]);
    const params = useParams();

    const [upload, setUpload] = useState({
        cover: false,
        icon: false
    });

    const editor = useCreateBlockNote();

    const getInitialContent = async (id) => {
        try {
            const res = await axiosPrivate.get('/file', { params: { _id: id } });
            const fetchedImage = res.data?.data?.file?.coverPhoto?.location || null;
            const fetchedIcon = res.data?.data?.file?.iconImage || null;
            const fetchedContent = res.data?.data?.file?.content || '';
            console.log(res)
            setImage(fetchedImage);
            setIcon(fetchedIcon);

            if (fetchedContent) {
                // setContentData(JSON.parse(fetchedContent));
                editor.replaceBlocks(editor.document, JSON.parse(fetchedContent));
            } else {
                setContentData(dummyData);
                const blocks = await editor.tryParseHTMLToBlocks('');
                editor.replaceBlocks(editor.document, blocks);
            }

            setUpload({
                cover: !!fetchedImage,
                icon: !!fetchedIcon
            });
        } catch (error) {
            console.error(error);
            setContentData(dummyData);
        }
    };

    useEffect(() => {
        if (params.id) {
            getInitialContent(params.id);
        }
    }, [params.id]);

    useEffect(() => {
        if (!editor) {
            return 'loading';
        }
    }, [editor]);

    return (
        <div className="publicPageContainer">
            <ToggleIconForAdmin />
            <div className="bn-container PublicBlog">
                <div className="coverImageContainer">
                    {upload.cover && <FileUpload image={image} isPublic={true} />}
                    {upload.icon && (
                        <label htmlFor="file">
                            <div className="iconUpload">
                                {icon ? <img src={icon} alt="Icon" className="iconImage" /> : null}
                            </div>
                        </label>
                    )}
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
