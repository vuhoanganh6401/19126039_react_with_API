import React, { useState, useEffect } from 'react';

import Photo from './Photo';
const clientID = `?client_id=Nnq8a2tiP4wJ2_aM56dKoAXtGGzly4x3jk9Ux-HJxgY`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const fetchImages = async () => {
    setLoading(true);
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    let url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(data.results);
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [];
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImages();
    }, [page]);

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener('scroll', event);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };
  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            className='form-input'
            placeholder='Type your key word'
            value={query}
            onChange={(e) => setQuery(e.target.value)}           
          />
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            Search
          </button>

        </form>
      </section>

      <div id='gallery'>
          {photos.map((image, index) => {
            return <Photo key={index} {...image} />;
          })}
      </div>

      {loading && <h1 className='loading'>Loading...</h1>}



    </main>
  );
}

export default App;