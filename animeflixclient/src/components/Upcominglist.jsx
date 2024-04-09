import React, { Component } from 'react'
import Upcomingelement from './Upcomingelement'
import Loader from './Loader'
export class Upcominglist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime: [],
      loading: true,
    }
  }

  async componentDidMount() {
    this.fetchalldata()
  }

  async fetchalldata() {
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
    const d = await response.json()

    const datedata = await fetch('https://data.simkl.in/calendar/anime.json', {
      method: 'GET',
    })
    const datedatajson = await datedata.json()
    // console.log(datedatajson)

    const upanimeSet = new Set();
    if (d.anime) {
      d.anime.forEach(async (e) => {
        if (e.status != 'Finished Airing') {
          const data = datedatajson.find((item) => item.title == e.name)
          if (data) {
            const upcomingAnime = {
              date: data.date,
              name: e.name,
              animelistid: e.animelistid,
              status: e.status,
              image: e.image,
            }
            upanimeSet.add(upcomingAnime);
          }
        }
      })
    }
    const upanime = Array.from(upanimeSet);
    this.setState({ anime: upanime, loading: false })
  }

  render() {
    {
      return (
        <div className="m-10">

          <h3 class="text-3xl my-4 font-bold dark:text-white">Upcoming Anime</h3>

            {this.state.loading ? (
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Loader/>
              </div>
            ):(

              this.state.anime.length !== 0  ? (
  
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {this.state.anime.map((e) => {
                      return (
  
                        <Upcomingelement
                          name={e.name}
                          image={e.image}
                          date={e.date}
                        />
                      )
                    })}
                  </div>
              ):(
                  <div class="max-w-m mx-4 p-6rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                          <h5 class="mb-2 text-2xl  font-bold tracking-tight text-gray-700 dark:text-gray-400">No Upcoming Eps Found <br/>
                      Add some currently Airing Animes to the List</h5>
                     
                  </div>
  
              )

            ) 
            }
            
          </div>
      )
    }
  }
}

export default Upcominglist
