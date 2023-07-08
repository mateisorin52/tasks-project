import { observable, action, makeObservable, makeAutoObservable } from 'mobx';
import { Task } from '../utils/types';

class UiStore {
  token: string = '';
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(
      this,
      {
        token: observable,
        setToken: action,
        tasks: observable,
        setTasks: action,
        addTask: action,
      },
      { autoBind: true }
    );
  }

  setToken = (value: string) => {
    this.token = value;
  };

  setTasks = (value: Task[]) => {
    this.tasks = value;
  };

  addTask = (value: Task) => {
    this.tasks = [...this.tasks, value];
  };
}

export const uiStore = new UiStore();
