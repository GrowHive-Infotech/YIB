import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
// import HomePage from './components/HomePage';
import Homee from './components/Home/Homee';
import About from './components/About/About'


const router=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}> 
  <Route path="" element={<Homee />} />
  <Route path="about" element={<About />}/>
        {/* <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="tech" element={<TechnologiesPage />} />
        <Route path="technology/:techName/:view" element={<TechnologyDetails />} />
        <Route path="interview/:techName/:view" element={<TechnologyDetails />} />
        <Route path="jb" element={<JobBoard />} /> */}
  </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
