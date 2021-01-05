export interface User {
  email: string;
  token: string;
  id: string;
  laravelToken: string;
  username: string;
  bio: string;
  image: string;
  banner: string;
  type: string;
  following: boolean;
}
export interface UserList {
  Bio: string;
  Email: string;
  ID: string;
  Image: string;
  PasswordHash: string;
  Provider: string;
  Type: string;
  Username: string;
  following: boolean;
}
