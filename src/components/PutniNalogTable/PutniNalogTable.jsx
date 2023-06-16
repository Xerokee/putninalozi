import axios from "axios";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationJSX from "../Navigation/Navigation";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export default function ParentComponent() {
  const [post, setPost] = useState(null);
  const [zaposlenici, setZaposlenici] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/read.php")
      .then((res) => {
        const dataArray = Object.values(res.data);
        setPost(dataArray);
        setFilteredPosts(dataArray);
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
    setFilteredPosts(updatedPosts);
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
    setFilteredPosts(updatedPosts);
  };

  const handleSearch = () => {
    const filtered = post.filter((item) => {
      const zaposlenici = item.zaposlenici_imena.filter((zaposlenik) => 
        zaposlenik.toLowerCase().includes(searchQuery.toLowerCase())
      )
      return zaposlenici.length
    })

    setFilteredPosts(filtered);
  };

  return (
    <div>
      <h1>Putni Nalog Tablica</h1>
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Pretraži po dijelu imena/prezimena korisnika..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyle}
        />
        <button style={searchButtonStyle} onClick={handleSearch}>Pretraži</button>
      </div>
      <PutniNalogTable
        post={filteredPosts}
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

const searchContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginRight: '69rem'
};

const searchInputStyle = {
  width: '400px',
  padding: '0.5rem',
  border: '1px solid #ccc',
};

const searchButtonStyle = {
  marginLeft: '0.5rem',
  padding: '0.5rem 1rem',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
};
