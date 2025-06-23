import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Header from './Components/Header';
import NewTaskBar from './Components/NewTaskBar';
import TaskList from './Components/TaskList';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SkeletonTheme baseColor="#b7b7b7">
        <div className="App">
          <Header />
          <NewTaskBar />
          <TaskList />
        </div>
      </SkeletonTheme>
    </QueryClientProvider>
  );
}

export default App;
