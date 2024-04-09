import React, { Component } from 'react'
import Animetemp from './Mylistelements'
import Loader from './Loader'

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
          <div className="mx-6">
            
<h3 class="text-3xl my-4 font-bold dark:text-white">My Animes</h3>

            {this.state.loading && (
             <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
             <Loader/>
           </div>
            )}
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
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
        <div style={{ background: 'black' }}>
          <div className="container my-4">
            <h1> No Anime found in your list</h1>
            <h2>Search anime name to add them</h2>
          </div>
        </div>
      )
    }
  }
}

export default Mylist
