// Tab.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

import './Tab.css';

const Tab = ({ page, index, moveTab, selectedPage, handleTabClick }) => {
  const [, ref] = useDrag({
    type: 'TAB',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'TAB',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTab(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className={`tab ${selectedPage && selectedPage.id === page.id ? 'active-tab' : ''}`}
      onClick={() => handleTabClick(page)}
      style={{
        padding: '10px',
        cursor: 'pointer',
        backgroundColor: page === selectedPage ? '#e0e0e0' : 'white',
      }}
    >
      {
        <div>
          {page.title ? page.title : "(빈 제목)"}
          &nbsp;
          <span className='subtitle'>{page.subtitle}</span>
        </div>
      }
    </div>
  );
};

export default Tab;
