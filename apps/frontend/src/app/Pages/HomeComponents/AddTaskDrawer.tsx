import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Drawer,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  UpdateTaskInput,
  useCreateTaskMutationMutation,
  useRemoveTaskMutationMutation,
  useTasksQueryQuery,
  useUpdateTaskMutationMutation,
} from 'apps/frontend/src/generated/graphql';
import { useApolloClient } from '@apollo/client';
const AddTaskDrawer: React.FC<{
  open: boolean;
  onClose: () => void;
  taskToEdit: UpdateTaskInput | null;
  filters: any;
}> = ({ open, onClose, taskToEdit, filters }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    content: '',
    done: false,
  });
  const client = useApolloClient();
  const tasksRes = useTasksQueryQuery();
  const [CreateTaskMutation, createTaskRes] = useCreateTaskMutationMutation();
  const [UpdateTaskMutation, updateTaskRes] = useUpdateTaskMutationMutation();
  const [RemoveTaskMutation, removeTaskRes] = useRemoveTaskMutationMutation();
  useEffect(() => {
    if (taskToEdit) setNewTask(taskToEdit);
  }, [taskToEdit]);

  const handleAddTask = async () => {
    if (newTask.title.trim() === '' || newTask.content.trim() === '') {
      return;
    }
    await CreateTaskMutation({
      variables: {
        createTaskInput: newTask,
      },
    });
    await tasksRes.refetch({ filters });
    client.resetStore();
    handleReset();
    onClose();
  };
  const handleEditTask = async () => {
    if (newTask.title.trim() === '' || newTask.content.trim() === '') {
      return;
    }
    await UpdateTaskMutation({
      variables: { updateTaskInput: { ...newTask, id: taskToEdit!.id } },
    });
    //await simulateEdittingTask();
    handleReset();

    onClose();
  };
  const handleDeleteTask = async () => {
    await RemoveTaskMutation({ variables: { id: taskToEdit?.id! } });
    await tasksRes.refetch({ filters });
    handleReset();

    onClose();
  };
  const handleReset = () => {
    setNewTask({
      title: '',
      content: '',
      done: false,
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
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="content"
              value={newTask.content}
              onChange={(e) =>
                setNewTask({ ...newTask, content: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <LoadingButton
              loading={updateTaskRes.loading || createTaskRes.loading}
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
              loading={removeTaskRes.loading}
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
