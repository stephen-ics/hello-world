"use client"
import { useRef } from 'react'
import Terminal from '@/app/components/terminal'
import TerminalApp from '@/app/components/terminalApp'
import Finder from '@/app/components/finder'
import FinderApp from '@/app/components/finderApp'
import MarkdownFile from '@/app/components/markdownFile'
import Dock from '@/app/components/dock'
import { useSelector } from 'react-redux'
import { getImageProps } from 'next/image'
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { CustomH1, CustomH2, CustomH3, CustomH4, CustomH5, CustomH6, CustomParagraph, CustomEmphasis, CustomStrong, CustomLink, CustomImage, CustomBlockQuote } from './components/customMarkdownElements'

export default function Home() {
  const terminalOpen = useSelector(state => state.application.terminalOpen)
  const terminalHide = useSelector(state => state.application.terminalHide)

  const finderOpen = useSelector(state => state.application.finderOpen)
  const finderHide = useSelector(state => state.application.finderHide)

  const markdownFileOpen = useSelector(state => state.application.markdownFileOpen)
  const markdownFileHide = useSelector(state => state.application.markdownFileHide)

  const zIndexTerminal = useSelector(state => state.application.zIndexTerminal)
  const zIndexFinder = useSelector(state => state.application.zIndexFinder)
  const zIndexMarkdownFile = useSelector(state => state.application.zIndexMarkdownFile)

  const inputRef = useRef(null);

  function getBackgroundImage(srcSet = '') {
    const imageSet = srcSet
      .split(', ')
      .map((str) => {
        const [url, dpi] = str.split(' ')
        return `url("${url}") ${dpi}`
      })
      .join(', ')
    return `image-set(${imageSet})`
  }

  const {
    props: { srcSet },
  } = getImageProps({ alt: '', width: 1920, height: 1080, src: '/wallpaper.png' })
  const backgroundImage = getBackgroundImage(srcSet)
  
  const style = { 
    height: '100vh', 
    width: '100vw', 
    backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  // const markdownText = `A **B** *C* 
  // # HELLO
  // ## HELLO
  // ### HELLO
  // (hello)[https://google.com]
  // [hello](https://google.com)
  // > He once said

  // `

  return (
    <div className='h-screen w-screen relative' style={style}>
      {(terminalOpen && !terminalHide) &&
        <div className={`relative w-0 h-0`} style={{zIndex: zIndexTerminal}}>
          <Terminal inputRef={inputRef}/>
        </div>
      }

      {(finderOpen && !finderHide) &&
        <div className={`relative w-0 h-0`} style={{zIndex: zIndexFinder}}>
          <Finder />
        </div>
      }

      {(markdownFileOpen && !markdownFileHide) && 
        <div className={`relative w-0 h-0`} style={{zIndex: zIndexMarkdownFile}}>
          <MarkdownFile />
        </div>
      }
      
      <div className='absolute top-[30px] left-[30px] text-white font-semibold flex flex-col gap-4'>
        <div className='flex flex-col items-center'>
          <TerminalApp />
          <p className='text-xs'>
            Terminal
          </p>
          
        </div>
        <div className='flex flex-col items-center'>
          <FinderApp />
          <p className='text-xs'>
            Finder
          </p>
        </div>
        
        {/* <ReactMarkdown remarkPlugins={[remarkGfm]}
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
            blockquote: CustomBlockQuote
          }}
        >
          {markdownText}
        </ReactMarkdown> */}
      </div>
      
      <Dock />
    </div>
  );
}