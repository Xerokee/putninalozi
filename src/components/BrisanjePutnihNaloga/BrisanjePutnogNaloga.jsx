import { useState } from 'react';
import PutniNalogTable from '../PutniNalogTable/PutniNalogTable';

const BrisanjePutnihNaloga = () => {
  const [putniNalozi, postaviPutneNaloge] = useState();

  const handleBrisanjePutnihNaloga = (rbr) => {
    postaviPutneNaloge((prevPutniNalozi) =>
    prevPutniNalozi.filter((item) => item.rbr !== rbr)
    );
  };

  return (
    <div>
      {/* ... */}

      <PutniNalogTable
        putniNalozi={putniNalozi}
        onDeleteTravelOrder={handleBrisanjePutnihNaloga}
      />
    </div>
  );
};

export default BrisanjePutnihNaloga;
