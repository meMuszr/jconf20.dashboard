import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  greenText: {
    color: 'green'
  },
  redText: {
    color: 'red'
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
function renderStatus(status,classes) {
  switch(status) {
  case 'RECOVERED':
  case 'NEGATIVE':
    return <Typography className={classes.greenText}>{status}</Typography>
  case 'POTENTIAL':
    return <Typography color="textSecondary">{status}</Typography>
  case 'DEAD':
    return <Typography color="error">{status}</Typography>
  default: 
    return status;
  }
}

export default function CasesTable({rows}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Cases</Title>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Age</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(0, 5).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.testDate.toDateString()}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell align="right">{renderStatus(row.status, classes)} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
