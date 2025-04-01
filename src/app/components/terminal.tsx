'use client'

import { useState, useRef } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Draggable from 'react-draggable';
import Image from 'next/image'
import HoverableImage from './hoverable_image';

export default function Terminal() {
    const [size, setSize] = useState({ width: 400, height: 300 });

    const dragRef = useRef(null);

    const onResize = (event, { size }) => {
        setSize(size);
    };


    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleDrag = (e, data) => {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const maxX = screenW - size.width;
        const maxY = screenH - size.height;
        
        const newX = Math.max(0, Math.min(data.x, maxX));
        const newY = Math.max(0, Math.min(data.y, maxY));

        setPosition({ x: newX, y: newY });
    };

  return (

    <Draggable nodeRef={dragRef} handle=".handle" position={position} onDrag={handleDrag}>
        <div ref={dragRef}>
            <Resizable
                width={size.width}
                height={size.height}
                onResize={onResize}
            >
                <div
                    style={{ 
                        width: size.width, 
                        height: size.height,
                    }}
                    className="bg-gray-50 w-full min-w-[20vw] min-h-[20vh] rounded-lg border-2 border-solid border-gray-300 flex flex-col m-4 overflow-hidden"
                >
                <div className="bg-gray-300 handle hover:bg-gray-200 transition duration-300">
                    <div className='flex w-full'>
                        <div className="flex w-1/6 min-w-[3vw] max-w-[4vw] m-2 items-center">
                            <HoverableImage 
                                srcDefault="/terminal_icons/terminal_red.png"
                                srcHover="/terminal_icons/terminal_red.png"
                                width={500}
                                height={500}
                                alt="red terminal icon"
                            />
                            <HoverableImage 
                                srcDefault="/terminal_icons/terminal_yellow.png"
                                srcHover="/terminal_icons/terminal_yellow.png"
                                width={500}
                                height={500}
                                alt="red terminal icon"
                            />
                            <HoverableImage 
                                srcDefault="/terminal_icons/terminal_green.png"
                                srcHover="/terminal_icons/terminal_green.png"
                                width={500}
                                height={500}
                                alt="red terminal icon"
                            />
                        </div>
                        <div className="flex justify-center w-full mr-[12%] items-center">
                            <p>📁 Stephen Ni - zsh</p>
                        </div>
                    </div>
                </div>
                <div className="flex grow m-2">
                    > Enter some terminal text
                </div>
                </div>
            </Resizable>
        </div>
    </Draggable>

  );
}