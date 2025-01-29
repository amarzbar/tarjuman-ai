# React + TypeScript + Vite

# Tarjum

Tarjum is the front end for an Arabic and English audio to text converter, currently built in React and to be expanded using the Google Cloud Platform. This project aims to provide a seamless experience for converting audio files into text using modern web technologies.

## Features

- **React**: A JavaScript library for building user interfaces.
- **Google Cloud Platform**: Integration with GCP services for audio processing and text conversion.
- **Vite**: Fast and modern build tool that provides an excellent development experience.
- **HMR**: Hot Module Replacement for instant feedback during development.
- **ESLint**: Linting tool to ensure code quality and consistency.

## Available Plugins

Currently, two official plugins are available for integrating React with Vite:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Uses [SWC](https://swc.rs/) for Fast Refresh.

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.
- Optionally add `...tseslint.configs.stylisticTypeChecked`.
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Start the development server with `npm run dev` or `yarn dev`.

Enjoy developing your audio to text converter with React, Vite, and Google Cloud Platform!


