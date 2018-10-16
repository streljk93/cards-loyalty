import React from 'react';
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Button,
    TextField,
    Select,
    MenuItem,
    withStyles,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import { getSignList } from '../libraries/helpers';

// own components
import styles from '../styles/JCardRuleStyles';

class JCardRule extends React.Component {

    componentDidMount() {
        this.props.onRemoteFetchRuleList();
        this.props.onRemoteFetchRuleTypeList();
        this.props.onRemoteFetchActionList();
        this.props.onRemoteFetchHandlerList();
    }

    makeTextForRead(text) {
        if (!text) return '';
        else return text.split(' ').map(text => {
            if (text.length > 8) {
                text = text.slice(0, 8);
                text += '.';
            }
            return text;
        }).join(' ');
    }

    onUpdateField(field, value) {
        this.props.onRemoteUpdateField(this.props.id, field, value);
    }

    onUpdateValue(value) {
        this.onUpdateField('value', value);
    }

    onUpdateResult(value) {
        this.onUpdateField('result', value);
    }

    onUpdateSign(value) {
        this.onUpdateField('sign', value);
    }

    render() {
        const { classes, id, ruleId, value, result, editing, onRemoteDeleteRuleCardStore } = this.props;
        const rule = this.props.rule.data
            ? this.props.rule.data.filter(rule => rule.id === ruleId)[0]
            : {};
        const action = this.props.action.data && rule
            ? this.props.action.data.filter(action => action.id === rule.action_id)[0]
            : {};
        const handler = this.props.handler.data && rule
            ? this.props.handler.data.filter(handler => handler.id === rule.handler_id)[0]
            : {};
        // const ruleType = this.props.ruleType.data.filter(ruleType => ruleType.id === rule.rule_type_id)[0];
        if (rule) return (
            <ExpansionPanel onChange={() => console.log('change2')}>
                <ExpansionPanelSummary expandIcon={<Icons.ExpandMore />}>
                    <div className={classes.field}>
                        <Typography className={classes.typography}>
                            {action ? this.makeTextForRead(action.name) : ''}
                        </Typography>
                    </div>
                    <div className={classes.sign}>
                        <Icons.ArrowForward style={{
                            fontSize: 14,
                            paddingLeft: '18.5px',
                            paddingRight: '18.5px' }}
                        />
                    </div>
                    <div className={classes.field}>
                        <Typography className={classes.typography}>
                            {handler ? this.makeTextForRead(handler.name) : ''}
                        </Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ paddingTop: 0, paddingBottom: 14 }}>
                    <div className={classes.field}>
                        <Select
                            value={rule.sign}
                            classes={{
                                icon: classes.selectIcon,
                                select: classes.select,
                            }}
                            className={classes.selectField}
                            disabled={true}
                            disableUnderline={true}
                            onChange={({ target: { value }}) => this.onUpdateSign(value)}>
                            {getSignList().map((sign, i) =>
                                <MenuItem key={i} value={sign}>{sign}</MenuItem>
                            )}
                        </Select>
                    </div>
                    <div style={{ width: 51 }} />
                    <div className={classes.field}>
                        <Select
                            value='='
                            classes={{
                                icon: classes.selectIcon,
                                select: classes.select,
                            }}
                            className={classes.selectField}
                            disabled={true}
                            disableUnderline={true}
                            onChange={(target, value) => console.log(target, value)}>
                            {getSignList().map((sign, i) =>
                                <MenuItem key={i} value={sign}>{sign}</MenuItem>
                            )}
                        </Select>
                    </div>
                    <div style={{ width: 32 }} />
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <div className={classes.field}>
                        <TextField
                            value={value || ''}
                            onChange={({ target: { value }}) => this.onUpdateValue(value)}
                            margin="normal"
                            variant="outlined"
                            classes={{
                                root: (editing && rule.action_isfill)
                                    ? classes.textFieldRootEditing
                                    : classes.textFieldRoot
                            }}
                            disabled={!editing || !rule.action_isfill}
                        />
                    </div>
                    <div className={classes.sign}>
                        <Icons.ArrowForward style={{
                            fontSize: 14,
                            paddingLeft: '18.5px',
                            paddingRight: '18.5px' }}
                        />
                    </div>
                    <div className={classes.field}>
                        <TextField
                            value={result || ''}
                            onChange={({ target: { value }}) => this.onUpdateResult(value)}
                            margin="normal"
                            variant="outlined"
                            classes={{
                                root: (editing && rule.handler_isfill)
                                    ? classes.textFieldRootEditing
                                    : classes.textFieldRoot
                            }}
                            disabled={!editing || !rule.handler_isfill}
                        />
                    </div>
                    <div style={{ width: 32 }} />
                </ExpansionPanelDetails>
                {editing && (
                    <div>
                        {/*<Divider />*/}
                        <ExpansionPanelActions>
                            <Button
                                size='small'
                                color='secondary'
                                // variant='outlined'
                                style={{ flex: 1, marginLeft: 0 }}
                                onClick={() => onRemoteDeleteRuleCardStore(id)}
                                fullWidth>
                                <Icons.Delete />
                                Удалить
                            </Button>
                        </ExpansionPanelActions>
                    </div>
                )}
            </ExpansionPanel>
        );
        return (<div></div>);
    }

}

JCardRule = withStyles(styles, { withTheme: true })(JCardRule);
export default JCardRule;