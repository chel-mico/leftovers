import { LoadingButton } from '@mui/lab';
import { TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FC } from 'react'
import Wrapper from '../components/Wrapper';
import * as yup from 'yup';
import { MeDocument, MeQuery, useLoginMutation, useMeQuery } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import BackButton from '../components/BackButton';
import customStyler from '../customStyler';

interface writeRecipeProps {
    
}

const useStyles = customStyler;

const WriteRecipe: FC<writeRecipeProps> = ({}) => {
    const [writeRecipe] = useWriteRecipeMutation();
    const { data, loading } = useMeQuery();
    
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            title: ""
        },
        onSubmit: async (values, { setErrors }) => {
            const response = await writeRecipe({
                variables: values,
                update: async (_, {data}) => {
                    if (data && data.addFridgeIngredient.fridgeIngredient) {
                        client.refetchQueries({include: [FridgeDocument]});
                    }
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
            <Typography sx={{
                mr: 4,
                cursor: "pointer"
            }}>
                You aren&apos;t supposed to be here! \n Redirecting...
            </Typography>
        )
    } else {
        body = (
            <h1>HI</h1>
        )
    }

    return (
        <Wrapper>
            {body}
        </Wrapper>
    );
}

export default WriteRecipe;