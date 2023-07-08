import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
const WrongPage = () => {
  const navigate = useNavigate();
  return (
    <Grid
      marginTop={'180px'}
      flexDirection="column"
      alignItems="center"
      justifyContent={'center'}
      container
    >
      <Typography sx={{ marginTop: '40px' }} variant="h2">
        You are on the wrong side of the app.
      </Typography>
      <Button
        onClick={() => navigate('/')}
        sx={{ marginTop: '20px', padding: '10px', fontSize: '20px' }}
        variant="contained"
      >
        Go To Home Page
      </Button>
    </Grid>
  );
};

export default WrongPage;
