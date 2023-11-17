import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { supabase } from './client'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const createRow = async (event) => {
    event.preventDefault();

   const { error } = await supabase
    .from('social')
    .insert({title :"In-n-out meal", content: "Complete meal from in-n-out with burger and shake", upvotes: 53, img:"https://media-cdn.tripadvisor.com/media/photo-s/0e/0f/03/95/burger-fries-and-shake.jpg"})
    .select()

    if (error) {
        console.log(error);
    }
    //window.location = "/";
}
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick ={createRow}>
          add row
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
