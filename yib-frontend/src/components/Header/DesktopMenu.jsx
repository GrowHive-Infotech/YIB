import React from 'react'
// import {Link} from 'react-scroll'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
// import { useTheme } from '../../context/themeContext'
function DesktopMenu() {
  const hoverAnimation=()=>({
    initial:{scale:1,y:0},
    animate:{scale:1.2,transition:{duration:0.2}}
  })
//   const {themeMode}=useTheme();
  return (
    <div className={`hidden  lg:flex flex-row gap-10 justify-between items-center font-thin md:text-lg text-md   `}>
       <Link className='no-underline text-white' to={'/'}><motion.div className='cursor-pointer' variants={hoverAnimation()} initial="initial" whileHover="animate" > Home</motion.div></Link>
       <motion.div className='cursor-pointer'  variants={hoverAnimation()} initial="initial" whileHover="animate" ><Link className='no-underline text-white' to='/about'>About Us</Link></motion.div>
       <Link className='no-underline text-white' to={'/blogs'}><motion.div className='cursor-pointer' variants={hoverAnimation()} initial="initial" whileHover="animate" >Blogs</motion.div></Link>
       <Link className='no-underline text-white' to={'/jobs/all'}><motion.div className='cursor-pointer' variants={hoverAnimation()} initial="initial" whileHover="animate" >Jobs</motion.div></Link>
       <Link className='no-underline text-white' to={'/resume'}><motion.div className='cursor-pointer' variants={hoverAnimation()} initial="initial" whileHover="animate" >Resume</motion.div></Link>
       {/* <motion.div variants={hoverAnimation()} initial="initial" whileHover="animate" >Problems</motion.div> */}
       
    </div>
  )
}

export default DesktopMenu