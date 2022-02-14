import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

const Spinner = () => {
  return (
    <section>
      <Grid container direction='column' alignItems='center' justify='center' mt={20}>
        <Grid item>
          <CircularProgress size={100} color='secondary' />
        </Grid>
      </Grid>
    </section>
  );
};

export default Spinner;
