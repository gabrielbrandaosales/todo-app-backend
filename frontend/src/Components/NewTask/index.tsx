import { GoTrash } from 'react-icons/go';
import './styles.css';
import { useState } from 'react';

export interface TaskProps {
  task: string;
  isDone: boolean;
}

const NewTask = ({ task: description, isDone }: TaskProps) => {
  const [isChecked, setIsChecked] = useState(isDone);

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
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="checkbox-18"></label>
        </div>
      </div>
      <label
        className={
          isChecked ? `task-description lineThrough` : `task-description`
        }>
        {description}
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
