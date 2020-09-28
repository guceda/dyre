import { LinearProgress, withStyles } from "@material-ui/core";


const Progress = withStyles((theme) => ({
  root: {
    height: 6,
  },
  progress: {
    zIndex: '100'
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.id === 'light' ? 200 : 700],
  },
  bar: {
    backgroundColor: 'yellow',
  },
}))(LinearProgress);


export default Progress;