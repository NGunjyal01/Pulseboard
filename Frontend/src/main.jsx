import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './new.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboards from './pages/Dashboards'
import { Toaster } from 'sonner'

// 🟢 Apply theme + mode before app renders
const themeData = localStorage.getItem('pulseboard-theme');
if (themeData) {
  try {
    const { state } = JSON.parse(themeData);
    const root = document.documentElement;

    const allThemes = [ 'default', 'red', 'rose', 'orange', 'yellow', 'green', 'blue' ];

    root.classList.remove(
      ...allThemes.map(t => `theme-${t}`),
      ...allThemes.map(t => `theme-${t}-dark`),
      'dark'
    );

    root.classList.add(`theme-${state.theme}`);
    if (state.mode === 'dark') {
      root.classList.add('dark', `theme-${state.theme}-dark`);
    }
  } catch (e) {
    console.error('Invalid theme data in localStorage');
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboards' element={<Dashboards/>}/>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  </StrictMode>,
);
