import Image from 'next/image'

export default function Folder({ name, selected }: { name: string; selected: boolean }) {
    const renderLabel = (value: string) => {
        return value.split(/([_.-])/).map((part, index) => (
            <span key={`${part}-${index}`}>
                {part}
                {(part === '_' || part === '-' || part === '.') && <wbr />}
            </span>
        ));
    };

    return (
        <div className='flex flex-col items-center w-[90px] text-xs'>
            <div className={`duration-300 p-2 py-3 rounded-sm ${selected ? 'bg-black/15' : ''}`}>
                <Image 
                    src='/app_icons/app_folder.png'
                    width={55}
                    height={55}
                    alt='app folder'
                />
            </div>
            <div className={`duration-300 p-[3px] m-[3px] rounded-sm ${selected ? 'bg-[#0a64db] text-white' : ''}`}>
                <div
                    className='w-full text-center whitespace-normal leading-tight overflow-hidden'
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                    title={name}
                >
                    {renderLabel(name)}
                </div>
            </div>
        </div>
    );
}
