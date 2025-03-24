import { useState } from 'react'
import './App.css'
import { AuthProvider } from "./components/AuthContext";
import ToolBar from './components/ToolBar'
import Footer from './components/Footer'

function App() {

  return (
      <AuthProvider>
          <ToolBar />
              <Footer />
\    </AuthProvider>
  )
}

export default App
