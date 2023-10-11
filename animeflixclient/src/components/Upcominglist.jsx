import React, { Component } from 'react'
import Upcomingelement from './Upcomingelement';

export class Upcominglist extends Component {



    constructor(props) {
        super(props);
        this.state = {
            anime: [],
            loading: true,
        }
    }

    async componentDidMount() {
        this.fetchalldata()
    }

    async fetchalldata() {
        const response = await fetch(`${process.env.REACT_APP_Server}/api/anime/getallanime`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        const d = await response.json();

        const datedata = await fetch('https://data.simkl.in/calendar/anime.json', {
            method: 'GET',
        })
        const datajson = await datedata.json();

        const upanime = [];
        if(d.anime){
            d.anime.forEach(async (e) => {
                if (e.status != 'Finished Airing') {
                    const data = datajson.find(item => item.title == e.name);
                    let date = new Date().toJSON();
                    if (data && date <= data.date) {
                    const upcomingAnime = {
                        date: data.date,
                        name: e.name,
                        animelistid: e.animelistid,
                        status: e.status,
                        image: e.image,
                    };
                    const present = upanime.includes(upcomingAnime)
                    if (!present) {
                        upanime.push(upcomingAnime);
                    }
                }
            }
        })
        }
        this.setState({ anime: upanime ,loading:false})
    }

    render() {
        if (this.state.anime) {
            return (
                
                <div className='container my-4'>
                    <h1> Upcoming Animes </h1>
                    <div className='row my-4'>
                    {this.state.loading && 
                        <div className='container' style={{height:'360px'}}>
                        <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Loading...
                      </button>
                      </div>
                    }
                        {this.state.anime.map((e) => {
                            return <div className='col sm-12 md-4 my-4'>
                                <Upcomingelement name={e.name} image={e.image} date={e.date} />
                            </div>
                        })}
                    </div>

                </div>
            )
        } else {
            return (
                <div className='container my-4'>
                    <h1> No Upcoming Anime found</h1>
                </div>
            )
        }
    }
}

export default Upcominglist