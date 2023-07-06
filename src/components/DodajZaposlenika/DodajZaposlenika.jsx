import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationJSX from '../Navigation/Navigation';

export function DodajZaposlenika() {
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [godiste, setGodiste] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/zaposlenici.php', {
        ime,
        prezime,
        godiste,
      });

      console.log(response)
      setIme('');
      setPrezime('');
      setGodiste('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavigationJSX />
      <div className="h-100 d-flex align-items-center justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-2">
            <label>Unesite Ime:</label>
            <input className="form-control" type="text" value={ime} onChange={(e) => setIme(e.target.value)} />
          </div>
          <div className="form-group mt-2">
            <label>Unesite Prezime:</label>
            <input className="form-control" type="text" value={prezime} onChange={(e) => setPrezime(e.target.value)} />
          </div>
          <div className="form-group mt-2">
            <label>Unesite Godište:</label>
            <input className="form-control" type="text" value={godiste} onChange={(e) => setGodiste(e.target.value)} />
          </div>
          <div className="text-center">
            <input className="btn btn-primary mt-2" type="submit" value="Dodaj" />
          </div>
        </form>
      </div>
    </>
  );
}

DodajZaposlenika.propTypes = {
  onAdd: PropTypes.func,
};

export default DodajZaposlenika;