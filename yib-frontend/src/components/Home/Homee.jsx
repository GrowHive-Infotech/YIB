import React from 'react'
import {BlogsComponent, Hero,NewFeature,JobComponent} from './index'

import { ToastContainer } from 'react-toastify';

export default function Homee() {
  return (
    <div className="z-1 relative min-h-screen w-screen "> 
    <ToastContainer autoClose={2000}  pauseOnHover={false}
    />
    <Hero />
    <NewFeature/>
    <BlogsComponent/>
    <JobComponent/>
    
  </div>
  )
}
