import { Theme } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react'

interface WrapperProps {
    theme?: Theme
}

const Wrapper: FC<WrapperProps> = ({ 
    children
}) => {
    return (
        <Box
            sx={{
                height: "200px",
                position: "relative",
                backgroundColor: "background.default"
            }}
        >
            <Box
                sx={{
                    margin: 0,
                    position: "absolute",
                    top: "125%",
                    left: "50%",
                    msTransform: "translate(-50%, -50%)",
                    transform: "translate(-50%, -50%)"
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

export default Wrapper