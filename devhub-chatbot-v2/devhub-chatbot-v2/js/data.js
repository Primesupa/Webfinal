// Programming Languages Data
const programmingLanguages = [
    { id: 'python', name: 'Python', icon: '🐍', color: '#3776ab' },
    { id: 'javascript', name: 'JavaScript', icon: '📜', color: '#f7df1e' },
    { id: 'java', name: 'Java', icon: '☕', color: '#007396' },
    { id: 'cpp', name: 'C++', icon: '⚙️', color: '#00599c' },
    { id: 'csharp', name: 'C#', icon: '#️⃣', color: '#239120' },
    { id: 'php', name: 'PHP', icon: '🐘', color: '#777bb4' },
    { id: 'go', name: 'Go', icon: '🏃', color: '#00add8' },
    { id: 'rust', name: 'Rust', icon: '🦀', color: '#ce422b' },
    { id: 'ruby', name: 'Ruby', icon: '💎', color: '#cc342d' },
    { id: 'swift', name: 'Swift', icon: '🦅', color: '#fa7343' },
    { id: 'kotlin', name: 'Kotlin', icon: '🅺', color: '#7f52ff' },
    { id: 'typescript', name: 'TypeScript', icon: '📘', color: '#3178c6' }
];

// Libraries Data
const libraries = [
    // Python Libraries
    {
        id: 'numpy',
        name: 'NumPy',
        language: 'python',
        icon: '🔢',
        description: 'Fundamental package for scientific computing with Python. Provides support for arrays, matrices, and high-level mathematical functions.',
        stars: 24500,
        downloads: '50M+',
        difficulty: 'intermediate',
        docs: 'https://numpy.org/doc/',
        type: 'library'
    },
    {
        id: 'pandas',
        name: 'Pandas',
        language: 'python',
        icon: '🐼',
        description: 'Powerful data manipulation and analysis library. Perfect for working with structured data and time series.',
        stars: 38000,
        downloads: '40M+',
        difficulty: 'intermediate',
        docs: 'https://pandas.pydata.org/docs/',
        type: 'library'
    },
    {
        id: 'tensorflow',
        name: 'TensorFlow',
        language: 'python',
        icon: '🧠',
        description: 'End-to-end open source platform for machine learning. Build and train ML models with ease.',
        stars: 175000,
        downloads: '25M+',
        difficulty: 'advanced',
        docs: 'https://www.tensorflow.org/learn',
        type: 'library'
    },
    {
        id: 'django',
        name: 'Django',
        language: 'python',
        icon: '🎸',
        description: 'High-level Python web framework that encourages rapid development and clean, pragmatic design.',
        stars: 70000,
        downloads: '15M+',
        difficulty: 'intermediate',
        docs: 'https://docs.djangoproject.com/',
        type: 'library'
    },
    {
        id: 'flask',
        name: 'Flask',
        language: 'python',
        icon: '🧪',
        description: 'Lightweight WSGI web application framework. Simple, flexible, and easy to get started.',
        stars: 63000,
        downloads: '20M+',
        difficulty: 'beginner',
        docs: 'https://flask.palletsprojects.com/',
        type: 'library'
    },
    {
        id: 'pytorch',
        name: 'PyTorch',
        language: 'python',
        icon: '🔥',
        description: 'Open source machine learning framework that accelerates the path from research to production.',
        stars: 67000,
        downloads: '18M+',
        difficulty: 'advanced',
        docs: 'https://pytorch.org/docs/',
        type: 'library'
    },

    // JavaScript Libraries
    {
        id: 'react',
        name: 'React',
        language: 'javascript',
        icon: '⚛️',
        description: 'JavaScript library for building user interfaces. Create interactive UIs with component-based architecture.',
        stars: 210000,
        downloads: '100M+',
        difficulty: 'intermediate',
        docs: 'https://react.dev/',
        type: 'library'
    },
    {
        id: 'vue',
        name: 'Vue.js',
        language: 'javascript',
        icon: '💚',
        description: 'Progressive JavaScript framework for building user interfaces. Approachable, versatile, and performant.',
        stars: 203000,
        downloads: '45M+',
        difficulty: 'beginner',
        docs: 'https://vuejs.org/guide/',
        type: 'library'
    },
    {
        id: 'angular',
        name: 'Angular',
        language: 'javascript',
        icon: '🅰️',
        description: 'Platform for building mobile and desktop web applications. TypeScript-based, full-featured framework.',
        stars: 88000,
        downloads: '30M+',
        difficulty: 'advanced',
        docs: 'https://angular.io/docs',
        type: 'library'
    },
    {
        id: 'nodejs',
        name: 'Node.js',
        language: 'javascript',
        icon: '🟢',
        description: 'JavaScript runtime built on Chrome\'s V8 engine. Build scalable network applications.',
        stars: 95000,
        downloads: '60M+',
        difficulty: 'intermediate',
        docs: 'https://nodejs.org/docs/',
        type: 'library'
    },
    {
        id: 'express',
        name: 'Express.js',
        language: 'javascript',
        icon: '🚂',
        description: 'Fast, unopinionated, minimalist web framework for Node.js. Perfect for building APIs.',
        stars: 61000,
        downloads: '50M+',
        difficulty: 'beginner',
        docs: 'https://expressjs.com/',
        type: 'library'
    },
    {
        id: 'nextjs',
        name: 'Next.js',
        language: 'javascript',
        icon: '▲',
        description: 'React framework for production. Hybrid static & server rendering, TypeScript support, and more.',
        stars: 108000,
        downloads: '25M+',
        difficulty: 'intermediate',
        docs: 'https://nextjs.org/docs',
        type: 'library'
    },

    // Java Libraries
    {
        id: 'spring',
        name: 'Spring Framework',
        language: 'java',
        icon: '🍃',
        description: 'Comprehensive framework for enterprise Java development. Dependency injection, web apps, and more.',
        stars: 52000,
        downloads: '15M+',
        difficulty: 'advanced',
        docs: 'https://spring.io/guides',
        type: 'library'
    },
    {
        id: 'hibernate',
        name: 'Hibernate',
        language: 'java',
        icon: '💾',
        description: 'Object-relational mapping framework for Java. Simplifies database interactions.',
        stars: 5800,
        downloads: '10M+',
        difficulty: 'intermediate',
        docs: 'https://hibernate.org/orm/documentation/',
        type: 'library'
    },
    {
        id: 'maven',
        name: 'Apache Maven',
        language: 'java',
        icon: '📦',
        description: 'Build automation and project management tool. Manages project builds, dependencies, and documentation.',
        stars: 3900,
        downloads: '20M+',
        difficulty: 'beginner',
        docs: 'https://maven.apache.org/guides/',
        type: 'library'
    },

    // C++ Libraries
    {
        id: 'boost',
        name: 'Boost',
        language: 'cpp',
        icon: '🚀',
        description: 'Collection of peer-reviewed portable C++ source libraries. Extends the functionality of C++.',
        stars: 6200,
        downloads: '8M+',
        difficulty: 'advanced',
        docs: 'https://www.boost.org/doc/',
        type: 'library'
    },
    {
        id: 'opencv',
        name: 'OpenCV',
        language: 'cpp',
        icon: '👁️',
        description: 'Open source computer vision and machine learning library. Process images and videos.',
        stars: 70000,
        downloads: '12M+',
        difficulty: 'intermediate',
        docs: 'https://docs.opencv.org/',
        type: 'library'
    },
    {
        id: 'qt',
        name: 'Qt',
        language: 'cpp',
        icon: '🖼️',
        description: 'Cross-platform application development framework. Build GUI applications with ease.',
        stars: 5400,
        downloads: '5M+',
        difficulty: 'intermediate',
        docs: 'https://doc.qt.io/',
        type: 'library'
    },

    // TypeScript Libraries
    {
        id: 'nestjs',
        name: 'NestJS',
        language: 'typescript',
        icon: '🐱',
        description: 'Progressive Node.js framework for building efficient, reliable and scalable server-side applications.',
        stars: 58000,
        downloads: '8M+',
        difficulty: 'intermediate',
        docs: 'https://docs.nestjs.com/',
        type: 'library'
    },

    // Go Libraries
    {
        id: 'gin',
        name: 'Gin',
        language: 'go',
        icon: '🍸',
        description: 'HTTP web framework written in Go. Features a martini-like API with better performance.',
        stars: 71000,
        downloads: '3M+',
        difficulty: 'beginner',
        docs: 'https://gin-gonic.com/docs/',
        type: 'library'
    },

    // Rust Libraries
    {
        id: 'tokio',
        name: 'Tokio',
        language: 'rust',
        icon: '⚡',
        description: 'Asynchronous runtime for Rust. Build reliable, asynchronous applications.',
        stars: 23000,
        downloads: '2M+',
        difficulty: 'advanced',
        docs: 'https://tokio.rs/tokio/tutorial',
        type: 'library'
    }
];

// Video Tutorials Data
const videos = [
    {
        id: 'python-basics',
        title: 'Python Programming for Beginners - Complete Course',
        language: 'python',
        thumbnail: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2RyeTJpZjllZWp3djl5anptbWttZmFha3Nzc2Fxazk0MnA4YmIxZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/coxQHKASG60HrHtvkt/giphy.gif',
        duration: '4:32:15',
        difficulty: 'beginner',
        views: '10.2M',
        rating: 4.8,
        instructor: 'Tech Academy',
        description: 'Learn Python from scratch with this comprehensive beginner course.',
        type: 'video',
        videoId: 'kqtD5dpn9C8'
    },
    {
        id: 'react-tutorial',
        title: 'React JS Full Course 2024 - Build Modern Web Apps',
        language: 'javascript',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
        duration: '6:15:30',
        difficulty: 'intermediate',
        views: '1.8M',
        rating: 4.9,
        instructor: 'Dev Pro',
        description: 'Master React and build production-ready applications.',
        type: 'video',
        videoId: 'bMknfKXIFA8'
    },
    {
        id: 'data-science-pandas',
        title: 'Data Science with Pandas - Complete Tutorial',
        language: 'python',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
        duration: '3:45:20',
        difficulty: 'intermediate',
        views: '980K',
        rating: 4.7,
        instructor: 'Data Masters',
        description: 'Learn data analysis and manipulation with Pandas library.',
        type: 'video',
        videoId: 'vmEHCJofslg'
    },
    {
        id: 'java-oop',
        title: 'Java Object-Oriented Programming - Deep Dive',
        language: 'java',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop',
        duration: '5:20:45',
        difficulty: 'intermediate',
        views: '1.2M',
        rating: 4.6,
        instructor: 'Java Masters',
        description: 'Master OOP concepts in Java with practical examples.',
        type: 'video',
        videoId: 'GoXwIVyNvX0'
    },
    {
        id: 'django-web-dev',
        title: 'Django Web Development - Build Full Stack Apps',
        language: 'python',
        thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=450&fit=crop',
        duration: '7:30:15',
        difficulty: 'advanced',
        views: '750K',
        rating: 4.8,
        instructor: 'Web Academy',
        description: 'Build complete web applications with Django framework.',
        type: 'video',
        videoId: 'rHux0gMZ3Eg'
    },
    {
        id: 'vue-crash-course',
        title: 'Vue.js 3 Crash Course - Modern Frontend Development',
        language: 'javascript',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop',
        duration: '2:15:30',
        difficulty: 'beginner',
        views: '650K',
        rating: 4.7,
        instructor: 'Frontend Pro',
        description: 'Quick introduction to Vue.js 3 and its core concepts.',
        type: 'video',
        videoId: 'VeNfHj6MhgA'
    },
    {
        id: 'cpp-game-dev',
        title: 'C++ Game Development - Create Your First Game',
        language: 'cpp',
        thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop',
        duration: '8:45:00',
        difficulty: 'advanced',
        views: '890K',
        rating: 4.9,
        instructor: 'Game Dev Academy',
        description: 'Learn game development with C++ from the ground up.',
        type: 'video',
        videoId: 'iTPEdCo0KqY'
    },
    {
        id: 'nodejs-api',
        title: 'Node.js & Express - RESTful API Development',
        language: 'javascript',
        thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=450&fit=crop',
        duration: '4:10:20',
        difficulty: 'intermediate',
        views: '1.1M',
        rating: 4.8,
        instructor: 'API Masters',
        description: 'Build professional RESTful APIs with Node.js and Express.',
        type: 'video',
        videoId: 'Oe421EPjeBE'
    },
    {
        id: 'tensorflow-ml',
        title: 'Machine Learning with TensorFlow - Practical Guide',
        language: 'python',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=450&fit=crop',
        duration: '6:00:00',
        difficulty: 'advanced',
        views: '1.3M',
        rating: 4.9,
        instructor: 'AI Academy',
        description: 'Master machine learning with TensorFlow and build AI models.',
        type: 'video',
        videoId: 'tPYj3fFJGjk'
    },
    {
        id: 'spring-boot',
        title: 'Spring Boot Microservices - Enterprise Development',
        language: 'java',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
        duration: '9:20:30',
        difficulty: 'advanced',
        views: '620K',
        rating: 4.7,
        instructor: 'Enterprise Dev',
        description: 'Build scalable microservices with Spring Boot framework.',
        type: 'video',
        videoId: 'vtPkZShrvXQ'
    },
    {
        id: 'go-concurrency',
        title: 'Go Programming - Mastering Concurrency',
        language: 'go',
        thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=450&fit=crop',
        duration: '3:30:15',
        difficulty: 'intermediate',
        views: '450K',
        rating: 4.6,
        instructor: 'Go Experts',
        description: 'Learn concurrent programming patterns in Go.',
        type: 'video',
        videoId: 'YS4e4q9oBaU'
    },
    {
        id: 'rust-systems',
        title: 'Rust Systems Programming - Memory Safety',
        language: 'rust',
        thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=450&fit=crop',
        duration: '7:15:45',
        difficulty: 'advanced',
        views: '380K',
        rating: 4.8,
        instructor: 'Systems Dev',
        description: 'Build safe and efficient systems with Rust.',
        type: 'video',
        videoId: 'ij6qQQlGKtE'
    },
     {
        id: 'react-tutorial',
        title: 'Test',
        language: 'Music Video',
        thumbnail: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXd5cDUxNm45eDMwajMwYnd1ZnN6OGFnN2F6dWYwejQ4N3d3cWgwOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QKmOsmrG5Xeqx8wHR1/giphy.gif',
        duration: '03:30',
        difficulty: 'intermediate',
        views: '1.8b',
        rating: 9.9,
        instructor: 'Dev Pro',
        description: 'La Flame ASF',
        type: 'video',
        videoId: 'NfOWwoFuWZ8'
    },
];

// Export data for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { programmingLanguages, libraries, videos };
}
