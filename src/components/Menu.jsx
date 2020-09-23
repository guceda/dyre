import React from 'react';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';

import {
  IconButton,
  Grid,
  makeStyles,
  Modal,
  Typography,
  withStyles,
  Switch,
  Paper,
  Tooltip,
  Slider
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: ({ background }) => background,
    height: '100vh',
  },
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  title: {
    color: 'white',
    fontSize: 40,
    display: 'flex',
    justifyContent: 'center',
  },
  pause: {
    fontSize: 150,
    color: 'white',
  },
  pauseContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: '0px 30px',
  },
  stopContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  stop: {
    fontSize: 60,
    color: 'white'
  },
  switch: {
    color: 'white',
  }
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: '#F7DC6F',
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const PrettoSlider = withStyles({
  root: {
    color: 'grey',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);



const Menu = ({ theme, open, title, stop, changeTheme, speed, setSpeed }) => {

  const classes = useStyles();

  const valueText = (value) => {
    return `${value}°C`;
  }

  return (
    <Modal open={open}>
      <div className={classes.root}>
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={12}>
            <h2 className={classes.title}>{title}</h2>
          </Grid>
          <Grid item xs={12} className={classes.pauseContainer}>
            <Tooltip title="Press space bar to resume reading">
              <IconButton>
                <PauseIcon className={classes.pause} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12} className={classes.options}>
            <Grid item xs={2}>
              <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                  {/* <Grid className={classes.switch} item>dark</Grid> */}
                  <Tooltip title="Change theme">
                    <Grid item>
                      <AntSwitch checked={theme.id === 'light'} onChange={changeTheme} name="checkedC" />
                    </Grid>
                    {/* <Grid className={classes.switch} item>light</Grid> */}
                  </Tooltip>
                </Grid>
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {/* <Paper className={classes.paper}>xs=pollo</Paper> */}
            </Grid>
            <Grid item xs={4}>
              <PrettoSlider
                onChange={(ev,value) => setSpeed(value)}
                value={speed}
                getAriaValueText={valueText}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                marks={true}
                step={20}
                min={150}
                max={800}
              />
            </Grid>

            <Grid item xs={2}>
              {/* <Paper className={classes.paper}>xs=3</Paper> */}
            </Grid>
            <Grid item xs={2} className={classes.stopContainer}>
              <Tooltip title="Stop Reading">
                <IconButton onClick={stop}>
                  <StopIcon className={classes.stop} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

        </Grid>
      </div>
    </Modal>
  );
}


export default Menu;