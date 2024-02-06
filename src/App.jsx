import React, { useState } from 'react';
import MiApi from './components/MiApi';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [razasAlmacenadas, setRazasAlmacenadas] = useState([]);

  return (
    <>
      <Header />
      <main className='container'>
        <MiApi setRazasAlmacenadas={setRazasAlmacenadas} />
      </main>
      <Footer />
    </>
  );
}
export default App;
