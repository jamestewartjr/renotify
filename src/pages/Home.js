import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {FaRegStar} from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom';
// import Signup from '../components/SignupCTA'

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  hero: {
    padding: theme.spacing(12, 4, 12),
    // backgroundColor: theme.palette.background.primary,
    borderRadius: '5%',
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '1 user', 
      '10 notifications/month', 
      'Chrome',
      // 'Email support'
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  // {
  //   title: 'Pro',
  //   subheader: 'Most popular',
  //   price: '15',
  //   description: [
  //     '20 users included',
  //     '10 GB of storage',
  //     'Help center access',
  //     'Priority email support',
  //   ],
  //   buttonText: 'Get started',
  //   buttonVariant: 'contained',
  // },
  // {
  //   title: 'Enterprise',
  //   price: '30',
  //   description: [
  //     '50 users included',
  //     '30 GB of storage',
  //     'Help center access',
  //     'Phone & email support',
  //   ],
  //   buttonText: 'Contact us',
  //   buttonVariant: 'outlined',
  // },
];
const ButtonBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/register" {...props} />
));

export default function Home() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="lg" component="main" className={classes.hero}>
        <Typography component="h1" variant="h2" align="center">
          Tired of Notifications?
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Manage your notifications by deciding when you want to see them with Renotify.
        </Typography>
      </Container>

      {/* <Signup/> */}
      <Typography component="h5" variant="h2" align="center">
        Coming Soon!
      </Typography>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Pricing
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          All features are monthly limits. More pricing and features coming soon.
        </Typography>
      </Container>
      {/* End hero unit  */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <FaRegStar /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button 
                    fullWidth 
                    variant={tier.buttonVariant} 
                    color="primary"  
                    component={ButtonBehavior}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
