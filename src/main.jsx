import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import recipe from './recipe.js';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={recipe}>
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
