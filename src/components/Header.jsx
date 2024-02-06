import React from 'react';
import cat2 from '../assets/img/cat2.svg';

const Header = () => {
  return (
    <header className='container-fluid'>
      <h1 className='text-center'>
        ¡Bienvenida/o <br />
        al buscador de gatitos!
      </h1>
      <img src={cat2} alt='Imagen gato mirando' className='header-img' />
    </header>
  );
};

export default Header;
