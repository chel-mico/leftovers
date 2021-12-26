import { Button, TextField, Theme } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Form, Formik, useFormik } from 'formik';
import React, { Component } from 'react'
import Wrapper from '../components/Wrapper';

interface registerProps {
    theme: Theme
}

const Register: React.FC<registerProps> = ({}) => {
    const formik = useFormik({
        initialValues: {
            username: "", 
            password: ""
        },
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return (
        <Wrapper>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
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
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                    color="primary"
                    variant="contained" 
                    fullWidth 
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Wrapper>
    );
}

export default Register;