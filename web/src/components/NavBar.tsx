import { useApolloClient } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { AppBar, Theme, Toolbar, Typography } from '@mui/material'
import { FC } from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import NavBarLink from './NaxBarLink';

interface NavBarProps {
    theme?: Theme
}

const NavBar: FC<NavBarProps> = ({}) => {
    const { data, loading } = useMeQuery();

    let body = null;
    if (loading) { //loading the user data
        //do nothing
    } else if (!data?.me) { //user isn't logged in
        body = (
            <>
                <NavBarLink 
                    route='/login'
                    label='Login'
                />
                <NavBarLink 
                    route='/register'
                    label='Register'
                    pad={false}
                />
            </>
        )
    } else { //user is logged in
        body = (
            <>
                <Typography sx={{
                    mr: 4,
                    cursor: "pointer",
                    color: "background.default",
                }}>
                    Welcome back, {data.me.username}!
                </Typography>
                <NavBarLink 
                    route='/logout'
                    label='Logout'
                    pad={false}
                />
            </>
        )
    }

    return (
        <AppBar sx={{boxShadow: "none"}}>
            <Toolbar>
                <Typography variant="h4" sx={{
                    flexGrow: "1",
                    cursor: "pointer",
                    color: "background.default"
                }}>
                    Leftovers
                </Typography>
                {body}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar