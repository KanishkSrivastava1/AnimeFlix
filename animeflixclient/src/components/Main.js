import React, { useEffect, useState } from 'react'
import SearchAnime from './SearchAnime'
import search from '../assets/search.png'
import { useNavigate } from 'react-router-dom'
import Upcominglist from './Upcominglist'
import bg from '../assets/back.jpg'

// home page
export default function Main(props) {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [click, setClick] = useState(false)
  const [title, setTitle] = useState('')
  const handleClick = () => {
    setClick(true)
    setTitle(text)
  }
  const handleOnchange = (event) => {
    setText(event.target.value)
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      // console.log(localStorage)
    } else {
      navigate('/login')
    }
  })
  var sectionStyle = {
    backgroundImage: `url(${bg})`, // Use the 'bg' variable as the background image
    backgroundSize: 'cover', // Set background image size to cover
    backgroundRepeat: 'no-repeat', //
    // height: '100vh'
  }

  return (
    <>
      <div style={sectionStyle} className="my-0">
        <div className="container my-0">
          <Upcominglist />
          <div className="container ">
            <h1 className="d-flex justify-content-center my-2">Search Anime</h1>

            <form className="w-50 mw-550 d-flex justify-content-center m-auto">
              <div className="input-group mb-3 my-5 mw-550 m-auto d-flex justify-content-center ">
                <input
                  type="text"
                  className="form-control border-white"
                  value={text}
                  onChange={handleOnchange}
                  placeholder="Title"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <button
                  className="btn btn-outline-secondary border-white"
                  type="button"
                  onClick={handleClick}
                >
                  <img src={search} height="24px" alt="searchbtn" />
                </button>
              </div>
            </form>
          </div>
          {click && <SearchAnime title={title} />}
        </div>
      </div>
    </>
  )
}
