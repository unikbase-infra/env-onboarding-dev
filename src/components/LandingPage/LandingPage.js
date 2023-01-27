import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import ImageHandler from './ImageHandler';


const description = [
    'A protection against theft thanks to a unique, invisible and indelible marking: In case of theft, your object can be authenticated in a sure way by the police forces and the legal authorities, via the Track & Trace technology',
    'A digital passport hosted on a private and ultra secure blockchain-based folder, that can be shared with any third party as needed : 3D-scan, photos, description, original invoice, proof of ownership, previous transactions: all compiled in a single, confidential, unforgeable and non-duplicable file.',
    'A gateway to ‘à la carte’ services : insure your valuable with some of the best insurance companies on the market, use your collectible as collateral for a loan…'
]

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#EA5123',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});


const tiers = [
  {
    title: 'Digital twin',
    price: '10',
    description: {tick:[
      'Anti-theft tagging with tracking system',
      'Proof of ownership',
      'High resolution photos',
      'Access to the Unikbase App',
      'Additional services',
      '5 years hosting guarantee by Unikbase',
      'Limited to 25 months by digital twin(renewed after 5 years)',
    ],cross:[
      'High resolution 360 \u00B0 3D scan object',
    ]},
    buttonText: 'Select Plan',
    buttonVariant: 'outlined',
  },
  {
    title: 'Digital twin & 3-D Scan',
    // subheader: 'Most popular',
    price: '15',
    description: {tick:[
      'Anti-theft tagging with tracking system',
      'Proof of ownership',
      'High resolution photos',
      'Access to the Unikbase App',
      'Additional services',
      '10 years hosting guarantee by Unikbase',
      'Limited to 100 months by digital twin(renewed after 5 years)',
      `High resolution 360 \u00B0 3D scan object`,
    ],cross:[]},
    buttonText: 'Select Plan',
    buttonVariant: 'contained',
  },
];


function LandingPageContent() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none'} }} />
      <CssBaseline />
      <Container component="main" sx={{pr:'0.5rem',pl:'0.5rem',pt: 2 }} xs={6} sm={12}>

      {/* Hero unit */}
      <Container disableGutters maxWidth="md" component="main" sx={{ pb: 4,pr:'0.5rem',pl:'0.5rem', color:'#F3EFEA'}} xs={6} sm={12}>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="#F3EFEA"
          gutterBottom
          sx={{ fontFamily: 'Rubik', fontWeight:600, mb:'1rem', pb:'0rem'}}        
          >
          Get the digital twin of your collectible from Unikbase, a partner of ThePackengers
        </Typography>
        <Typography variant="h5" align="center" color="#EA5123" component="p" sx={{mb:'1rem',fontFamily: 'Rubik',fontWeight:400}}>
        Why a digital twin?
        </Typography >
        <ul >
                    {description.map((item) => (
                      <Typography
                        component="li"
                        variant="subtitle2"
                        align="center"
                        key={item}
                        sm={6}
                        sx={{fontFamily: 'Rubik',mb:'1rem', fontWeight:300}}
                      >
                        {item}
                      </Typography>
                    ))}
                    </ul>
      </Container>

      {/* End hero unit */}
      <Container maxWidth="md" component="main" sx={{padding:'0rem'}}>
        <Grid container spacing={0}  justifyContent="center">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs
              sm={6}
              md={6}
              sx={{ fontWeight: 800, padding:'0rem 1rem 1rem 1rem', mb:2}}
            >
                
              <Card  sx={{ display:'flex', flexDirection:'column',height:'100%', borderRadius:'0.8rem', boxShadow:'0rem 0.5rem 0.2rem 0.2rem #000', padding:1}}>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center',fontFamily:'Rubik',fontWeight:600,fontSize:'1.5rem' }}
                  action={tier.title.includes('&') ? <StarIcon color="warning"/> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                    fontSize:'0.8rem',
                    fontFamily:'Rubik',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[10]
                        : theme.palette.grey[800],
                     }}
                />
                <ImageHandler/>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 3,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary" sx={{fontFamily: 'Rubik',fontWeight:600}}>
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" fontWeight={500} sx={{fontFamily: 'Source Sans Pro'}}>
                      /Month
                    </Typography>
                  </Box>
                  <ul style={{mb:'1rem'}}>
                    {tier.description.tick.map((line) => (
                        <div style={{display:'flex',gap:'0.5rem'}}>
                        <CheckSharpIcon color="success"/>
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="left"
                        key={line}
                        sx={{fontFamily: 'Source Sans Pro'}}
                      >
                        {line}
                      </Typography>
                      </div>
                    ))}
                                        {tier.description.cross.map((line) => (
                        <div style={{display:'flex',gap:'0.5rem'}}>
                        <CloseSharpIcon color="error"/>
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="left"
                        key={line}
                        sx={{fontFamily: 'Source Sans Pro'}}
                      >
                        {line}
                      </Typography>
                      </div>
                    ))}
                  </ul>
                </CardContent>
                <TextField
                     required
                    id="standard-required"
                    // label="required"
                    defaultValue="Your Email"
                    variant="standard"
                    inputProps={{style: {fontSize: '1rem'}}}
                    sx={{justifyContent:'center',alignSelf:'center',mt:'1.5rem',mb:'0.5rem'}}
                     />
                <ThemeProvider theme={theme}>
                <CardActions sx={{marginBottom:2, alignItems:'flex-end', justifyContent:'center'}} >
                  <Button fullWidth color="primary" variant={tier.buttonVariant} sx={ { borderRadius: 3, width: 220,fontFamily:'Rubik' } } >
                    {tier.buttonText}
                  </Button>
                </CardActions>
                </ThemeProvider>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      </Container>

    </React.Fragment>
  );
}

export default function LandingPage() {
  return <LandingPageContent />;
}
