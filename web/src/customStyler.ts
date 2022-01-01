import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

const customStyler = makeStyles<Theme>((theme: Theme) => ({
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
        },
        marginTop: '10px',
        boxShadow: "none"
    },
    appBar: {
        boxShadow: "none",
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        zIndex: theme.zIndex.drawer
    },
    search: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.dark
        }
    }
}));

export default customStyler;