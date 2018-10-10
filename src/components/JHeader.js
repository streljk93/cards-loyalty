import React from 'react';
import {
    AppBar,
    Toolbar,
    LinearProgress,
    IconButton,
    Typography,
    Hidden,
    withStyles,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import styles from '../styles/JHeaderStyles';

class JHeader extends React.Component {

    render() {
        const { classes, isLoading } = this.props;
        return (
            <div>
                <AppBar className={classes.appBar}>
                    {isLoading && (
                        <LinearProgress color='primary' style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                        }} />
                    )}
                    <Toolbar>
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            onClick={this.props.onToggleDrawer}
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
            </div>
        );
    }

}

export default withStyles(styles, { withTheme: true })(JHeader);