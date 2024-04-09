import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import bg from '../assets/Collage.jpeg'
import toast, { Toaster } from 'react-hot-toast';


// Login functionality
function Login({ setLoggedIn, ...props }) {
  let navigate = useNavigate()
  
  const error = () => toast('Invalid Credentials');
  const success = () => toast('Logged In');
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(credentials)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_Server}/api/auth/loginUser`,
        {
          method: 'POST',
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      // getting the token and adding it to localstorage
      if (response.ok) {
        success()
        const json = await response.json()
        localStorage.setItem('token', json.authtoken)
        setLoggedIn(true)
        navigate('/')
      } else {
        
        error()
        
        throw new Error('Request failed with status: ' + response.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUser = (e) => {
    setc({ ...credentials, username: e.target.value })
    console.log(credentials)
  }
  const handlePass = (e) => {
    setc({ ...credentials, password: e.target.value })
    console.log(credentials)
  }
  {/*} var sectionStyle = {
  //   backgroundImage: `url(${bg})`, // Use the 'bg' variable as the background image
  //   backgroundSize: 'cover', // Set background image size to cover
  //   backgroundRepeat: 'no-repeat', //
  //   height: '100vh',
  // }*/}



  const [credentials, setc] = useState({ username: '', password: '' })
  return (
    <div >

      
    <main className="  my-4 form-signin w-100 h-100 m-auto ">
    <Toaster/>
        <h4 class="text-2xl font-bold dark:text-white">Login :</h4>
          <div className="overlay my-5 p-7">
            <form onSubmit={handleSubmit} className="">
              <div className="mb-6">
                <label for="Username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <div class="flex">
                  <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </span>
                  <input type="text" id="username" onChange={handleUser} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none rounded-e-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="klaud" required />
                </div>
              </div>
              <div className="mb-6">
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" onChange={handlePass} id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
              </div>

              <div className="flex items-start mb-6">
                <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                <label for="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </form>
            </div>
            <div className="overlay my-5 p-5">


              <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Defaults : </h2>
              <ul class="max-w-md space-y-1 list-disc list-inside  dark:text-white">
                <li>
                  Username : klaud
                </li>
                <li>
                  Password : abcd
                </li>

              </ul>
            </div>
        </main>
    </div>
  )
}

export default Login
