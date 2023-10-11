import React, { useState } from 'react'

//  object/card of animes searched
export default function Anime(props) {
  const onClick = async (e) => {
    e.preventDefault()

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
        await fetch(`${process.env.REACT_APP_Server}/api/anime/addanime`, {
          method: 'POST',
          body: JSON.stringify({ animelistid: props.animeid, data: result }),
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        })
        // submit prompt
        setSubmit(true)
        setTimeout(() => {
          setSubmit(false)
        }, 1000)
      } else {
        // error prompt
        seter(true)
        setTimeout(() => {
          seter(false)
        }, 1000)
      }
    } catch (error) {
      console.error(error)
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
    <div
      className="card shadow-lg p-3 mb-5 border-grey"
      style={{ width: '16rem' }}
    >
      <img className="card-img-top" src={props.image} alt={props.title} />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description.slice(0, 100) + '...'}</p>
        {!submit && !er && (
          <button type="submit" onClick={onClick} className="btn btn-primary">
            Add to List
          </button>
        )}
        {submit && (
          <div className="alert alert-primary " role="alert">
            Added Successfully!!
          </div>
        )}
        {er && (
          <div className="alert alert-primary " role="alert">
            Some Error Occured
          </div>
        )}
      </div>
    </div>
  )
}
