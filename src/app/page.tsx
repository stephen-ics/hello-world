"use client"
import Terminal from '@/app/components/terminal'
import TerminalApp from '@/app/components/terminalApp'
import Dock from '@/app/components/dock'
import { useSelector } from 'react-redux'
import { getImageProps } from 'next/image'

export default function Home() {
  const terminalOpen = useSelector(state => state.application.terminalOpen)

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
    <div className='h-screen w-screen bg-blue-100' style={style}>
      Hello World!

      {terminalOpen &&
        <Terminal />
      }
      
      <TerminalApp />
      <Dock />
    </div>
  );
}