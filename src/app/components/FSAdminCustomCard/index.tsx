import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import "./index.scss";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // display: 'flex',
            // width:550,
            paddingBottom: '20px',
            margin: '10px'
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 151,
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        playIcon: {
            height: 38,
            width: 38,
        },
    }),
);


type Props = { detailsCommodity?: any, detailsEquity?: any, net?: any, type?: any, profileDetails?: any };
export default function AdminCustomCard(props: Props) {
    const { detailsCommodity, detailsEquity, net, type, profileDetails } = props;
    const classes = useStyles();
    const headingMargin = ["adhoc_margin", "cash", "collateral", "intraday_payin", "live_balance", "opening_balance"];
    const headingProfile = ["actid", "userName", "email", "exchange", "orarr", "uprev", "requestTime"];
    console.log(profileDetails,"profileDetails")
    return (
        <Container style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Card className={classes.root} style={type == "Profile" ? { width: "550px", borderRadius: "15px" } : { width: "auto",borderRadius: "15px" }}>
                <Grid container spacing={2}>
                    {type == "Margin" ? <><Grid item xs={12} lg={6}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5" style={{ marginBottom: '15px' }}>
                                    Commodity
                                </Typography>
                                <Grid container spacing={2}>
                                    {type == "Margin" ? headingMargin?.map((ele: any, index: number) => {
                                        return (
                                            <Grid item xs={12} lg={12} key={index}>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {ele} : {detailsCommodity[ele]}
                                                </Typography>
                                            </Grid>
                                        )
                                    }) : null}
                                </Grid>
                            </CardContent>
                        </div>
                    </Grid>
                        <Grid item xs={12} lg={6}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5" style={{ marginBottom: '15px' }}>
                                        Equity
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {type == "Margin" ? headingMargin?.map((ele: any, index: number) => {
                                            return (
                                                <Grid item xs={12} lg={12} key={index}>
                                                    <Typography variant="subtitle1" color="textSecondary">
                                                        {ele} : {detailsEquity[ele]}
                                                    </Typography>
                                                </Grid>
                                            )
                                        }) : null}
                                    </Grid>
                                </CardContent>
                            </div>
                        </Grid></> : null}
                    {type == "Profile"&& <Grid item xs={12} lg={12}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5" style={{ marginBottom: '15px' }}>
                                    Profile
                                </Typography>
                                <Grid container spacing={2}>
                                    {type == "Profile" ? headingProfile?.map((ele: any, index: number) => {
                                        return (
                                            <Grid item xs={12} lg={12} key={index} >
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {ele} : {!Array.isArray(profileDetails[ele]) ? profileDetails[ele] : profileDetails[ele].join(",")}
                                                </Typography>
                                            </Grid>
                                        )
                                    }) : null}
                                </Grid>
                            </CardContent>
                        </div>
                    </Grid>}
                </Grid>
                {type == "Margin" && <Typography variant='h5' style={{ left: '1%', position: 'relative' }}>
                    Available Balance: {net}
                </Typography>}
            </Card>
        </Container>
    );
}
