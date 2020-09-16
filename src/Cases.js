import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

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
        {stats.RECOVERED}
      </Typography>
      <Title>Deaths</Title>
      <Typography color="error" component="p" variant="h4">
        {stats.DEAD}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Potential cases: {stats.POTENTIAL}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
