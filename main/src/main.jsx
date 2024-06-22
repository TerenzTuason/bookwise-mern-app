import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BooksContextProvider } from './contexts/BookContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* wrap the app to the context provider */}
    <BooksContextProvider>
      <App />
    </BooksContextProvider>
  </React.StrictMode>,
)
