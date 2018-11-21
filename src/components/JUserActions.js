// libraries
import React from 'react';
import { ExpansionPanelDetails, Button, Hidden, withStyles } from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// own components
import styles from '../styles/JUserActionsStyles';

class JUserActions extends React.Component {

    onDelete() {
        this.props.onOpenAlert(
            'Удаление пользователя',
            'Вы уверины что хотите удалить пользователя?',
            () => console.log('ok'),
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <ExpansionPanelDetails className={classes.container}>
                <div className={classes.leftSide}>
                    <div>

                        {/* DESKTOP */}
                        <Hidden smDown>
                            <Button
                                color='primary'
                                size='small'
                                variant='outlined'>
                                добавить карту
                            </Button>
                        </Hidden>
                        {/* DESKTOP END */}

                        {/* MOBILE */}
                        <Hidden mdUp>
                            <Button
                                variant='outlined'
                                color='primary'
                                size='small'
                                style={{ minWidth: 50 }}>
                                <Icons.CardGiftcard />
                            </Button>
                        </Hidden>
                        {/* MOBILE END */}

                    </div>
                    <div className={classes.rightSide}>

                        {/* DESKTOP */}
                        <Hidden smDown>
                            <Button
                                color='primary'
                                size='small'
                                variant='outlined'
                                onClick={this.props.onOpenDrawerEditor}
                                style={{ marginRight: 8 }}>
                                редактировать
                            </Button>
                            <Button
                                color='secondary'
                                size='small'
                                onClick={this.onDelete.bind(this)}
                                variant='outlined'>
                                удалить
                            </Button>
                        </Hidden>
                        {/* DESKTOP END */}

                        {/* MOBILE */}
                        <Hidden mdUp>
                            <Button
                                variant='outlined'
                                color='primary'
                                size='small'
                                onClick={this.props.onOpenDrawerEditor}
                                style={{ minWidth: 50, marginRight: 8 }}>
                                <Icons.Edit />
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                size='small'
                                onClick={this.onDelete.bind(this)}
                                style={{ minWidth: 50 }}>
                                <Icons.Delete />
                            </Button>
                        </Hidden>
                        {/* MOBILE END */}

                    </div>
                </div>
            </ExpansionPanelDetails>
        );
    }

}

JUserActions = withStyles(styles, { withTheme: true })(JUserActions);

export default JUserActions;