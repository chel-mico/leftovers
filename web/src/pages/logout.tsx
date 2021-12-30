import { LoadingButton } from '@mui/lab';
import { TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import { FC } from 'react'
import Wrapper from '../components/Wrapper';
import { MeDocument, MeQuery, useLoginMutation, useLogoutMutation, useMeQuery } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';

interface logoutProps {

}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
    root: {
        "&.MuiLoadingButton-loading": {
        backgroundColor: theme.palette.secondary.main
        },
        "&:hover.MuiLoadingButton-root": {
        boxShadow: "none"
        }
    }
}))

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
                    alignItems: "center"
                }}>
                    Are you sure you want to log out, {data!.me!.username}?
                </Typography>
                <LoadingButton
                    sx={{
                        top: "20px",
                        boxShadow: "none"
                    }}
                    className={classes.root}
                    variant="contained" 
                    fullWidth 
                    type="button"
                    loading={logoutLoading}
                    onClick={async () => {
                        await logout();
                        await client.resetStore();
                        router.push('');
                    }}
                >
                    Logout
                </LoadingButton>
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