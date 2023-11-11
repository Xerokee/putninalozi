import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationJSX from '../Navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export function DodajZaposlenika() {
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [godiste, setGodiste] = useState('');
  const [datumrodjenja, setdatumRodjenja] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        !ime ||
        !prezime ||
        !godiste
      ) {
        throw new Error('Greška: Neispravan format podataka')
      }

      await axios.post('http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/zaposlenici.php', {
        "ime": ime,
        "prezime": prezime,
        "godiste": godiste,
        "datumRodjenja": datumrodjenja,
      });

      toast.success('Uspješno ste kreirali novog zaposlenika');
      setTimeout(() => {
        navigate('/zaposlenici')
      }, 2000)
    } catch (err) {
      console.log(err);
      toast.error('Greška prilikom dodavanja zaposlenika');
    }
  }

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
          <div className="form-group mt-2">
            <label>Unesite Datum rođenja:</label>
            <input className="form-control" type="text" value={datumrodjenja} onChange={(e) => setdatumRodjenja(e.target.value)} />
          </div>
          <div className="text-center">
            <input className="btn btn-primary mt-2" type="submit" value="Dodaj" />
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
}

DodajZaposlenika.propTypes = {
  onAdd: PropTypes.func,
};

export default DodajZaposlenika;