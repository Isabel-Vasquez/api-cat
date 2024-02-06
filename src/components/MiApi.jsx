import React, { useState, useEffect } from 'react';
import Buscador from './Buscador';

const razasUrl = 'https://api.thecatapi.com/v1/breeds';
const imagesUrl = 'https://api.thecatapi.com/v1/images/search';
const apiKey =
  'live_b6j63WF5e9qdl5i0MTsrz4ZicusNhxdDUgGy6YvLKqnsd4b0Hfg5gzzzwY0BCnq3';

const MiApi = () => {
  const [razasAlmacenadas, setRazasAlmacenadas] = useState([]);
  const [search, setSearch] = useState('');
  const [searchedImages, setSearchedImages] = useState([]);

  const BuscarImgPorRaza = async (nombreDeRaza) => {
    try {
      const imageUrl = `${imagesUrl}?breed_ids=${nombreDeRaza}`;
      const response = await fetch(imageUrl, {
        headers: { 'x-api-key': apiKey },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const handleSearch = async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    if (searchTerm.trim() !== '') {
      const result = await BuscarImgPorRaza(searchTerm, 10);
      setSearchedImages(result);
    }
  };

  useEffect(() => {
    // Llama a la API para obtener las razas de gatos con el metodo fetch
    fetch(razasUrl, { headers: { 'x-api-key': apiKey } })
      .then((response) => response.json())
      .then((data) => {
        data = data.filter((razas) => razas.image?.url != null);
        setRazasAlmacenadas(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className='d-flex flex-column align-items-center mb-5'>
        <h2>Buscador:</h2>
        <Buscador filter={search} onChange={handleSearch} />{' '}
      </div>
      <div className='row'>
        {razasAlmacenadas
          .filter((razas) => razas.name.toLowerCase().includes(search))
          .sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          )
          .map((razas, index) => (
            <div
              key={index}
              className='col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center'
            >
              <div className='card mt-3 card-cat'>
                <img
                  src={razas.image.url}
                  alt={razas.name}
                  className='card-img-top card-img-cat'
                />
                <div className='card-body'>
                  <h5 className='card-title'>{razas.name}</h5>
                  <p className='card-text'>{razas.temperament}</p>
                </div>
                <div className='card-footer'>
                  <a href={razas.wikipedia_url} className='btn btn-cat w-100'>
                    Wikipedia
                  </a>
                </div>
              </div>
            </div>
          ))}

        {search &&
          razasAlmacenadas.filter((razas) =>
            razas.name.toLowerCase().includes(search)
          ).length === 0 && (
            <div className='col-12 d-flex justify-content-center align-items-center container-error'>
              <h2>No hay razas que coincidan con la busqueda</h2>
            </div>
          )}
      </div>
    </>
  );
};

export default MiApi;
