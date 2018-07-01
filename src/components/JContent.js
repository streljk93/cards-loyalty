import React from 'react';
import {
    Typography,
    withStyles,
} from '@material-ui/core';
import styles from './JContentStyles.js';

class JContent extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography noWrap>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique eaque recusandae in, quam harum sunt nam nisi tempora excepturi, quaerat dolore tempore earum temporibus incidunt! Aut rem quia nisi maxime.</Typography>
            </main>
        );
    }

}

JContent = withStyles(styles, { withTheme: true })(JContent);
export default JContent;