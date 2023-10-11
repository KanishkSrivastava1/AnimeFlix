import React, { Component } from 'react'
import equal from 'fast-deep-equal'
import Anime from './Anime';


export default class SearchAnime extends Component {
    anime = [    
    ]

constructor() {
    super();
    this.state = {
        anime: this.anime,
        loading: true
    }

}

async componentDidMount() {
    this.h();
}


componentDidUpdate(prevProps) {
    if (!equal(this.props.title, prevProps.title)) {
        this.setState({ loading: true })
        this.h();
    }
}

async h() {
    let { title } = this.props;
    const url = `https://myanimelist.p.rapidapi.com/anime/search/${title}/5`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
            'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        this.setState({ anime: result });
        this.setState({ loading: false });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

render() {
    if (this.state.anime) {
        console.log(this.state.anime[0]);
        return (
            <div className='container my-2 '>
                <h2 className='d-flex justify-content-center m-auto'> Search Results </h2>
                {this.state.loading && 
                        <div className='container d-flex ' style={{height:'360px'}}>
                        <button className="btn btn-primary d-flex justify-content-center m-auto" type="button" disabled>
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Loading...
                      </button>
                      </div>
                    }
                <div className='row my-4'>
                    {this.state.anime.map((e) => {
                        console.log(e.title)
                        return <div className='col md-3 my-4'>
                            <Anime title={e.title} description={e.description} animeid={e.myanimelist_id} image={e.picture_url} link={e.myanimelist_url} />
                        </div>
                    })}
                </div>

            </div>
        )
    } else {
        return (
            <div className='container my-4'>
                <h1> No Anime with {this.props.ing} name found</h1>
                <h2>Please try again</h2>
            </div>
        )
    }
}
}
