import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { handleHydrateDashboard, selectStats } from '../../features/statisticSlice'
import { Grid, FormControl, Input, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import Logo from '../../components/Logo'
// import TextField from '@material-ui/core/TextField';
import DashTable from '../../components/DashTable';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 100,
  },
  card: {
    backgroundColor: '#3f51b5'
  },
  button: {
    width: '8.5rem',
    height: '2.5rem',
    margin: theme.spacing(1),
  },
  form: {
    marginBottom: '1rem'
  }
}));

const Dashboard = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const tableArr = useSelector(selectStats)
  const [num, setNum] = useState()
  const [number, setNumber] = useState(null)
  console.log(`tableArr`, tableArr)
  console.log(`number: `, number)

  const hydrateDashboard = (val) => {
    dispatch(handleHydrateDashboard(val))
  }

  useEffect(() => {
    hydrateDashboard(number)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number])


  const handleChange = e => {
    let val = parseInt(e.target.value)
    if (isNaN(val)) {
      setNum("")
    } else {
      setNum(val)
    }
  }

  // onSubmit validate data
  const handleSubmit = e => {
    e.preventDefault()
    if (num) {
      setNumber(num)
      setNum("")
    }
  }

  return (
    <Grid container className={classes.root} justify="center" alignItems="center" direction="column" xs={12}>
      <Grid container item xs={12} justify="center" alignItems="center">
        <Logo />
      </Grid>
      <Grid container justify="space-evenly" alignItems="flex-start" xs={12}>
        <Grid container item direction="column" justify="center" alignItems="flex-start" xs={12} sm={3}>
          <Box mx="auto">
            <form onSubmit={handleSubmit}>
              <InputLabel htmlFor="my-input">Add Number</InputLabel>
              <Input value={num} onChange={handleChange} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
          </Button>
            </form>
            {/* <form className={classes.form} noValidate autoComplete="off">
              <TextField value={num} onChange={handleChange} label="Add Number" />
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
          </Button>
            </form> */}
          </Box>
        </Grid>
        <Grid container justify="center" alignItems="flex-start" item xs={12} sm={3}>
          <Box component="span" mt={8} mx="auto">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<GetAppIcon />}
            >
              Load Data
          </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container xs={12} spacing={5} justify="center" alignItems="center">
        {tableArr.map((table, index) => {

          return (
            <Grid key={index} item xs={12} sm={6}>
              <Paper className={classes.card}>
                <Box p={1}>
                  <DashTable title={table.title} data={table.data} />
                </Box>
                {table.data2 !== null && table.data2 !== undefined && <Box p={1}>
                  <DashTable title={`After Adding: ${number}`} data={table.data2} />
                </Box>}
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  );
};

export default Dashboard;