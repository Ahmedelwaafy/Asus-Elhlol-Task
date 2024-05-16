import React from 'react'
import LanguageChanger from './LanguageChanger'
import Logo from '../Logo'

function Navbar() { 
  return (
    <header className='w-full bg-red-300 h-20'>
      <nav className='site_container h-full flex justify-between items-center'>
        <Logo/>
        <ul className='flex-center gap-7'>
          <li>home</li>
          <li>about</li>
        </ul>
        <LanguageChanger/>
      </nav>
    </header>
  )
}

export default Navbar