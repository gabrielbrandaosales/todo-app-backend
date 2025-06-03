import './styles.css';

const NewTask = () => {
  return (
    <div className="item">
      <div className="checkbox-wrapper-18">
        <div className="round">
          <input type="checkbox" id="checkbox-18" />
          <label htmlFor="checkbox-18"></label>
        </div>
      </div>

      <input
        className="title"
        type="text"
        placeholder="Adicione uma nova tarefa"
      />
      <button>Excluir</button>
    </div>
  );
};

export default NewTask;
