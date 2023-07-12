import React from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { logo } from "./assets/"
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full bg-white flex justify-between items-center sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to='/'>
          <img src={logo} alt='logo' className='w-28 object-contain' />
        </Link>
        <Link to='/create-post'>
          <button className='bg-blue-500 font-inter font-medium text-white px-4 py-2 rounded-md'>Create</button>
        </Link>
      </header>
      <main className='sm:px-8 px-4 py-8 w-full bg-gray-200 min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App