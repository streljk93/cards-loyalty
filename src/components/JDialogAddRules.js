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

// own components
import styles from '../styles/JDialogAddRulesStyles';

class JDialogAddRules extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    onClose() {

    }

    render() {
        const { fullScreen } = this.props;

        return (
            <Dialog
                fullScreen={fullScreen}
                open={true}
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
                    <Button color='primary'>Disagree</Button>
                    <Button color='primary'>Agree</Button>
                </DialogActions>
            </Dialog>
        );
    }

}

JDialogAddRules = withStyles(styles, { withTheme: true })(JDialogAddRules);
JDialogAddRules = withMobileDialog({ breakpoint: 'xs' })(JDialogAddRules);

export default JDialogAddRules;