const CustomH1 = ({ children }) => (
    <h1 className="text-3xl font-bold mb-4 text-black">{children}</h1>
);

const CustomH2 = ({ children }) => (
    <h2 className="text-2xl font-bold text-black">{children}</h2>
);

const CustomH3 = ({ children }) => (
    <h3 className="text-xl font-bold text-black">{children}</h3>
);

const CustomH4 = ({ children }) => (
    <h4 className="text-lg font-bold text-black">{children}</h4>
);

const CustomH5 = ({ children }) => (
    <h5 className="text-base font-bold text-black">{children}</h5>
);

const CustomH6 = ({ children }) => (
    <h6 className="text-sm font-bold text-black">{children}</h6>
);

const CustomParagraph = ({ children }) => (
    <p className="text-gray-800 leading-relaxed mb-4">
        {children}
    </p>
);
  
const CustomEmphasis = ({ children }) => (
    <em className="text-blue-500">{children}</em>
);

const CustomStrong = ({ children }) => (
    <strong className="text-red-500">{children}</strong>
);


const CustomLink = ({ href, children }) => (
    <a
      href={href}
      className="text-blue-500 hover:underline hover:text-blue-600"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
);

const CustomImage = ({ alt, src, title }) => (
    <div className="my-4">
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
    <blockquote className="bg-gray-200 border-l-4 border-blue-600 px-6 py-4 my-6 text-lg italic">
      {children}
    </blockquote>
);
  

export { CustomH1, CustomH2, CustomH3, CustomH4, CustomH5, CustomH6, CustomParagraph, CustomEmphasis, CustomStrong, CustomLink, CustomImage, CustomBlockQuote }