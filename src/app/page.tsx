"use client"
import Terminal from '@/app/components/terminal'
import Draggable from 'react-draggable';
import { useRef } from 'react'

export default function Home() {
  const myRef = useRef(null);
  
  return (
    <div className='h-full bg-blue-100'>
      Hello World!


      <Terminal />
   
    </div>
  );
}