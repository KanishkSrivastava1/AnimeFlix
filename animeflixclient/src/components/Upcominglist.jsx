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

          <h4 class="text-2xl my-4 font-bold dark:text-white">Upcoming Anime</h4>

            {this.state.loading && (
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Loader/>
              </div>
            )}
            
            if (this.state.anime.length!=0){

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
            }else{
                <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No Upcoming Eps Found </h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>

            }
          </div>
      )
    }
  }
}

export default Upcominglist
