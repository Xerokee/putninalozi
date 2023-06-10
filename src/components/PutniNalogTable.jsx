import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationJSX from "./Navigation";
import PropTypes from 'prop-types';

export default function ParentComponent() {
  const [post, setPost] = useState(null);
  const [selectedTravelOrder, setSelectedTravelOrder] = useState(null);
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
          .put(`http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/read.php?r.br.=${rbr}`, updatedItem)
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
      .delete(`http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/read.php?r.br.=${rbr}`)
      .then(() => {
        console.log('Nalog je izbrisan!');
      })
      .catch((error) => {
        console.log(error);
      });
    const updatedPosts = post.filter((item) => item.rbr !== rbr);
    setPost(updatedPosts);
  };

  const openTravelOrderDetails = () => {
    if (selectedTravelOrder) {
      const windowFeatures = 'width=800,height=600,scrollbars=yes,resizable=yes';
      const newWindow = window.open('', '_blank', windowFeatures);
      newWindow.document.write('<html><head><title>Travel Order Details</title></head><body>');
      newWindow.document.write('<h1>Travel Order Details</h1>');
      newWindow.document.write('<p>R.br.: ' + selectedTravelOrder.rbr + '</p>');
      newWindow.document.write('<p>Polazište: ' + selectedTravelOrder.polaziste + '</p>');
      newWindow.document.write('<p>Odredište: ' + selectedTravelOrder.odrediste + '</p>');

      newWindow.document.write('</body></html>');
      newWindow.document.close();
    }
  };

  return (
    <div>
      <h1>Putni Nalog Table</h1>
      <PutniNalogTable
        post={post}
        setPost={setPost}
        Odobrenje={Odobrenje}
        Brisanje={Brisanje}
        setSelectedTravelOrder={setSelectedTravelOrder}
        openTravelOrderDetails={openTravelOrderDetails}
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
  openTravelOrderDetails
}) {
  const [selectedTravelOrder, setSelectedTravelOrder] = useState(null);

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

  console.log(post);
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
              <tr key={item.rbr} onClick={() => setSelectedTravelOrder(item)}>
                <td><a href="#">Pregledaj</a></td>
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
        <button onClick={openTravelOrderDetails} disabled={!selectedTravelOrder}>
          Otvori Detalje Putnog Naloga
        </button>
      </div>
    </>
  );
}

PutniNalogTable.propTypes = {
  post: PropTypes.array,
  setPost: PropTypes.func,
  Odobrenje: PropTypes.func.isRequired,
  Brisanje: PropTypes.func.isRequired,
  setSelectedTravelOrder: PropTypes.func.isRequired,
  openTravelOrderDetails: PropTypes.func.isRequired
};
