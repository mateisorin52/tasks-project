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
  ToggleButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { TaskCard } from './HomeComponents/TaskCard';
import AddTaskDrawer from './HomeComponents/AddTaskDrawer';
import { uiStore } from '../stores/uiStore';
import { observer } from 'mobx-react';

import {
  Task,
  TasksQueryQuery,
  UpdateTaskInput,
  useTasksQueryQuery,
} from '../../generated/graphql';
const HomePage = () => {
  const tasksString = localStorage.getItem('tasks');

  const tasks: TasksQueryQuery['TasksQuery'] = tasksString
    ? JSON.parse(tasksString)
    : null;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [sortByDate, setSortByDate] = useState('asc');
  const [selectedTaskToEdit, setSelectedTaskToEdit] =
    useState<UpdateTaskInput | null>(null);
  const { data, loading, error } = useTasksQueryQuery({
    variables: { filters: { search: searchFilter, sortByDate: sortByDate } },
    canonizeResults: false,
  });

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTaskToEdit(null);
  };
  const handleOpneDrawer = () => {
    setIsDrawerOpen(true);
  };
  const handleStartEdit = (taskToEdit: UpdateTaskInput) => {
    setSelectedTaskToEdit(taskToEdit);
    setIsDrawerOpen(true);
  };
  const handleSearch = async (e: any) => {};

  const handleSort = async (type: 'asc' | 'desc') => {};
  return (
    <Grid flexDirection="column" alignItems="center" container>
      <Grid
        margin={4}
        container
        justifyContent="space-around"
        alignItems="center"
        item
      >
        <FormControlLabel
          control={
            <Switch
              value={sortByDate === 'asc'}
              title={`Sort by date ${sortByDate}`}
              onChange={() =>
                setSortByDate(sortByDate === 'asc' ? 'desc' : 'asc')
              }
            />
          }
          label={`Sort by date ${sortByDate}`}
        />

        <Grid item>
          <OutlinedInput
            placeholder="Search"
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleOpneDrawer}>
            Add Task
          </Button>
        </Grid>
      </Grid>
      {error ? (
        <Typography>An error occured while processing your request</Typography>
      ) : loading ? (
        <CircularProgress />
      ) : (
        <Grid item>
          <Box mx="auto">
            <Grid container gap="20px" flexDirection="row">
              <AddTaskDrawer
                filters={{ search: searchFilter, sortByDate }}
                taskToEdit={selectedTaskToEdit}
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
              />
              {data?.TasksQuery.length ? (
                data.TasksQuery.map((task, index) => (
                  <Grid key={index} item>
                    <TaskCard
                      onClick={handleStartEdit}
                      content={task.content}
                      created_at={new Date(parseInt(task.created_at))}
                      done={task.done}
                      id={task.id}
                      title={task.title}
                    />
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
