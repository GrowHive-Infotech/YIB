import { Provider } from 'react-redux';
import './App.css';
import { AuthProvider } from "./components/AuthContext";
// import ToolBar from './components/ToolBar'
import Footer from './components/Footer/Footer'
// import Homee from './components/Home/Homee';
import { useSelector } from 'react-redux';
import Navbar from './components/Header/Navbar';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { store } from './store/store';
import { SignUpModal,LoginModal } from './components/Home/index';
import { useEffect } from 'react';
import InactivityTimer from './components/InactivityTimer';
function App() {
  const loginModalStatus=useSelector((state)=>state.modal.loginModal);
  const signupModalStatus=useSelector((state)=>state.modal.signupModal.status);



  useEffect(() => {
    if (loginModalStatus || signupModalStatus) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when the component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [signupModalStatus,loginModalStatus]);
  return (
   
    <div className='overflow-x-hidden'>
      <ScrollRestoration />
    <AuthProvider>
      <Navbar/>
      {signupModalStatus && 
      (<div className="z-2 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <SignUpModal />
      </div>)}
      {loginModalStatus && 
         <LoginModal />
        }
      <Outlet/>
      <Footer />
</AuthProvider>
</div>


  );
}

export default App;
