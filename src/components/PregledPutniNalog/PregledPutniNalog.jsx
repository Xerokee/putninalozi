import axios from "axios";
import { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';

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
    }, [])

  return (
    <div>
        {nalog && <div>
            <h1>Odrediste: {nalog.odrediste}</h1>
            </div>}
    </div>
  );
};

export default PregledPutniNalog;
