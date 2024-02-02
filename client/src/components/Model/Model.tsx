import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Model.css';

interface ModelProps {
  children: React.ReactNode;
}

const modelRoot = document.getElementById('model-root');

const Model: React.FC<ModelProps> = ({ children }) => {
  const el = document.createElement('div');

  if (!modelRoot) {
    return null;
  }

  useEffect(() => {
    modelRoot.appendChild(el);
    return () => {
      modelRoot.removeChild(el);
    };
  }, []);

  return ReactDOM.createPortal(children, el);
};

export default Model;

