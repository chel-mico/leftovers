import { ThemeContext } from '@emotion/react';
import { Theme } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react'

interface WrapperProps {
    theme?: Theme
}

const Wrapper: React.FC<WrapperProps> = ({ 
    children,
    theme 
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
                    top: "200%",
                    left: "50%",
                    msTransform: "translate(-50%, -50%)",
                    transform: "translate(-50%, -50%)",
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

export default Wrapper