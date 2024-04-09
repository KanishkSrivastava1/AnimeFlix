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
    this.setState({ anime: data.anime|| [] })
    this.setState({ loading: false })
  }

  render() {
    return (
      <div className="mx-6">
      <h3 className="text-3xl my-4 font-bold dark:text-white">My Animes</h3>
      {this.state.loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Loader />
        </div>
      ) : (
        this.state.anime.length !== 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {this.state.anime.map((e) => (
              <div key={e.animelistid} className="col-span-2 md:col-span-1 my-4">
                <Animetemp
                  title={e.name}
                  animeid={e.animelistid}
                  image={e.image}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div class="max-w-sm mx-4 p-6rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                          <h5 class="mb-2 text-2xl  font-bold tracking-tight text-gray-700 dark:text-gray-400">No Animes Found <br/>
                      Add animes to the list by searching </h5>
                  </div>
          </div>
        )
      )}
    </div>
    
    )
  }
}

export default Mylist
