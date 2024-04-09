import React, { Component } from 'react'
import equal from 'fast-deep-equal'
import Anime from './Anime'


export default class SearchAnime extends Component {
  anime = []

  constructor() {
    super()
    this.state = {
      anime: this.anime,
      loading: true,
    }
  }

  async componentDidMount() {
    this.h()
  }

  componentDidUpdate(prevProps) {
    if (!equal(this.props.title, prevProps.title)) {
      this.setState({ loading: true })
      this.h()
    }
  }

  async h() {
    let { title } = this.props
    const url = `https://myanimelist.p.rapidapi.com/v2/anime/search?q=${title}&n=12`
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
        'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com',
      },
    }

    try {
      const response = await fetch(url, options)
      const result = await response.json()
      this.setState({ anime: result })
      this.setState({ loading: false })
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    if (this.state.anime) {
      console.log(this.state.anime[0])
      return (
        <div className="m-6 ">


          <h3 class="text-3xl my-4 font-bold dark:text-white">Results</h3>


          {this.state.loading && (
            <>
              < div class="grid grid-cols-2 md:grid-cols-6 gap-6  min-h-64">
              <div role="status" class="space-y-4 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                <div class="flex items-center justify-center w-full h-4/5 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                  <svg class="w-10 h-8 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>

                <span class="sr-only">Loading...</span>
              </div>
              <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                <div class="flex items-center justify-center w-full h-4/5 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                  <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>

                <span class="sr-only">Loading...</span>
              </div>
              </div>
            </>
      )
    }


    <div class="grid grid-cols-2 md:grid-cols-6 gap-6  justify-content-center m-auto">
      {this.state.anime.map((e) => {
        console.log(e.title)
        return (
          <div className="col md-3 my-4">
            <Anime
              title={e.title}
              description={e.description}
              animeid={e.myanimelist_id}
              image={e.picture_url}
              link={e.myanimelist_url}
            />
          </div>
        )
      })}
    </div>
        </div >
      )
  } else {
  return (
    <div className="container my-4">
      <h1> No Anime with {this.props.ing} name found</h1>
      <h2>Please try again</h2>
    </div>
  )
}
  }
}
