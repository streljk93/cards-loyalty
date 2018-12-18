// libraries
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Tooltip, withStyles } from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// own components
import styles from '../styles/JCardValueStyles';

class JCardValue extends React.Component {

    render() {
        const { classes, unit, icon, value, href, isactive } = this.props;
        const Icon = Icons[icon];

        return (
            <Link to={href}>
                <div className={classes.container}>
                    <Tooltip title={unit} placement='bottom-start'>
                        <Typography className={isactive ? classes.textWrap : classes.textWrapDisabled}>
                            <Icon color={isactive ? 'primary' : 'disabled'} className={classes.icon} /> {value}
                        </Typography>
                    </Tooltip>
                </div>
            </Link>
        );
    }

}

JCardValue = withStyles(styles, { withTheme: true })(JCardValue);

export default JCardValue;