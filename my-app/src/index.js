import React from 'react';
import App from './App';
import './index.css';
import ReactDOM  from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import {FontSizeProvider } from './FontSizeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <FontSizeProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </FontSizeProvider>
    </React.StrictMode>
);