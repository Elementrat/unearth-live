## Getting Started

First, install dependencies locally: 
```bash
  yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Finally, preview the experience running locally on your machine, at  [http://localhost:3000](http://localhost:3000) 

## Technologies Used
- [React](https://reactjs.org/)
  - Provides a modern FE framework enabling composable, declaratively defined components 
- [Styled Components](https://github.com/styled-components/styled-components)
  - Enables composable, reusable, themable component styling via CSS-in-JS
- [Next.JS](https://nextjs.org/)
  - Enables simple deployment story, and high performance user experience via build-time asset generation & SSR support
- [Redux](https://redux.js.org/)
  - Enables app-wide state management, especially importantly, easy-to-reason-about transitions
- [mediaDevices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
  - Enables access to user devices (eg Microphone) via standardized & widely supported Browser API
- [Vercel](https://vercel.com/)
  - Enables Simple & scalable deployment solution w/ GH integration
- [ESLint](https://eslint.org/)
  - Provides standardized and highly validated automated linting & code formatting (This repo uses the AirBnb style-guide with a few small modifications)


## Deployed Demo
- https://unearth-live-elementrat.vercel.app/

## Future work & improvements
- Persist audio to S3 / Blob Storage 
- Renaming, Tagging, searching, filtering clips
- Development & production release environments
- Improved mobile layout 
- Expanded error handling & loading states
- Tooltips & accessibility improvements
