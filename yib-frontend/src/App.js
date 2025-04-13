import { Provider } from 'react-redux';
import './App.css';
import { AuthProvider } from "./components/AuthContext";
// import ToolBar from './components/ToolBar'
import Footer from './components/Footer'
// import Homee from './components/Home/Homee';
import Navbar from './components/Header/Navbar';
import { Outlet } from 'react-router-dom';
import { store } from './store/store';
function App() {
  return (
    <Provider store={store}>
    <AuthProvider>
      <Navbar/>
      <Outlet/>
      <Footer />
</AuthProvider>
</Provider>
  );
}

export default App;
