import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import customStyler from '../customStyler';

interface BackButtonProps {
    theme?: Theme,
    label?: string,
    sx?: SxProps<Theme>
}

const useStyles = customStyler;

const BackButton: FC<BackButtonProps> = ({ 
    label = "Back",
    sx = {}
}) => {
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
            sx={sx}
        >
            {label}
        </LoadingButton>
    )
}

export default BackButton