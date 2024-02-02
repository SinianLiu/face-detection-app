import './FaceRecognition.css';
import mosaic from './mosaic.png';
import { IFaceRecognitionProps } from '../../interface/interface';

const FaceRecognition = ({ imageUrl, box }: IFaceRecognitionProps) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="input-image" src={imageUrl} width="400rem" height="auto" />
        {box.map((b, index) => (
          <div
            key={index}
            className="bounding-box"
            style={{
              top: b.topRow,
              right: b.rightCol,
              bottom: b.bottomRow,
              left: b.leftCol,
              backgroundImage: `url(${mosaic})`,
              backgroundSize: 'cover',
            }}></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;

