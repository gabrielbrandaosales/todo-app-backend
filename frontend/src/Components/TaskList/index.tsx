import NewTask, { type TaskProps } from '../NewTask';
import './styles.css';
import { useQuery } from '@tanstack/react-query';

const Tasks = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      fetch('http://localhost:3001/api/v1/todos').then((res) => res.json()),
  });
  if (isLoading) return <div>Carregando...</div>;

  if (error) return <div>Erro: {error.message}</div>;

  return (
    <main className="content">
      <nav className="task-list-header">
        <div className="task-item-header">
          <label className="task-title">Tarefas criadas</label>
          <span className="task-quantity">{data?.length}</span>
        </div>

        <div className="task-item-header">
          <label className="task-finish">Concluidas</label>
          <span className="task-quantity">{`${
            data.filter((task: { isDone: number }) => task.isDone === 1).length
          } de ${data.length}`}</span>
        </div>
      </nav>

      {/* <NewTask description="Nova tarefa" isDone={false} /> */}
      {data?.map((task: TaskProps, index: number) => (
        <NewTask key={index} task={task.task} isDone={task.isDone} />
      ))}
    </main>
  );
};

export default Tasks;
