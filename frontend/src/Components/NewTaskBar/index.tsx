import React from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import './styles.css';

const NewTaskBar = () => {
  return (
    <div className="container">
      <input
        className="taskBar"
        type="text"
        placeholder="Adicione uma nova tarefa"
      />
      <button className="btn">
        Criar <CiCirclePlus size={16} />
      </button>
    </div>
  );
};

export default NewTaskBar;
