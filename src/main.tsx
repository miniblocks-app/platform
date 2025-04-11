import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.tsx'
import { Preview } from './pages/Preview.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/preview/:screenId" element={<Preview />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)