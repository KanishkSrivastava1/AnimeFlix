import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

function Signup() {
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
      // console.log(response.status)
      if (response.status === 200) {
        const json = await response.json()
        // console.log(json);
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
      <main className=" my-5 form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <img className="mb-4" src={logo} alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Sign Up</h1>

          <div className="form-floating">
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
          <div className="form-floating">
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
          <div className="form-floating">
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
          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign Up
          </button>
        </form>
      </main>
    </>
  )
}

export default Signup
