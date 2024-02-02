import { useState, ChangeEvent } from 'react';
import { ISigninProps } from '../../interface/interface';
import { Route } from '../../interface/interface';
import './Signin.css';

const Signin = ({ onRouteChange, loadUser }: ISigninProps) => {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const OnFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email-address':
        setSignInEmail(e.target.value);
        break;
      case 'password':
        setSignInPassword(e.target.value);
        break;
      default:
        return;
    }
  };

  const saveAuthTokenInSession = (token: any) => {
    window.sessionStorage.setItem('token', token);
  };

  const onSubmitSignIn = async () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.userId && data.success === 'true') {
          saveAuthTokenInSession(data.token);
          loadUser(data.user);
          onRouteChange(Route.Home);
        }
      })
      .catch(console.log);
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                type="email"
                name="email-address"
                id="email-address"
                onChange={OnFormChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                type="password"
                name="password"
                id="password"
                onChange={OnFormChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              id="submit-button"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange(Route.Register)}
              className="f6 link dim black db pointer">
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Signin;

