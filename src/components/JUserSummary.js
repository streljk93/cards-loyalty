// libraries
import React from 'react';
import {
    Checkbox,
    Typography,
    Hidden,
    withStyles,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import moment from "moment/moment";

// own components
import styles from '../styles/JUserSummaryStyles';

class JUserSummary extends React.Component {

    render() {
        const { classes, lastname, firstname, middlename, dob, phone, email } = this.props;

        return (
            <div className={classes.container}>

                {/* MOBILE */}
                <Hidden mdUp>
                    <Typography>
                        <Checkbox
                            onChange={() => console.log('change')}
                            value='1'
                            color='primary'
                            style={{ marginRight: 10, padding: 0 }}
                            classes={{ root: classes.checkbox }}
                        />
                        {`${lastname || ''} ${firstname || ''} ${middlename || ''}`}
                    </Typography>
                </Hidden>
                {/* MOBILE END */}

                {/* DESKTOP */}
                <Hidden smDown>
                    <div className={classes.rowTitle}>
                        <div>
                            <Checkbox
                                onChange={() => console.log('change')}
                                value='1'
                                color='primary'
                                style={{ marginRight: 10, padding: 0 }}
                                classes={{ root: classes.checkbox }}
                            />
                        </div>
                        <Typography className={classes.cellTitle}>
                            {`${lastname || ''} ${firstname || ''} ${middlename || ''}`}
                        </Typography>
                        <Typography className={classes.cellTitle}>
                            <Icons.Today style={{ paddingRight: 10 }} />
                            {dob ? `${moment(dob, 'YYYY-MM-DD').format('DD.MM.YYYY')} [${moment().diff(dob, 'years')}]` : '-'}
                        </Typography>
                        <Typography className={classes.cellTitle}>
                            <Icons.Phone style={{ paddingRight: 10 }} /> {phone}
                        </Typography>
                        <Typography className={classes.cellTitle}>
                            <Icons.Email style={{ paddingRight: 10 }} /> {email || '-'}
                        </Typography>
                    </div>
                </Hidden>
                {/* DESKTOP END */}

            </div>
        );
    }

}

JUserSummary = withStyles(styles, { withTheme: true })(JUserSummary);

export default JUserSummary;