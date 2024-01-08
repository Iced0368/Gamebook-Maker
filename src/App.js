import React, { useState, useRef, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GoTrash } from "react-icons/go";
import { PiClipboardTextBold } from "react-icons/pi";

import TextEditor from "./TextEditor/TextEditor";
import Tab from "./Tab/Tab";
import Modal from "./Modal/Modal";

import {copyToClipboard} from "./util";

import "./App.css";

function App() {
  const [pageId, setPageId] = useState(localStorage.getItem('pageId') || 1);
  const [pages, setPages] = useState(
    JSON.parse(localStorage.getItem('savedPages')) 
    || [{ id: pageId, title: '새 페이지', content: '' }]
  );
  const [selectedPage, setSelectedPage] = useState(pages[0]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isCopiedNotificationVisible, setIsCopiedNotificationVisible] = useState(false);

  const quillRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('savedPages', JSON.stringify(pages));
    localStorage.setItem('pageId', pageId);
  }, [pages]);


  const handleTabClick = (page) => {
    setSelectedPage(page);
    const editor = quillRef.current.editor;
    editor.focus();
    setTimeout(() => {editor.setSelection(editor.getLength(), 0)}, 0);
  };

  const handleTitleChange = (e) => {
    const updatedPages = pages.map((page) =>
      page.id === selectedPage.id ? { ...page, title: e.target.value } : page
    );
    setPages(updatedPages);
    setSelectedPage({ ...selectedPage, title: e.target.value });
  };

  const handleContentChange = (value) => {
    if(selectedPage)
      selectedPage.content = value;
  };

  const handleAddPage = () => {
    const newPage = {
      id: pageId+1,
      title: `새 페이지 (${pageId})`,
      content: '',
    };
    setPages([...pages, newPage]);
    setSelectedPage(newPage);
    setPageId(pageId+1);
  };

  const handleDeletePage = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedPages = pages.filter((page) => page.id !== selectedPage.id);
    setPages(updatedPages);
    setSelectedPage(updatedPages.length > 0 ? updatedPages[0] : null);
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmClear = () => {
    setPages([{ id: 1, title: '새 페이지', content: '' }]);
    setPageId(1);
    setSelectedPage(null);
    setIsClearModalOpen(false);
  };

  const handleCancelClear = () => {
    setIsClearModalOpen(false);
  };

  const handleClear = () => {
    setIsClearModalOpen(true);
  }

  const copyContentToClipboard = () => {
    const allContent = pages.map((page) => `<details><summary>${page.title}</summary>${page.content}</details>` ).join('\n');
    copyToClipboard(allContent);

    setIsCopiedNotificationVisible(true);

    setTimeout(() => {
      setIsCopiedNotificationVisible(false);
    }, 1000);
  }

  const moveTab = (fromIndex, toIndex) => {
    const reorderedPages = [...pages];
    const [movedPage] = reorderedPages.splice(fromIndex, 1);
    reorderedPages.splice(toIndex, 0, movedPage);
    setPages(reorderedPages);
  };

  return (
    <div className="app-container">
      <img className="logo" src={`${process.env.PUBLIC_URL}/logo.png`}></img>
      <hr className="separator" />
      <div style={{ display: 'flex' }}>
        <DndProvider backend={HTML5Backend}>
          <div className="tabs-container">
            {pages.map((page, index) => (
              <Tab
                key={page.id}
                page={page}
                index={index}
                moveTab={moveTab}
                selectedPage={selectedPage}
                handleTabClick={handleTabClick}
              />
            ))}
            <div className="add-tab" onClick={handleAddPage}>
              +
            </div>
            <div className="clear-tab" onClick={handleClear}>
              초기화
            </div>
            <div className="copy-tab" onClick={copyContentToClipboard}>
              클립보드에 복사
            </div>
          </div>
        </DndProvider>

        <div className="editor-container">
          <input 
            className="title-editor"
            type="text" 
            value={selectedPage ? selectedPage.title : ''} 
            onChange={handleTitleChange} 
          />
          <button onClick={handleDeletePage} className="icon-button">
            <GoTrash color='red'/>
          </button>

          <TextEditor 
            value={selectedPage ? selectedPage.content : ''} 
            onChange={handleContentChange}
            quillRef={quillRef}
          />
        </div>
      </div>


      <Modal
        isOpen={isDeleteModalOpen}
        title={`${selectedPage ? selectedPage.title : ''} 삭제`}
        content="정말로 삭제하시겠습니까?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <Modal
        isOpen={isClearModalOpen}
        title={`게임북 초기화`}
        content="정말로 초기화 하시겠습니까?"
        onConfirm={handleConfirmClear}
        onCancel={handleCancelClear}
      />
      <div className={`copied-notification ${isCopiedNotificationVisible ? '' : 'hidden'}`}>
        클립보드에 복사되었습니다
      </div>
    </div>
  );
}

export default App;
