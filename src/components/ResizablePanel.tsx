import React, { useState, useEffect, useCallback } from 'react';

interface ResizablePanelProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  minWidth?: number;
  defaultLeftWidth?: string;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  leftPanel,
  rightPanel,
  minWidth = 300,
  defaultLeftWidth = '50%'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const startDragging = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setStartWidth(document.querySelector('.left-panel')?.getBoundingClientRect().width || 0);
  }, []);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrag = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const containerWidth = document.querySelector('.resizable-container')?.getBoundingClientRect().width || 0;
      const newWidth = startWidth + (e.pageX - startX);
      
      if (newWidth >= minWidth && newWidth <= containerWidth - minWidth) {
        const percentage = (newWidth / containerWidth) * 100;
        setLeftWidth(`${percentage}%`);
      }
    }
  }, [isDragging, startX, startWidth, minWidth]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', stopDragging);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDragging);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, onDrag, stopDragging]);

  return (
    <div className="resizable-container flex h-full overflow-hidden">
      <div className="left-panel overflow-y-auto" style={{ width: leftWidth, minWidth: `${minWidth}px` }}>
        {leftPanel}
      </div>
      
      <div
        className="divider-handle w-1 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize flex-shrink-0 relative group"
        onMouseDown={startDragging}
      >
        <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-400/10" />
      </div>
      
      <div className="right-panel flex-1 overflow-y-auto min-w-[300px]">
        {rightPanel}
      </div>
    </div>
  );
};

export default ResizablePanel;