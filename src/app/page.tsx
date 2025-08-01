"use client"
import { useRef } from 'react'
import Terminal from '@/app/components/terminal'
import TerminalApp from '@/app/components/terminalApp'
import Finder from '@/app/components/finder'
import FinderApp from '@/app/components/finderApp'
import MarkdownFile from '@/app/components/markdownFile'
import PDFViewer from '@/app/components/pdfViewer'
import Dock from '@/app/components/dock'
import { useSelector, useDispatch } from 'react-redux'
import { closePdfFile, hidePdfFile, maximizePdfFile, minimizePdfFile, selectPdfFile, updatePdfFilePosition, updatePdfFileSize } from '@/app/slices/applicationSlice'
import { getImageProps } from 'next/image'

export default function Home() {
  const dispatch = useDispatch();
    const terminalOpen = useSelector((state: any) => state.application.terminalOpen)
  const terminalHide = useSelector((state: any) => state.application.terminalHide)
  
  const finderOpen = useSelector((state: any) => state.application.finderOpen)
  const finderHide = useSelector((state: any) => state.application.finderHide)

  const markdownFiles = useSelector((state: any) => state.application.markdownFiles)
  const pdfFiles = useSelector((state: any) => state.application.pdfFiles)

  const zIndexTerminal = useSelector((state: any) => state.application.zIndexTerminal)
  const zIndexFinder = useSelector((state: any) => state.application.zIndexFinder)

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

      {markdownFiles && markdownFiles.map((file: any) => (
        !file.isHidden && (
          <div key={file.id} className={`relative w-0 h-0`}>
            <MarkdownFile fileData={file} />
          </div>
        )
      ))}
      
      {pdfFiles && pdfFiles.map((file: any) => (
        !file.isHidden && (
          <div key={file.id} className={`relative w-0 h-0`}>
            <PDFViewer 
              fileData={file}
              onClose={() => dispatch(closePdfFile({ id: file.id }))}
              onHide={(params) => dispatch(hidePdfFile({ id: file.id, ...params }))}
              onMaximize={(params) => dispatch(maximizePdfFile({ id: file.id, ...params }))}
              onMinimize={() => dispatch(minimizePdfFile({ id: file.id }))}
              onSelect={() => dispatch(selectPdfFile({ id: file.id }))}
              onUpdatePosition={(params) => dispatch(updatePdfFilePosition({ id: file.id, ...params }))}
              onUpdateSize={(params) => dispatch(updatePdfFileSize({ id: file.id, ...params }))}
            />
          </div>
        )
      ))}
      
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
      </div>
      
      <Dock />
    </div>
  );
}