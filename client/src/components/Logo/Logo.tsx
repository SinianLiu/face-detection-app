import './Logo.css';
import brain from './brain.png';
import Tilt from 'react-parallax-tilt';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br4 shadow-2" style={{ height: 100, width: 100 }}>
        <div className="pa3">
          <img alt="logo" src={brain} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;

