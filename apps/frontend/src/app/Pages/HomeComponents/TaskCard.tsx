import { Box, Paper, Typography } from '@mui/material';
import { Task } from '../../utils/types';

export const TaskCard: React.FC<{
  name: string;
  description: string;
  done: boolean;
  created_at: Date;
  id: string;
  onClick: (taksToBeUpdated: Task) => void;
}> = ({ name, description, done, created_at, id, onClick }) => {
  function formatTime(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const date = new Date(created_at).toDateString();
  return (
    <Paper
      onClick={() => {
        onClick({ name, description, done, id, created_at });
      }}
      elevation={3}
      sx={{
        padding: '1rem',
        marginBottom: '1rem',
        ':hover': { cursor: 'pointer' },
      }}
    >
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body1">{description}</Typography>
      <Typography variant="body2">
        <strong>Status:</strong> {done ? 'Done' : 'Not Done'}
      </Typography>
      <Typography variant="body2">
        <strong>Created At: {formatTime(new Date(created_at))}</strong>
      </Typography>
    </Paper>
  );
};
