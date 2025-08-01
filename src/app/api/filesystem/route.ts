import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface FileSystemItem {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FileSystemItem[];
  content?: string;
}

function scanDirectory(dirPath: string, relativePath: string = ''): FileSystemItem[] {
  const items: FileSystemItem[] = [];
  
  try {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      // Skip hidden files and directories
      if (file.startsWith('.')) continue;
      
      const fullPath = path.join(dirPath, file);
      const itemRelativePath = relativePath ? `${relativePath}/${file}` : file;
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        const children = scanDirectory(fullPath, itemRelativePath);
        items.push({
          name: file,
          type: 'folder',
          path: `/${itemRelativePath}`,
          children
        });
      } else if (file.endsWith('.md')) {
        items.push({
          name: file,
          type: 'file',
          path: `/${itemRelativePath}`,
          content: `/content/${itemRelativePath}`
        });
      } else if (file.endsWith('.pdf')) {
        items.push({
          name: file,
          type: 'file',
          path: `/${itemRelativePath}`,
          content: `/content/${itemRelativePath}`
        });
      }
    }
  } catch (error) {
    console.error('Error scanning directory:', error);
  }
  
  return items;
}

export async function GET() {
  const contentPath = path.join(process.cwd(), 'public', 'content');
  
  const fileSystem: FileSystemItem = {
    name: 'root',
    type: 'folder',
    path: '/',
    children: scanDirectory(contentPath)
  };
  
  return NextResponse.json(fileSystem);
} 