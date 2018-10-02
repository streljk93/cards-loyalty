import React from 'react';
import {
    Grid,
    withStyles,
} from '@material-ui/core';
import styles from '../styles/JMenuStyles';

let JMenu = (props) => {
    const { classes, children } = props;
    return (
        <Grid style={{ marginLeft: '-12px', marginRight: '-12px', 'marginBottom': '15px' }} container spacing={24}>
            <Grid item md={12} className={classes.menu}>
                {children}
            </Grid>
        </Grid>
    );
};

JMenu = withStyles(styles, { withTheme: true })(JMenu);
export default JMenu;