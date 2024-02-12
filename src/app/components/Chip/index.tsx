import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
// import Chip from '@material-ui/core/Chip';
import {Chip, Avatar} from '@mui/material'
import Paper from '@material-ui/core/Paper';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

interface ChipData {
    key: number;
    label: string;
  }

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       justifyContent: 'center',
//       flexWrap: 'wrap',
//       '& > *': {
//         margin: theme.spacing(0.5),
//       },
//     },
//   }),
// );

interface Props {
    click?: any;
    active?:any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);
export default function Chips(props:Props) {
    const {click,active} = props;
//   const classes = useStyles();

//   const handleDelete = () => {
//     console.info('You clicked the delete icon.');
//   };
const classes = useStyles();
const [chipData, setChipData] = React.useState<ChipData[]>([
  { key: 0, label: 'Short Straddle' },
  { key: 1, label: 'Short Strangle' },
  { key: 2, label: 'Long Straddle' },
  { key: 3, label: 'Long Strangle' },
  { key: 4, label: 'Bull Spread' },
  { key: 5, label: 'Bear Spread' },
]);

const handleClick = (chipToDelete: any) => {
    console.info(`You clicked the Chip.${chipToDelete.key}`);
};
  return (
    <div className={classes.root}>
      {/* <Chip
        avatar={<Avatar>SS</Avatar>}
        label="Primary clickable"
        clickable
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      /> */}
         {/* <Paper component="ul" className={classes.root}> */}
      {chipData.map((data) => {
        let sh = data?.label[0] + data?.label[data?.label?.indexOf(" ")+ 1];
        return (
          <li key={data.key}>
            <Chip
              avatar={<Avatar style={{backgroundColor:data?.key == active ? 'rgba(78, 181, 141, 0.67)':'#9d9a9a',color:'white'}}>{sh}</Avatar>}
              label={data.label}
              clickable
            //   color={data?.key == active ? "green" : "primary"}
              style={{backgroundColor: data?.key == active ? 'rgba(78, 181, 141, 0.67)' : '#e0e0e0',color:data?.key == active ? 'white' : 'black'}}
            //   onDelete={handleDelete(data)}
              onClick={()=>click(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    {/* </Paper> */}
    </div>
  );
}
