import NewTask from '../NewTask';
import './styles.css';

const Tasks = () => {
  return (
    <main className="content">
      <nav className="task-list-header">
        <div className="task-item-header">
          <label className="task-title">Tarefas criadas</label>
          <span className="task-quantity">5</span>
        </div>

        <div className="task-item-header">
          <label className="task-finish">Concluidas</label>
          <span className="task-quantity">2 de 5</span>
        </div>
      </nav>

      <NewTask />
    </main>
  );
};

export default Tasks;
