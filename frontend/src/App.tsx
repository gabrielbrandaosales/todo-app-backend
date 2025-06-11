import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Header from './Components/Header';
import NewTaskBar from './Components/NewTaskBar';
import TaskList from './Components/TaskList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header />
        <NewTaskBar />
        <TaskList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
