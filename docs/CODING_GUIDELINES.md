## General Coding Guidelines

1. Limit each file to 200-250 lines of code. If it gets more than that, extract code to other files.

## React Components

1. For React components, use **PascalCase** - `SampleComponent.tsx`. Default export inside the file component should match the file name.
2. If the component is too big and needs to be broken down to several files, use the following:
   a. Create a folder `/SampleComponent` create `index.tsx` file under it. inside `index.tsx`, do `export default SampleComponent`
3. For type `Props`, Create proper types for each component/page. Do not use `any` type unless absolutely necessary.

### General Scripts / Utilities

For general scripts / utils, use **kebab-case** - `client-only.tsx`

## File Location

1. React Components should be placed in `/components` folder. Folders under `/components` should be a feature or a page such as header, articles, etc.
2. Pages/Routes are under /pages folder following the Next.js convention.
   a. If a page needs to be broken down, into several pieces of code, you may create components for it in `/components/{page}/`
3. Common types can be placed under `src/types`
