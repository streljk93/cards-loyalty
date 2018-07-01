import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Hidden,
    withStyles,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import styles from './JHeaderStyles';

class JHeader extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={this.handleDrawerToggle}
                        className={classes.navIconHide}>
                        <Icons.Menu />
                    </IconButton>
                    <Typography
                        className={classes.navTitle}
                        variant='title'
                        color='inherit'
                        noWrap>
                        JK 
                        <Hidden smDown>
                            <Icons.CardGiftcard style={{
                                paddingRight: '10px',
                                paddingLeft: '10px',
                            }} />
                        </Hidden>
                        Card
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }

}

export default withStyles(styles, { withTheme: true })(JHeader);