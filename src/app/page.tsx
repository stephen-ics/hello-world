"use client"
import { useRef } from 'react'
import Terminal from '@/app/components/terminal'
import TerminalApp from '@/app/components/terminalApp'
import FolderApp from '@/app/components/folderApp'
import Dock from '@/app/components/dock'
import { useSelector } from 'react-redux'
import { getImageProps } from 'next/image'

export default function Home() {
  const terminalOpen = useSelector(state => state.application.terminalOpen)
  const terminalHide = useSelector(state => state.application.terminalHide)
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
  
  // Set the background to cover the entire viewport and maintain a nice fit
  const style = { 
    height: '100vh', 
    width: '100vw', 
    backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div className='h-screen w-screen bg-blue-100 relative' style={style}>
      {(terminalOpen && !terminalHide) &&
        <div className='relative z-10 w-0 h-0'>
          <Terminal inputRef={inputRef}/>
        </div>
      }
      
      <div className='absolute top-[30px] left-[30px] text-white font-semibold text-xs flex flex-col gap-4'>
        <div className='flex flex-col items-center'>
          <TerminalApp />
          <p>
            Terminal
          </p>
        </div>
        <div className='flex flex-col items-center'>
          <FolderApp />
          <p>
            professional_career
          </p>
        </div>
      </div>
      
      <Dock />
    </div>
  );
}