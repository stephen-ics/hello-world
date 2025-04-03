'use client'

import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { closeTerminal } from '../slices/applicationSlice'
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Draggable from 'react-draggable';
import HoverableImage from './hoverable_image';

export default function Terminal() {
    const [size, setSize] = useState({ width: 400, height: 300 });
    const [position, setPosition] = useState(null); // null until set
    const [mounted, setMounted] = useState(false); // delay rendering
    const dispatch = useDispatch();
    const dragRef = useRef(null);

    useEffect(() => {
        const x = window.innerWidth / 2 - (size.width / 2);
        const y = window.innerHeight / 2 - size.height;
        setPosition({ x, y });
        setMounted(true); // now safe to render
    }, [size]);

    if (!mounted || position === null) return null; // prevent snap

    function handleClickRed() {
        dispatch(closeTerminal());
    }

    const onResize = (event, { size }) => {
        setSize(size);
    };

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
                        style={{ width: size.width, height: size.height }}
                        className="bg-gray-50 w-full min-w-[20vw] min-h-[20vh] rounded-lg border-2 border-solid border-gray-300 flex flex-col m-4 overflow-hidden"
                    >
                        <div className="bg-gray-300 handle hover:bg-gray-200 transition duration-300">
                            <div className='flex w-full'>
                                <div className="flex w-1/6 min-w-[3vw] max-w-[4vw] m-2 items-center">
                                    <HoverableImage 
                                        srcDefault="/terminal_icons/terminal_red.png"
                                        srcHover="/terminal_icons/terminal_red_hover.png"
                                        width={500}
                                        height={500}
                                        alt="red terminal icon"
                                        handleClick={handleClickRed}
                                    />
                                    <HoverableImage 
                                        srcDefault="/terminal_icons/terminal_yellow.png"
                                        srcHover="/terminal_icons/terminal_yellow_hover.png"
                                        width={500}
                                        height={500}
                                        alt="yellow terminal icon"
                                    />
                                    <HoverableImage 
                                        srcDefault="/terminal_icons/terminal_green.png"
                                        srcHover="/terminal_icons/terminal_green_hover.png"
                                        width={500}
                                        height={500}
                                        alt="green terminal icon"
                                    />
                                </div>
                                <div className="flex justify-center w-full mr-[12%] items-center">
                                    <p>📁 Stephen Ni - zsh</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex grow m-2">
                            &gt; Enter some terminal text
                        </div>
                    </div>
                </Resizable>
            </div>
        </Draggable>
    );
}