import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

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
     success()
    } catch (error) {
     error()
    }
  }
  const [submit, setSubmit] = useState(false)
  const [er, seter] = useState(false)

  const error = () => toast('Something Went Wrong');
    const success = () => toast('Removed Successfully');

  return (
    <>

      <div className="max-w-sm bg-white  rounded-lg shadow dark:bg-gray-800 relative">
            <Toaster/>
          <img className="w-full rounded-lg" height="400px" src={props.image} alt={props.title.slice(0,5)} />
          
          <div className="absolute  top-0 left-0 right-0 bottom-0 opacity-0 transition-opacity duration-300 bg-gray-800 bg-opacity-70 hover:opacity-100 flex justify-center items-center">
              <div className="p-4 ">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{props.title}</h3>
                  {/* <p className="mb-3 text-gray-700 dark:text-gray-200">{props.description.slice(0, 60) + '...'}</p> */}
                  {!submit && !er && (
                <button type="submit" onClick={onClick} className="inline-flex my-4 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Remove From List 
                </button>
              )}
              </div>
          </div>
      </div>

     
    </>
  )
}

export default Mylistelements
