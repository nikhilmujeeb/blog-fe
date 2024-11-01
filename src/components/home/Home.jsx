import React from 'react';
import { Grid } from '@mui/material';

import Banner from '../banner/Banner';
import Categories from './Categories'; // Ensure the path is correct
import Posts from './post/Posts';

const Home = () => {
    return (
        <>
            <Banner />
            <Grid container spacing={2}> 
                <Grid item lg={2} xs={12} sm={3}> 
                    <Categories />  {/* Categories component is used here */}
                </Grid>
                <Grid item container xs={12} sm={9} lg={10}>
                    <Posts />
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
