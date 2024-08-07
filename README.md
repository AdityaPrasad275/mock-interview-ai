# React Router dom
- for routing in react
- `pnpm i react-router-dom`
- adding routes as described in tut for react-router-dom in `main.jsx`
- adding a `vite.config.js` to overcome `React not defined error` in browser

# Getting started page
- for taking resume input and job description
- form input taking pdf files

# Backend
- setting up using express
- proxy in vite.config.js to forward requests to backend
- adding multer for file upload
- in `gettingStarted.js` added text extraction from pdf
- Node doesnt support ES6 modules, so using `require` instead of `import`, commonJS modules

# Adding LLM
- Used groq model `llama-3.1-70b-versatile` with 100 rpm, amazing, tho quite slow i gotta say
- added resume summarizer using llm
- getting started is finally coming together, just need to add job descirption 
