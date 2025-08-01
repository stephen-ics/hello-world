'use client'

import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { closeMarkdownFile, hideMarkdownFile, maximizeMarkdownFile, minimizeMarkdownFile, selectMarkdownFile, updateMarkdownFilePosition, updateMarkdownFileSize } from '../slices/applicationSlice'
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Draggable from 'react-draggable';
import HoverableImage from './hoverableImage';
import { motion } from 'framer-motion';
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { CustomH1, CustomH2, CustomH3, CustomH4, CustomH5, CustomH6, CustomParagraph, CustomEmphasis, CustomStrong, CustomLink, CustomImage, CustomBlockQuote, CustomCodeBlock, CustomList, CustomListItem, CustomHR } from '../components/customMarkdownElements'


interface MarkdownFileData {
    id: string;
    fileName: string;
    filePath: string;
    isHidden: boolean;
    isFullscreen: boolean;
    width: number;
    height: number;
    x: number;
    y: number;
    zIndex: number;
}

export default function MarkdownFile({ fileData }: { fileData: MarkdownFileData }) {  
    const [size, setSize] = useState({ width: fileData.width, height: fileData.height });
    const [position, setPosition] = useState({ x: fileData.x, y: fileData.y });
    const [mounted, setMounted] = useState(false);
    const [animateTransition, setAnimateTransition] = useState(false);
    const [markdownContent, setMarkdownContent] = useState('');
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const containerRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<HTMLDivElement>(null);

    // Load markdown content when file path changes
    useEffect(() => {
        if (fileData.filePath) {
            setLoading(true);
            fetch(fileData.filePath)
                .then(response => response.text())
                .then(text => {
                    setMarkdownContent(text);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error loading markdown file:', error);
                    setMarkdownContent('# Error\n\nFailed to load markdown file.');
                    setLoading(false);
                });
        }
    }, [fileData.filePath]);

    useEffect(() => {
        setSize({ width: fileData.width, height: fileData.height });
        setPosition({ x: fileData.x, y: fileData.y });
        setMounted(true);
    }, []);

    useEffect(() => {
        // Update size and position when fileData changes (e.g., when maximizing/minimizing)
        if (mounted) {
            setSize({ width: fileData.width, height: fileData.height });
            if (fileData.isFullscreen) {
                setPosition({ x: 0, y: 0 });
                setSize({ width: window.innerWidth, height: window.innerHeight });
            } else {
                setPosition({ x: fileData.x, y: fileData.y });
            }
        }
    }, [fileData.width, fileData.height, fileData.x, fileData.y, fileData.isFullscreen, mounted]);

    if (!mounted) return null;

    function handleClickRed() {
        dispatch(closeMarkdownFile({ id: fileData.id }));
    }

    function handleClickYellow() {
        dispatch(hideMarkdownFile({ 
            id: fileData.id,
            width: size.width, 
            height: size.height, 
            x: position.x, 
            y: position.y 
        }));
    }

    function handleClickGreen() {
        setAnimateTransition(true);

        if (fileData.isFullscreen) {
            dispatch(minimizeMarkdownFile({ id: fileData.id }));
        } else {
            dispatch(maximizeMarkdownFile({ 
                id: fileData.id,
                width: size.width, 
                height: size.height, 
                x: position.x, 
                y: position.y 
            }));
        }

        setTimeout(() => setAnimateTransition(false), 350);
    }

    const onResize = (event: any, { size: newSize }: { size: { width: number; height: number } }) => {
        setSize(newSize);
        dispatch(updateMarkdownFileSize({
            id: fileData.id,
            width: newSize.width,
            height: newSize.height
        }));
    };

    const handleDrag = (e: any, data: any) => {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const maxX = screenW - size.width;
        const maxY = screenH - size.height;

        const newX = Math.max(0, Math.min(data.x, maxX));
        const newY = Math.max(0, Math.min(data.y, maxY));
        setPosition({ x: newX, y: newY });
        
        dispatch(updateMarkdownFilePosition({
            id: fileData.id,
            x: newX,
            y: newY
        }));
    };

    function handleDivClick() {
        dispatch(selectMarkdownFile({ id: fileData.id }));
    }

    return (
        <Draggable 
            position={position} 
            onDrag={handleDrag} 
            nodeRef={dragRef as any} 
            handle=".handle"
            disabled={fileData.isFullscreen}
        >
            <motion.div 
                ref={dragRef} 
                className='absolute'
                style={{ zIndex: fileData.zIndex }}
                animate={{
                    width: fileData.isFullscreen ? '100vw' : `${size.width}px`,
                    height: fileData.isFullscreen ? '100vh' : `${size.height}px`,
                    x: fileData.isFullscreen ? 0 : position.x,
                    y: fileData.isFullscreen ? 0 : position.y,
                }}
                transition={animateTransition ? { duration: 0.3, ease: 'easeOut' } : { duration: 0 }}
                onClick={handleDivClick}
            >
                <Resizable 
                    width={size.width} 
                    height={size.height} 
                    onResize={onResize}
                >
                    <div
                        style={{ width: '100%', height: '100%' }}
                        className={"outline-solid outline-gray-300/50 duration-300 bg-white w-full lg:min-w-[600px] min-w-[400px] lg:min-h-[500px] min-h-[400px] border-2 border-solid border-gray-300 flex flex-col overflow-hidden" + (fileData.isFullscreen ? " rounded-none" : " rounded-lg")}
                    >
                        <div className="bg-gray-200 hover:bg-gray-300/80 handle transition">
                            <div className='flex m-3 justify-between items-center'>
                                <div className="flex w-5/9 max-w-[4vw] items-center">
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
                                <div className="flex-1 text-center">
                                    <p className="font-bold text-black/75 text-base">{fileData.fileName || 'Untitled'}</p>
                                </div>
                                <div className="w-5/9 max-w-[4vw]"></div>
                            </div>
                        </div>
                        <div ref={containerRef} className="flex-1 overflow-y-auto bg-white">
                            <div className="max-w-4xl mx-auto px-8 py-8">
                                {loading ? (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-gray-500">Loading...</p>
                                    </div>
                                ) : (
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
                                            code: CustomCodeBlock,
                                            ul: ({ children }: any) => <CustomList ordered={false}>{children}</CustomList>,
                                            ol: ({ children }: any) => <CustomList ordered={true}>{children}</CustomList>,
                                            li: CustomListItem,
                                            hr: CustomHR
                                        } as any}
                                    >
                                        {markdownContent}
                                    </ReactMarkdown>
                                )}
                            </div>
                        </div>
                    </div>
                </Resizable>
            </motion.div>
        </Draggable>
    );
}