import React, { useEffect, useState } from "react"
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { keys } from "@material-ui/core/styles/createBreakpoints";

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



const Gridss = () => {
  const classes = useStyles();
  const [globaldata, setglobaldata] = useState({})
  useEffect(() => {
    async function getdata() {
      const resp = await axios.get(`https://api.thevirustracker.com/free-api?global=stats`)

      /* 
      console.log(resp)
      console.log(resp.data.results[0])
      console.log(resp.data.results[0].total_active_cases)
      */

      delete resp.data.results[0].source
      delete resp.data.results[0].total_new_cases_today
      delete resp.data.results[0].total_unresolved
      delete resp.data.results[0].total_new_deaths_today
      setglobaldata(resp.data.results[0])
      console.log(resp.data.results[0])
    }
    getdata()
  },[])
  return (
    <>
    <br></br>
    <h1 className="heading" >Global Data</h1>
    <Grid container spacing={3} className={classes.root}>
      { Object.keys(globaldata).map((val, ind) => {
          return (
            <Grid item xs={6} sm={4} >
              <Paper className={classes.paper} elevation={3}>
                <h3>{val.toUpperCase().replace(/_/g,' ')}</h3>
                <h5 style={{color:'red'}}>{globaldata[val]}</h5>
              </Paper>
            </Grid>
          )
        })}

    </Grid>
    <br></br>
    <br></br>
    <br></br>
    </>
  )
}

export default Gridss