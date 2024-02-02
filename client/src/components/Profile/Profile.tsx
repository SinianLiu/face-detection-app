import { useState, ChangeEvent } from 'react';
import './Profile.css';
import { IProfileProps } from '../../interface/interface';
import Alien from './alien.png';

const Profile = ({ toggleModel, user, loadUser }: IProfileProps) => {
  const [name, setName] = useState<string>(user.name);
  const [intro, setIntro] = useState<string>(user.intro);

  const OnFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'user-name':
        setName(e.target.value);
        break;
      case 'intro':
        setIntro(e.target.value);
        break;
      default:
        return;
    }
  };

  const onProfileUpdate = ({
    name,
    intro,
  }: {
    name: string;
    intro: string;
  }) => {
    const token = window.sessionStorage.getItem('token');

    fetch(`http://localhost:3000/profile/${user.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token || '',
      },
      body: JSON.stringify({
        formInput: { name, intro },
      }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          loadUser({ ...user, name, intro });
          toggleModel();
        }
      })
      .catch(console.log);
  };

  return (
    <div className="profile-model">
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img src={Alien} className="h3 w3 dib" alt="avatar" />
          <h1>{name}</h1>
          <h4>{`Images submitted: ${user.entries}`}</h4>
          <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr />
          <label className="mt2 fw6" htmlFor="user-name">
            Name:
          </label>
          <input
            className="pa2 ba w-100"
            placeholder={user.name}
            type="text"
            name="user-name"
            id="name"
            onChange={OnFormChange}
          />
          <label className="mt2 fw6" htmlFor="intro">
            Brief Intro: {user.intro}
          </label>
          <input
            className="pa2 ba w-100"
            placeholder="nice to meet you!"
            type="text"
            name="intro"
            id="intro"
            onChange={OnFormChange}
          />

          <div
            className="mt4"
            style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-green b--black-20"
              onClick={() => onProfileUpdate({ name, intro })}>
              Save
            </button>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
              onClick={toggleModel}>
              Cancel
            </button>
          </div>
        </main>

        <div className="model-close" onClick={toggleModel}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default Profile;

