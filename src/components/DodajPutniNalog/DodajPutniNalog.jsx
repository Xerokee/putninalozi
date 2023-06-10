import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationJSX from '../Navigation/Navigation';

export default function DodajPutniNalog() {
  const [Polaziste, setPolaziste] = useState("");
  const [Odrediste, setOdrediste] = useState("");
  const [Svrha, setSvrha] = useState("");
  const [Datum_odlaska, setDatumOdlaska] = useState("");
  const [Broj_dana, setBrojDana] = useState("");
  const [Zaposlenici, setZaposlenici] = useState([]);
  const [Odobreno, setOdobreno] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8012/VUV%20Putni%20Nalozi/read.php");
        const zaposlenici = response.data;
        setZaposlenici(zaposlenici);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/create.php", {
        "polaziste": Polaziste,
        "odrediste": Odrediste,
        "svrha": Svrha,
        "datum_odlaska": Datum_odlaska,
        "broj_dana": Broj_dana,
        "zaposlenici": Zaposlenici,
        "odobreno": Odobreno
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <NavigationJSX />
      <div className='h-100 d-flex align-items-center justify-content-center'>
        <form onSubmit={handleSubmit}>
          <div className='form-group mt-2'>
            <label>Unesite Polazište:
              <input className='form-control' type="text" value={Polaziste} onChange={(e) => setPolaziste(e.target.value)} />
            </label>
          </div>
          <div className='form-group mt-2'>
            <label>Unesite Odredište:
              <input className='form-control' type="text" value={Odrediste} onChange={(e) => setOdrediste(e.target.value)} />
            </label>
          </div>
          <div className='form-group mt-2'>
            <label>Unesite Svrhu Putovanja:
              <input className='form-control' type="text" value={Svrha} onChange={(e) => setSvrha(e.target.value)} />
            </label>
          </div>
          <div className='form-group mt-2'>
            <label>Unesite Datum Odlaska:
              <input className='form-control' type="text" value={Datum_odlaska} onChange={(e) => setDatumOdlaska(e.target.value)} />
            </label>
          </div>
          <div className='form-group mt-2'>
            <label>Unesite Broj Dana:
              <input className='form-control' type="text" value={Broj_dana} onChange={(e) => setBrojDana(e.target.value)} />
            </label>
          </div>
          <div className='form-group mt-2'>
          <label>Odaberite Zaposlenike:</label>
          <select multiple className='form-control' value={Zaposlenici} onChange={(e) => setZaposlenici(Array.from(e.target.selectedOptions, option => option.value))}>
            {Zaposlenici.length > 0 && Zaposlenici.map((zaposlenik) => (
              <option key={zaposlenik.sifraZaposlenika} value={zaposlenik.sifraZaposlenika}>
                {zaposlenik.ime} {zaposlenik.prezime}
              </option>
            ))}
          </select>
        </div>
          <div className='form-group mt-2'>
            <label>Odobreno:</label>
            <input type="checkbox" checked={Odobreno} onChange={(e) => setOdobreno(e.target.checked)} />
          </div>
          <div className='text-center'>
            <input className="btn btn-primary mt-2" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}
