import { Autocomplete, Box, Button, Container, Grid, ListItemText, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react'
import { FridgeDocument, useAddFridgeIngredientMutation, useAllIngredientsQuery, useFridgeQuery, useRemoveFridgeIngredientMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import BackButton from '../components/BackButton';
import customStyler from '../customStyler';
import { useApolloClient } from '@apollo/client';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';

interface fridgeProps {

}

interface ingredientOptions {
    label: String,
    ingredients: String[]
}

const useStyles = customStyler;

const Fridge: FC<fridgeProps> = ({}) => {
    const client = useApolloClient();

    const { data, loading } = useFridgeQuery();

    const { data: ingredientList, loading: ingredientLoading} = useAllIngredientsQuery();
    const options: ingredientOptions = {
        label: "",
        ingredients: []
    }
    if (ingredientLoading) {
        options.label = "Loading..."
    } else if (!ingredientList?.ingredients) {
        options.label = "Can't Access :("
    } else {
        options.label = "Ingredients"
        options.ingredients = ingredientList.ingredients.map((ingredient) => {
            return ingredient.name;
        })
    }

    const [orderByIndex, setOrderByIndex] = useState(0);
    const order = ["alphabetical"]

    const [removeMessage, setRemoveMessage] = useState({message: "", index: -1});
    const [remove] = useRemoveFridgeIngredientMutation();
    const handleRemove = async (values: { name: string; }, index: number) => {
        await remove({
            variables: values,
            update: async (_, {data}) => {
                if (!data || !data.removeFridgeIngredient) {
                    setRemoveMessage({message: "There's been an issue with your request!", index});
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    setRemoveMessage({message: "", index: -1});
                } else if (data.removeFridgeIngredient.removed) {
                    setRemoveMessage({message: "Successfully removed!", index});
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    await client.refetchQueries({include: [FridgeDocument]});
                    setRemoveMessage({message: "", index: -1});
                } else {
                    setRemoveMessage({message: data.removeFridgeIngredient.errors![0], index});
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    setRemoveMessage({message: "", index: -1});
                }
            }
        })
    }

    const [addMessage, setAddMessage] = useState("");
    const [add] = useAddFridgeIngredientMutation();
    const formik = useFormik({
        initialValues: {
            name: (ingredientLoading || !ingredientList) ? "" : ingredientList.ingredients[0].name
        },
        onSubmit: async (values, { setErrors }) => {
            const response = await add({
                variables: values,
                update: async (_, {data}) => {
                    if (data && data.addFridgeIngredient.fridgeIngredient) {
                        client.refetchQueries({include: [FridgeDocument]});
                    }
                },
            });
            if (response.data?.addFridgeIngredient.errors) {
                setAddMessage(response.data.addFridgeIngredient.errors[0]);
                new Promise(resolve => setTimeout(resolve, 5000))
                    .finally(() => setAddMessage(""));
            } 
            else if (response.data?.addFridgeIngredient.fridgeIngredient) { //everything worked
                setAddMessage("Successfully added!");
                client.refetchQueries({include: [FridgeDocument]});
                new Promise(resolve => setTimeout(resolve, 2000))
                    .finally(() => setAddMessage(""));
            }
        }
    })

    const router = useRouter();

    const classes = useStyles();

    let body = null;
    if (loading) { //loading the user data
        //do nothing
    } else if (!data?.fridge) { //user isn't logged in
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
            <>
                <form onSubmit={formik.handleSubmit}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                    >
                        <Grid item xs>
                            <BackButton sx={{
                                bottom: "10px",
                                height: "100%",
                                alignSelf: "stretch"
                            }} />
                        </Grid>
                        <Grid item xs={6} px={2}>
                            <Autocomplete
                                options={options.ingredients}
                                renderInput={(params) => <TextField 
                                    {...params} 
                                    label={options.label} 
                                    name="name"
                                />}
                                className={classes.search}
                                autoComplete
                                autoHighlight
                                autoSelect
                                id="name"
                                onChange={(e, value) => {
                                    formik.setFieldValue(
                                        "name",
                                        value !== null ? value : formik.initialValues.name
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs>
                            <LoadingButton
                                className={classes.root}
                                variant="contained" 
                                fullWidth 
                                type="submit"
                                loading={formik.isSubmitting}
                                sx={{
                                    bottom: "10px",
                                    height: "100%",
                                    alignSelf: "stretch"
                                }}
                            >
                                Add
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
                <Grid 
                    container
                    direction="column"
                    mt={3}
                >
                    {addMessage}
                    {data.fridge.fridgeIngredients.map((ingredient, index) => (
                        <Box key={index} sx={{flexGrow: 1}}>
                            {/* Checking if the item is being removed */}
                            {removeMessage.index === index ? (
                                <ListItemText primary={removeMessage.message} />
                            )
                            : (
                                <Grid container justifyContent="space-between" sx={{mb: 1}}>
                                    <Grid item xs="auto">
                                        <Button sx={{textTransform: "none", width: "500px"}} className={classes.gridButton}>
                                            <ListItemText primary={ingredient.name} />
                                        </Button>
                                    </Grid>
                                    <Grid item xs="auto">
                                        <Button sx={{textTransform: "none", width: "100px", ml: "auto"}} className={classes.gridButton}
                                            onClick={() => handleRemove({name: ingredient.name}, index)}
                                        >
                                            <ListItemText primary={"remove"} />
                                        </Button>
                                        <Button sx={{textTransform: "none", width: "100px", ml: 3}} className={classes.gridButton}>
                                            <ListItemText primary={"edit"} />
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                        </Box>
                    ))}
                </Grid>
            </>
        );
    }

    return (
        <Container sx={{
            mt: 15
        }}>
            <Box sx={{
                flexShrink: 0,
                justifyContent: "space-around"
            }}>
                {body}
            </Box>
        </Container>
    )
}

export default Fridge;

function setFieldValue(arg0: string, arg1: any) {
    throw new Error('Function not implemented.');
}
