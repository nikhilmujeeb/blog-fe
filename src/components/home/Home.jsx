import React from 'react';
import { Grid } from '@mui/material';

// Components
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

const Home = () => {
    return (
        <>
            <Banner />
            <Grid container spacing={2}> {/* Added spacing for better layout */}
                <Grid item lg={2} xs={12} sm={3}> {/* Adjusted the sm breakpoint */}
                    <Categories />
                </Grid>
                <Grid item container xs={12} sm={9} lg={10}> {/* Adjusted layout */}
                    <Posts />
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
