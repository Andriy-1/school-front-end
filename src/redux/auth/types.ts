import { User } from '../../components/types';

export interface Auth {
  email: string;
  password: string | number;
  user: User | null;
  message: string;
  status: string;
  validate: {
    emailMessage: string;
    passwordMessage: string;
  };
}

export type InputValue = {
  type: string;
  value: string;
};

export type Validate =
  | {
      message: string;
      location: string;
      msg: string;
      param: string;
      value: string;
    }
  | {
      message: string;
    };

export type LoginParams = {
  login: string;
  password: string;
};
