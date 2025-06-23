import NewTask, { type TaskProps } from '../NewTask';
import './styles.css';
import { useQuery } from '@tanstack/react-query';
import TaskListSkeleton from './TaskListSkeleton';

const Tasks = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      fetch('http://localhost:3001/api/v1/todos').then((res) => res.json()),
  });

  if (error) return <div>Erro: {error.message}</div>;

  if (isLoading) return <TaskListSkeleton />;

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
            data?.filter((task: { isDone: number }) => task.isDone === 1).length
          } de ${data?.length}`}</span>
        </div>
      </nav>

      {/* <NewTask task="Nova tarefa" isDone={false} /> */}

      {data?.map((task: TaskProps) => (
        <NewTask
          key={task.id}
          task={task.task}
          isDone={task.isDone}
          id={task.id}
          refetch={refetch}
        />
      ))}
    </main>
  );
};

export default Tasks;
