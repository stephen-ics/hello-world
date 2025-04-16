import Image from 'next/image'

export default function MarkdownFileIcon({ name, selected }) {
    return (
        <div className='flex flex-col items-center w-full max-w-[70px] text-xs'>
            <div className={`duration-300 p-2 py-3 rounded-sm ${selected ? 'bg-black/15' : ''}`}>
                <Image 
                    src='/app_icons/app_markdown_file.png'
                    width={55}
                    height={55}
                    alt='app folder'
                />
            </div>
            <div className={`duration-300 mt-2 p-1 rounded-sm ${selected ? 'bg-[#0a64db] text-white' : ''}`}>
                <div className='w-full text-wrap text-center'>
                    {name}
                </div>
            </div>
        </div>
    );
}