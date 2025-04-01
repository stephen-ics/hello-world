'use client'

import { useState, useRef } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Draggable from 'react-draggable';
import Image from 'next/image'

import { terminal_green_hover } from 'public/terminal_green_hover'

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
            >
                <div
                style={{ width: size.width, height: size.height }}
                className="rounded-lg border-2 border-solid border-gray-300 flex flex-col m-4 overflow-hidden"
                >
                <div className="bg-gray-300 handle hover:bg-gray-200 transition duration-300">
                    <div className='flex'>
                        <div className="flex w-3 m-2">
                            <Image 
                                src="/terminal_icons/terminal_red.png"
                                width={500}
                                height={500}
                                alt="red terminal icon"
                                className='mx-1'
                            />
                            <Image 
                                src="/terminal_icons/terminal_yellow.png"
                                width={500}
                                height={500}
                                alt="yellow terminal icon"
                                className='mx-1'
                            />
                            <Image 
                                src="/terminal_icons/terminal_green.png"
                                width={500}
                                height={500}
                                alt="green terminal icon"
                                className='mx-1'
                            />
                        </div>
                        <div className="flex justify-center w-full">
                            <p>📁 Stephen Ni - zsh</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 flex grow p-4">
                    Enter some terminal text
                </div>
                </div>
            </Resizable>
        </div>
    </Draggable>
  );
}