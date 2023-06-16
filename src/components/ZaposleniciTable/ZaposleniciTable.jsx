import axios from "axios";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationJSX from "../Navigation/Navigation";

export function ZaposleniciTable() {
  const [zaposlenici, setZaposlenici] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/zaposlenici.php")
      .then((res) => {
        setZaposlenici(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>Zapolsenici Table</h1>
      <NavigationJSX/>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <table className="table">
          <thead>
            <tr>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Godište</th>
            </tr>
          </thead>
          <tbody>
            {zaposlenici.map((item, i) => (
              <tr key={i}>
                <td>{item.ime}</td>
                <td>{item.prezime}</td>
                <td>{item.godiste}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
