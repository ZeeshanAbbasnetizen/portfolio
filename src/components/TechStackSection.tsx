import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import {
  Code2,
  Layers,
  Server,
  Database,
  Wrench,
  Sparkles,
  Terminal,
} from 'lucide-react';

export type TechCategory = 'all' | 'languages' | 'frontend' | 'backend' | 'databases' | 'tools';

export interface TechItem {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'databases' | 'tools';
  categoryLabel: string;
  tagline: string;
  color: string;
  bgGlow: string;
  borderHover: string;
  badge?: string;
  icon: React.ReactNode;
}

// Crisp Vector SVGs for all Tech Logos
const TechIcons = {
  JavaScript: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M6.5 18.5c.8.6 1.8.9 2.7.9 1.6 0 2.5-.8 2.5-2.2v-7h-2.1v7c0 .5-.3.8-.8.8-.4 0-.8-.2-1.1-.4l-1.2.9zm8.1.1c1.2.6 2.5.9 3.8.9 2.5 0 3.9-1.2 3.9-3.1 0-1.7-1.1-2.6-2.9-3.3l-.8-.3c-1.1-.4-1.6-.8-1.6-1.4 0-.6.5-1.1 1.4-1.1.9 0 1.7.3 2.3.7l1-.9c-.9-.7-2-1-3.3-1-2.3 0-3.6 1.3-3.6 2.9 0 1.6 1 2.5 2.7 3.2l.8.3c1.2.5 1.8.9 1.8 1.6 0 .8-.7 1.3-1.8 1.3-1.1 0-2.2-.4-3-1l-.5.8z"
        fill="#000"
      />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M13.2 9.5H7.5v2.2h1.7v7.5h2.3v-7.5h1.7V9.5zm4.2 4.8c-.8-.4-1.5-.7-1.5-1.2 0-.4.4-.7 1-.7.7 0 1.3.3 1.8.6l1.1-1.6c-.8-.6-1.8-.9-2.9-.9-2 0-3.3 1.2-3.3 2.7 0 1.4.9 2.2 2.3 2.8.9.4 1.4.7 1.4 1.2 0 .5-.5.8-1.2.8-.8 0-1.7-.4-2.4-1l-1.1 1.6c1 .9 2.2 1.3 3.5 1.3 2.2 0 3.6-1.2 3.6-2.9 0-1.5-1-2.3-2.2-2.7z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  HTML5: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <path d="M4 3l1.6 16.2 6.4 1.8 6.4-1.8L20 3H4z" fill="#E34F26" />
      <path d="M12 4.7v14.7l4.9-1.4 1.3-13.3H12z" fill="#EF652A" />
      <path
        d="M7.7 7.4h8.6l-.2 2.3H12v2.4h3.9l-.4 4.5-3.5 1v-2.3l1.8-.5.2-1.9H7.7V7.4zm0 4.7h2.2l.2 2.4 1.9.5v2.3l-3.5-1-.8-4.2z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  CSS3: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <path d="M4 3l1.6 16.2 6.4 1.8 6.4-1.8L20 3H4z" fill="#1572B6" />
      <path d="M12 4.7v14.7l4.9-1.4 1.3-13.3H12z" fill="#33A9DC" />
      <path
        d="M12 7.4h4.3l-.2 2.3H12v2.4h3.9l-.4 4.5-3.5 1v-2.3l1.8-.5.2-1.9H8.1l-.2-2.3h4.1V7.4zm-4.3 0H12v2.3H9.9l.2 2.4H12v2.4H8.4l-.7-7.1z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <circle cx="12" cy="12" r="2.3" fill="#61DAFB" />
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="3.8"
        stroke="#61DAFB"
        strokeWidth="1.4"
        transform="rotate(0 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="3.8"
        stroke="#61DAFB"
        strokeWidth="1.4"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="3.8"
        stroke="#61DAFB"
        strokeWidth="1.4"
        transform="rotate(120 12 12)"
      />
    </svg>
  ),
  Nextjs: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <circle cx="12" cy="12" r="10" fill="#000000" stroke="#333333" strokeWidth="1.2" />
      <path d="M7.5 7.5v9h2V11.2l6.2 5.3h1.8V7.5h-2v5.3L9.3 7.5H7.5z" fill="#FFFFFF" />
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <path
        d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2.1-1.3 3.3-1.1 1 .2 1.8 1 2.6 1.9 1.3 1.5 2.9 3.1 6.6 3.1 2.4 0 3.9-1.2 4.5-3.6-1 .9-2.1 1.3-3.3 1.1-1-.2-1.8-1-2.6-1.9-1.3-1.4-2.9-3.1-6.6-3.1zm-8 6c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2.1-1.3 3.3-1.1 1 .2 1.8 1 2.6 1.9 1.3 1.5 2.9 3.1 6.6 3.1 2.4 0 3.9-1.2 4.5-3.6-1 .9-2.1 1.3-3.3 1.1-1-.2-1.8-1-2.6-1.9-1.3-1.4-2.9-3.1-6.6-3.1z"
        fill="#06B6D4"
      />
    </svg>
  ),
  Bootstrap: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <rect width="24" height="24" rx="5" fill="#7952B3" />
      <path
        d="M7.8 6.5h4.6c1.8 0 3.1.9 3.1 2.4 0 1-.6 1.8-1.6 2.1 1.3.3 2 1.2 2 2.5 0 1.8-1.4 2.8-3.4 2.8H7.8V6.5zm2.4 3.7h2c.8 0 1.3-.4 1.3-1s-.5-1-1.3-1h-2v2zm0 4.1h2.2c.9 0 1.5-.4 1.5-1.1s-.6-1.1-1.5-1.1h-2.2v2.2z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  Nodejs: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <path
        d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2z"
        fill="#333333"
        stroke="#5FA04E"
        strokeWidth="1.2"
      />
      <path
        d="M12 4.5l6.5 3.8v7.4L12 19.5 5.5 15.7V8.3L12 4.5z"
        fill="#5FA04E"
        opacity="0.25"
      />
      <path
        d="M11.2 8.5v3.2c0 .8.5 1.3 1.3 1.3.8 0 1.3-.5 1.3-1.3V8.5h1.8v3.2c0 1.8-1.3 3-3.1 3-1.8 0-3.1-1.2-3.1-3V8.5h1.8z"
        fill="#5FA04E"
      />
    </svg>
  ),
  Express: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <circle cx="12" cy="12" r="10" fill="#1C1C1C" stroke="#FFFFFF" strokeWidth="1.2" />
      <text
        x="12"
        y="15"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="8"
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        EX
      </text>
    </svg>
  ),
  RestApi: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="3"
        fill="#181818"
        stroke="#FF6C37"
        strokeWidth="1.4"
      />
      <path
        d="M7 12h10M14 9l3 3-3 3M7 8h2M7 16h4"
        stroke="#FF6C37"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <path
        d="M12 2C11.5 2.5 6 9.2 6 13.8c0 4.1 3 7.4 6 8.2 3-.8 6-4.1 6-8.2C18 9.2 12.5 2.5 12 2z"
        fill="#47A248"
      />
      <path
        d="M12 2v20c.5-.1 1.2-.4 1.8-.8 2.6-1.7 4.2-4.5 4.2-7.4 0-4.6-5.5-11.3-6-11.8z"
        fill="#499D4A"
      />
      <path d="M12 22.5c-.2 0-.4-.5-.4-1.2V3.5c.2.3.4.7.4 1.1v17.9z" fill="#FFF" opacity="0.4" />
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <circle cx="12" cy="12" r="10" fill="#336791" opacity="0.15" />
      <path
        d="M12 3.5c-4.4 0-8 3.6-8 8 0 2.8 1.4 5.3 3.6 6.7.4-1.2.9-2.6 1.1-3.6-.8-.4-1.4-1.2-1.4-2.1 0-1.4 1.1-2.5 2.5-2.5h1.2V8.8c0-.6.4-1.1 1-1.1h1.8c.6 0 1 .5 1 1.1v1.2h1.2c1.4 0 2.5 1.1 2.5 2.5 0 .9-.5 1.7-1.3 2.1.2 1 .7 2.4 1.1 3.6 2.2-1.4 3.6-3.9 3.6-6.7.1-4.4-3.5-8-7.9-8z"
        fill="#4169E1"
      />
      <path
        d="M10.8 14.5c-.2.9-.6 2.2-1 3.3 1.3.5 2.7.5 4.1 0-.4-1.1-.8-2.4-1-3.3-.7.2-1.4.2-2.1 0z"
        fill="#64B5F6"
      />
    </svg>
  ),
  SQL: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <ellipse cx="12" cy="6" rx="8" ry="3" fill="#00758F" opacity="0.8" />
      <path
        d="M4 6v5c0 1.66 3.58 3 8 3s8-1.34 8-3V6"
        stroke="#00758F"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M4 11v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5"
        stroke="#00A2C7"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M4 16v2c0 1.66 3.58 3 8 3s8-1.34 8-3v-2"
        stroke="#00D0FF"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <path
        d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L9 4.4l2.7 2.7c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l2.6 2.6c.6-.2 1.3-.1 1.8.4.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.5-.5-.6-1.3-.4-1.8l-2.4-2.4v5.3c.2.1.4.3.5.5.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.8-.8-.8-2 0-2.8.2-.2.4-.4.6-.5V9.4c-.2-.1-.4-.3-.6-.5-.5-.5-.6-1.3-.4-1.8L8 4.4 2.4 10c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.7-.6.7-1.6.1-2.2z"
        fill="#F05032"
      />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  VSCode: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <path
        d="M17.5 2.5l-9.8 8.8L4.2 8.5 2 9.8l4 3.8-4 3.8 2.2 1.3 3.5-2.8 9.8 8.8 4.5-2.2V4.7l-4.5-2.2z"
        fill="#007ACC"
      />
      <path d="M17.5 7.5L9.8 13.5l7.7 6.1V7.5z" fill="#1F9CF0" />
      <path d="M17.5 2.5v19l4.5-2.2V4.7l-4.5-2.2z" fill="#0066B8" opacity="0.7" />
    </svg>
  ),
  Postman: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <circle cx="12" cy="12" r="10" fill="#FF6C37" />
      <path
        d="M16.5 11.5l-3.2-2.1c-.4-.3-.9-.2-1.2.2l-1.6 2-1.8-1.2c-.3-.2-.7-.1-.9.2l-1.3 1.9c-.2.3-.1.7.2.9l6.5 4.3c.3.2.7.1.9-.2l3-4.2c.2-.3.1-.7-.2-.9z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <circle cx="12" cy="12" r="10" fill="#000000" stroke="#444444" strokeWidth="1.2" />
      <path d="M12 6l6 10.5H6L12 6z" fill="#FFFFFF" />
    </svg>
  ),
};

const techStackData: TechItem[] = [
  // Languages
  {
    name: 'JavaScript',
    category: 'languages',
    categoryLabel: 'Languages',
    tagline: 'ES6+, Async, Modern Engine',
    color: '#F7DF1E',
    bgGlow: 'rgba(247, 223, 30, 0.12)',
    borderHover: 'rgba(247, 223, 30, 0.4)',
    badge: 'Core',
    icon: TechIcons.JavaScript,
  },
  {
    name: 'TypeScript',
    category: 'languages',
    categoryLabel: 'Languages',
    tagline: 'Strict Typing & Scalability',
    color: '#3178C6',
    bgGlow: 'rgba(49, 120, 198, 0.14)',
    borderHover: 'rgba(49, 120, 198, 0.45)',
    badge: 'Type-Safe',
    icon: TechIcons.TypeScript,
  },
  {
    name: 'HTML5',
    category: 'languages',
    categoryLabel: 'Languages',
    tagline: 'Semantic Markup & SEO',
    color: '#E34F26',
    bgGlow: 'rgba(227, 79, 38, 0.12)',
    borderHover: 'rgba(227, 79, 38, 0.4)',
    icon: TechIcons.HTML5,
  },
  {
    name: 'CSS3',
    category: 'languages',
    categoryLabel: 'Languages',
    tagline: 'Modern Layouts & Animations',
    color: '#1572B6',
    bgGlow: 'rgba(21, 114, 182, 0.12)',
    borderHover: 'rgba(21, 114, 182, 0.4)',
    icon: TechIcons.CSS3,
  },

  // Frontend
  {
    name: 'React.js',
    category: 'frontend',
    categoryLabel: 'Frontend',
    tagline: 'Component Architecture & Hooks',
    color: '#61DAFB',
    bgGlow: 'rgba(97, 218, 251, 0.14)',
    borderHover: 'rgba(97, 218, 251, 0.5)',
    badge: 'Primary',
    icon: TechIcons.React,
  },
  {
    name: 'Next.js',
    category: 'frontend',
    categoryLabel: 'Frontend',
    tagline: 'SSR, App Router & Performance',
    color: '#FFFFFF',
    bgGlow: 'rgba(255, 255, 255, 0.12)',
    borderHover: 'rgba(255, 255, 255, 0.45)',
    badge: 'Fullstack',
    icon: TechIcons.Nextjs,
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Frontend',
    tagline: 'Utility-First Design Systems',
    color: '#06B6D4',
    bgGlow: 'rgba(6, 182, 212, 0.14)',
    borderHover: 'rgba(6, 182, 212, 0.45)',
    icon: TechIcons.Tailwind,
  },
  {
    name: 'Bootstrap',
    category: 'frontend',
    categoryLabel: 'Frontend',
    tagline: 'Responsive UI & Flex Grid',
    color: '#7952B3',
    bgGlow: 'rgba(121, 82, 179, 0.14)',
    borderHover: 'rgba(121, 82, 179, 0.45)',
    icon: TechIcons.Bootstrap,
  },

  // Backend
  {
    name: 'Node.js',
    category: 'backend',
    categoryLabel: 'Backend',
    tagline: 'Event-Driven Runtime & Microservices',
    color: '#5FA04E',
    bgGlow: 'rgba(95, 160, 78, 0.14)',
    borderHover: 'rgba(95, 160, 78, 0.45)',
    badge: 'Runtime',
    icon: TechIcons.Nodejs,
  },
  {
    name: 'Express.js',
    category: 'backend',
    categoryLabel: 'Backend',
    tagline: 'High-Speed Web Framework & Middleware',
    color: '#E0E0E0',
    bgGlow: 'rgba(224, 224, 224, 0.12)',
    borderHover: 'rgba(224, 224, 224, 0.4)',
    icon: TechIcons.Express,
  },
  {
    name: 'RESTful APIs',
    category: 'backend',
    categoryLabel: 'Backend',
    tagline: 'Scalable Endpoints & Clean Architecture',
    color: '#FF6C37',
    bgGlow: 'rgba(255, 108, 55, 0.14)',
    borderHover: 'rgba(255, 108, 55, 0.45)',
    badge: 'Standard',
    icon: TechIcons.RestApi,
  },

  // Databases
  {
    name: 'MongoDB',
    category: 'databases',
    categoryLabel: 'Databases',
    tagline: 'NoSQL, Flexible Schemas & Aggregation',
    color: '#47A248',
    bgGlow: 'rgba(71, 162, 72, 0.14)',
    borderHover: 'rgba(71, 162, 72, 0.45)',
    badge: 'NoSQL',
    icon: TechIcons.MongoDB,
  },
  {
    name: 'PostgreSQL',
    category: 'databases',
    categoryLabel: 'Databases',
    tagline: 'Relational, ACID & Robust Indexing',
    color: '#4169E1',
    bgGlow: 'rgba(65, 105, 225, 0.14)',
    borderHover: 'rgba(65, 105, 225, 0.45)',
    badge: 'SQL',
    icon: TechIcons.PostgreSQL,
  },
  {
    name: 'SQL',
    category: 'databases',
    categoryLabel: 'Databases',
    tagline: 'Relational Queries, Joins & Optimization',
    color: '#00A2C7',
    bgGlow: 'rgba(0, 162, 199, 0.14)',
    borderHover: 'rgba(0, 162, 199, 0.45)',
    icon: TechIcons.SQL,
  },

  // Tools & Platforms
  {
    name: 'Git',
    category: 'tools',
    categoryLabel: 'Tools & Platforms',
    tagline: 'Branching, Version Control & Commits',
    color: '#F05032',
    bgGlow: 'rgba(240, 80, 50, 0.14)',
    borderHover: 'rgba(240, 80, 50, 0.45)',
    icon: TechIcons.Git,
  },
  {
    name: 'GitHub',
    category: 'tools',
    categoryLabel: 'Tools & Platforms',
    tagline: 'CI/CD, Workflows & Collaboration',
    color: '#FFFFFF',
    bgGlow: 'rgba(255, 255, 255, 0.12)',
    borderHover: 'rgba(255, 255, 255, 0.45)',
    icon: TechIcons.GitHub,
  },
  {
    name: 'VS Code',
    category: 'tools',
    categoryLabel: 'Tools & Platforms',
    tagline: 'Optimized Dev Environment & Debugging',
    color: '#007ACC',
    bgGlow: 'rgba(0, 122, 204, 0.14)',
    borderHover: 'rgba(0, 122, 204, 0.45)',
    icon: TechIcons.VSCode,
  },
  {
    name: 'Postman',
    category: 'tools',
    categoryLabel: 'Tools & Platforms',
    tagline: 'API Testing, Collections & Mock Servers',
    color: '#FF6C37',
    bgGlow: 'rgba(255, 108, 55, 0.14)',
    borderHover: 'rgba(255, 108, 55, 0.45)',
    icon: TechIcons.Postman,
  },
  {
    name: 'Vercel',
    category: 'tools',
    categoryLabel: 'Tools & Platforms',
    tagline: 'Continuous Deployment & Global Edge',
    color: '#FFFFFF',
    bgGlow: 'rgba(255, 255, 255, 0.12)',
    borderHover: 'rgba(255, 255, 255, 0.45)',
    badge: 'Cloud',
    icon: TechIcons.Vercel,
  },
];

const categoryTabs = [
  { id: 'all' as TechCategory, label: 'All Stack', icon: Layers, count: 18 },
  { id: 'languages' as TechCategory, label: 'Languages', icon: Code2, count: 4 },
  { id: 'frontend' as TechCategory, label: 'Frontend', icon: Sparkles, count: 4 },
  { id: 'backend' as TechCategory, label: 'Backend', icon: Server, count: 3 },
  { id: 'databases' as TechCategory, label: 'Databases', icon: Database, count: 3 },
  { id: 'tools' as TechCategory, label: 'Tools', icon: Wrench, count: 5 },
];

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TechCategory>('all');

  const filteredTech =
    activeCategory === 'all'
      ? techStackData
      : techStackData.filter((item) => item.category === activeCategory);

  return (
    <section
      id="stack"
      className="relative min-h-screen w-full bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient background glow elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] sm:w-[600px] h-[300px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center">
        {/* Section Pill Badge */}
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs uppercase tracking-widest text-[#B600A8] font-bold mb-6 shadow-inner">
            <Terminal size={14} className="text-[#B600A8]" />
            <span>Core Capabilities &amp; Architecture</span>
          </div>
        </FadeIn>

        {/* Section Heading */}
        <FadeIn delay={0.1} y={30}>
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.8rem,10vw,140px)] leading-none tracking-tight mb-4 sm:mb-6 select-none">
            Tech Stack
          </h2>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.2} y={20}>
          <p className="font-light text-center max-w-2xl text-[clamp(0.95rem,1.8vw,1.25rem)] text-[#9FA8B0] mb-12 sm:mb-16 leading-relaxed">
            Modern, type-safe, and production-tested technologies I utilize to engineer fast user
            interfaces, scalable backend services, and reliable databases.
          </p>
        </FadeIn>

        {/* Infinite Tech Marquee Strip for Visual Energy */}
        <FadeIn delay={0.25} y={20} className="w-full mb-12 sm:mb-16">
          <div className="w-full overflow-hidden relative py-3 border-y border-neutral-800/80 bg-neutral-950/60 rounded-2xl backdrop-blur-sm">
            {/* Gradient Masks */}
            <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10 pointer-events-none" />

            <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
              {[...techStackData, ...techStackData].map((tech, idx) => (
                <div
                  key={`${tech.name}-marquee-${idx}`}
                  className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs font-semibold tracking-wide text-cream/90 hover:border-neutral-600 transition-colors"
                >
                  <div className="w-4 h-4 flex items-center justify-center scale-90">
                    {tech.icon}
                  </div>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Category Filter Tabs */}
        <FadeIn delay={0.3} y={20} className="w-full mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 bg-[#141414]/90 backdrop-blur-md rounded-2xl sm:rounded-full border border-neutral-800 max-w-3xl mx-auto shadow-2xl">
            {categoryTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'text-white'
                      : 'text-[#9FA8B0] hover:text-cream hover:bg-neutral-800/40'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-xl sm:rounded-full bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00] shadow-[0_0_20px_rgba(182,0,168,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <TabIcon size={15} />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Tech Grid Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 w-full"
          >
            {filteredTech.map((tech, index) => (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.22,
                  delay: Math.min(index * 0.02, 0.18),
                  ease: 'easeOut',
                }}
                whileHover={{ y: -5, transition: { duration: 0.15 } }}
                key={tech.name}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-[24px] bg-[#141414] border border-neutral-800/80 hover:border-neutral-600 transition-colors duration-200 overflow-hidden shadow-xl"
                style={{
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                }}
              >
                {/* Dynamic Brand Hover Glow */}
                <div
                  className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: tech.color }}
                />

                {/* Subtle top card border highlight on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${tech.color}, transparent)`,
                  }}
                />

                {/* Card Top: Logo & Category Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 group-hover:border-neutral-700 transition-colors shadow-inner flex items-center justify-center shrink-0">
                    {tech.icon}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 bg-neutral-900/90 px-2 py-0.5 rounded-md border border-neutral-800">
                      {tech.categoryLabel}
                    </span>
                    {tech.badge && (
                      <span
                        className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${tech.color}22`,
                          color: tech.color,
                          border: `1px solid ${tech.color}44`,
                        }}
                      >
                        {tech.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Bottom: Tech Name & Description */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-cream group-hover:text-white transition-colors flex items-center gap-1.5">
                    {tech.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-[#9FA8B0] mt-1 leading-relaxed line-clamp-2">
                    {tech.tagline}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechStackSection;
