import React, { useEffect, useState } from 'react'
import SearchAnime from './SearchAnime'
import search from '../assets/search.png'
import { useNavigate } from 'react-router-dom';
import Upcominglist from './Upcominglist';

// home page 
export default function Main (props) {
    const navigate = useNavigate()
    const [text,setText] = useState("");
    const [click,setClick] = useState(false);
    const [title,setTitle] = useState("");
    const handleClick=()=>{
        setClick(true);
        setTitle(text)
    }
    const handleOnchange = (event)=>{
        setText(event.target.value);
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            // console.log(localStorage)
        }else {
            navigate('/login')
        }
    })

    return (
        <>
        <div className="container">
        <Upcominglist/>
            <div className='container'>
            <h1>Search Anime</h1>
                <form className='w-50 mw-550'>
                    <div className="input-group mb-3 my-4 mw-550  ">
                        <input type="text" className="form-control border-warning" value={text} onChange={handleOnchange} placeholder="Title" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <button className="btn btn-outline-secondary border-warning" type="button" onClick={handleClick}>
                            <img src={search} height='24px' alt='searchbtn'/>
                        </button>
                    </div>
                </form>
            </div>
                {click&&<SearchAnime title={title}/>}
            </div>
        </>

    )
}
