import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Navbar({ loggedIn, setLoggedIn, ...props }) {
  const onClick = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary color-org">
      <div className="container-fluid ">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-center mx-2"
            alt=""
          />
          {props.title}
        </Link>
        <Link className="navbar-brand" to="/"></Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/list">
                My List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          {!loggedIn ? (
            <>
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">
                SignUp
              </Link>
            </>
          ) : (
            <Link
              className="btn btn-primary mx-2"
              onClick={onClick}
              to="/login"
              role="button"
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  title: PropTypes.string,
}
Navbar.defaultProps = {
  title: 'Set title here',
}
