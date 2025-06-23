import { GoTrash } from 'react-icons/go';
import './styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface TaskProps {
  id?: number;
  task: string;
  isDone: boolean;
  refetch: () => void;
}

const NewTask = ({ task: description, isDone, id, refetch }: TaskProps) => {
  const [isChecked, setIsChecked] = useState(isDone);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(description);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask(e.target.value);
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
      refetch();
    } catch (error) {
      console.error('Erro ao atualizar a tarefa:', error);
      setIsChecked(!newValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/api/v1/todos/${id}`, {
        task: editedTask,
        isDone: isDone,
      });
      console.log('Task atualizada com sucesso!');
      refetch();
    } catch (error) {
      console.error('Erro ao atualizar a tarefa:', error);
      setIsEditing(false);
      setEditedTask(description);
      setIsChecked(isDone);
    }

    setIsEditing(false);
  };

  const handleDelete = async () => {
    console.log('Cancelar edição');
    try {
      await axios.delete(`http://localhost:3001/api/v1/todos/${id}`);
      console.log('Task excluída com sucesso!');
      refetch();
    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEditing(false);
        setEditedTask(description);
        setIsChecked(isDone);
      }
    };

    if (isEditing) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Limpeza do event listener ao sair do modo de edição
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [description, isDone, isEditing]);

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

      {isEditing ? (
        <>
          <input
            value={editedTask}
            onChange={handleInputChange}
            className="edit-input"
            autoFocus
          />
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={handleEditClick}
            className="btn-select-to-edit"
            title="Editar tarefa">
            <label
              className={
                isChecked ? `task-description lineThrough` : `task-description`
              }>
              {editedTask}
            </label>
          </button>
        </>
      )}

      {/* <label
        className={
          isChecked ? `task-description lineThrough` : `task-description`
        }>
        {description}
      </label> */}
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
