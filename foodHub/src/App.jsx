import { useState, useEffect} from 'react'
import { supabase } from './client'
import Card from './components/Card'
import './App.css'

function App() {
  const [list, setList] = useState({})
  const [filteredResults, setFilteredResults] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.fromEntries(Object.entries(list).filter((item) => 
      Object.values(item[1].title)
        .join("")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
      ))
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
  };
    useEffect(() => {
        const fetchPost = async () => {
            const {data} = await supabase
            .from('social')
            .select('*')
            .order('created_at', { ascending: true })
        
        setList(data);
        }
        fetchPost();
        
    }, []); 
    
    
    return (
      <div className='whole-page'>
        {console.log(list)}
        <input
          type="text"
          name="post-search"
          placeholder="Search"
          className='search-bar'
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <div className="post-container">
            {searchInput.length > 0 ?
                  Object.entries(filteredResults).map((i,index) => {
                  return (<Card id={i[1].id} title={i[1].title} content={i[1].content} img={i[1].img} upvotes={i[1].upvotes} time={i[1].created_at} key={index} /> )})
              : 
              
              Object.entries(list).map((i,index) =>{
                return (<Card id={i[1].id} title={i[1].title} content={i[1].content} img={i[1].img} upvotes={i[1].upvotes} time={i[1].created_at} key={index} /> )})
                 
            }
        </div>  
      </div>
  )
}

export default App
