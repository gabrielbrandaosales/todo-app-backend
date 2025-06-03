import { GoTrash } from 'react-icons/go';
import './styles.css';
import { useState } from 'react';

const NewTask = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="item">
      <div className="checkbox-wrapper-18">
        <div className="round">
          <input
            type="checkbox"
            id="checkbox-18"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="checkbox-18"></label>
        </div>
      </div>
      <label
        className={
          isChecked ? `task-description lineThrough` : `task-description`
        }>
        Integer urna interdum massa libero auctor neque turpis turpis semper.
        Duis vel sed fames integer.
      </label>
      <button
        aria-label="Excluir tarefa"
        title="Excluir tarefa"
        className="btn-trash">
        <GoTrash size={16} />
      </button>
    </div>
  );
};

export default NewTask;
