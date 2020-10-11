import React from 'react';
import {Bar,Line ,Pie} from 'react-chartjs-2';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '100%',
      margin: '0 auto',
      marginTop: 50
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }))
  

const CountryChart= (props)=>{
    
  const classes = useStyles();
    return(
        <Grid container spacing={3} className={classes.root}>
        <Bar
          data={props.data}
          width={100}
          height={50}
          options={{}}
        />
      </Grid>
    )
}
export default CountryChart;