import type { Post } from './definitions';

let posts: Post[] = [
  {
    id: '1',
    title: 'The Power of Server Components in Next.js',
    description: 'A deep dive into how Next.js Server Components are changing the game for web development, improving performance and developer experience.',
    content: `Next.js has been at the forefront of React innovation, and Server Components are its latest paradigm-shifting feature. Unlike traditional React components that render on the client-side, Server Components execute exclusively on the server. This fundamental difference unlocks a host of benefits that were previously difficult to achieve.\n\nFirst and foremost is performance. By rendering on the server, you can send a fully-formed HTML document to the browser. This drastically reduces the amount of JavaScript that needs to be downloaded, parsed, and executed on the initial page load. The result is a faster Time to Interactive (TTI) and a smoother user experience, especially on low-powered devices or slow networks.\n\nAnother key advantage is direct data access. Server Components can directly access server-side data sources like databases, file systems, or internal APIs without needing to expose an API endpoint. This simplifies data fetching logic, reduces the number of network round-trips, and enhances security by keeping sensitive data and logic on the server.`,
    image: 'https://picsum.photos/1200/800?random=1',
    createdAt: new Date('2023-10-01T10:00:00Z').toISOString(),
  },
  {
    id: '2',
    title: 'Mastering TypeScript for Modern Web Apps',
    description: 'Explore advanced TypeScript patterns and best practices to build scalable, maintainable, and type-safe applications.',
    content: `TypeScript has become the industry standard for building robust JavaScript applications. While basic type annotations are a great start, mastering its more advanced features can elevate your code quality significantly.\n\nGenerics are one of TypeScript's most powerful features. They allow you to write flexible, reusable components and functions that can work with a variety of types while maintaining type safety. Conditional types, another advanced feature, enable you to create types that change based on certain conditions, leading to more precise and expressive type definitions.\n\nUtility types like Partial, Required, Readonly, and Pick provide convenient ways to transform existing types, reducing boilerplate and making your intent clearer. By combining these features, you can create sophisticated type systems that catch errors at compile time, leading to more reliable and easier-to-refactor codebases.`,
    image: 'https://picsum.photos/1200/800?random=2',
    createdAt: new Date('2023-10-15T12:30:00Z').toISOString(),
  },
  {
    id: '3',
    title: 'A Guide to UI/UX Design for Developers',
    description: 'Bridge the gap between development and design. Learn fundamental UI/UX principles to create applications that are not just functional, but also beautiful and intuitive.',
    content: `As a developer, understanding the principles of User Interface (UI) and User Experience (UX) design is a superpower. It allows you to build products that people love to use. UI design focuses on the look and feel—the colors, typography, and layout. Consistency is key; using a design system or component library like ShadCN/UI helps maintain a cohesive visual language.\n\nUX design, on the other hand, is about the overall experience and usability. It involves understanding user flows, information architecture, and accessibility. A good user experience is often invisible; users can accomplish their tasks without friction or confusion. Simple principles like providing clear feedback for actions, designing for accessibility (e.g., proper color contrast, keyboard navigation), and maintaining a clear visual hierarchy can dramatically improve your application's usability.\n\nBy embracing both UI and UX, you can move beyond writing code that simply works to crafting experiences that are truly delightful and effective.`,
    image: 'https://picsum.photos/1200/800?random=3',
    createdAt: new Date('2023-11-01T15:00:00Z').toISOString(),
  },
  {
    id: '4',
    title: 'State Management in React: A 2024 Perspective',
    description: 'An overview of modern state management solutions in React, from Context API to Zustand and Jotai.',
    content: 'State management in React has evolved significantly. While Redux was once the default choice, modern React offers a variety of solutions. The built-in Context API is great for simple state that needs to be shared across a few components. For more complex global state, libraries like Zustand and Jotai offer a simpler API and better performance than traditional Redux, leveraging a more atomic, hook-based approach.',
    image: 'https://picsum.photos/1200/800?random=4',
    createdAt: new Date('2024-01-10T10:00:00Z').toISOString(),
  },
  {
    id: '5',
    title: 'The Rise of Tailwind CSS',
    description: 'How utility-first CSS is changing the way we build interfaces, and why it might be right for your next project.',
    content: 'Tailwind CSS has taken the frontend world by storm. Its utility-first approach allows for rapid prototyping and building custom designs without writing a single line of custom CSS. This can lead to more maintainable and scalable styling, as styles are co-located with the markup. While it has a learning curve, the productivity gains are often worth it.',
    image: 'https://picsum.photos/1200/800?random=5',
    createdAt: new Date('2024-02-20T11:00:00Z').toISOString(),
  },
  {
    id: '6',
    title: 'Deno vs. Node.js: A New Era for JavaScript Runtimes?',
    description: 'A comparison of Deno and Node.js, exploring their differences, strengths, and weaknesses.',
    content: 'Deno, created by the original author of Node.js, aims to fix many of the design issues of its predecessor. It has built-in support for TypeScript, a secure-by-default runtime, and a single executable. While Node.js has a massive ecosystem, Deno\'s modern approach is gaining traction for new projects.',
    image: 'https://picsum.photos/1200/800?random=6',
    createdAt: new Date('2024-03-15T14:00:00Z').toISOString(),
  }
];

export const getPosts = async (): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, 500);
  });
};

export const getPaginatedPosts = async ({ page, limit }: { page: number, limit: number }): Promise<{ posts: Post[], totalPages: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
      const totalPages = Math.ceil(sortedPosts.length / limit);
      resolve({ posts: paginatedPosts, totalPages });
    }, 500);
  });
};

export const getPostById = async (id: string): Promise<Post | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(posts.find((p) => p.id === id));
        }, 300);
      });
};

export const createPost = async (data: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newPost: Post = {
                ...data,
                id: (posts.length + 1).toString(),
                createdAt: new Date().toISOString(),
              };
              posts = [newPost, ...posts];
              resolve(newPost);
        }, 500);
    });
};

export const updatePost = async (id: string, data: Partial<Omit<Post, 'id' | 'createdAt'>>): Promise<Post | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let postToUpdate = posts.find((p) => p.id === id);
            if (postToUpdate) {
              postToUpdate = { ...postToUpdate, ...data };
              posts = posts.map((p) => (p.id === id ? postToUpdate! : p));
              resolve(postToUpdate);
            } else {
              resolve(undefined);
            }
        }, 500);
    });
};

export const deletePost = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            posts = posts.filter((p) => p.id !== id);
            resolve();
        }, 500);
    });
};
