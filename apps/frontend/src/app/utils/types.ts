export interface Task {
  id: string;
  name: string;
  description: string;
  done: boolean;
  created_at: Date;
}

export interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
}
