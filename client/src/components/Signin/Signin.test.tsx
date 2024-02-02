import { shallow } from 'enzyme';
import Signin from './Signin';
// import fetchMock from 'jest-fetch-mock';

it('expect to render Signin component', () => {
  const onRouteChange = jest.fn();
  const loadUser = jest.fn();

  expect(
    shallow(<Signin onRouteChange={onRouteChange} loadUser={loadUser} />)
  ).toMatchSnapshot();
});

// fetchMock.enableMocks();

// it('should call fetch with the correct email and password when form is submitted', () => {
//   const mockFetch = jest.spyOn(global, 'fetch');
//   const onRouteChange = jest.fn();
//   const loadUser = jest.fn();

//   const wrapper = shallow(
//     <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
//   );

//   wrapper
//     .find('[id="email-address"]')
//     .simulate('change', { target: { value: 'p', name: 'email-address' } });

//   wrapper
//     .find('[id="password"]')
//     .simulate('change', { target: { value: 'p', name: 'password' } });

//   const submitButton = wrapper.find('input[type="submit"]');
//   submitButton.simulate('click');

//   expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/signin', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email: 'p',
//       password: 'p',
//     }),
//   });
// });

