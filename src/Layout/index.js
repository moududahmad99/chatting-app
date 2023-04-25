import React from 'react'
import './style.css'
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const RootLayout = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={1.5}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10.5}>
                    <Outlet />
                </Grid>
            </Grid>
        </div>
    )
}

export default RootLayout