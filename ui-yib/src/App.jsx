import { useState } from 'react'
import './App.css'
import { AuthProvider } from "./components/AuthContext";
import {ToolBar} from './components/index'
import Footer from './components/Footer'

function App() {

  return (
      <AuthProvider>
          <ToolBar />
              <Footer />
    </AuthProvider>
  )
}

export default App
