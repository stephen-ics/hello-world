

export default function PDFFileIcon({ name, selected }: { name: string; selected: boolean }) {
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
                <div className="relative">
                    <svg 
                        width="55" 
                        height="55" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M7 18H17V16H7V18Z" fill="#DC2626"/>
                        <path d="M17 14H7V12H17V14Z" fill="#DC2626"/>
                        <path d="M7 10H11V8H7V10Z" fill="#DC2626"/>
                        <path 
                            fillRule="evenodd" 
                            clipRule="evenodd" 
                            d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 8.73478 20.8946 8.48043 20.7071 8.29289L14.7071 2.29289C14.5196 2.10536 14.2652 2 14 2H6ZM6 4H13V9H18V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V5C6 4.44772 6.44772 4 7 4ZM18.5858 7L15 3.41421V7H18.5858Z" 
                            fill="#DC2626"
                        />
                    </svg>
                    <div className="absolute bottom-0 right-0 bg-red-600 text-white text-[8px] px-1 rounded">
                        PDF
                    </div>
                </div>
            </div>
            <div className={`duration-300 mt-2 p-1 rounded-sm ${selected ? 'bg-[#0a64db] text-white' : ''}`}>
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
