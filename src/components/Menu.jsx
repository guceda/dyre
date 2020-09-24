import React from 'react';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';


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
  },
  restore: {
    color: 'white',
    opacity: 0.8,
    padding: '0px 10px',
  },
  speedLegend: {
    padding: '5px 10px',
    color: 'white',
    opacity: 0.8
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



const Menu = (
  {
    theme,
    open,
    title,
    stop,
    changeTheme,
    speed,
    setSpeed,
    defaultSpeed,
    characters,
    defaultCharacters,
    setCharacters
  }) => {

  const classes = useStyles();

  return (
    <Modal open={open}>
      <div className={classes.root}>
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={12}>
            <h2 className={classes.title}>{title}</h2>
          </Grid>
          <Grid item xs={12} className={classes.pauseContainer}>
            <Tooltip title="Press space bar to resume reading" arrow>
              <IconButton>
                <PauseIcon className={classes.pause} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12} className={classes.options}>
            <Grid item xs={2} style={{ marginBottom: '14px' }}>
              <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                  <Tooltip title="Change theme" arrow>
                    <Grid item>
                      <AntSwitch
                        checked={theme.id === 'light'}
                        onChange={changeTheme} name="checkedC"
                      />
                    </Grid>
                  </Tooltip>
                </Grid>
              </Typography>
            </Grid>
           
            <Grid container direction={'row'}>
              <Grid item xs={11}>
                <Typography gutterBottom style={{ color: 'white' }}>
                  Speed
                 </Typography>
                <PrettoSlider
                  onChange={(ev, value) => setSpeed(value)}
                  value={speed}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  marks={true}
                  step={20}
                  min={150}
                  max={800}
                />
              </Grid>
              {speed !== defaultSpeed &&
                <Grid item xs={1} style={{ alignSelf: 'center', marginBottom: '-21px' }}>
                  <Tooltip title="Restore default speed" arrow >
                    <IconButton
                      className={classes.restore}
                      onClick={() => setSpeed(defaultSpeed)}
                    >
                      <SettingsBackupRestoreIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>}
            </Grid>
            <Grid container direction={'row'} style={{marginLeft: '27px'}}>
              <Grid item xs={11}>
                <Typography gutterBottom style={{ color: 'white' }}>
                  Characters
                 </Typography>
                <PrettoSlider
                  onChange={(ev, value) => setCharacters(value)}
                  value={characters}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  marks={true}
                  step={1}
                  min={5}
                  max={35}
                />
              </Grid>
              {characters !== defaultCharacters &&
                <Grid item xs={1} style={{ alignSelf: 'center', marginBottom: '-21px' }}>
                  <Tooltip title="Restore default characters" arrow >
                    <IconButton
                      className={classes.restore}
                      onClick={() => setCharacters(defaultCharacters)}
                    >
                      <SettingsBackupRestoreIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>}
            </Grid>

            <Grid item xs={2} className={classes.stopContainer}>
              <Tooltip title="Stop Reading" arrow>
                <IconButton onClick={stop}>
                  <StopIcon className={classes.stop} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

        </Grid>
      </div >
    </Modal >
  );
}


export default Menu;