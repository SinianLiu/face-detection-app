import { shallow } from 'enzyme';
import ImageLinkForm from './ImageLinkForm';

it('expect to render Logo component', () => {
  const mockOnInputChange = jest.fn();
  const mockOnButtonSubmit = jest.fn();

  expect(
    shallow(
      <ImageLinkForm
        onInputChange={mockOnInputChange}
        onButtonSubmit={mockOnButtonSubmit}
      />
    )
  ).toMatchSnapshot();
});

