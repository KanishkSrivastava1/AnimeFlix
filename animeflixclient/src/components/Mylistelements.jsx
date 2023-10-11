import React, { useState } from 'react'

// my list elements
function Mylistelements(props) {
  const onClick = async () => {
    try {
      // console.log(props.animeid);
      const url = `${process.env.REACT_APP_Server}/api/anime/deleteanime/${props.animeid}`
      await fetch(url, {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      })
      setSubmit(true)
      setTimeout(() => {
        setSubmit(false)
      }, 1000)
    } catch (error) {
      seter(true)
      console.log(error)
    }
  }
  const [submit, setSubmit] = useState(false)
  const [er, seter] = useState(false)
  return (
    <>
      <div className="card shadow-lg p-3 mb-5" style={{ width: '16rem' }}>
        <img className="card-img-top" src={props.image} alt={props.title} />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>

          {!submit && !er && (
            <button type="submit" onClick={onClick} className="btn btn-primary">
              Remove from List
            </button>
          )}
          {submit && (
            <div className="alert alert-primary " role="alert">
              Removed Successfully!!
            </div>
          )}
          {er && (
            <div className="alert alert-primary " role="alert">
              Some Error Occured
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Mylistelements
