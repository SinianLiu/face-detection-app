import { shallow } from 'enzyme';
// mock the pic file
jest.mock('./mosaic.png', () => 'test-file-stub');
import FaceRecognition from './FaceRecognition';

it('expect to render FaceRecognition component', () => {
  const imageUrl =
    'https://img.zcool.cn/community/014ab057b6f04f0000018c1bc1cd18.jpg@1280w_1l_2o_100sh.jpg';
  const boxes = [
    {
      topRow: 130.32745558,
      leftCol: 30.130504000000002,
      bottomRow: 81.97319619999996,
      rightCol: 66.41408000000001,
    },
  ];

  expect(
    shallow(<FaceRecognition imageUrl={imageUrl} box={boxes} />)
  ).toMatchSnapshot();
});

