const CustomH1 = ({ children }) => (
    <h1 className="text-4xl font-bold mb-6 text-black">{children}</h1>
);

const CustomH2 = ({ children }) => (
    <h2 className="text-3xl font-bold mb-4 mt-8 text-black">{children}</h2>
);

const CustomH3 = ({ children }) => (
    <h3 className="text-2xl font-bold mb-3 mt-6 text-black">{children}</h3>
);

const CustomH4 = ({ children }) => (
    <h4 className="text-xl font-bold mb-2 mt-4 text-black">{children}</h4>
);

const CustomH5 = ({ children }) => (
    <h5 className="text-lg font-bold mb-2 mt-3 text-black">{children}</h5>
);

const CustomH6 = ({ children }) => (
    <h6 className="text-base font-bold mb-2 mt-3 text-black">{children}</h6>
);

const CustomParagraph = ({ children }) => (
    <p className="text-gray-800 leading-relaxed mb-4 text-base">
        {children}
    </p>
);
  
const CustomEmphasis = ({ children }) => (
    <em className="text-gray-700 italic">{children}</em>
);

const CustomStrong = ({ children }) => (
    <strong className="text-black font-semibold">{children}</strong>
);


const CustomLink = ({ href, children }) => (
    <a
      href={href}
      className="text-blue-600 hover:underline hover:text-blue-700"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
);

const CustomImage = ({ alt, src, title }) => (
    <div className="my-6">
      <img
        className="max-w-full rounded-lg shadow-md"
        src={src}
        alt={alt}
        title={title}
      />
      {title && <p className="text-center text-sm mt-2 text-gray-600">{title}</p>}
    </div>
);

const CustomBlockQuote = ({ children }) => (
    <blockquote className="bg-gray-100 border-l-4 border-gray-400 px-6 py-4 my-6 text-gray-700 italic">
      {children}
    </blockquote>
);

const CustomCodeBlock = ({ language, value }) => (
    <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4">
      <code className={`language-${language}`}>{value}</code>
    </pre>
);

const CustomList = ({ children, ordered }) => {
    const Tag = ordered ? 'ol' : 'ul';
    const listClass = ordered 
        ? "list-decimal list-inside mb-4 space-y-2 ml-4" 
        : "list-disc list-inside mb-4 space-y-2 ml-4";
    
    return (
        <Tag className={listClass}>
            {children}
        </Tag>
    );
};

const CustomListItem = ({ children }) => (
    <li className="text-gray-800 leading-relaxed">
        {children}
    </li>
);

const CustomHR = () => (
    <hr className="my-8 border-t border-gray-300" />
);
  

export { CustomH1, CustomH2, CustomH3, CustomH4, CustomH5, CustomH6, CustomParagraph, CustomEmphasis, CustomStrong, CustomLink, CustomImage, CustomBlockQuote, CustomCodeBlock, CustomList, CustomListItem, CustomHR }