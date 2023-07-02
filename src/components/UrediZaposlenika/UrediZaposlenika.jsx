import { useState } from 'react';
import PropTypes from 'prop-types';

export function UrediZaposlenika({ zaposlenik, onSave, onCancel }) {
  const [editedEmployee, setEditedEmployee] = useState(zaposlenik || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedEmployee);
  };

  const handleCancel = () => {
    setEditedEmployee(zaposlenik || {});
    onCancel();
  };

  return (
    <div>
      <input
        type="text"
        name="ime"
        value={editedEmployee.ime || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        name="prezime"
        value={editedEmployee.prezime || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        name="godiste"
        value={editedEmployee.godiste || ''}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Spremi</button>
      <button onClick={handleCancel}>Odustani</button>
    </div>
  );
}

UrediZaposlenika.propTypes = {
  zaposlenik: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
