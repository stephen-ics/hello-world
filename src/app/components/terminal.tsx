'use client'

import { useState, useRef } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Draggable from 'react-draggable';

export default function Terminal() {
  const [size, setSize] = useState({ width: 400, height: 300 });
  const dragRef = useRef(null);

  const onResize = (event, { size }) => {
    setSize(size);
  };

  return (
    <Draggable nodeRef={dragRef} handle=".handle">
      <div ref={dragRef}>
        <Resizable
          width={size.width}
          height={size.height}
          onResize={onResize}
          resizeHandles={['se']}  // Optionally add a resize handle if needed
        >
          <div
            style={{ width: size.width, height: size.height }}
            className="rounded-lg border-2 border-solid border-gray-300 flex flex-col m-4 overflow-hidden"
          >
            <div className="bg-gray-200 handle">
              <div className="w-1/2 flex justify-around">
                <div className="flex">
                  <p className="mx-2">red</p>
                  <p className="mx-2">yellow</p>
                  <p className="mx-2">green</p>
                </div>
                <div>
                  <p>eee</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 flex grow p-4">
              Enter some terminal text
            </div>
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
}