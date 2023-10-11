import React from 'react'

export default function About() {
  return (
    <div className="container">
      <div className="accordion" id="accordionExample">
        <h1>About Us</h1>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              About The App
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              AnimeFlix is an online website to create your own anime list and
              get updates on any upcoming episode of the animes in your list.
              <br />
              By searching you can search for an anime and add it to your list
              <br />
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Contact Us!
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <a href="itskanishks@gamil.com"> Mail</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
