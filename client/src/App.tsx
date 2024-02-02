import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg';
import './App.css';
import { useState, ChangeEvent, useEffect } from 'react';
import { returnClarifai, calculateFaceLocation } from './utils/clarifai';
import { User, Result, Box, Route } from './interface/interface';
// import { putData } from './utils/data.utils';
import Model from './components/Model/Model';
import Profile from './components/Profile/Profile';

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState<Box[]>([]);
  const [route, setRoute] = useState(Route.Signin);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    intro: '',
  });

  const onRouteChange = (route: Route): void => {
    if (route === Route.Home) {
      setIsSignedIn(true);
      // return;
    } else if (route === Route.Signout) {
      setIsSignedIn(false);
      // return;
    }

    setRoute(route);
  };

  const loadUser = (user: User) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined,
      intro: user.intro,
    });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    const token = window.sessionStorage.getItem('token');

    if (token) {
      fetch(
        'https://api.clarifai.com/v2/models/' + 'face-detection' + '/outputs',
        returnClarifai(input)
      )
        .then((response) => response.json())
        .then(async (result: Result) => {
          const boxes: Box[] = [];
          const regions = result.outputs[0].data.regions;
          regions.forEach((region) => {
            // Accessing and rounding the bounding box values
            const boundingBox = region.region_info.bounding_box;
            const box = calculateFaceLocation(boundingBox);
            boxes.push(box);
          });

          setBox(boxes);

          console.log('boxes', boxes);

          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify({ id: user.id }),
          })
            .then((response) => response.json())
            .then((count: number) => {
              setUser({ ...user, entries: count });
            })
            .catch(console.log);
        })
        .catch((error) => console.log('error', error));
    }
  };

  const toggleModel = (): void => {
    setIsProfileOpen(!isProfileOpen);
  };

  const signOut = (): void => {
    console.log('signOut function called');
    window.sessionStorage.removeItem('token');
    setImageUrl('');
    onRouteChange(Route.Signout);
  };

  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data && data.id) {
            fetch(`http://localhost:3000/profile/${data.id}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            })
              .then((resp) => {
                return resp.json();
              })
              .then((user) => {
                if (user && user.email) {
                  loadUser(user);
                  onRouteChange(Route.Home);
                }
              });
          }
        })
        .catch(console.log);
    }
  }, []);

  return (
    <div className="App">
      <ParticlesBg num={30} type="square" bg={true} />
      <Navigation
        onRouteChange={onRouteChange}
        isSignedIn={isSignedIn}
        toggleModel={toggleModel}
        signOut={signOut}
      />
      {isProfileOpen && (
        <Model>
          <Profile
            toggleModel={toggleModel}
            isProfileOpen={isProfileOpen}
            user={user}
            loadUser={loadUser}
          />
        </Model>
      )}

      {route === Route.Home ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </>
      ) : route === Route.Register ? (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;

