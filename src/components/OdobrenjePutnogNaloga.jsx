import React, { useState } from 'react';
import PutniNalogTable from './PutniNalogTable';

const PutniNalogApp = () => {
  const [putniNalozi, postaviPutneNaloge] = useState([
    { rbr: 1, polaziste: "Daruvar", odrediste: "Zagreb", svrha: "Pregled Sportskih Udruga", datum_odlaska: "2023-05-20", broj_dana: 3, odobreno: false },
    { rbr: 2, polaziste: "Varazdin", odrediste: "Bjelovar", svrha: "Vacation", datum_odlaska: "2023-05-21", broj_dana: 2, odobreno: true },
    { rbr: 3, polaziste: "Split", odrediste: "Dubrovnik", svrha: "Turisticko Ljetovanje", datum_odlaska: "2023-05-22", broj_dana: 7, odobreno: false },
    { rbr: 4, polaziste: "Zadar", odrediste: "Rijeka", svrha: "Upoznavanje Povijesti Grada", datum_odlaska: "2023-05-23", broj_dana: 4, odobreno: true },
    { rbr: 5, polaziste: "Slavonski Brod", odrediste: "Osijek", svrha: "Koncert Thompson", datum_odlaska: "2023-05-24", broj_dana: 1, odobreno: true },
  ]);

  const handleOdobriPutniNalog = (rbr) => {
    postaviPutneNaloge((prevPutniNalozi) =>
    prevPutniNalozi.map((item) =>
    item.rbr === rbr ? { ...item, odobreno: !item.odobreno } : item
      )
    );
  };

  return (
    <div>
      <h1>Putni Nalozi</h1>
      <PutniNalogTable PutniNalozi={putniNalozi} Odobrenje={handleOdobriPutniNalog} />
    </div>
  );
};

export default PutniNalogApp;
