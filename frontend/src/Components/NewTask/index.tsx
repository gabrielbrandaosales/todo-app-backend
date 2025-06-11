import { GoTrash } from 'react-icons/go';
import './styles.css';
import { useState } from 'react';
import axios from 'axios';

export interface TaskProps {
  id?: number;
  task: string;
  isDone: boolean;
}

const NewTask = ({ task: description, isDone, id }: TaskProps) => {
  const [isChecked, setIsChecked] = useState(isDone);

  const handleCheckboxChange = async () => {
    const newValue = !isChecked;
    setIsChecked(newValue);

    try {
      await axios.put(`http://localhost:3001/api/v1/todos/${id}`, {
        task: description,
        isDone: Number(newValue),
      });
      console.log('Task atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar a tarefa:', error);
      // Reverte o estado se o request falhar
      setIsChecked(!newValue);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(description);
  };

  return (
    <form onSubmit={handleSubmit} className="item">
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
    </form>
  );
};

export default NewTask;
