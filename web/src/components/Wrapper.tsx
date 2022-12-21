import { Theme } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react'

interface WrapperProps {
    theme?: Theme,
    width?: string,
    children: JSX.Element
}

const Wrapper: FC<WrapperProps> = ({ 
    children,
    width = "400px"
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
                    transform: "translate(-50%, -50%)",
                    width
                }}
                mt={2}
                py={2}
            >
                {children}
            </Box>
        </Box>
    );
}

export default Wrapper

/*
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
                mt={2}
                py={2}
            >
                {children}
            </Box>
        </Box>
*/