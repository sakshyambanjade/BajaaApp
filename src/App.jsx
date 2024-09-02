import React from 'react'
import Sidebar from './components/sidebar'
import Player from './components/Player'
const App = () => {
  return (
    <div className='h-screen bg-black'>
      <div className="has-[90%] flex">
        <Sidebar/>
      </div>
      <div>
     <Player/>
      </div>
    </div>
  )
}

export default App
