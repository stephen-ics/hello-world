'use client'

import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { closeTerminal, hideTerminal } from '../slices/applicationSlice'
import { clearHistory } from '../slices/terminalSlice'
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Draggable from 'react-draggable';
import HoverableImage from './hoverableImage';
import TerminalInput from './terminalInput'
import Image from 'next/image'

export default function Terminal({ inputRef }) {
    const [size, setSize] = useState({ width: 500, height: 300 });
    const [position, setPosition] = useState(null);
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();

    const containerRef = useRef(null);
    const dragRef = useRef(null);

    useEffect(() => {
        const x = window.innerWidth / 2 - (size.width / 2);
        const y = window.innerHeight / 2 - size.height;
        setPosition({ x, y });
        setMounted(true);
    }, []);

    if (!mounted || position === null) return null;

    function handleClickRed() {
        dispatch(closeTerminal());
        dispatch(clearHistory());
    }

    function handleClickYellow() {
        dispatch(hideTerminal());
    }

    function handleClickGreen() {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
        setPosition({ x: 0, y: 0 });
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

    function handleContainerClick(event) {
        inputRef.current.focus();
    }

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
                        className="bg-gray-50 w-full lg:min-w-[500px] min-w-[300px] lg:min-h-[30vh] min-h-[300px] rounded-lg border-2 border-solid border-gray-300 flex flex-col overflow-hidden"
                    >
                        <div className="bg-gray-300 handle hover:bg-gray-200 transition duration-300">
                            <div className='flex w-full'>
                                <div className="flex w-1/6 max-w-[3vw] m-2 items-center">
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
                                        handleClick={handleClickYellow}
                                    />
                                    <HoverableImage 
                                        srcDefault="/terminal_icons/terminal_green.png"
                                        srcHover="/terminal_icons/terminal_green_hover.png"
                                        width={500}
                                        height={500}
                                        alt="green terminal icon"
                                        handleClick={handleClickGreen}
                                    />
                                </div>
                                <div className="flex justify-center w-full mr-[12%] items-center">
                                    <Image 
                                        src="/terminal_icons/terminal_folder.png"
                                        width={15}
                                        height={15}
                                        alt="terminal folder"
                                        className='mr-2'
                                    />
                                    <p>Stephen Ni - zsh</p>
                                </div>
                            </div>
                        </div>
                        <div ref={containerRef} onClick={handleContainerClick} className="flex grow overflow-y-auto">
                            <TerminalInput 
                                containerRef={containerRef}
                                inputRef={inputRef}
                            />
                        </div>
                    </div>
                </Resizable>
            </div>
        </Draggable>
    );
}