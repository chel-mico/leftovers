import { Divider, Drawer, List, ListItem, ListItemText, Theme, Toolbar } from '@mui/material'
import { useRouter } from 'next/router';
import { FC } from 'react';
import customStyler from '../customStyler';
import { useFridgeQuery, useMeQuery } from '../generated/graphql';


interface FridgeBarProps {
    theme?: Theme
}

const useStyles = customStyler;

const FridgeBar: FC<FridgeBarProps> = ({}) => {
    const { data, loading } = useFridgeQuery();
    const { data: meData, loading: meLoading } = useMeQuery();

    const classes = useStyles();

    const router = useRouter();

    const handleListItemClick = async (event: any, route: String) => {
        await router.push("/fridge");
    }

    let body = null;
    if (loading || meLoading) { //loading the user data
        //do nothing
    } else if (!data?.fridge || !meData?.me) { //user isn't logged in
        body = (
            <>
                <List>
                    <ListItem key={"You're Not Logged In!"}>
                        <ListItemText primary={"You're Not Logged In!"} />
                    </ListItem>
                    <ListItem button key={"Log In Here"}>
                        <ListItemText primary={"Log In Here"} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem key={"No Account?"}>
                        <ListItemText primary={"No Account?"} />
                    </ListItem>
                    <ListItem button key={"Register Here"}>
                        <ListItemText primary={"Register Here"} />
                    </ListItem>
                </List>
            </>
        )
    } else { //user is logged in
        body = (
            <>
                <List>
                    <ListItem key={`${meData.me.username}'s Fridge`}>
                        <ListItemText primary={`${meData.me.username}'s Fridge`} />
                    </ListItem>
                    <ListItem 
                        button={true}
                        key={"Edit Ingredients"}
                        onClick={(event) => handleListItemClick(event, "/fridge")}
                    >
                        <ListItemText primary={"Edit Ingredients"} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {data.fridge.fridgeIngredients.map((ingredient, index) => (
                        <ListItem key={ingredient.name}>
                            <ListItemText primary={ingredient.name} />
                        </ListItem>
                    ))}
                </List>
            </>
        )
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            {body}
        </Drawer>
    )
}

export default FridgeBar;