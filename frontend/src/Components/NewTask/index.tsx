import { GoTrash } from 'react-icons/go';
import './styles.css';

const NewTask = () => {
  return (
    <div className="checkbox-wrapper-15 item">
      <input
        className="inp-cbx"
        id="cbx-15"
        type="checkbox"
        style={{ display: 'none' }}
      />
      <label className="cbx" htmlFor="cbx-15">
        <span>
          <svg width="12px" height="9px" viewBox="0 0 12 9">
            <polyline points="1 5 4 8 11 1"></polyline>
          </svg>
        </span>
        <span>To-do</span>
      </label>
      <button
        aria-label="Excluir tarefa"
        title="Excluir tarefa"
        className="btn-trash">
        <GoTrash size={14} />
      </button>
    </div>
  );
};

export default NewTask;
