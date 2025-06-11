import { CiCirclePlus } from 'react-icons/ci';
import './styles.css';
import { useState } from 'react';
import axios from 'axios';

const NewTaskBar = () => {
  const [description, setDescription] = useState('');

  const reloadPage = () => {
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3001/api/v1/todos`, {
        task: description,
        isDone: 0,
      });
      console.log('Task criada com sucesso!');
      reloadPage();
    } catch (error) {
      console.error('Erro ao criar a tarefa:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <input
        className="taskBar"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Adicione uma nova tarefa"
      />
      <button className="btn-create">
        Criar <CiCirclePlus size={16} />
      </button>
    </form>
  );
};

export default NewTaskBar;
