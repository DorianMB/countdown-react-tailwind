# countdown-react-tailwind

A customizable countdown component for React, styled with Tailwind CSS.

## Features
- Easy to use React component
- Fully customizable via props
- Styled with Tailwind CSS
- Lightweight and fast

## Installation

```bash
npm install countdown-react-tailwind
```

or

```bash
yarn add countdown-react-tailwind
```

## Usage

```tsx
import Countdown from 'countdown-react-tailwind';

function App() {
  return (
    <Countdown targetDate={new Date('2025-12-31T23:59:59')} />
  );
}
```

## Props

| Prop              | Type           | Default   | Description                                              |
|-------------------|----------------|-----------|----------------------------------------------------------|
| targetDate        | string \| Date | —         | The target date/time for the countdown (ISO or Date JS)  |
| countdownColor    | string         | #000      | (Optional) Background color for fragments                |
| textColor         | string         | #fff      | (Optional) Text color                                    |
| className         | string         | ""        | (Optional) Custom classes for the main container         |
| fragmentClassName | string         | ""        | (Optional) Custom classes for each fragment (square)     |

### Example with custom colors

```tsx
<Countdown
  targetDate={"2025-12-31T23:59:59"}
  countdownColor="#1e293b"
  textColor="#fbbf24"
  className="my-8 justify-center"
  fragmentClassName="shadow-lg"
/>
```

## Styling

This component uses Tailwind CSS for styling. Make sure Tailwind is set up in your project.

## Development

- Clone the repo
- Run `npm install`
- Run `npm run dev` to start the example app

## Publishing

- Update the version in `package.json`
- Update `CHANGELOG.md`
- Run `npm publish`

## License

MIT

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
