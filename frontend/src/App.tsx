import './App.css';
import rocket from './assets/rocket.svg';

function App() {
  return (
    <div className="App">
      <div className="logo">
        <img src={rocket} alt="rocket" />
        <p className="title">
          <span>to</span>
          <span>do</span>
        </p>
      </div>
    </div>
  );
}

export default App;
