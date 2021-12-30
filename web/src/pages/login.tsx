import { LoadingButton } from '@mui/lab';
import { TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import { FC } from 'react'
import Wrapper from '../components/Wrapper';
import * as yup from 'yup';
import { MeDocument, MeQuery, useLoginMutation, useMeQuery } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import BackButton from '../components/BackButton';
import customStyler from '../customStyler';

interface loginProps {
    
}

const useStyles = customStyler;

const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
})

const Login: FC<loginProps> = ({}) => {
    const [login] = useLoginMutation();
    const { data, loading } = useMeQuery();
    
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            username: "", 
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setErrors }) => {
            const response = await login({
                variables: values,
                update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                        __typename: "Query",
                        me: data?.login.user,
                        },
                    });
                },
            });
            if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
            } 
            else if (response.data?.login.user) { //everything worked
                router.push("/");
            }
        }
    })

    const classes = useStyles();

    let body = null;
    if (loading) { //loading the user data
        //do nothing
    } else if (data?.me) { //user is already logged in
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
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        sx={{
                            backgroundColor: "background"
                        }}
                        className={classes.root}
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        fullWidth
                        className={classes.root}
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <LoadingButton
                        className={classes.root}
                        variant="contained" 
                        fullWidth 
                        type="submit"
                        loading={formik.isSubmitting}
                    >
                        Login
                    </LoadingButton>
                    <BackButton />
                </form>
            </Wrapper>
        )
    }

    return (
        <div>
            {body}
        </div>
    );
}

export default Login;