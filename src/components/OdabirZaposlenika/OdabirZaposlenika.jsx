import React, { useState } from 'react';

const OdabirZaposlenika = ({ zaposlenici, onSelect }) => {
  const [odabraniZaposlenici, setSelectedEmployees] = useState([]);

  const handleOdabirZaposlenika = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedEmployees(selectedOptions);
    onSelect(selectedOptions);
  };

  return (
    <select multiple value={odabraniZaposlenici} onChange={handleOdabirZaposlenika}>
      {zaposlenici.item((zaposlenik) => (
        <option key={zaposlenik.rbr} value={zaposlenik.rbr}>
          {zaposlenik.ime}
        </option>
      ))}
    </select>
  );
};

export default OdabirZaposlenika;
