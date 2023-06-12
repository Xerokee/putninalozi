import axios from "axios";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationJSX from "../Navigation/Navigation";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export default function ParentComponent() {
  const [post, setPost] = useState(null);
  const [zaposlenici, setZaposlenici] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/read.php")
      .then((res) => {
        const dataArray = Object.values(res.data);
        setPost(dataArray);
      })
      .catch((error) => {
        console.log(error);
      });

      axios.get("http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/read.php")
      .then((res) => {
        const zaposleniciArray = Object.values(res.data);
        setZaposlenici(zaposleniciArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Odobrenje = (rbr) => {
    if (!post) return;
    const updatedPosts = post.map((item) => {
      if (item.rbr === rbr) {
        const updatedItem = { ...item, odobreno: !item.odobreno };
        axios
          .put(`http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/read.php?rbr=${rbr}`, updatedItem)
          .then(() => {
            console.log('Odobrenje je uspjesno promijenjeno!');
          })
          .catch((error) => {
            console.log(error);
          });
        return updatedItem;
      }
      return item;
    });
    setPost(updatedPosts);
  };

  const Brisanje = (rbr) => {
    if (!post) return;
    axios
      .delete(`http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/read.php?rbr=${rbr}`)
      .then(() => {
        console.log('Nalog je izbrisan!');
      })
      .catch((error) => {
        console.log(error);
      });
    const updatedPosts = post.filter((item) => item.rbr !== rbr);
    setPost(updatedPosts);
  };

  return (
    <div>
      <h1>Putni Nalog Table</h1>
      <PutniNalogTable
        post={post}
        setPost={setPost}
        Odobrenje={Odobrenje}
        Brisanje={Brisanje}
        zaposlenici={zaposlenici}
      />
    </div>
  );
}


export function PutniNalogTable({
  post,
  setPost,
  Odobrenje,
  Brisanje,
}) {

  useEffect(() => {
    axios.get("http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/read.php")
      .then((res) => {
        const dataArray = Object.values(res.data);
        setPost(dataArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setPost]);

  if (!post) return null;

  return (
    <>
      <NavigationJSX/>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>R.br.</th>
              <th>Polazište</th>
              <th>Odredište</th>
              <th>Svrha</th>
              <th>Datum odlaska</th>
              <th>Broj dana</th>
              <th>Zaposlenici</th>
              <th>Odobreno</th>
              <th>Odobrenje</th>
              <th>Brisanje</th>
            </tr>
          </thead>
          <tbody>
            {post.map((item) => (
              <tr key={item.rbr}>
                <td>
                  <Link to={{ pathname: `nalog/${item.rbr}` }}>
                    Pregledaj
                  </Link>
                </td>
                <td>{item.rbr}</td>
                <td>{item.polaziste}</td>
                <td>{item.odrediste}</td>
                <td>{item.svrha}</td>
                <td>{item.datum_odlaska}</td>
                <td>{item.broj_dana}</td>
                <td>{Array(item.zaposlenici_imena).join(" , ")}</td>
                <td>{item.odobreno ? 'Odobreno je' : 'Nije Odobreno'}</td>
                <td>
                  <button onClick={() => Odobrenje(item.rbr)}>Odobri</button>
                </td>
                <td>
                  <button onClick={() => Brisanje(item.rbr)}>Obriši</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

PutniNalogTable.propTypes = {
  post: PropTypes.array,
  setPost: PropTypes.func,
  Odobrenje: PropTypes.func.isRequired,
  Brisanje: PropTypes.func.isRequired,
};
