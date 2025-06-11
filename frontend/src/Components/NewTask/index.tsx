import { GoTrash } from 'react-icons/go';
import './styles.css';
import { useState } from 'react';

export interface TaskProps {
  task: string;
  isDone: boolean;
  id?: number;
}

const NewTask = ({ task: description, isDone, id }: TaskProps) => {
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
            id={`checkbox-${id}`}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`checkbox-${id}`}></label>
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
