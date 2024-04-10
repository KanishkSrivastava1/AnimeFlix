import Animetemp from './Mylistelements'
import Loader from './Loader'

import React, { useState, useEffect } from 'react';

// My list page
function Mylist() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_Server}/api/anime/getallanime`,
          {
            method: 'GET',
            headers: {
              'auth-token': localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setAnime(data.anime);
        setLoading(false);
        console.log(data.anime);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state here
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="mx-6">
      <h3 className="text-3xl my-4 font-bold dark:text-white">My Animes</h3>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Loader />
        </div>
      ) : anime.length !== 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* console.log(anime); */}
          {anime
  .filter(e => e !== null) // Filter out null values
  .map((e) => (
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
          <div className="max-w-sm mx-4 p-6 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-400">No Animes Found <br/>
              Add animes to the list by searching
            </h5>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mylist;

