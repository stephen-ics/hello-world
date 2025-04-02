"use client"
import Terminal from '@/app/components/terminal'
import { Counter } from '@/app/components/counter'
import TerminalApp from '@/app/components/terminalApp'
import { useSelector } from 'react-redux'

export default function Home() {
  const terminalOpen = useSelector(state => state.application.terminalOpen)

  return (
    <div className='h-screen w-screen bg-blue-100'>
      Hello World!

      {terminalOpen &&
        <Terminal />
      }
      
      <Counter />
      <Counter />
      <Counter />
      <TerminalApp />
   
    </div>
  );
}