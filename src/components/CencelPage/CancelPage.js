import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

import useHttp from '../../hooks/use-Http';

const STRIPE_CANCEL_URL = "https://dev1.unikbase.dev/meveo/rest/cancelStripeSession"
const data = {
    title:"Commande annulee",
    email:'',
    description:[]
}

function CancelPage() {
  let ses_id = localStorage.getItem('session_id');
  const {isLoading:isLoading,hasError:httpError,sendRequest:sendRequest,setIsLoading:setIsLoading,setHttpError:setHttpError} = useHttp({url:`${STRIPE_CANCEL_URL}/${ses_id}`,method: 'POST'})


  useEffect(() => {
    if(ses_id){
        sendRequest().catch((error) => {
          setIsLoading(false);
          setHttpError(error.message);
        }).then( (url) => {
            console.log(url)
        })    
        console.log("CANCELED SUCCESSFULLY")
        //  localStorage.clear();
        ses_id = null;
    }
  },ses_id)

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none'} }} />
      <CssBaseline />
      <Container component="main" sx={{pr:'0.5rem',pl:'0.5rem',height:'60rem' }} xs={6} sm={12}>

      {/* Hero unit */}
      <Container disableGutters maxWidth="md" component="main" sx={{ pb: 4,pr:'0.5rem',pl:'0.5rem',pt: '4rem', color:'#F3EFEA'}} xs={6} sm={12}>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="#F3EFEA"
          gutterBottom
          sx={{ fontFamily: 'Rubik', fontWeight:600, mb:'1rem', pb:'0rem'}}        
          >
          {data.title}
        </Typography>
        <Typography variant="h5" align="center" color="#EA5123" component="p" sx={{mb:'1rem',fontFamily: 'Rubik',fontWeight:400}}>
        Votre commande a ete annulee <a href="./index.html">cliquez ici</a> pour commander le double digital de votre objet        </Typography >
        <Typography variant="h5" align="center" color="#EA5123" component="p" sx={{mb:'1rem',fontFamily: 'Rubik',fontWeight:400}}>
        <a href={`mailto:${data.email}`}>{data.email}</a>
        </Typography >
        
        <ul >
                    {data.description.map((item) => (
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
      </Container>

    </React.Fragment>
  );
}

export default CancelPage


