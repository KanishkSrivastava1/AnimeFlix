import React from 'react'

export default function Upcomingelement(props) {
  return (
    <div>
      <div className="card mb-3" style={{ maxHeight: '200px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={props.image}
              style={{ maxHeight: '200px' }}
              className="h-100 img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title my-3">{props.name}</h5>
              <h5 className="card-text">{props.date}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
