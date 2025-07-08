# Architecture Decisions

This document outlines the key architectural choices made while building the Product Dashboard using Next.js 13+, Tailwind CSS, TypeScript, and React Query.

## 1. App Directory Structure (Next.js App Router)
I chose Next.js 13 App Router for its flexibility in file-based routing and layout nesting.

    - app/layout.tsx – Base layout shared across all pages (with theme provider, global styles).

    - app/page.tsx – The homepage that lists all products.

    - app/products/[id]/page.tsx – Dynamic product details page.

    - Co-located component files and styles for clarity and scalability

## 2. Styling with Tailwind CSS + Dark Mode
    - Tailwind CSS enables fast styling using utility-first classes.

    - Global styles are defined in globals.css.

    - Dark mode is implemented using next-themes, with the user's theme preference stored in localStorage.

    - Reusable color tokens are configured via CSS custom properties to easily switch between light and dark themes.

## 3. Global State: Context API for Search
    - The SearchContext provides state and methods for global product search without prop drilling.

    - It wraps the entire app in SearchProvider inside layout.tsx.

## 4. Data Fetching: React Query
    - React Query simplifies asynchronous data fetching and caching.

    - Used in components like product listing and product detail pages.

    - Automatically handles loading, error, and stale data states.

## 5. Reusable Components
    - Components are broken into small, maintainable, and reusable pieces:

    - Navbar – Responsive with search and theme toggle.

    - ProductCard – Used in both homepage and related section.

    - ProductDetailsPage – Uses a layout with image, description, and related products.

    - ThemeToggle – Handles switching between dark and light modes.

## 6. Accessibility & UX
    - Theme toggle button has aria-label for accessibility.

    - Keyboard navigation is considered.

    - Responsive design ensures usability on mobile and tablets.

## 7. Developer Experience
    - Code is written in TypeScript for type safety.

    - ESLint and Prettier can be added for consistent formatting.

    - Folder names and file paths follow a clean convention (camelCase, clear grouping).    