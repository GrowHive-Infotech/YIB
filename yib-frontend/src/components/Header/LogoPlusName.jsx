import React from 'react'
import Logo from '../../assets/clipart84414.png';
import { Link } from 'react-router-dom';

function LogoPlusName() {
  return (
    <div className='flex items-center justify-center mmd:space-x-4 space-x-2'>
      <Link to={'/'}><img src={Logo} alt="Logo" className='md:w-12 md:h-12 h-8 w-8' /></Link>

<Link className='text-white no-underline' to={'/'}><div className='mmd:text-lg text-md mmd:flex hidden  '>YourInterviewBuddy</div></Link>
<Link className='text-white no-underline' to={'/'}><div className='mmd:text-lg text-sm mmd:hidden flex  '>YIB</div></Link>


    </div>
    
  )
}

export default LogoPlusName