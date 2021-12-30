import { Theme } from '@mui/material';
import { FC } from 'react';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import customStyler from '../customStyler';

interface BackButtonProps {
    theme?: Theme,
    label?: string
}

const useStyles = customStyler;

const BackButton: FC<BackButtonProps> = ({ label = "Back"}) => {
    const router = useRouter();
    
    let loading = false;
    const back = async () => {
        loading = true;
        await router.push('/')
    }

    const classes = useStyles();

    return (
        <LoadingButton
            className={classes.root}
            variant="contained" 
            fullWidth 
            type="button"
            loading={loading}
            onClick={() => {
                router.push('/');
            }}
        >
            {label}
        </LoadingButton>
    )
}

export default BackButton