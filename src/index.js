import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { BasketProvider } from "./BasketProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BasketProvider>

    
      <BrowserRouter>
        <div className="dark-theme"> {/* Added a CSS class for dark theme */}
          <App />
        </div>
      </BrowserRouter>
    
    
      
    </BasketProvider>
  </React.StrictMode>
);


