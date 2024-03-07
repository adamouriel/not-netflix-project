import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout from './layout.jsx'
import Movies from './components/movies.jsx'
import TV from './components/tvshows.jsx'
// import Home from './components/landing.jsx'
import App from './App.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<App />}/>
      <Route path='tv-shows' element={<TV />}/>
      <Route path='movies' element={<Movies />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
