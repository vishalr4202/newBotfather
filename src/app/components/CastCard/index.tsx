import { Card } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Kitelogo from "../../../assets/kite-logo-comp.svg";
import Button from "../Button";
import "./index.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex:'75%'
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    // backgroundSize: "100%",
    // width: 130,
    width:'100px',
    backgroundSize: "contain",
    marginRight:'15px'
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));


type Props = { title: any, handleClick?:any };

export default function CastCard(props: Props) {
    const { title,handleClick } = props;
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      style={{
        // backgroundImage:
        //   "linear-gradient(140deg, #EADEDB 0%, #88c9c7 50%, #739fe2 75%",
          height:'150px',
          borderRadius:'6px'
      }}
    >
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            Login to
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {title} 
          </Typography>
          <br />
          <div className="">
            {title == "Zerodha" || title == "Firstock" ? (
              <Button 
              formInput="buttonDiv"
              className="simpleLoginButton"
              fullWidth
              name="Login"
              disabled={false}
              type="submit"
              variant="contained"
              secondary={true}
              handleClick={handleClick}
              />
            ) : (
              <p style={{ marginTop: "0px" }}>Coming soon.....</p>
            )}
            {/* <Button onClick={click} /> */}
          </div>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        // image="https://cdn.dribbble.com/users/31864/screenshots/3666062/free_logos_dribbble_ph.jpg"
        image={
          title == "Zerodha"
            ? Kitelogo
            : "https://zerodha.com/static/images/logo.svg"
        }
      />
    </Card>
  );
}

