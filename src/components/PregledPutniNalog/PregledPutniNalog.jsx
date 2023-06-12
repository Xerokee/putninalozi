import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PregledPutniNalog = () => {
    const { id } = useParams()
    const [nalog, setNalog] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/details.php?rbr=${id}`)
        .then((res) => {
          console.log(res.data)
          setNalog(res.data)
        })
        .catch((error) => {
          console.log(error);
        });
    }, [id])

  return (
    <div>
        {nalog && <div>
            <h1>Redni Broj: {nalog.rbr}</h1>
            <h1>Polazište: {nalog.polaziste}</h1>
            <h1>Odredište: {nalog.odrediste}</h1>
            <h1>Svrha: {nalog.svrha}</h1>
            <h1>Datum odlaska: {nalog.datum_odlaska}</h1>
            <h1>Broj dana: {nalog.broj_dana}</h1>
            <h1>Zaposlenici: {Array(nalog.zaposlenici).join(" , ")}</h1>
            </div>}
    </div>
  );
};

export default PregledPutniNalog;
