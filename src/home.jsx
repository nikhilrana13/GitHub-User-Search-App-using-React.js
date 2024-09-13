import React, { useState } from 'react'
import './Style.css'

 const Home = () => {
 
    const [query,setQuery] = useState('')
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(false)

   const Handlesearch = () =>{
    if(query === ''){
        alert("Please enter user name")
        return;
    }
    setLoading(true)    
    fetch(`https://api.github.com/search/users?q=${query}`
    )
    .then((res)=>res.json())
    .then((res)=>{
        setData(res.items)
        setLoading(false)

    })

    .catch((err)=>{
        console.log('failed to load:',err)
        setLoading(false)
    });

    
   }


  return (


    <div className='Container'>
        <div className="head">
        <div className="logo">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="" />
        </div>

        <div className="title">
            <h1>Search Github User</h1>
        </div>

        </div>
      
       <div className="input-field">
       <input type="text"  value={query} placeholder='Search username or email' onChange={(e)=>setQuery(e.target.value)}/>
        <button onClick={Handlesearch}>Search</button>
       </div>

       {loading ? (
        <div>Loading...</div>

       ):(
        <div className="users">
            {
                data.map((item)=>(
                    <div className="user-card" key={item.id}>
                        <div className="user-image">
                            <img src={item.avatar_url} alt="" />
                        </div>
                        <div className="user-details">
                            <h3> Username : {item.login}</h3>
                            <a href={item.html_url} target="_blank" rel="noopener noreferrer">User : Github link</a>

                        </div>

                    </div>
                ))
            }
            </div>
       )}
        </div>
    );
};

export default Home
