import React, { useState } from 'react';

const PretrazivanjePutnihNaloga = ({ PutniNalog, BrisanjePutnogNaloga }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPutniNalozi = PutniNalog.filter((nalog) =>
    nalog.employees.some((employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div>
      <input type="text" placeholder="Pretrazi po imenu ili prezimenu" value={searchQuery} onChange={handleSearch} />

      <ul>
        {filteredPutniNalozi.map((nalog) => (
          <li key={nalog.id}>
            <p>Polazište: {nalog.polaziste}</p>
            <p>Odredište: {nalog.odrediste}</p>
            <p>Svrha: {nalog.svrha}</p>
            <p>Datum odlaska: {nalog.datum_Odlaska}</p>
            <p>Broj dana: {nalog.broj_Dana}</p>
            <p>Odobreno: {nalog.odobreno ? 'Da' : 'Ne'}</p>
            <p>Zaposlenici:</p>
            <ul>
              {nalog.zaposlenici.map((zaposlenik) => (
                <li key={zaposlenik.id}>
                  {zaposlenik.ime} - {zaposlenik.prezime}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div>
      {/* ... */}

      <ul>
        {filteredPutniNalozi.map((nalog) => (
          <li key={nalog.id}>
            {/* ... */}

            <button onClick={() => BrisanjePutnogNaloga(nalog.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default PretrazivanjePutnihNaloga;
