import { Autocomplete, Box, Button, ButtonGroup, Container, Divider, Grid, List, ListItem, ListItemButton, ListItemText, TextField, Toolbar, Typography } from '@mui/material';
import { FC, useState } from 'react'
import Wrapper from '../components/Wrapper';
import { useAddFridgeIngredientMutation, useAllIngredientsQuery, useFridgeQuery } from '../generated/graphql';
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
    const [add, { loading: addLoading }] = useAddFridgeIngredientMutation();
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
                            <Grid container key={index}>
                                <Grid item xs={3}>
                                    <Button key={index} sx={{textTransform: "none"}}>
                                        <ListItemText primary={ingredient.name} />
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button key={index} sx={{textTransform: "none"}}>
                                        <ListItemText primary={ingredient.name} />
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