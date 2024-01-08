import React, { useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';

const TextEditor = ({value, onChange, quillRef}) => {
    const fontSizeArr = ['8px','9px','10px','12px','14px','18px', '24px','30px','36px','48px','60px','72px','96px'];
    const Size = Quill.import('attributors/style/size');
    Size.whitelist = fontSizeArr;
    Quill.register(Size, true);

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'font': [] }],
                    [{ 'size': fontSizeArr }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['image'],
                ],
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
    );
};

export default TextEditor;
