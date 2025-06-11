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

  const reloadPage = () => {
    window.location.reload();
  };

  const handleCheckboxChange = async () => {
    const newValue = !isChecked;
    setIsChecked(newValue);

    try {
      await axios.put(`http://localhost:3001/api/v1/todos/${id}`, {
        task: description,
        isDone: Number(newValue),
      });
      console.log('Task atualizada com sucesso!');
      reloadPage();
    } catch (error) {
      console.error('Erro ao atualizar a tarefa:', error);
      setIsChecked(!newValue);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(description);
  };

  const handleDelete = async () => {
    // setIsEditing(false);
    // setEditedTask(initialTask);
    // setIsChecked(isDone);
    console.log('Cancelar edição');
    try {
      await axios.delete(`http://localhost:3001/api/v1/todos/${id}`);
      console.log('Task excluída com sucesso!');
      reloadPage();
    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
    }
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
        type="button"
        onClick={handleDelete}
        aria-label="Excluir tarefa"
        title="Excluir tarefa"
        className="btn-trash">
        <GoTrash size={16} />
      </button>
    </form>
  );
};

export default NewTask;
