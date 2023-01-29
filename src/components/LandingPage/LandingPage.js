import React, { useEffect, useState } from 'react';
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
import {  useSearchParams, useNavigate } from "react-router-dom"

import ImageHandler from './ImageHandler';
import useInput from "../../hooks/use-Input";
import useHttp from '../../hooks/use-Http';
import SuccessCard from '../UI/SuccessCard';

const REDIRECT_URL = "https://www.google.com";
const STRIPE_PAYMENT_URL = "https://dev1.unikbase.dev/meveo/rest/strcheckout"

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
  invalid :{
    backgroundColor:'white',
    transition: '300ms',
    display:'flex'
    ,justifyContent:'center',
    flexDirection:'column',
    '& p':{
      color:'rgb(218, 63, 63)',
      marginTop:'0',
      transition: '400ms',
      fontSize:'0.5rem',
      textAlign:'center',
      marginRight:'3rem'
    },
    }
});


const tiers = [
  {
    id:1,
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
    id:2,
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

  const [queryParameters] = useSearchParams();

  //Converting tpk_id to get price from table
  let tpk_id = queryParameters.get("tpk_id");
  const [price_item, setPriceItem] = useState({})

  let image = queryParameters.get("image");
  const {isLoading:isLoadingPost,hasError:httpPostError,sendRequest:sendPostRequest,setIsLoading:setIsLoadingPost,setHttpError:setHttpErrorPost} = useHttp({url:STRIPE_PAYMENT_URL,method: 'POST'})
  // const {isLoading:isLoadingGet,hasError:httpGetError,sendRequest:sendGetRequest,setIsLoading:setIsLoadingGet,setHttpError:setHttpErrorGet} = useHttp({url:'https://checkout.stripe.com',method: 'GET'})

  useEffect(() => {
    if(!tpk_id){
       return window.location.href = REDIRECT_URL;
    }
    const price_id = price_id_algorithm(tpk_id)
    let price_item_found = pricing_table.find(item => item.price_id === price_id);
    setPriceItem(price_item_found)
    console.log("tpk_id:",tpk_id)

 },[queryParameters,tpk_id]);

  const {
    value: enteredEmailBasicPlan,
    valueIsValid: enterEmailIsValidBasicPlan,
    hasError: emailInputIsInvalidBasicPlan,
    inputChangeHandler: emailInputChangeHandlerBasicPlan,
    inputBlurHandler: emailInputBlurHandlerBasicPlan,
    reset: resetEmailBasicPlan,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));


  const {
    value: enteredEmailPremiumPlan,
    valueIsValid: enterEmailIsValidPremiumPlan,
    hasError: emailInputIsInvalidPremiumPlan,
    inputChangeHandler: emailInputChangeHandlerPremiumPlan,
    inputBlurHandler: emailInputBlurHandlerPremiumPlan,
    reset: resetEmailPremiumPlan,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));
    //Form Validation
    let submitFormValidBasicPlan = false;
    let submitFormValidPremiumPlan = false;
    if (enterEmailIsValidBasicPlan) {
      submitFormValidBasicPlan = true;
    }
    if(enterEmailIsValidPremiumPlan){
        submitFormValidPremiumPlan = true;
    }
    ////

    const submitHandler = (event) => {
      event.preventDefault();
      console.log("Basic Email:",enteredEmailBasicPlan)
      console.log("Premium Plan:",enteredEmailPremiumPlan)
      let payload = {
        email: enteredEmailBasicPlan || enteredEmailPremiumPlan,
        tpk_id,
        value: price_item
      }
      if (submitFormValidBasicPlan || submitFormValidPremiumPlan) {
         sendPostRequest(payload).catch((error) => {
          setIsLoadingPost(false);
          setHttpErrorPost(error.message);
        })
        .then((url)=>{
        // console.log("URL",data)
        if(url){
          const session_id = url.split("https://checkout.stripe.com/c/pay/").join("")
          localStorage.setItem('session_id',session_id)
          // window.location.replace(url)
        }
        })

        // sendGetRequest().catch((error) => {
        //   setIsLoadingGet(false);
        //   setHttpErrorGet(error.message);
        // })
        if(!emailInputIsInvalidBasicPlan) {
        }
      }
      resetEmailBasicPlan()
      resetEmailPremiumPlan();
    };
    const emailInputBasicPlanClasses = emailInputIsInvalidBasicPlan ? theme.invalid : {display:'flex',justifyContent:'center'};
    const emailInputPremiumPlanClasses = emailInputIsInvalidPremiumPlan ? theme.invalid : {display:'flex',justifyContent:'center'};

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
        {isLoadingPost && <SuccessCard title="Thankyou For Requesting a Token" message="We are proceeding your order"/>}

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
                <ImageHandler image={image}/>
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
                      ${price_item.value}
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
                <ThemeProvider theme={theme}>
                  <Grid  sx={tier.id === 1 ? emailInputBasicPlanClasses : emailInputPremiumPlanClasses} >
                <TextField
                    required
                    id={tier.id}
                    label="Your Email"
                    // defaultValue="Your Email"
                    value={tier.id === 1 ? enteredEmailBasicPlan: enteredEmailPremiumPlan}
                    variant="standard"
                    inputProps={{style: {fontSize: '1rem'}}}
                    sx={{justifyContent:'center',alignSelf:'center',mt:'1.5rem',mb:'0.5rem'}}
                    onChange={tier.id === 1 ? emailInputChangeHandlerBasicPlan : emailInputChangeHandlerPremiumPlan }
                    onBlur={tier.id === 1 ? emailInputBlurHandlerBasicPlan : emailInputBlurHandlerPremiumPlan}
                     />
                    {tier.id === 1 && emailInputIsInvalidBasicPlan && <p>Only send request when email is valid -</p>}
                    {tier.id === 2 && emailInputIsInvalidPremiumPlan && <p>Only send request when email is valid -</p>} 
                    </Grid>
                <CardActions  sx={{marginBottom:2, alignItems:'flex-end', justifyContent:'center'}} >
                  <Button disabled={tier.id === 1 ? !submitFormValidBasicPlan:!submitFormValidPremiumPlan} onClick={submitHandler}  fullWidth color="primary" variant={tier.buttonVariant} sx={ { borderRadius: 3, width: 220,fontFamily:'Rubik' } } >
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

const price_id_algorithm = (tpk_id) => {
  const numbers_in_string = tpk_id.match(/\d/g);
  const numbers_in_integer = numbers_in_string.map(num => +num);
  // console.log(numbers_in_integer)
  // const modulus = number%3;
  const sum = numbers_in_integer.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    // console.log("SUM", sum)
  const price_id = sum%5;
  return price_id
}

const pricing_table = [
  {price_id:0,value:40},
  {price_id:1,value:25},
  {price_id:2,value:160},
  {price_id:3,value:70},
  {price_id:4,value:90},
]
