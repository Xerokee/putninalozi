import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationJSX from '../Navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import hr from 'date-fns/locale/hr';
registerLocale('hr', hr)

export default function DodajPutniNalog() {
  // const [RedniBroj, setRedniBroj] = useState("");
  const [Polaziste, setPolaziste] = useState("");
  const [Odrediste, setOdrediste] = useState("");
  const [Svrha, setSvrha] = useState("");
  const [Datum_odlaska, setDatumOdlaska] = useState("");
  const [Datum_dolaska, setDatumDolaska] = useState("");
  const [Broj_dana, setBrojDana] = useState("");
  const [Zaposlenici, setZaposlenici] = useState([]);
  const [NoviZaposlenici, setNoviZaposlenici] = useState([]);
  const [Odobreno, setOdobreno] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/create.php");
        const zaposlenici = response.data;
        console.log(zaposlenici)
        setZaposlenici(Object.values(zaposlenici));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        !Polaziste ||
        !Odrediste ||
        !Svrha ||
        !Datum_odlaska ||
        !Broj_dana
      ) {
        throw new Error('Greška: Neispravan format podataka')
      }

      await axios.post("http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/create.php", {
        // "rbr": parseInt(RedniBroj),
        "polaziste": Polaziste,
        "odrediste": Odrediste,
        "svrha": Svrha,
        "datum_odlaska": Datum_odlaska,
        "datum_dolaska": Datum_dolaska,
        "broj_dana": Broj_dana,
        "zaposlenici": NoviZaposlenici,
        "odobreno": Odobreno
      });

      toast.success('Uspješno ste kreirali novi putni nalog');
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (err) {
      console.log(err);
      toast.error('Greška prilikom dodavanja naloga');
    }
  }

  return (
    <>
      <NavigationJSX />
      <div className='h-100 d-flex align-items-center justify-content-center'>
        <form onSubmit={handleSubmit}>
          {/* <div className='form-group mt-2'>
            <label>Unesite redni broj:
              <input className='form-control' type="number" value={RedniBroj} onChange={(e) => setRedniBroj(e.target.value)} />
            </label>
          </div> */}
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
        <label>Unesite Datum Odlaska:</label>
      </div>
      <div className='form-group'>
        <DatePicker
          className='form-control'
          selected={Datum_odlaska}
          locale="hr"
          onChange={(date) => setDatumOdlaska(date)}
          dateFormat="dd/MM/yyyy"
        />
        </div>
        <div className='form-group mt-2'>
        <label>Unesite Datum Dolaska:</label>
      </div>
      <div className='form-group'>
        <DatePicker
          className='form-control'
          selected={Datum_dolaska}
          locale="hr"
          onChange={(date) => setDatumDolaska(date)}
          dateFormat="dd/MM/yyyy"
        />
        </div>
          <div className='form-group mt-2'>
            <label>Unesite Broj Dana:
              <input className='form-control' type="text" value={Broj_dana} onChange={(e) => setBrojDana(e.target.value)} />
            </label>
          </div>
          <div className='form-group mt-2'>
          <label>Odaberite Zaposlenike:</label>
          <select multiple className='form-control' onChange={(e) => setNoviZaposlenici(Array.from(e.target.selectedOptions, option => ({id: option.value, zaposlenik: option.label})))}>
            {Zaposlenici.length > 0 && Zaposlenici.map((zaposlenik, i) => (
              <option key={i} value={zaposlenik.sifraZaposlenika}>
                {zaposlenik.ime} {zaposlenik.prezime}
              </option>
            ))}
          </select>
        </div>
          <div className='form-group mt-2' style={{ alignItems: 'center' }}>
            <label>Odobreno:</label>
            <input type="checkbox" style={{ marginLeft: '10px', transform: 'scale(1.5)', backgroundColor: 'blue' }} checked={Odobreno} onChange={(e) => setOdobreno(e.target.checked)} />
          </div>
          <div className='text-center'>
            <input className="btn btn-primary mt-2" type="submit" />
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
}
