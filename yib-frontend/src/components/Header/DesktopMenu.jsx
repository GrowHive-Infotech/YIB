import React from 'react'
// import {Link} from 'react-scroll'
import { motion } from 'framer-motion'
// import { useTheme } from '../../context/themeContext'
function DesktopMenu() {
  const hoverAnimation=()=>({
    initial:{scale:1,y:0},
    animate:{scale:1.2,transition:{duration:0.2}}
  })
//   const {themeMode}=useTheme();
  return (
    <div className={`hidden  md:flex flex-row gap-10 justify-between items-center font-thin md:text-lg text-md   `}>
       <motion.div variants={hoverAnimation()} initial="initial" whileHover="animate" > Home</motion.div>
       <motion.div variants={hoverAnimation()} initial="initial" whileHover="animate" >About Us</motion.div>
       <motion.div variants={hoverAnimation()} initial="initial" whileHover="animate" >Blogs</motion.div>
       <motion.div variants={hoverAnimation()} initial="initial" whileHover="animate" >Jobs</motion.div>
       {/* <motion.div variants={hoverAnimation()} initial="initial" whileHover="animate" >Problems</motion.div> */}
       
    </div>
  )
}

export default DesktopMenu