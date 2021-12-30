import { Link, Theme } from '@mui/material';
import { FC } from 'react';
import NextLink from 'next/link';

interface NavBarLinkProps {
    theme?: Theme,
    route: string,
    label: string,
    pad?: boolean
}

const NavBarLink: FC<NavBarLinkProps> = ({ route, label, pad = true }) => {
    const padding = pad ? 4 : 0;

    return (
        <NextLink href={route}>
            <Link sx={{
                mr: padding,
                cursor: "pointer",
                color: "background.default",
                textDecoration: "none",
                "&:hover": {
                    color: "background.paper",
                    borderBottom: "none"
                },
            }}>
                {label}
            </Link>
        </NextLink>
    )
}

export default NavBarLink