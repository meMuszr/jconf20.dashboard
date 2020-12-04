import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Cases({stats}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Confirmed</Title>
      <Typography component="p" variant="h4">
        {stats?.CONFIRMED ?? 0}
      </Typography>
      <Title>Recovered</Title>
      <Typography component="p" variant="h4">
        {stats?.RECOVERED ?? 0}
      </Typography>
      <Title>Deaths</Title>
      <Typography color="error" component="p" variant="h4">
        {stats?.DEAD ?? 0}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Potential cases: {stats.POTENTIAL}
      </Typography>
    </React.Fragment>
  );
}
