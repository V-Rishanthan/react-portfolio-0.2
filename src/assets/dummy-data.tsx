import { DatabaseIcon, SmartphoneIcon, LayoutIcon, GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

export const servicesData = [
    {
        icon: <LayoutIcon className="w-6 h-6" />,
        title: 'Frontend Development',
        desc: 'Building responsive, high-performance web applications using React, Next.js, and TypeScript.'
    },
    {
        icon: <DatabaseIcon className="w-6 h-6" />,
        title: 'Backend Architecture',
        desc: 'Designing scalable APIs and database schemas with Node.js, PostgreSQL, and Redis.'
    },
    {
        icon: <SmartphoneIcon className="w-6 h-6" />,
        title: 'Mobile Solutions',
        desc: 'Crafting cross-platform mobile experiences using React Native and Expo.'
    }
];

export const projectsData = [];

export const educationData = [
    {
        company: 'ESOFT Metro Campus',
        role: 'BTEC HND in Computing (Software Engineering)',
        period: 'March 2023 – September 2025',
        description: 'Advanced studies in software development, covering data structures, algorithms, and full-stack architecture.'
    },
    {
        company: 'International Academy of Professional Studies (IAPS)',
        role: 'Web Programming Certificate',
        period: 'June 2022 – January 2023',
        description: 'Specialized training in modern web technologies and front-end development principles.'
    },
    {
        company: 'Vocational Training Authority (VTA)',
        role: 'NVQ Level 4 – Information & Communication Technology',
        period: 'July 2018 – January 2019',
        description: 'Foundational certification in ICT, focusing on hardware, networking, and software applications.'
    }
];

export const skillsData = [
    {
        category: "Languages & Core",
        skills: [
            { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
            { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
            { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
        ]
    },
    {
        category: "Frameworks & Libraries",
        skills: [
            { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
            { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
            { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
        ]
    },
    {
        category: "Backend & Database",
        skills: [
            { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
            { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
            { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
            { name: "MS SQL Server", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        ]
    },
    {
        category: "Tools & Version Control",
        skills: [
            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
            { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
            { name: "Adobe XD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg" },
        ]
    }
];

export const faqData = [
    {
        question: 'What is your primary tech stack?',
        answer: 'My core stack includes React, Next.js, TypeScript, Node.js, and PostgreSQL. I also have deep experience with Tailwind CSS and various state management libraries.'
    },
    {
        question: 'Are you available for freelance projects?',
        answer: 'Yes, I am currently open to freelance opportunities and consulting roles. Feel free to reach out via the contact form.'
    },
    {
        question: 'Do you have experience with cloud platforms?',
        answer: 'Absolutely. I have worked extensively with AWS, Vercel, and Firebase for deployment and infrastructure management.'
    },
    {
        question: 'What is your approach to clean code?',
        answer: 'I strictly follow SOLID principles and clean code practices. I believe in writing code that is not just functional, but also maintainable and easy to read.'
    }
];

export const footerLinks = [
    {
        title: "Navigation",
        links: [
            { name: "Home", url: "#home" },
            { name: "About", url: "#about" },
            { name: "Skills", url: "#skills" },
            { name: "Projects", url: "#projects" },
            { name: "Education", url: "#education" }
        ]
    },
    {
        title: "Social",
        links: [
            { name: "GitHub", url: "https://github.com/V-Rishanthan?tab=repositories", icon: <GithubIcon className="size-4" /> },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/rishanthan-v/", icon: <LinkedinIcon className="size-4" /> },
        ]
    }
];