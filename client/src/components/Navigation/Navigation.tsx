import { INavigationProps } from '../../interface/interface';
import { Route } from '../../interface/interface';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = ({
  onRouteChange,
  isSignedIn,
  toggleModel,
  signOut,
}: INavigationProps) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ProfileIcon toggleModel={toggleModel} signOut={signOut} />
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => onRouteChange(Route.Signin)}
          className="f3 link dim black underline pa3 pointer">
          Sign In
        </p>
        <p
          onClick={() => onRouteChange(Route.Register)}
          className="f3 link dim black underline pa3 pointer">
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;

