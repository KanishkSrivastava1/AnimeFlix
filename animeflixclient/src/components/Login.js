import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import bg from '../assets/Collage.jpeg'

// Login functionality
function Login() {
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

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
        const json = await response.json()
        localStorage.setItem('token', json.authtoken)
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

  const [credentials, setc] = useState({ username: '', password: '' })
  const [error, seterror] = useState(false)
  return (
    <>
      {error && (
        <div className="alert alert-danger " role="alert">
          Invalid credentials!
        </div>
      )}
      <div style={sectionStyle}>
        <main className="  form-signin w-100 m-auto ">
          <div className="overlay my-5 p-3">
            <form onSubmit={handleSubmit} className="my-5  ">
              {/*<img className="mb-4 m-auto d-flex justify-content-center" src={logo} alt="" width="72" height="57" />*/}
              <h1 className="h3 mb-3 my-5  fw-normal d-flex justify-content-center">
                Please Login
              </h1>

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
              <div className="form-floating ">
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
                className="btn btn-primary w-75 m-auto py-2 my-4 d-flex justify-content-center"
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="container ">
              <p className="m-2 d-flex justify-content-center">
                You can use username as klaud
              </p>{' '}
              <p className="m-2 d-flex justify-content-center">
                password as abcd{' '}
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Login
