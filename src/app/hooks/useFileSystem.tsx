import { useState, useEffect } from 'react';

export interface FileSystemItem {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FileSystemItem[];
  content?: string;
}

export function useFileSystem() {
  const [fileSystem, setFileSystem] = useState<FileSystemItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFileSystem();
  }, []);

  const fetchFileSystem = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/filesystem');
      if (!response.ok) {
        throw new Error('Failed to fetch file system');
      }
      const data = await response.json();
      setFileSystem(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching file system:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get items at a specific path
  const getItemsAtPath = (path: string): FileSystemItem[] => {
    if (!fileSystem) return [];
    
    if (path === '/' || path === '') {
      return fileSystem.children || [];
    }

    const pathParts = path.split('/').filter(part => part !== '');
    let current = fileSystem;

    for (const part of pathParts) {
      const found = current.children?.find(child => child.name === part);
      if (!found || found.type !== 'folder') {
        return [];
      }
      current = found;
    }

    return current.children || [];
  };

  // Helper function to get a specific item by path
  const getItemByPath = (path: string): FileSystemItem | null => {
    if (!fileSystem) return null;
    
    if (path === '/' || path === '') {
      return fileSystem;
    }

    const pathParts = path.split('/').filter(part => part !== '');
    let current = fileSystem;

    for (const part of pathParts) {
      const found = current.children?.find(child => child.name === part);
      if (!found) {
        return null;
      }
      current = found;
    }

    return current;
  };

  return {
    fileSystem,
    loading,
    error,
    refetch: fetchFileSystem,
    getItemsAtPath,
    getItemByPath
  };
} 