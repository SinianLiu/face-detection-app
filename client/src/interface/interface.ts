import { ChangeEvent, MouseEvent } from 'react';

export enum Route {
  Home = 'home',
  Signin = 'signin',
  Register = 'register',
  Signout = 'signout',
}

export type Box = {
  topRow: number;
  rightCol: number;
  bottomRow: number;
  leftCol: number;
};

export interface IFaceRecognitionProps {
  imageUrl: string;
  box: Array<Box>;
}

interface IonRouteChange {
  onRouteChange: (route: Route) => void;
}

export interface ImageLinkFormProps {
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onButtonSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
}

export interface INavigationProps extends IonRouteChange {
  isSignedIn: boolean;
  toggleModel: () => void;
  // isProfileOpen: boolean;
  signOut: () => void;
}

export interface IProfileIconProps {
  toggleModel: () => void;
  signOut: () => void;
}

export interface IProfileProps {
  toggleModel: () => void;
  isProfileOpen: boolean;
  user: User;
  loadUser: (user: User) => void;
}

export type RankProps = {
  name: string;
  entries: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  entries: number;
  joined: string;
  intro: string;
};

export interface IRegisterProps extends IonRouteChange {
  loadUser: (user: any) => void; // replace 'any' with the actual type of 'user'
}

export interface ISigninProps extends IonRouteChange {
  loadUser: (user: User) => void;
}

export type Region = {
  region_info: {
    bounding_box: {
      top_row: number;
      right_col: number;
      bottom_row: number;
      left_col: number;
    };
  };
};

export type Result = {
  outputs: [
    {
      data: {
        regions: Region[];
      };
    }
  ];
};

