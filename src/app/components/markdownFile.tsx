'use client'

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { closeMarkdownFile, hideMarkdownFile, maximizeMarkdownFile, minimizeMarkdownFile, selectMarkdownFile } from '../slices/applicationSlice'
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Draggable from 'react-draggable';
import HoverableImage from './hoverableImage';
import { motion } from 'framer-motion';
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { CustomH1, CustomH2, CustomH3, CustomH4, CustomH5, CustomH6, CustomParagraph, CustomEmphasis, CustomStrong, CustomLink, CustomImage, CustomBlockQuote, CustomCodeBlock } from '../components/customMarkdownElements'


export default function MarkdownFile({ markdownText }) {  
    const [size, setSize] = useState({ width: 500, height: 300 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const [animateTransition, setAnimateTransition] = useState(false);

    const dispatch = useDispatch();

    const markdownFileFullscreen = useSelector(state => state.application.markdownFileFullscreen)
    const markdownFileWidth = useSelector(state => state.application.markdownFileWidth)
    const markdownFileHeight = useSelector(state => state.application.markdownFileHeight)
    const markdownFileX = useSelector(state => state.application.markdownFileX)
    const markdownFileY = useSelector(state => state.application.markdownFileY)

    const [defaultX, setDefaultX] = useState(0);
    const [defaultY, setDefaultY] = useState(0);

    const containerRef = useRef(null);
    const dragRef = useRef(null);

    

    useEffect(() => {
        setDefaultX(window.innerWidth / 2 - size.width / 2);
        setDefaultY(window.innerHeight / 2 - size.height);
        setPosition({ x: defaultX, y: defaultY });

        if(markdownFileX === -1 && markdownFileY === -1) {
            setPosition({ x: window.innerWidth / 2 - size.width / 2, y: window.innerHeight / 2 - size.height });
        } else {
            setPosition({ x: markdownFileX, y: markdownFileY });
        }

        setSize({ width: markdownFileWidth, height: markdownFileHeight });
        setMounted(true);
    }, []);

    if (!mounted) return null;

    function handleClickRed() {
        dispatch(closeMarkdownFile({ width: 500, height: 300, x: defaultX, y: defaultY }));
    }

    function handleClickYellow() {        
        dispatch(hideMarkdownFile({ width: size.width, height: size.height, x: position.x, y: position.y }));
    }

    function handleClickGreen() {
        setAnimateTransition(true);

        if (markdownFileFullscreen) {
            dispatch(minimizeMarkdownFile());
            setSize({ width: markdownFileWidth, height: markdownFileHeight });
            setPosition({ x: markdownFileX, y: markdownFileY });
        } else {
            dispatch(maximizeMarkdownFile({ width: size.width, height: size.height, x: position.x, y: position.y }));
            setSize({ width: window.innerWidth, height: window.innerHeight });
            setPosition({ x: 0, y: 0 });
        }

        setTimeout(() => setAnimateTransition(false), 350);
    }

    const onResize = (event, { size: newSize }) => {
        setSize(newSize);
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


    function handleDivClick() {
        dispatch(selectMarkdownFile());
    }
  
    return (
        <Draggable nodeRef={dragRef} handle=".handle" position={position} onDrag={handleDrag}>
            <motion.div
                ref={dragRef}
                animate={{
                    width: size.width,
                    height: size.height,
                    x: position.x,
                    y: position.y
                }}
                transition={animateTransition ? { duration: 0.3, ease: 'easeOut' } : { duration: 0 }}
                onClick={handleDivClick}
            >
                <Resizable width={size.width} height={size.height} onResize={onResize}>
                    <div
                        style={{ width: '100%', height: '100%' }}
                        className={"bg-gray-50 outline-solid outline-gray-300/60 w-full lg:min-w-[400px] min-w-[300px] lg:min-h-[500px] min-h-[400px] flex flex-col overflow-hidden" + (markdownFileFullscreen ? " rounded-none" : " rounded-lg")}
                    >
                        <div className="bg-gray-50 handle hover:border-b-1 hover:border-black/7 hover:shadow-xs transition duration-300 border-gray-100/20">
                            <div className="flex items-center w-full p-2 py-3">
                                <div className="flex w-1/6 lg:max-w-[3vw] max-w-[50px] items-center">
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
                                <div className="mx-4 font-bold text-black/75">
                                    <p>Education</p>
                                </div>
                            </div>
                        </div>
                        <div ref={containerRef} className="flex grow overflow-y-auto p-4">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: CustomH1,
                                h2: CustomH2,
                                h3: CustomH3,
                                h4: CustomH4,
                                h5: CustomH5,
                                h6: CustomH6,
                                p: CustomParagraph,
                                em: CustomEmphasis,
                                strong: CustomStrong,
                                a: CustomLink,
                                img: CustomImage,
                                blockquote: CustomBlockQuote,
                                code: CustomCodeBlock
                            }}
                        >
                            {markdownText}
                        </ReactMarkdown>
                        </div>
                    </div>
                </Resizable>
            </motion.div>
        </Draggable>
    );
}