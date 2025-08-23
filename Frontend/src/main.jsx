import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './new.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboards from './pages/Dashboards'
import { Toaster } from 'sonner'
import CreateDashboard from './pages/CreateDashboard'
import Friends from './pages/Friends'
import Teams from './pages/Teams'
import CreateTeam from './pages/CreateTeam'
import TeamDetails from './pages/TeamDetails'
import PrivateRoute from './components/PrivateRoute'
import OpenRoute from './components/OpenRoute'
import Settings from './pages/Settings'

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
        <Route index element={<Homepage/>} />
        <Route path='/login' element={<OpenRoute><Login/></OpenRoute>} />
        <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute>} />
        <Route path='/dashboards' element={<PrivateRoute><Dashboards/></PrivateRoute>}/>
        <Route path='/createDashboard' element={<PrivateRoute><CreateDashboard/></PrivateRoute>}/>
        <Route path='/friends' element={<PrivateRoute><Friends/></PrivateRoute>}/>
        <Route path='/teams' element={<PrivateRoute><Teams/></PrivateRoute>}/>
        <Route path='/createTeam' element={<PrivateRoute><CreateTeam/></PrivateRoute>}/>
        <Route path='/team/:teamId' element={<PrivateRoute><TeamDetails/></PrivateRoute>}/>
        <Route path='/settings' element={<PrivateRoute><Settings/></PrivateRoute>}/>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  </StrictMode>,
);
