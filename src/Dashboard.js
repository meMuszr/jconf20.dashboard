import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Cases from "./Cases";
import CasesTable from "./CasesTable";
import Websocket from "react-websocket";
import remove from "lodash/remove";
import concat from "lodash/concat";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Made with "}{" "}
      <Typography display="inline" color="error">
        &hearts;
      </Typography>
      {" in Chicago "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 340,
  },
}));

export default function Dashboard(props) {
  const [covidStats, setStats] = useState({});
  const [recentCases, setRecentCases] = useState([]);

  const handleData = (data) => {
    const result = JSON.parse(data);
    result.testDate = new Date(...[result.testDate]);
    const currentCases = remove(
      recentCases,
      (element) => element.id === result.id
    );
    const updatedRecentCases = concat(result, currentCases.slice(0, 10));

    if (result.status === "DEAD" || result.status === "RECOVERED") {
      covidStats["CONFIRMED"]--;
    } else if (result.status === "NEGATIVE" || result.status === "CONFIRMED") {
      covidStats["POTENTIAL"]--;
    }
    covidStats[result.status]++;
    setStats({ ...covidStats });
    setRecentCases(updatedRecentCases);
  };

  useEffect(() => {
    (async function () {
      const statsResponse = await fetch("http://localhost:8080/api/case/stats");
      const data = await statsResponse.json();
      setStats(data);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const recentCasesResponse = await fetch(
        "http://localhost:8080/api/case/recents"
      );
      let data = await recentCasesResponse.json();
      data = data.map((c) => {
        c.testDate = new Date(...[c.testDate]);
        return c;
      });
      setRecentCases(data);
    })();
  }, []);

  const  classes  = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <Websocket
        url="ws://localhost:8080/ws/case"
        onMessage={handleData.bind(this)}
      />
      <CssBaseline />
      <AppBar className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            COVID-19 Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart stats={covidStats} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Cases stats={covidStats} />
              </Paper>
            </Grid>
            {/* Recent Cases */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <CasesTable rows={recentCases} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
