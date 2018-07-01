import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './ScreenAdminStyles';

// own components
import JHeader from './JHeader';
import JDrawer from './JDrawer';
import JContent from './JContent';

class ScreenAdmin extends React.Component {

    render() {
        const menu = [[{
                icon: 'CreditCard',
                title: 'Карты',
            }, {
                icon: 'Face',
                title: 'Пользователи',
            }], [{
                icon: 'Settings',
                title: 'Настройки',
            }, {
                icon: 'ExitToApp',
                title: 'Выход',
            }]];
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <JHeader />
                <JDrawer menu={menu} />
                <JContent />
            </div>
        );
    }

};

export default withStyles(styles, { withTheme: true })(ScreenAdmin);