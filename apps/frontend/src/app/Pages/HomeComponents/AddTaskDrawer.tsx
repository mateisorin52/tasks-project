import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Drawer,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { resolve } from 'path';
import { useEffect, useState } from 'react';
import { uiStore } from '../../stores/uiStore';
import { Task } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';
const AddTaskDrawer: React.FC<{
  open: boolean;
  onClose: () => void;
  taskToEdit: Task | null;
}> = ({ open, onClose, taskToEdit }) => {
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    done: false,
    created_at: new Date(),
    id: uuidv4(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setisDeleteLoading] = useState(false);
  const { setTasks, addTask } = uiStore;
  const currentTasks: string = localStorage.getItem('tasks') || '';
  useEffect(() => {
    if (taskToEdit) setNewTask(taskToEdit);
  }, [taskToEdit]);
  const simulateAddingTask = () => {
    return new Promise<{} | void>((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        if (currentTasks) {
          localStorage.setItem(
            'tasks',
            JSON.stringify([...JSON.parse(currentTasks), newTask])
          );
          addTask(newTask);
        } else {
          localStorage.setItem('tasks', JSON.stringify([newTask]));
          setTasks([newTask]);
        }
        resolve();
      }, 1500);
    }).then(() => {
      setIsLoading(false);
    });
  };
  const simulateEdittingTask = () => {
    return new Promise<{} | void>((resolve, reject) => {
      setIsLoading(true);
      const tasks: Task[] = JSON.parse(localStorage.getItem('tasks')!);
      setTimeout(() => {
        if (currentTasks) {
          const taskIndex = tasks.findIndex(
            (task) => task.id === taskToEdit?.id
          );
          if (taskIndex !== -1) {
            const updatedTasks = [...tasks];
            updatedTasks[taskIndex] = newTask;
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
          }
        }
        resolve();
      }, 1000);
    }).then(() => {
      setIsLoading(false);
    });
  };
  const simulateDeletingTask = () => {
    return new Promise<{} | void>((resolve, reject) => {
      setisDeleteLoading(true);
      const tasks: Task[] = JSON.parse(localStorage.getItem('tasks')!);
      setTimeout(() => {
        if (currentTasks) {
          const taskIndex = tasks.findIndex(
            (task) => task.id === taskToEdit?.id
          );
          if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
          }
        }
        resolve();
      }, 1000);
    }).then(() => {
      setisDeleteLoading(false);
    });
  };

  const handleAddTask = async () => {
    if (newTask.name.trim() === '' || newTask.description.trim() === '') {
      return;
    }
    await simulateAddingTask();
    handleReset();
    onClose();
  };
  const handleEditTask = async () => {
    if (newTask.name.trim() === '' || newTask.description.trim() === '') {
      return;
    }
    await simulateEdittingTask();
    handleReset();
    onClose();
  };
  const handleDeleteTask = async () => {
    await simulateDeletingTask();
    handleReset();
    onClose();
  };
  const handleReset = () => {
    setNewTask({
      name: '',
      description: '',
      done: false,
      created_at: new Date(),
      id: uuidv4(),
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => {
        onClose();
        handleReset();
      }}
    >
      <Grid
        height="100%"
        justifyContent="space-between"
        flexDirection="column"
        container
      >
        <Grid item>
          <Box p={2}>
            <Typography variant="h6">
              {taskToEdit ? 'Edit' : 'Add'} Task
            </Typography>
            <TextField
              label="Name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <LoadingButton
              loading={isLoading}
              onClick={taskToEdit ? handleEditTask : handleAddTask}
              variant="contained"
              color="primary"
            >
              {taskToEdit ? 'Edit' : 'Add'}
            </LoadingButton>
          </Box>
        </Grid>
        <Grid padding="10px" item>
          {!!taskToEdit && (
            <LoadingButton
              loading={isDeleteLoading}
              sx={{
                border: '2px solid red',
                color: 'red',
                ':hover': { border: '2px solid #cf0000', color: '#cf0000' },
              }}
              variant="outlined"
              onClick={handleDeleteTask}
            >
              Delete Task
            </LoadingButton>
          )}
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default AddTaskDrawer;
