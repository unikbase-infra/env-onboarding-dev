import React, { useState,useEffect } from "react";
import Box from '@mui/material/Box';
import vest from '../../assets/unikbase-veste-back-3.jpg'
import white_image from '../../assets/white_image.jpeg'
const ImageHandler = (props) => {
    const [image , setImage] = useState(white_image);
    useEffect(() => {
        if(props.image)
        {
            setImage(props.image)
        }else{
            setImage(vest)

        }
    })
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
                <img src={image} alt="object" style={{width:'100%',height:'100%', borderRadius:'0.5rem'}}/> {/*boxShadow:'0rem 0.5rem 1rem 0.1rem'*/}

                </Box>
                </div>
            ) 
}

export default ImageHandler