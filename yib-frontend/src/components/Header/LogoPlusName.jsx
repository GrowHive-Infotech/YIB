import React from 'react'
import Logo from '../../assets/clipart84414.png';

function LogoPlusName() {
  return (
    <div className='flex items-center justify-center mmd:space-x-4 space-x-2'>
      <img src={Logo} alt="Logo" className='md:w-12 md:h-12 h-8 w-8' />
<div className='mmd:text-lg text-md mmd:flex hidden  '>YourInterviewBuddy</div>
<div className='mmd:text-lg text-sm mmd:hidden flex  '>YIB</div>


    </div>
    
  )
}

export default LogoPlusName