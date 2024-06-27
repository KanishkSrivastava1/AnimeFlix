import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


//  object/card of animes searched
export default function Anime(props) {
  const onClick = async (e) => {
    e.preventDefault()
  
    const toastcustom = (message) => toast(message);

    // getting anime details from MLA
    const url = `https://myanimelist.p.rapidapi.com/anime/${props.animeid}`
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
        'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com',
      },
    }

    try {
      const response = await fetch(url, options)
      const result = await response.json()
      const status = response.status
      if (status === 200 && isResultValid(result)) {
        const uploaded = await fetch(`${process.env.REACT_APP_Server_old}/api/anime/addanime`, {
          method: 'POST',
          body: JSON.stringify({ animelistid: props.animeid, data: result }),
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        })
        
          const message = await uploaded.json();
          console.log(message)
          toastcustom(message.message)
        
      } else {
        console.log(result)
        toastcustom("API fault")
      }
    } catch (error) {
      console.log(error)
    }
  }

  // conditions to check anime data exists
  const isResultValid = (result) => {
    if (
      result &&
      result.alternative_titles &&
      result.alternative_titles.english
    ) {
      return true
    } else {
      return false
    }
  }


  const [submit, setSubmit] = useState(false)
  const [er, seter] = useState(false)
  return (



    <div className="max-w-sm bg-white  rounded-lg shadow dark:bg-gray-800 relative">
    <Toaster/>
  <img className="w-full rounded-lg" src={props.image} alt={props.title.slice(0,5)} />
  
  <div className="absolute  top-0 left-0 right-0 bottom-0 opacity-0 transition-opacity duration-300 bg-gray-800 bg-opacity-70 hover:opacity-100 flex justify-center items-center">
      <div className="p-4 ">
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{props.title}</h3>
          <p className="mb-3 text-gray-700 dark:text-gray-200">{props.description.slice(0, 60) + '...'}</p>
          {!submit && !er && (
        <button type="submit" onClick={onClick} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add to List
        </button>
      )}
      </div>
  </div>
</div>
)
}
