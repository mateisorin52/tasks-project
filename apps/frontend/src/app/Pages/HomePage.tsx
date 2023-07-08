import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  InputBase,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { TaskCard } from './HomeComponents/TaskCard';
import AddTaskDrawer from './HomeComponents/AddTaskDrawer';
import { uiStore } from '../stores/uiStore';
import { observer } from 'mobx-react';
import { Task } from '../utils/types';
const HomePage = () => {
  const { setTasks } = uiStore;
  const tasksString = localStorage.getItem('tasks');

  const tasks: Task[] = tasksString ? JSON.parse(tasksString) : null;
  useEffect(() => {
    uiStore.setTasks(tasks || []);
  }, []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTaskToEdit, setSelectedTaskToEdit] = useState<Task | null>(
    null
  );
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTaskToEdit(null);
  };
  const handleOpneDrawer = () => {
    setIsDrawerOpen(true);
  };
  const handleStartEdit = (taskToEdit: Task) => {
    setSelectedTaskToEdit(taskToEdit);
    setIsDrawerOpen(true);
  };
  const handleSearch = async (e: any) => {
    simulateSearch(e.target.value);
  };
  const simulateSearch = (value: string) => {
    return new Promise<void>((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setTasks(tasks.filter((item) => item.name.includes(value)));
        resolve();
      }, 1000);
    });
  };
  const simulateSort = (type: 'asc' | 'desc') => {
    return new Promise<void>((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setTasks(
          type === 'asc'
            ? tasks.sort(
                (a, b) =>
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime()
              )
            : tasks.sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )
        );
        resolve();
      }, 1000);
    });
  };
  const handleSort = async (type: 'asc' | 'desc') => {
    await simulateSort(type);
  };
  return (
    <Grid flexDirection="column" alignItems="center" container>
      <Grid
        margin={4}
        container
        justifyContent="space-around"
        alignItems="center"
        item
      >
        <Grid item>
          <Tooltip title="Sort for date ascending ">
            <Button
              onClick={() => {
                handleSort('asc');
              }}
            >
              Sort Asc
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Sort for date descending ">
            <Button
              onClick={() => {
                handleSort('desc');
              }}
            >
              Sort desc
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <OutlinedInput placeholder="Search" onChange={handleSearch} />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleOpneDrawer}>
            Add Task
          </Button>
        </Grid>
      </Grid>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid item>
          <Box mx="auto">
            <Grid container gap="20px" flexDirection="row">
              <AddTaskDrawer
                taskToEdit={selectedTaskToEdit}
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
              />
              {uiStore.tasks.length ? (
                uiStore.tasks.map((task, index) => (
                  <Grid key={index} item>
                    <TaskCard onClick={handleStartEdit} {...task} />
                  </Grid>
                ))
              ) : (
                <Typography>No tasks</Typography>
              )}
            </Grid>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default observer(HomePage);
