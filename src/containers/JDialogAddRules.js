import React from 'react';
import { connect } from 'react-redux';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    withMobileDialog,
    withStyles,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// actions
import { remoteFetchActionList } from "../actions/action";
import { remoteFetchHandlerList } from "../actions/handler";
import { remoteFetchRuleTypeList } from "../actions/ruleType";
import { remoteFetchRuleList } from "../actions/rule";
import { remoteFetchRuleCardStoreList } from "../actions/ruleCardStore";
import { remoteFetchCardTypeList } from "../actions/cardType";

// own components
import styles from '../styles/JDialogAddRulesStyles';

class JDialogAddRules extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rule: '',
            open: false,
        };
    }

    componentWillMount() {
        this.props.onRemoteFetchActionList();
        this.props.onRemoteFetchHandlerList();
        this.props.onRemoteFetchRuleTypeList();
        this.props.onRemoteFetchRuleList();
        this.props.onRemoteFetchRuleCardStoreList();
        this.props.onRemoteFetchCardTypeList();
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
                    // open={true}
                    onClose={this.onClose.bind(this)}
                    area-labelledby='dialogAddRules'>
                    <DialogTitle id='dialogAddRules'>
                        Новое правило
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='rules'>Label</InputLabel>
                                <Select value={this.state.rule}>
                                    <MenuItem value={1}>Lorem ipsum dolor sit amet.</MenuItem>
                                    <MenuItem value={2}>Lorem ipsum dolor sit amet.</MenuItem>
                                    <MenuItem value={3}>Lorem ipsum dolor sit amet.</MenuItem>
                                </Select>
                            </FormControl>
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
JDialogAddRules = connect(
    state => ({
        action: state.action,
        handler: state.handler,
        rule: state.rule,
        ruleCardStore: state.ruleCardStore,
        ruleCardType: state.ruleCardType,
    }),
    dispatch => ({
        onRemoteFetchActionList: () => dispatch(remoteFetchActionList()),
        onRemoteFetchHandlerList: () => dispatch(remoteFetchHandlerList()),
        onRemoteFetchRuleTypeList: () => dispatch(remoteFetchRuleTypeList()),
        onRemoteFetchRuleList: () => dispatch(remoteFetchRuleList()),
        onRemoteFetchRuleCardStoreList: () => dispatch(remoteFetchRuleCardStoreList()),
        onRemoteFetchCardTypeList: () => dispatch(remoteFetchCardTypeList()),
    })
)(JDialogAddRules);

export default JDialogAddRules;