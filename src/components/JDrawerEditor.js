// libraries
import React from 'react';
import {
    Toolbar,
    Drawer,
    Button,
    withStyles
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// own components
import styles from '../styles/JDrawerEditorStyles';

class JDrawerEditor extends React.Component {

    onSave() {
        this.props.onSave();
        this.props.onClose();
    }

    render() {
        const { classes } = this.props;

        return (
            <Drawer
                anchor='right'
                variant='temporary'
                open={this.props.open}
                onClose={this.props.onClose}
                ModalProps={{
                    keepMounted: true,
                }}
                classes={{ paper: classes.drawerPaper }}>
                <Toolbar className={classes.menu}>
                    <div className={classes.menuLeftSide}>
                        <Button
                            size='small'
                            onClick={this.props.onClose}>
                            <Icons.ArrowBack className={classes.icon} />
                            Назад
                        </Button>
                    </div>
                    <div className={classes.menuRightSide}>
                        <Button
                            variant='outlined'
                            color='primary'
                            size='small'
                            onClick={this.onSave.bind(this)}>
                            <Icons.Save className={classes.icon} />
                            Сохранить
                        </Button>
                    </div>
                </Toolbar>
                <div className={classes.content}>
                    {this.props.children}
                </div>
            </Drawer>
        );
    }

}

JDrawerEditor = withStyles(styles, { withTheme: true })(JDrawerEditor);

export default JDrawerEditor;