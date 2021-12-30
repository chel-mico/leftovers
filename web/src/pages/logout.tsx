import { LoadingButton } from '@mui/lab';
import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from 'react'
import Wrapper from '../components/Wrapper';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import BackButton from '../components/BackButton';
import customStyler from '../customStyler';

interface logoutProps {

}

const useStyles = customStyler;

const Logout: FC<logoutProps> = ({}) => {
    const [logout, { loading: logoutLoading }] = useLogoutMutation();
    const { data, loading } = useMeQuery();
    const client = useApolloClient();
    
    const router = useRouter();

    const classes = useStyles();

    let body = null;
    if (loading) { //loading the user data
        //do nothing
    } else if (!data?.me) { //user isn't logged in
        router.push('/');
        body = (
            <Wrapper>
                <Typography sx={{
                    mr: 4,
                    cursor: "pointer"
                }}>
                    You aren&apos;t supposed to be here! \n Redirecting...
                </Typography>
            </Wrapper>
        )
    } else {
        body = (
            <Wrapper>
                <Typography sx={{
                    mr: 4,
                    cursor: "pointer",
                    justifyContent: "center"
                }}>
                    Are you sure you want to log out, {data!.me!.username}?
                </Typography>
                <LoadingButton
                    className={classes.root}
                    variant="contained" 
                    fullWidth 
                    type="button"
                    loading={logoutLoading}
                    onClick={async () => {
                        await logout();
                        await client.resetStore();
                        router.push('/');
                    }}
                >
                    Logout
                </LoadingButton>
                <BackButton />
            </Wrapper>
        );
    }

    return (
        <div>
            {body}
        </div>
    )
}

export default Logout;