import { Autocomplete, Box, Button, Container, Grid, ListItemText, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react'
import { useAddFridgeIngredientMutation, useAllIngredientsQuery, useFridgeQuery, useRemoveFridgeIngredientMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import BackButton from '../components/BackButton';
import customStyler from '../customStyler';

interface fridgeProps {

}

interface ingredientOptions {
    label: String,
    ingredients: String[]
}

const useStyles = customStyler;

const Fridge: FC<fridgeProps> = ({}) => {
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

    const [removeMessage, setRemoveMessage] = useState("");
    const [remove, { loading: removeLoading}] = useRemoveFridgeIngredientMutation();
    const handleRemove = async (values: { name: string; }) => {
        const response = await remove({
            variables: values,
            // update: (cache, {data}) => {
            //     cache.modify({
            //         fields: {

            //         }
            //     })
            // }
        })
    }

    const [add, { loading: addLoading }] = useAddFridgeIngredientMutation();

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
                            renderInput={(params) => <TextField {...params} label={options.label} />}
                            className={classes.search}
                            autoComplete
                            autoHighlight
                            autoSelect
                        />
                    </Grid>
                    <Grid item xs>
                        <BackButton sx={{
                            bottom: "10px",
                            height: "100%",
                            alignSelf: "stretch"
                        }}/>
                    </Grid>
                </Grid>
                <Grid 
                    container
                    direction="column"
                    mt={3}
                >
                    {data.fridge.fridgeIngredients.map((ingredient, index) => (
                        <Box key={index} sx={{flexGrow: 1}}>
                            <Grid container key={index} justifyContent="space-between" sx={{mb: 1}}>
                                <Grid item xs="auto">
                                    <Button key={index} sx={{textTransform: "none", width: "500px"}} className={classes.gridButton}>
                                        <ListItemText primary={ingredient.name} />
                                    </Button>
                                </Grid>
                                <Grid item xs="auto">
                                    <Button key={index} sx={{textTransform: "none", width: "100px", ml: "auto"}} className={classes.gridButton}
                                        onClick={() => handleRemove({name: ingredient.name})}
                                    >
                                        <ListItemText primary={"remove"} />
                                    </Button>
                                    <Button key={index} sx={{textTransform: "none", width: "100px", ml: 3}} className={classes.gridButton}>
                                        <ListItemText primary={"edit"} />
                                    </Button>
                                </Grid>
                            </Grid>
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