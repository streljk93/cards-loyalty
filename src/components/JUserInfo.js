// libraries
import React from 'react';
import { ExpansionPanelDetails, Typography, withStyles } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import moment from 'moment';

// own components
import styles from '../styles/JUserInfoStyles';

class JUserInfo extends React.Component {

    render() {
        const { classes, dob, phone, email } = this.props;

        return (
            <ExpansionPanelDetails className={classes.container}>
                <div>
                    <Typography className={classes.item}>
                        <Icons.Today className={classes.icon} />
                        {dob ? `${moment(dob, 'YYYY-MM-DD').format('DD.MM.YYYY')} [${moment().diff(dob, 'years')}]` : '-'}
                    </Typography>
                    <Typography className={classes.item}>
                        <Icons.Phone className={classes.icon} /> {phone}
                    </Typography>
                    <Typography className={classes.itemLast}>
                        <Icons.Email className={classes.icon} /> {email}
                    </Typography>
                </div>
            </ExpansionPanelDetails>
        );
    }

}

JUserInfo = withStyles(styles, { withTheme: true })(JUserInfo);

export default JUserInfo;