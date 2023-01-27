import React from "react";
import Box from '@mui/material/Box';
import vest from '../../assets/unikbase-veste-back-3.jpg'
const ImageHandler = () => {


    return(<div>
        <Box
            sx={{
                width: '100%',
                padding:'1rem',
                height: '15rem',
                objectFit:'center',
                backgroundColor: 'white',
                '&:hover': {
                backgroundColor: 'white',
                opacity: [0.9, 0.8, 0.8],
                },

                    }}>
                <img src={vest} alt="object" style={{width:'100%',height:'100%', borderRadius:'0.5rem'}}/> {/*boxShadow:'0rem 0.5rem 1rem 0.1rem'*/}

                </Box>
                </div>
            ) 
}

export default ImageHandler