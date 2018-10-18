import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Select,
    MenuItem,
    OutlinedInput,
    Button,
    withStyles,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// own components
import styles from '../styles/JCardRuleAddStyles';

class JCardRuleAdd extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            action: {},
            handler: {},
            rule: {},
            ruleCardType: {},
        };

        this.getActions = this.getActions.bind(this);
        this.getHandlers = this.getHandlers.bind(this);
        this.setRule = this.setRule.bind(this);
        this.setRuleCardType = this.setRuleCardType.bind(this);
    }

    componentDidUpdate() {
        if (this.state.action.id && this.state.handler.id) {

            const ruleCardStore = this.createRuleCardStore();
            this.props.onRemoteCreate(ruleCardStore);
            this.setState({
                action: {},
                handler: {},
            });

        }
    }

    getActions() {
        const actions = [];

        this.props.ruleCardTypeList.forEach(ruleCT => {
            let isSave = true;
            const rule = this.props.rule.data.filter(r => r.id === ruleCT.rule_id)[0] || {};
            const action = this.props.action.data.filter(a => a.id === rule.action_id)[0] || {};
            actions.forEach(a => {
                if (a.id === action.id) isSave = false;
            });
            if (isSave) actions.push(action);
        });

        return actions;
    }

    getHandlers() {
        const handlers = [];

        this.props.ruleCardTypeList.forEach(ruleCT => {
            let isSave = true;
            const rule = this.props.rule.data.filter(r => r.id === ruleCT.rule_id)[0] || {};
            const handler = this.props.handler.data.filter(h => h.id === rule.handler_id)[0] || {};
            handlers.forEach(a => {
                if (a.id === handler.id) isSave = false;
            });
            if (isSave) handlers.push(handler);
        });

        return handlers;
    }

    onChangeAction(id) {
        const action = this.getActions().filter(action => action.id === id).shift();
        this.setState({ action });
    }

    onChangeHandler(id) {
        const handler = this.getHandlers().filter(handler => handler.id === id).shift();
        this.setState({ handler });
    }

    createRuleCardStore() {
        const rule = this.setRule();
        const ruleCardType = this.setRuleCardType(rule);

        return {
            ...ruleCardType,
            id: null,
            card_store_id: this.props.cardStoreId,
            rule_card_type_id: ruleCardType.id
        };
    }

    setRule() {
        const rule = this.props.rule.data.filter(rule => {
            if (rule.action_id === this.state.action.id && rule.handler_id === this.state.handler.id) {
                return true;
            }
            return false;
        }).shift();

        return rule;
    }

    setRuleCardType(rule) {
        const ruleCardType = this.props.ruleCardTypeList.filter(ruleCT => {
            if (ruleCT.rule_id === rule.id) {
                return true;
            }
            return false;
        }).shift();

        return ruleCardType;
    }

    render() {
        const { classes } = this.props;
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary classes={{
                    root: classes.expansionPanelSummeryRoot,
                    content: classes.expansionPanelSummeryContent,
                }}>
                    <Button color='primary' className={classes.buttonAdd}>
                        <Icons.Add style={{ fontSize: 18, marginRight: 5 }} />
                        Добавить правило
                    </Button>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ padding: 24 }}>
                    <div style={{ width: '100%' }}>
                        <Select
                            value={this.state.action.id || ''}
                            classes={{ select: classes.selectSelect }}
                            onChange={({ target: { value }}) => this.onChangeAction(value)}
                            input={<OutlinedInput labelWidth={0} fullWidth />}>
                            {this.getActions().map((action, i) =>
                                <MenuItem
                                    key={i}
                                    classes={{ root: classes.menuItemRoot }}
                                    value={action.id}>
                                    {action.name}
                                </MenuItem>
                            )}
                        </Select>
                        {this.state.action.id && (
                            <Select
                                value={this.state.handler.id || ''}
                                style={{ marginTop: 8 }}
                                classes={{ select: classes.selectSelect }}
                                onChange={({ target: { value }}) => this.onChangeHandler(value)}
                                input={<OutlinedInput labelWidth={0} fullWidth />}>
                                {this.getHandlers().map((handler, i) =>
                                    <MenuItem
                                        key={i}
                                        classes={{ root: classes.menuItemRoot }}
                                        value={handler.id}>
                                        {handler.name}
                                    </MenuItem>
                                )}
                            </Select>
                        )}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

}

export default withStyles(styles, { withTheme: true })(JCardRuleAdd);