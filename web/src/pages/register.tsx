import { LoadingButton } from '@mui/lab';
import { TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import { FC } from 'react'
import Wrapper from '../components/Wrapper';
import * as yup from 'yup';
import { MeDocument, MeQuery, useMeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps {
    
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.dark
        },
        "&.MuiLoadingButton-loading": {
        backgroundColor: theme.palette.secondary.main
        },
        "&:hover.MuiLoadingButton-root": {
        boxShadow: "none"
        }
    }
}))

const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().min(8).required()
})

const Register: FC<registerProps> = ({}) => {
    const [register] = useRegisterMutation();
    const { data, loading } = useMeQuery();
    
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            username: "", 
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setErrors }) => {
            const response = await register({
                variables: values,
                update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                        __typename: "Query",
                        me: data?.register.user,
                        },
                    });
                },
            });
            if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
            } 
            else if (response.data?.register.user) { //everything worked
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
                        sx={{
                            backgroundColor: "background",
                            top: "10px"
                        }}
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
                        sx={{
                            top: "20px",
                            boxShadow: "none"
                        }}
                        className={classes.root}
                        variant="contained" 
                        fullWidth 
                        type="submit"
                        loading={formik.isSubmitting}
                    >
                        Register
                    </LoadingButton>
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

export default Register;