import React from 'react';

const Buscador = ({ filter, onChange }) => {
  return (
    <input
      className='form-control w-100 mt-2'
      placeholder='Busca gatitos por raza, ej: american, british, etc...'
      type='text'
      name='search'
      autoComplete='off'
      value={filter}
      onChange={onChange}
    />
  );
};

export default Buscador;
