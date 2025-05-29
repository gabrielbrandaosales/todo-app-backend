import rocket from '../../assets/rocket.svg';
import './styles.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={rocket} alt="rocket" />
        <p className="title">
          <span>to</span>
          <span>do</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
