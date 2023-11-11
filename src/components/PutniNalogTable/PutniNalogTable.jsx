import axios from "axios";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationJSX from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';

export default function ParentComponent() {
  const [post, setPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  const hrTranslations = {
    pagination: {
      rowsPerPageText: 'Redova po stranici:',
      rangeSeparatorText: 'od',
      noRowsPerPage: 'Nema redova po stranici',
      selectAllRows: 'Odaberi sve redove',
      selectAllRowsAria: 'Odaberi sve redove',
      nextPage: 'Sljedeća stranica',
      previousPage: 'Prethodna stranica',
      noPagination: 'Nema paginacije',
    },
    toolbar: {
      search: 'Pretraži',
      downloadCsv: 'Preuzmi CSV',
      print: 'Ispiši',
      viewColumns: 'Vidi stupce',
      filterTable: 'Filtriraj tablicu',
    },
    filter: {
      all: 'Sve',
      title: 'FILTERI',
      reset: 'RESETIRAJ',
    },
    viewColumns: {
      title: 'Vidi stupce',
      titleAria: 'Vidi/Ne vidi stupce',
    },
    selectedRows: {
      text: 'redova odabrano',
      delete: 'Izbriši',
      deleteAria: 'Izbriši odabrane redove',
    },
  };

  useEffect(() => {
    axios.get("http://localhost:8012/VUV%20Putni%20Nalozi/putninalozi/read.php")
      .then((res) => {
        const dataArray = Object.values(res.data);
        console.log(res);
        console.log(dataArray)
        setPost(dataArray);
        setFilteredPosts(dataArray);
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

  const columns = [
    {
      cell: (row) => <Link to={{ pathname: `nalog/${row.rbr}` }}>Pregledaj</Link>,
      width: '7%'
    },
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '5%'
    },
    {
      name: 'R.br.',
      selector: row => row.rbr,
      sortable: true,
      width: '6%'
    },
    {
      name: 'Polazište',
      selector: row => row.polaziste,
      width: '9%'
    },
    {
      name: 'Odredište',
      selector: row => row.odrediste,
      width: '8%'
    },
    {
      name: 'Svrha',
      selector: row => row.svrha,
      width: '12%'
    },
    {
      name: 'Datum Odlaska',
      selector: row => row.datum_odlaska,
      width: '11%'
    },
    {
      name: 'Datum Dolaska',
      selector: row => row.datum_dolaska,
      width: '11%'
    },
    {
      name: 'Broj dana',
      selector: row => row.broj_dana,
      width: '7%'
    },
    {
      name: 'Zaposlenici',
      selector: row => row.zaposlenici_imena,
      format: (row) => row.zaposlenici_imena.join(", "),
      width: '10%'
    },
    {
      name: 'Odobreno',
      selector: row => row.odobreno,
      format: (row) => row.odobreno ? 'Odobreno je' : 'Nije Odobreno',
      width: '9%'
    },
    {
      name: 'Odobrenje',
      cell: (row) => <button onClick={() => Odobrenje(row.rbr)}>Odobri</button>,
      width: '8%'
    },
    {
      name: 'Brisanje',
      cell: (row) => <button onClick={() => Brisanje(row.rbr)}>Obriši</button>,
      width: '8%'
    },
  ];
  
  const handleSort = (column, sortDirection) => {
    if (column.selector === 'rbr') {
      setSortOrder(sortDirection === 'asc' ? 'desc' : 'asc');
      const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (a.rbr === b.rbr) return 0;
        return sortOrder === 'asc' ? a.rbr - b.rbr : b.rbr - a.rbr;
      });
      setFilteredPosts(sortedPosts);
    } else {
      setFilteredPosts([...filteredPosts].sort((a, b) => {
        if (a[column.selector] === b[column.selector]) return 0;
        return sortDirection === 'asc' ? a[column.selector].toString().localeCompare(b[column.selector]) : b[column.selector].toString().localeCompare(a[column.selector]);
      }));
    }
  };

  const newFontSize = '15px'; 
  const newFontSizeElements = '15px';

  const customStyles = {
    headCells: {
      style: {
        fontSize: newFontSize,
        fontWeight: 'bold'
      },
    },
    cells: {
      style: {
        fontSize: newFontSizeElements,
      },
    },
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

      <NavigationJSX/>

      <DataTable
        data={filteredPosts}
        columns={columns}
        onSort={handleSort}
        defaultSortField="rbr"
        defaultSortAsc={true}
        pagination
        paginationComponentOptions={{
          rowsPerPageText: hrTranslations.pagination.rowsPerPageText, // Use the translation here
          rangeSeparatorText: hrTranslations.pagination.rangeSeparatorText,
        }}
        highlightOnHover
        striped
        customStyles={customStyles}
        paginationPerPage={10} // Adjust as needed
        paginationRowsPerPageOptions={[10, 20, 30]} // Adjust as needed
        paginationRowsPerPageText="Redova po stranici:" // For the dropdown label
        noDataComponent="Nema dostupnih podataka" // For no data message
        text={hrTranslations} // Apply Croatian translations here
      />
    </div>
  );
}

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
