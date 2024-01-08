import React, { useState, useMemo, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactQuill, { Quill } from 'react-quill';
import { TbRouteAltLeft } from "react-icons/tb";
import 'react-quill/dist/quill.snow.css';

import './TextEditor.css';
import InsertRouteModal from '../Modal/InsertRouteModal'; // Modal 컴포넌트 임포트

const TextEditor = ({value, onChange, quillRef}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lastSelection, setLastSelection] = useState(null);

    const fontSizeArr = ['8px','9px','10px','12px','14px','18px', '24px','30px','36px','48px','60px','72px','96px'];
    const Size = Quill.import('attributors/style/size');
    Size.whitelist = fontSizeArr;
    Quill.register(Size, true);

    const icons = Quill.import('ui/icons');
    icons['route'] = ReactDOMServer.renderToString(<TbRouteAltLeft />);


    const handleRouteClick = () => {
        const editor = quillRef.current.editor;
        const selection = editor.getSelection();
    
        if(selection) {
            setLastSelection(selection);
            setIsModalOpen(true);
        }
    };

    const handleRouteConfirm = (text) => {
        const editor = quillRef.current.editor;

        if(lastSelection){
            editor.clipboard.dangerouslyPasteHTML(lastSelection.index, text, 'user');
            editor.format('bold', false);
        }
        setIsModalOpen(false);
    };

    const handleRouteCancel = () => {
        setIsModalOpen(false);
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'font': [] }],
                    [{ 'size': fontSizeArr }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['image'],
                    ['route'],
                ],
                
                handlers: {
                    'route': handleRouteClick,
                }
            }
        };
    }, []);

    const formats = [
        'bold', 'italic', 'underline', 'strike',
        'font', 'size', 'color', 'background', 'image',
    ];

    const handleChange = (value, _, source) => {
        if (source === 'user') {
            onChange && onChange(value);
        }
    };


    return (
        <div>
            <div className="text-editor-container">
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                    ref={quillRef}
                />
            </div>
            <InsertRouteModal 
                isOpen={isModalOpen}
                title="루트 삽입하기"
                onConfirm={handleRouteConfirm}
                onCancel={handleRouteCancel}
            />
        </div>
    );
};

export default TextEditor;
