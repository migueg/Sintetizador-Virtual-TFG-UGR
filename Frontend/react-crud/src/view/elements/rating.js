import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels = {
    0.5: 'Malo',
    1: 'Malo+',
    1.5: 'Pobre',
    2: 'Pobre+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Bueno',
    4: 'Bueno+',
    4.5: 'Excelente',
    5: 'Excelente+',
  };
  
  const useStyles = makeStyles({
    root: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
    },
  });
  
  export default function HoverRating(props) {
    const [value, setValue] = React.useState(3);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
            props.parentCallback(newValue)
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
      </div>
    );
  }