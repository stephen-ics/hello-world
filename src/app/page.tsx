"use client"
import Terminal from '@/app/components/terminal'
import { Counter } from '@/app/components/counter'

export default function Home() {
  
  return (
    <div className='h-screen w-screen bg-blue-100'>
      Hello World!

      <Counter />
      <Counter />
      <Counter />
      <Terminal />
   
    </div>
  );
}