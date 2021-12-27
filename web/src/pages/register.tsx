import { LoadingButton } from '@mui/lab';
import { styled, TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import { FC } from 'react'
import Wrapper from '../components/Wrapper';

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
        }
    }
}))

const Register: FC<registerProps> = ({}) => {
    const formik = useFormik({
        initialValues: {
            username: "", 
            password: ""
        },
        onSubmit: (values) => {
            console.log(values);
        }
    })

    const classes = useStyles();

    return (
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
                        top: "20px"
                    }}
                    className={classes.root}
                    variant="contained" 
                    fullWidth 
                    type="submit"
                    loading={formik.isSubmitting}
                >
                    Submit
                </LoadingButton>
            </form>
        </Wrapper>
    );
}

export default Register;