import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    Button,
    withMobileDialog,
    withStyles,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// own components
import styles from '../styles/JDialogAddRulesStyles';

class JDialogAddRules extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    onClickOpen() {
        this.setState({ open: true });
    }

    onClose() {
        this.setState({ open: false });
    }

    render() {
        const { fullScreen, classButton } = this.props;

        return (
            <div>
                <Button
                    className={classButton}
                    variant='outlined'
                    size='small'
                    color='primary'
                    onClick={this.onClickOpen.bind(this)}
                    fullWidth>
                    <Icons.Add />
                    правило
                </Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.onClose.bind(this)}
                    area-labelledby='dialogAddRules'>
                    <DialogTitle id='dialogAddRules'>
                        Title
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eaque fuga illo mollitia odit? Adipisci atque facere laudantium non nulla officiis quae. Atque aut consequuntur dolorem nemo, nesciunt nihil voluptatibus?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' onClick={this.onClose.bind(this)}>Disagree</Button>
                        <Button color='primary' onClick={this.onClose.bind(this)}>Agree</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

JDialogAddRules = withStyles(styles, { withTheme: true })(JDialogAddRules);
JDialogAddRules = withMobileDialog({ breakpoint: 'xs' })(JDialogAddRules);

export default JDialogAddRules;