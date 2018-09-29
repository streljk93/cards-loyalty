import React from 'react';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import styles from '../styles/AppStyles';

// own components
import JHeader from './JHeader';
import JDrawer from './JDrawer';
import JScreenCardsStore from '../containers/JScreenCardsStore';

const menu = [[{
    icon: 'CreditCard',
    title: 'Карты',
    href: '/cards',
}, {
    icon: 'Face',
    title: 'Пользователи',
    href: '/users',
}], [{
    icon: 'Settings',
    title: 'Настройки',
    href: '/settings',
}, {
    icon: 'ExitToApp',
    title: 'Выход',
    href: '/signout',
}]];

class App extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <JHeader
                    onToggleDrawer={this.props.onToggleDrawer}
                />
                <JDrawer
                    drawerIsOpen={this.props.drawerIsOpen}
                    onToggleDrawer={this.props.onToggleDrawer}
                    menu={menu}
                />
                <main className={classes.main}>
                    <div className={classes.toolbar} />
                    <div className={classes.content}>
                        
                        <Route exact path='/cards' component={JScreenCardsStore} />
                        <Route exact path='/cards/:id' component={JScreenCardsStore} />

                    </div>
                </main>
            </div>
        );
    }

};

export default withStyles(styles, { withTheme: true })(App);