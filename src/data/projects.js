export const projects = [
  {
    id: 1,
    slug: "chat-dashboard",
    title: "Chat Dashboard",
    tags: ["UX/UI", "Product Design"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoAYq-NuTr7NxQ2uHOMrQx-EiaTv3VTDSVPeLUh_KGXxF7QctTi-Zkv-uPX0TVQOjRmc0eYBPZrejCl7v_02IkuviAbmbIem6RhpsufSJtbY_ZfhTng4l8fPos3aQxwO3N5JBqYCaCGyLWyfzVTO1aHiJpDJNxQMj_e3hDYwRY5zwJHRihqgscoy4c1UBQ9hEot0RCkA30yJC8vxCk5M9J_YtEz9rjAZvVPSDYI7Y8ZjxSIpqYqvDudePX0m9O8Z6h9FM6lea9FQo",
    category: "Web App",
    fullDescription: "A comprehensive real-time communication platform built for modern teams. Focused on minimal latency and intuitive message organization.",
    challenge: "Developing a real-time messaging system that remains responsive under heavy load while maintaining a clean, distraction-free interface.",
    solution: "Implemented WebSocket integration with a redundant backend architecture and a highly optimized React frontend using specialized state management.",
    tools: ["React", "Socket.io", "Tailwind CSS", "Node.js"]
  },
  {
    id: 2,
    slug: "todo-list-dashboard",
    title: "To-Do List Dashboard",
    tags: ["Web", "Product Design"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz2u_R8B-LehAcejS4CDYRnrah48mSr1Rv0djsorAkkchGws6rsTgPRV5Gaz8_uqWhpX7RlIsnyqyf0ioD94M5Mhjn-PLF-ST3izVtFrme5bt8ZU37Ulty_kjPcQt6osIpiijR8f75EM0MT-eKjrbF-2HkF_gF5XvrG_v4jvbhZXUJV1oJ_0x9QTLoFWtATXkWb4Yr2fbqEdfdMYwPbiMSH2PggOuot5TQVFbUy6vSANxcihuM6kE8XUovmkbsnj87ay9cHRUJrpU",
    category: "Productivity",
    fullDescription: "A productivity powerhouse that helps users stay organized with smart task prioritization and collaborative features.",
    challenge: "Creating a task management system that balances power-user features with a low barrier to entry for casual users.",
    solution: "Designed a modular dashboard where users can customize their workflow, integrated with drag-and-drop functionality and smart deadline notifications.",
    tools: ["Next.js", "MongoDB", "Framer Motion", "TypeScript"]
  },
  {
    id: 3,
    slug: "nft-marketplace-dashboard",
    title: "NFT Marketplace Dashboard",
    tags: ["Mobile", "Product Design"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2NUDr-3D6YemCC3j1HUM6mmx0VgGEzX3eTX-738kNrnmG9ys0lxMFNpmv3pBP8c0-KmaPcs8QbWEjEyRsWCTwQO_ahk42Iv5Tlbs-iNzDsRMeJN_MN8pH04WvgPT5l-alPFMKvawGdyZ73ooEJt50YJGL9Sy_gtsaI6wk2nBCagmHYrBpkvv-7tBbw_YkscB5Db1Sa_wiBDxNLk6r9L2-1dzBIGAS0_xCymxvjcFDS2zKMAvhBoWSRSTLRO4qIABFgB2IFfrZJt4",
    category: "E-commerce",
    fullDescription: "A cutting-edge platform for buying, selling, and managing digital assets on the blockchain.",
    challenge: "Handling complex blockchain transactions while providing a smooth, high-end visual experience that builds user trust.",
    solution: "Used Ethers.js for secure wallet integration and custom WebGL shaders for premium visual effects, ensuring the UI felt as valuable as the assets being traded.",
    tools: ["Ethereum", "React", "Three.js", "Solidity"]
  },
  {
    id: 4,
    slug: "ecotrack-mobile-app",
    title: "EcoTrack Mobile App",
    tags: ["Mobile", "Sustainability"],
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    category: "Mobile",
    fullDescription: "An application designed to help individuals track and reduce their carbon footprint through daily habits and challenges.",
    challenge: "Gamifying sustainability data to keep users engaged without overwhelming them with negative environmental statistics.",
    solution: "Developed a reward-based system with interactive charts and social sharing features that celebrate positive environmental impact.",
    tools: ["React Native", "Firebase", "Victory Charts", "Expo"]
  },
  {
    id: 5,
    slug: "crypto-portfolio-tracker",
    title: "Crypto Portfolio Tracker",
    tags: ["Web", "Fintech"],
    img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800",
    category: "Finance",
    fullDescription: "Real-time analytics and tracking for cryptocurrency portfolios across multiple exchanges and wallets.",
    challenge: "Integrating with multiple diverse APIs to provide a unified, real-time view of asset performance and history.",
    solution: "Built a robust Node.js backend using Redis for caching and a high-frequency polling system to ensure data accuracy with minimal latency.",
    tools: ["Node.js", "Redis", "Chart.js", "Exchange APIs"]
  },
  {
    id: 6,
    slug: "interior-design-showcase",
    title: "Interior Design Showcase",
    tags: ["UX/UI", "Web"],
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
    category: "Design",
    fullDescription: "A high-end visual portfolio for an interior design studio, focusing on immersive imagery and storytelling.",
    challenge: "Delivering a large number of high-resolution images without compromising page load speeds or user experience.",
    solution: "Leveraged Next.js Image optimization and custom lazy-loading sequences to create a gallery that feels instant and fluid.",
    tools: ["Next.js", "GSAP", "Sanity CMS", "Framer Motion"]
  }
];
