import React from 'react'
import {LogoPlusName,DesktopMenu,MobileMenu,Button} from './index'
function Navbar() {
    return (
        <div className=' bg-black px-6  pt-5 pb-3 mb-2 text-white'>
            <div className=' relative flex flex-row justify-between items-center'>
                    <LogoPlusName/>
                    <div className='absolute lg:left-[43%] mmd:left-[38%] md:left-[32%] '>
                    <DesktopMenu/>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                    <MobileMenu/>
                    <Button/>
                    </div>
                    
                    
                
            </div>
          
        </div>
      )
}

export default Navbar