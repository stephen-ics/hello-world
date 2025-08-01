import { createSlice } from '@reduxjs/toolkit'

export const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        terminalOpen: true,
        terminalHide: false,
        terminalFullscreen: false,
        terminalWidth: 500,
        terminalHeight: 300,
        terminalX: -1,
        terminalY: -1,
        zIndexTerminal: 10,

        finderOpen: false,
        finderHide: true,
        finderFullscreen: false,
        finderWidth: 800,
        finderHeight: 600,
        finderX: -1,
        finderY: -1,
        finderTabDesktop: true,
        finderTabDownloads: false,
        finderDirectory: "Desktop",
        zIndexFinder: 10,

        // Multiple markdown files support
        markdownFiles: [] as Array<{
            id: string;
            fileName: string;
            filePath: string;
            isHidden: boolean;
            isFullscreen: boolean;
            width: number;
            height: number;
            x: number;
            y: number;
            zIndex: number;
        }>,
        activeMarkdownFileId: null as string | null,
        
        // PDF files support
        pdfFiles: [] as Array<{
            id: string;
            fileName: string;
            filePath: string;
            isHidden: boolean;
            isFullscreen: boolean;
            width: number;
            height: number;
            x: number;
            y: number;
            zIndex: number;
        }>,
        activePdfFileId: null as string | null,

        zIndexGlobal: 10,
    },

    reducers: {
        openTerminal: state => {
            state.terminalOpen = true
        },
        closeTerminal: (state, action) => {
            state.terminalOpen = false

            state.terminalWidth = action.payload.width;
            state.terminalHeight = action.payload.height;
            state.terminalX = action.payload.x;
            state.terminalY = action.payload.y;
        },
        showTerminal: state => {
            state.terminalHide = false;
        },
        hideTerminal: (state, action) => {
            state.terminalHide = true;

            state.terminalWidth = action.payload.width;
            state.terminalHeight = action.payload.height;
            state.terminalX = action.payload.x;
            state.terminalY = action.payload.y;
        },
        maximizeTerminal: (state, action) => {
            state.terminalFullscreen = true;
            state.terminalWidth = action.payload.width;
            state.terminalHeight = action.payload.height;
            state.terminalX = action.payload.x;
            state.terminalY = action.payload.y;
        },
        minimizeTerminal: state => {
            state.terminalFullscreen = false;
        },
        selectTerminal: state => {
            state.zIndexGlobal++;
            state.zIndexTerminal = state.zIndexGlobal;
        },

        openFinder: state => {
            state.finderOpen = true
        },
        closeFinder: (state) => {
            state.finderOpen = false;
        },
        showFinder: state => {
            state.finderHide = false;
        },
        hideFinder: (state, action) => {
            state.finderHide = true;

            state.finderWidth = action.payload.width;
            state.finderHeight = action.payload.height;
            state.finderX = action.payload.x;
            state.finderY = action.payload.y;
        },
        maximizeFinder: (state, action) => {
            state.finderFullscreen = true;
            
            state.finderWidth = action.payload.width;
            state.finderHeight = action.payload.height;
            state.finderX = action.payload.x;
            state.finderY = action.payload.y;
        },
        minimizeFinder: (state, action) => {
            state.finderFullscreen = false;
            // Restore the saved position and size when minimizing
            if (action.payload) {
                state.finderWidth = action.payload.width;
                state.finderHeight = action.payload.height;
                state.finderX = action.payload.x;
                state.finderY = action.payload.y;
            }
        },
        openDesktopTab: state => {
            state.finderTabDesktop = true;
            state.finderTabDownloads = false;
        },
        openDownloadsTab: state => {
            state.finderTabDesktop = false;
            state.finderTabDownloads = true;
        },
        changeDirectory: (state, action) => {
            state.finderDirectory = action.payload;
        },
        selectFinder: state => {
            state.zIndexGlobal++;
            state.zIndexFinder = state.zIndexGlobal;
        },

        openMarkdownFile: (state, action) => {
            const { fileName, filePath } = action.payload;
            
            // Check if file is already open
            const existingFile = state.markdownFiles.find(file => file.filePath === filePath);
            
            if (existingFile) {
                // If file is already open, just make it active
                state.activeMarkdownFileId = existingFile.id;
                // Update z-index to bring it to front
                state.zIndexGlobal++;
                existingFile.zIndex = state.zIndexGlobal;
            } else {
                // Create new file window
                const newFile = {
                    id: Date.now().toString(),
                    fileName,
                    filePath,
                    isHidden: false,
                    isFullscreen: false,
                    width: 700,
                    height: 600,
                    x: 100 + (state.markdownFiles.length * 30), // Offset each new window
                    y: 100 + (state.markdownFiles.length * 30),
                    zIndex: ++state.zIndexGlobal
                };
                
                state.markdownFiles.push(newFile);
                state.activeMarkdownFileId = newFile.id;
            }
        },
        
        closeMarkdownFile: (state, action) => {
            const fileId = action.payload.id;
            state.markdownFiles = state.markdownFiles.filter(file => file.id !== fileId);
            
            // If we closed the active file, make another one active
            if (state.activeMarkdownFileId === fileId && state.markdownFiles.length > 0) {
                state.activeMarkdownFileId = state.markdownFiles[state.markdownFiles.length - 1].id;
            } else if (state.markdownFiles.length === 0) {
                state.activeMarkdownFileId = null;
            }
        },
        
        hideMarkdownFile: (state, action) => {
            const file = state.markdownFiles.find(f => f.id === action.payload.id);
            if (file) {
                file.isHidden = true;
                file.width = action.payload.width;
                file.height = action.payload.height;
                file.x = action.payload.x;
                file.y = action.payload.y;
            }
        },
        
        showMarkdownFile: (state, action) => {
            const file = state.markdownFiles.find(f => f.id === action.payload.id);
            if (file) {
                file.isHidden = false;
            }
        },
        
        maximizeMarkdownFile: (state, action) => {
            const file = state.markdownFiles.find(f => f.id === action.payload.id);
            if (file) {
                file.isFullscreen = true;
                file.width = action.payload.width;
                file.height = action.payload.height;
                file.x = action.payload.x;
                file.y = action.payload.y;
            }
        },
        
        minimizeMarkdownFile: (state, action) => {
            const file = state.markdownFiles.find(f => f.id === action.payload.id);
            if (file) {
                file.isFullscreen = false;
            }
        },
        
        selectMarkdownFile: (state, action) => {
            const file = state.markdownFiles.find(f => f.id === action.payload.id);
            if (file) {
                state.activeMarkdownFileId = file.id;
                state.zIndexGlobal++;
                file.zIndex = state.zIndexGlobal;
            }
        },
        
        updateMarkdownFilePosition: (state, action) => {
            const file = state.markdownFiles.find(f => f.id === action.payload.id);
            if (file) {
                file.x = action.payload.x;
                file.y = action.payload.y;
            }
        },
        
        updateMarkdownFileSize: (state, action) => {
            const file = state.markdownFiles.find(f => f.id === action.payload.id);
            if (file) {
                file.width = action.payload.width;
                file.height = action.payload.height;
            }
        },
        
        // PDF file actions
        openPdfFile: (state, action) => {
            const { fileName, filePath } = action.payload;
            
            // Check if file is already open
            const existingFile = state.pdfFiles.find(file => file.filePath === filePath);
            
            if (existingFile) {
                // If file is already open, just make it active
                state.activePdfFileId = existingFile.id;
                // Update z-index to bring it to front
                state.zIndexGlobal++;
                existingFile.zIndex = state.zIndexGlobal;
            } else {
                // Create new file window
                const newFile = {
                    id: Date.now().toString(),
                    fileName,
                    filePath,
                    isHidden: false,
                    isFullscreen: false,
                    width: 800,
                    height: 600,
                    x: 150 + (state.pdfFiles.length * 30), // Offset each new window
                    y: 150 + (state.pdfFiles.length * 30),
                    zIndex: ++state.zIndexGlobal
                };
                
                state.pdfFiles.push(newFile);
                state.activePdfFileId = newFile.id;
            }
        },
        
        closePdfFile: (state, action) => {
            const fileId = action.payload.id;
            state.pdfFiles = state.pdfFiles.filter(file => file.id !== fileId);
            
            // If we closed the active file, make another one active
            if (state.activePdfFileId === fileId && state.pdfFiles.length > 0) {
                state.activePdfFileId = state.pdfFiles[state.pdfFiles.length - 1].id;
            } else if (state.pdfFiles.length === 0) {
                state.activePdfFileId = null;
            }
        },
        
        hidePdfFile: (state, action) => {
            const file = state.pdfFiles.find(f => f.id === action.payload.id);
            if (file) {
                file.isHidden = true;
                file.width = action.payload.width;
                file.height = action.payload.height;
                file.x = action.payload.x;
                file.y = action.payload.y;
            }
        },
        
        showPdfFile: (state, action) => {
            const file = state.pdfFiles.find(f => f.id === action.payload.id);
            if (file) {
                file.isHidden = false;
            }
        },
        
        maximizePdfFile: (state, action) => {
            const file = state.pdfFiles.find(f => f.id === action.payload.id);
            if (file) {
                file.isFullscreen = true;
                file.width = action.payload.width;
                file.height = action.payload.height;
                file.x = action.payload.x;
                file.y = action.payload.y;
            }
        },
        
        minimizePdfFile: (state, action) => {
            const file = state.pdfFiles.find(f => f.id === action.payload.id);
            if (file) {
                file.isFullscreen = false;
            }
        },
        
        selectPdfFile: (state, action) => {
            const file = state.pdfFiles.find(f => f.id === action.payload.id);
            if (file) {
                state.activePdfFileId = file.id;
                state.zIndexGlobal++;
                file.zIndex = state.zIndexGlobal;
            }
        },
        
        updatePdfFilePosition: (state, action) => {
            const file = state.pdfFiles.find(f => f.id === action.payload.id);
            if (file) {
                file.x = action.payload.x;
                file.y = action.payload.y;
            }
        },
        
        updatePdfFileSize: (state, action) => {
            const file = state.pdfFiles.find(f => f.id === action.payload.id);
            if (file) {
                file.width = action.payload.width;
                file.height = action.payload.height;
            }
        }
    }
})

export const { 
    openTerminal, closeTerminal, showTerminal, hideTerminal, maximizeTerminal, minimizeTerminal, selectTerminal, 
    openFinder, closeFinder, showFinder, hideFinder, maximizeFinder, minimizeFinder, selectFinder, 
    openDesktopTab, openDownloadsTab, changeDirectory, 
    closeMarkdownFile, openMarkdownFile, showMarkdownFile, hideMarkdownFile, maximizeMarkdownFile, minimizeMarkdownFile, selectMarkdownFile, updateMarkdownFilePosition, updateMarkdownFileSize,
    openPdfFile, closePdfFile, hidePdfFile, showPdfFile, maximizePdfFile, minimizePdfFile, selectPdfFile, updatePdfFilePosition, updatePdfFileSize
} = applicationSlice.actions
export default applicationSlice.reducer
