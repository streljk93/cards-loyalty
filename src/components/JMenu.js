import React from 'react';
import { Link } from 'react-router-dom';
import {
    Grid,
    Button,
    IconButton,
    withStyles,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import styles from '../styles/JMenuStyles';

// own compoenents
import JButtonFilter from './JButtonFilter';

let JMenu = (props) => {
    const { classes, links, filter } = props;
    return (
        <Grid style={{ marginLeft: '-12px', marginRight: '-12px', 'marginBottom': '15px' }} container spacing={24}>
            <Grid item md={12} className={classes.menu}>
                {links.map((link, i) => {
                    const Icon = Icons[link.icon];
                    return (
                        <Link key={i} to={link.to}>
                            {link.iconButton &&
                                <IconButton className={classes.menuItem} color={link.color} variant={link.variant}>
                                    <Icon />
                                    {link.name}
                                </IconButton>
                            }
                            {link.iconButton ||
                                <Button className={classes.menuItem} color={link.color} variant={link.variant}>
                                    <Icon />
                                    {link.name}
                                </Button>
                            }
                        </Link>
                    );
                })}
                {filter &&
                    <JButtonFilter items={filter} />
                }
            </Grid>
        </Grid>
    );
};

JMenu = withStyles(styles, { withTheme: true })(JMenu);
export default JMenu;