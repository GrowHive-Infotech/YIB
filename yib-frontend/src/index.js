import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
// import HomePage from './components/HomePage';
import Homee from './components/Home/Homee';
import About from './components/About/About'
import ResumePreview from './ResumeBuilder/ResumePreview';
import MultiStepForm from './ResumeBuilder/MultiStepForm';
import { BlogTopicsPage,BlogsTopicWiseSection } from './components/Home/Blogs';
import { store } from './store/store';
import { Provider } from 'react-redux';
import AllJobsPage from './components/Home/Jobs/AllJobsPage';


const router=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}> 
  <Route path="" element={<Homee />} />
  <Route path="about" element={<About />}/>
  <Route path='blogs' element={<BlogTopicsPage/>}/>
  <Route path='blogs/:topic' element={<BlogsTopicWiseSection/>}/>
  <Route path='jobs/:category' element={<AllJobsPage/>}/>
  <Route path="/resume-preview" element={<ResumePreview />} />
  <Route path="/resume" element={<MultiStepForm />} /> 
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
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
