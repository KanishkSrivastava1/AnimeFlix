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
    if (this.state.anime) {
      return (
        <div className="m-10">

          <h4 class="text-2xl my-4 font-bold dark:text-white">Upcoming Anime</h4>

            {this.state.loading && (
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Loader/>
              </div>
            )}


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
          </div>
      )
    } else {
      return (
        <div className="container my-4">
          <h1> No Upcoming Anime found</h1>
        </div>
      )
    }
  }
}

export default Upcominglist
