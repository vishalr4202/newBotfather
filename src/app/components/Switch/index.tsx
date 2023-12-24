// import React from 'react';
// import Switch from '@material-ui/core/Switch';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';

// export default function SwitchesSize() {
//   const [checked, setChecked] = React.useState(false);

//   const toggleChecked = () => {
//     setChecked((prev) => !prev);
//   };

//   return (
//     <FormGroup>
//       <FormControlLabel
//         control={<Switch checked={checked} onChange={toggleChecked} />}
//         label="Normal"
//       />
//     </FormGroup>
//   );
// }


import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { green, purple, red } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const PurpleSwitch = withStyles({
  switchBase: {
    // color: purple[300],
    marginLeft:'0px',
    color: green[300],
    '&$checked': {
      color: red[500],
    },
    '&$checked + $track': {
      backgroundColor: red[500],
    },
    '& + $track': {
        color: green[300],
        backgroundColor: green[500],
        opacity: 1,
        border: 'none',
      },
  },
  checked: {},
  track: {},
})(Switch);

type CompProps = {
type?: string;
change?:any;
checked?:boolean
}

export default function Switches(props:CompProps) {
    const {type,change,checked} = props;
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup style={{width:'fit-content'}}>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          {type == 'strategies' ? 
          <Grid item style={{marginTop:'-7px'}}>{type === 'strategies' ? 'Manual' : null}</Grid>
          :null  
        }
          <Grid item style={{marginTop:'-7px'}}>{type === 'options' ? 'CE' : type=='Futures' ? 'Futures': type=="BUY/SELL" ? "Buy": type=="LONG/SHORT" ? "Long": null}</Grid>
          <Grid item>
          {type == 'strategies' ? 
          <FormControlLabel
          control={<PurpleSwitch checked={checked} onChange={change} name="checkedA" />}
          label={type == 'strategies' ? 'Strategies' : null}
          style={{marginLeft:'-8px'}}
        />
          :
          <FormControlLabel
          control={<PurpleSwitch checked={checked} onChange={change} name="checkedA" />}
          label={type === 'options' ? 'PE' : type=='Futures' ? 'Options': type=="BUY/SELL" ? "Sell" :type=="LONG/SHORT" ? "Short": null}
          style={{marginLeft:'-8px'}}
        />  
        }
          
          </Grid>
          {/* <Grid item>On</Grid> */}
        </Grid>
      </Typography>
    </FormGroup>
  );
}
