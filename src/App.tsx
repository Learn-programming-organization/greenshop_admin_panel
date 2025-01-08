import { useState } from 'react'
import LoginPage from './components/LoginPage'


function App() {

  return (
    <div className='grid place-items-center w-[1440px] h-[900px] bg-gradient-to-r from-[#FEAF00] to-[#F8D442]'>
      <LoginPage></LoginPage>
      <div className='bg-green-400'>
      </div>
    </div>
  )
}

export default App
