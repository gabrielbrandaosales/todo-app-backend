import './App.css';
import Header from './Components/Header';
import NewTaskBar from './Components/NewTaskBar';
import TaskList from './Components/TaskList';

function App() {
  return (
    <div className="App">
      <Header />
      <NewTaskBar />
      <TaskList />
    </div>
  );
}

export default App;
