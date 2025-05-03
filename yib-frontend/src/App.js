import { Provider } from 'react-redux';
import './App.css';
import { AuthProvider } from "./components/AuthContext";
// import ToolBar from './components/ToolBar'
import Footer from './components/Footer'
// import Homee from './components/Home/Homee';
import { useSelector } from 'react-redux';
import Navbar from './components/Header/Navbar';
import { Outlet } from 'react-router-dom';
import { store } from './store/store';
import { SignUpModal,LoginModal } from './components/Home/index';
function App() {
  const loginModalStatus=useSelector((state)=>state.modal.loginModal);
  const signupModalStatus=useSelector((state)=>state.modal.signupModal.status);
  return (
    <div className=''>
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
