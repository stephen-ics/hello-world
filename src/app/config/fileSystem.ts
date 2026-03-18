export interface FileSystemItem {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: FileSystemItem[];
  content?: string; // For markdown files, this will be the path to the actual .md file
}

export const fileSystem: FileSystemItem = {
  name: 'root',
  type: 'folder',
  path: '/',
  children: [
    {
      name: 'professional-summary',
      type: 'folder',
      path: '/professional-summary',
      children: [
        {
          name: 'education.md',
          type: 'file',
          path: '/professional-summary/education.md',
          content: '/content/professional-summary/education.md'
        },
        {
          name: 'experiences.md',
          type: 'file',
          path: '/professional-summary/experiences.md',
          content: '/content/professional-summary/experiences.md'
        },
        {
          name: 'projects.md',
          type: 'file',
          path: '/professional-summary/projects.md',
          content: '/content/professional-summary/projects.md'
        },
        {
          name: 'skills.md',
          type: 'file',
          path: '/professional-summary/skills.md',
          content: '/content/professional-summary/skills.md'
        }
      ]
    },
    {
      name: 'me',
      type: 'folder',
      path: '/me',
      children: [
        {
          name: 'about_me.md',
          type: 'file',
          path: '/me/about_me.md',
          content: '/content/me/about_me.md'
        },
        {
          name: 'books.md',
          type: 'file',
          path: '/me/books.md',
          content: '/content/me/books.md'
        },
        {
          name: 'thoughts',
          type: 'folder',
          path: '/me/thoughts',
          children: [
            {
              name: 'delayed_gratification.md',
              type: 'file',
              path: '/me/thoughts/delayed_gratification.md',
              content: '/content/me/thoughts/delayed_gratification.md'
            },
            {
              name: 'vibe_coding_technical_debt.md',
              type: 'file',
              path: '/me/thoughts/vibe_coding_technical_debt.md',
              content: '/content/me/thoughts/vibe_coding_technical_debt.md'
            }
          ]
        }
      ]
    }
  ]
};

// Helper function to get items at a specific path
export function getItemsAtPath(path: string): FileSystemItem[] {
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
}

// Helper function to get a specific item by path
export function getItemByPath(path: string): FileSystemItem | null {
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
}

// Helper function to check if a path exists
export function pathExists(path: string): boolean {
  return getItemByPath(path) !== null;
}

// Helper function to get parent path
export function getParentPath(path: string): string {
  const pathParts = path.split('/').filter(part => part !== '');
  pathParts.pop();
  return '/' + pathParts.join('/');
} 
