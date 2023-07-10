import { Box, Paper, Typography } from '@mui/material';
import { Task, UpdateTaskInput } from 'apps/frontend/src/generated/graphql';

export const TaskCard: React.FC<{
  title: string;
  content: string;
  done: boolean;
  created_at: Date;
  id: number;
  onClick: (taksToBeUpdated: UpdateTaskInput) => void;
}> = ({ title, content, done, created_at, id, onClick }) => {
  function formatTime(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const date = new Date(created_at).toDateString();
  return (
    <Paper
      onClick={() => {
        onClick({
          title,
          content,
          done,
          id,
        });
      }}
      elevation={3}
      sx={{
        padding: '1rem',
        marginBottom: '1rem',
        ':hover': { cursor: 'pointer' },
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">{content}</Typography>
      <Typography variant="body2">
        <strong>Status:</strong> {done ? 'Done' : 'Not Done'}
      </Typography>
      <Typography variant="body2">
        <strong>Created At: {formatTime(new Date(created_at))}</strong>
      </Typography>
    </Paper>
  );
};
