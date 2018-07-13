import React from 'react';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import styles from '../styles/AppStyles';

// own components
import JHeader from './JHeader';
import JDrawer from './JDrawer';
import JContentCardsStore from './JContentCardsStore';

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
                        
                        <Route exact path='/' component={JContentCardsStore} />
                        <Route exact path='/cards' component={JContentCardsStore} />

                    </div>
                </main>
            </div>
        );
    }

};

export default withStyles(styles, { withTheme: true })(App);