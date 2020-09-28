import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(({ spacing, palette }) => {
  return {
    card: {
      cursor: "pointer",
      background: (selected) => (`rgba(255,255,255, ${selected ? 0.9 : 0.6})`),
      margin: "7px",
      display: "flex",
      padding: spacing(2),
      minWidth: 288,
      borderRadius: 12,
      boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
      "& > *:nth-child(1)": {
        marginRight: spacing(2),
      },
      "& > *:nth-child(2)": {
        flex: "auto",
      },
      '&:hover': {
        background: (selected) => (`rgba(255,255,255, ${selected ? 1 : 0.7})`)
     },
    },
    avatar: {},
    heading: {
      margin: 0,
      fontSize: 16,
      minHeight: "45px",
    },
    subheader: {
      fontSize: 14,
      color: palette.grey[600],
      letterSpacing: "1px",
      marginBottom: 4,
      marginTop: 0,
    },
    value: {
      marginLeft: 8,
      fontSize: 14,
      color: palette.grey[500],
    },
  };
});

const useSliderStyles = makeStyles(() => ({
  root: {
    cursor: "ew-resize",
    height: 4,
  },
  rail: {
    borderRadius: 10,
    height: 4,
    backgroundColor: "rgb(202,211,216)",
  },
  track: {
    borderRadius: 10,
    height: 4,
    backgroundColor: "rgb(117,156,250)",
  },
  thumb: {
    display: "none",
  },
}));

export const KanbanCardDemo = function KanbanCard({
  onClick,
  selected,
  title,
  lang,
  words,
  level,
  speed,
  setSpeed,
}) {
  const styles = useStyles(selected);
  const sliderStyles = useSliderStyles();
  return (
    <Card onClick={onClick} className={cx(styles.card)} elevation={0}>
      <Box>
        <h3 className={styles.heading}>{title}</h3>
        <p className={styles.subheader}>{lang}</p>
        <p className={styles.subheader}>
          {`${words} words ${
            selected ? `• ${(words / speed).toFixed(1)}'⌛` : ""
          }`}
        </p>
        {selected && (
          <Box display={"flex"} alignItems={"center"}>
            <Slider
              classes={sliderStyles}
              onChange={(ev, value) => setSpeed(value)}
              value={speed}
              marks={true}
              step={10}
              min={150}
              max={1000}
            />
            <span className={styles.value}>{`${speed}`}</span>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default KanbanCardDemo;
