import axios from "axios";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationJSX from "../Navigation/Navigation";
import { UrediZaposlenika } from "../UrediZaposlenika/UrediZaposlenika";

export function ZaposleniciTable() {
  const [zaposlenici, setZaposlenici] = useState([]);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [editedEmployeeIndex, setEditedEmployeeIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredZaposlenici, setFilteredZaposlenici] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/zaposlenici.php")
      .then((res) => {
        // res.data.forEach(element => element.Vjezba = "Vjezba123");
        setZaposlenici(res.data)
        setFilteredZaposlenici(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.length === 0) 
    {
        setFilteredZaposlenici(zaposlenici)
    }
  }, [searchQuery]);

  const handleSearch = () => {
    console.log(zaposlenici)
    console.log(searchQuery)
    let filtriraniZaposlenici = zaposlenici.filter(zaposlenik => zaposlenik.ime.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredZaposlenici(filtriraniZaposlenici)
    console.log(filtriraniZaposlenici)
  }

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
        window.location.reload(false);
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

  const searchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '67rem'
  };

  const searchInputStyle = {
    width: '400px',
    padding: '0.5rem',
    border: '1px solid #ccc',
    fontWeight: '700'
  };

  const searchButtonStyle = {
    marginLeft: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <>
      <h1>Zaposlenici Tablica</h1>
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
      <NavigationJSX/>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <table className="table">
          <thead>
            <tr>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Godište</th>
              <th>Datum rođenja</th>
              <th>Uređivanje</th>
            </tr>
          </thead>
          <tbody>
            {filteredZaposlenici.map((item, i) => (
              <tr key={i}>
                <td>{item.ime}</td>
                <td>{item.prezime}</td>
                <td>{item.godiste}</td>
                <td>{item.datumRodjenja}</td>
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
