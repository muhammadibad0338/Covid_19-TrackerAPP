import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryChart from "./CountryChart"

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



const Country = () => {
  const classes = useStyles();
  const [globaldata, setglobaldata] = useState([{}])
  const [country, setcountry] = useState('1')
  const [Tc, setTc] = useState(0)
  const [Tr, setTr] = useState(0)
  const [Td, setTd] = useState(0)
  const [label, setlabel] = useState('Afghanistan')
  useEffect(() => {
    async function getdata() {
      const resp = await axios.get(`https://api.thevirustracker.com/free-api?countryTotals=ALL`)


      setglobaldata(resp.data.countryitems[0])
      /*
      console.log(resp.data.results[0])
      console.log(resp.data.results[0].total_active_cases)
      */
      setTc(resp.data.countryitems[0][country].total_cases)
      setTd(resp.data.countryitems[0][country].total_deaths)
      setTr(resp.data.countryitems[0][country].total_recovered)
      setlabel(resp.data.countryitems[0][country].title)

    }
    getdata()
  })

  const data = {
    labels: ['Total Cases', 'Total Recovered', 'Total Death'],
    datasets: [
      {
        label: `Current state in ${label}`,
        backgroundColor: [
          'rgba(0,0,255,.5)',
          'rgba(0,255,0,.5)',
          'rgba(255,0,0,.5)'
        ],
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [Tc, Tr, Td]
      }
    ]

  };
  return (
    <>
    <h1 className="heading">Country Wise Data</h1>
    <div className="selectbox">
    <InputLabel style={{marginLeft:"10px"}} id="demo-simple-select-label">Select Country</InputLabel>
      <Select  style={{width:"80%", margin:'0 auto'}} id="demo-simple-select" labelId="demo-simple-select-label" onChange={(e) => { setcountry(e.target.value) }}>
        {Object.keys(globaldata).map((val, ind) => {
          return (
            <MenuItem value={val}>{globaldata[val].title}</MenuItem>
          )
        })}
      </Select>
      </div>
      <CountryChart data={data} />
      </>

    
  )
}
export default Country