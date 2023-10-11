import React, { Component } from 'react'
import Animetemp from './Mylistelements'

// My list page
export class Mylist extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      anime: [],
    }
  }
  // called after render
  async componentDidMount() {
    const response = await fetch(
      `${process.env.REACT_APP_Server}/api/anime/getallanime`,
      {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    this.setState({ anime: data.anime })
    this.setState({ loading: false })
  }

  render() {
    if (this.state.anime) {
      return (
        <div className="container my-4">
          <h1> My List </h1>
          {this.state.loading && (
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Getting your Animes...
            </button>
          )}
          <div className="row my-4">
            {this.state.anime.map((e) => {
              // console.log(e.animelistid)
              return (
                <div className="col md-4 my-4">
                  <Animetemp
                    title={e.name}
                    animeid={e.animelistid}
                    image={e.image}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div className="container my-4">
          <h1> No Anime found in your list</h1>
          <h2>Search anime name to add them</h2>
        </div>
      )
    }
  }
}

export default Mylist
