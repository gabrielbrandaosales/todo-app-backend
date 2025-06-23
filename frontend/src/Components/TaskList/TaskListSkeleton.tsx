import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles.css';

const TaskListSkeleton = () => {
  return (
    <main className="content">
      <nav className="task-list-header" style={{ maxHeight: 22 }}>
        <div className="task-item-header">
          <label className="task-title">
            <Skeleton width={100} />
          </label>
          <span className="task-quantity">
            <Skeleton width={10} baseColor="#333" highlightColor="#262626" />
          </span>
        </div>
        <Skeleton />
        <Skeleton count={5} />
        <div className="task-item-header">
          <label className="task-finish">
            <Skeleton width={100} />
          </label>
          <span className="task-quantity">
            <Skeleton width={35} baseColor="#333" highlightColor="#262626" />
          </span>
        </div>
      </nav>
      <Skeleton className="item" width={707} height={30} />
      <Skeleton className="item" width={707} height={30} />
      <Skeleton className="item" width={707} height={30} />
      <Skeleton className="item" width={707} height={30} />
    </main>
  );
};

export default TaskListSkeleton;
