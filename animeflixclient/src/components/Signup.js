import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import bg from '../assets/Collage.jpeg'

function Signup({ setLoggedIn, ...props }) {
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `${process.env.REACT_APP_Server}/api/auth/createUser`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: credentials.email,
            username: credentials.username,
            password: credentials.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    
      if (response.status === 200) {
        const json = await response.json()
        // console.log(json);
        localStorage.setItem('token', json.authtoken)
        setLoggedIn(true)
        navigate('/')
      } else {
        seterror(true)
        setTimeout(() => {
          seterror(false)
        }, 1000)
        throw new Error('Request failed with status: ' + response.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChange = (e) => {
    setc({ ...credentials, [e.target.name]: e.target.value })
  }
  var sectionStyle = {
    backgroundImage: `url(${bg})`, // Use the 'bg' variable as the background image
    backgroundSize: 'cover', // Set background image size to cover
    backgroundRepeat: 'no-repeat', //
    height: '100vh',
  }

  const [credentials, setc] = useState({
    email: '',
    username: '',
    password: '',
  })
  const [error, seterror] = useState(false)

  return (
    <>
      {error && (
        <div className="alert alert-danger " role="alert">
          Invalid credentials!
        </div>
      )}

      <div style={sectionStyle}>
        <main className="form-signin w-100 m-auto">
          <div className="overlay my-5 p-3">
            <form onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 my-2 fw-normal">Sign Up</h1>

              <div className="form-floating my-2">
                <input
                  className="form-control"
                  onChange={handleOnChange}
                  name="email"
                  value={credentials.email}
                  id="email"
                  placeholder="Email"
                />
                <label htmlFor="floatingInput">Email</label>
              </div>
              <div className="form-floating my-2">
                <input
                  className="form-control"
                  onChange={handleOnChange}
                  name="username"
                  value={credentials.username}
                  id="username"
                  placeholder="Username"
                />
                <label htmlFor="floatingInput">username</label>
              </div>
              <div className="form-floating my-2">
                <input
                  type="password"
                  className="form-control"
                  onChange={handleOnChange}
                  name="password"
                  value={credentials.password}
                  id="Password"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button
                className=" btn btn-primary w-75 m-auto py-2 d-flex justify-content-center"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}

export default Signup
