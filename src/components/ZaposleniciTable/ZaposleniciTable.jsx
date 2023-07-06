import axios from "axios";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationJSX from "../Navigation/Navigation";
import { UrediZaposlenika } from "../UrediZaposlenika/UrediZaposlenika";

export function ZaposleniciTable() {
  const [zaposlenici, setZaposlenici] = useState([]);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [editedEmployeeIndex, setEditedEmployeeIndex] = useState(null);
  
  useEffect(() => {
    axios.get("http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/zaposlenici.php")
      .then((res) => {
        setZaposlenici(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEdit = (index) => {
    const employeeToEdit = zaposlenici[index];
    setEditedEmployee(employeeToEdit);
    setEditedEmployeeIndex(index);
  };

  const handleSave = (updatedEmployee) => {
    const updatedZaposlenici = [...zaposlenici];
    updatedZaposlenici[editedEmployeeIndex] = updatedEmployee;

    axios
      .put(`http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/zaposlenici.php`, updatedEmployee)
      .then(() => {
        console.log('Podaci zaposlenika su ažurirani!');
      })
      .catch((error) => {
        console.log(error);
      });

    setZaposlenici(updatedZaposlenici);
    setEditedEmployee(null);
    setEditedEmployeeIndex(null);
  };

  const handleCancel = () => {
    setEditedEmployee(null);
    setEditedEmployeeIndex(null);
  };

  return (
    <>
      <h1>Zaposlenici Tablica</h1>
      <NavigationJSX/>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <table className="table">
          <thead>
            <tr>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Godište</th>
              <th>Uređivanje</th>
            </tr>
          </thead>
          <tbody>
            {zaposlenici.map((item, i) => (
              <tr key={i}>
                <td>{item.ime}</td>
                <td>{item.prezime}</td>
                <td>{item.godiste}</td>
                <td>
                  <button onClick={() => handleEdit(i)}>Uredi</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editedEmployee && (
        <UrediZaposlenika
          zaposlenik={editedEmployee} 
          onSave={handleSave} 
          onCancel={handleCancel}
        />
      )}
    </>
  );
}
