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

    static makeTextForRead(text) {
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
        const {
            classes,
            id,
            action,
            value,
            actionIsFill,
            handler,
            result,
            handlerIsFill,
            sign,
            editing,
            onRemoteDelete,
        } = this.props;

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<Icons.ExpandMore />}>
                    <div className={classes.field}>
                        <Typography className={classes.typography}>
                            {JCardRule.makeTextForRead(action)}
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
                            {JCardRule.makeTextForRead(handler)}
                        </Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ paddingTop: 0, paddingBottom: 14 }}>
                    <div className={classes.field}>
                        <Select
                            value={sign}
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
                                root: (editing && actionIsFill)
                                    ? classes.textFieldRootEditing
                                    : classes.textFieldRoot
                            }}
                            disabled={!editing || !actionIsFill}
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
                                root: (editing && handlerIsFill)
                                    ? classes.textFieldRootEditing
                                    : classes.textFieldRoot
                            }}
                            disabled={!editing || !handlerIsFill}
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
                                onClick={() => onRemoteDelete(id)}
                                fullWidth>
                                <Icons.Delete />
                                Удалить
                            </Button>
                        </ExpansionPanelActions>
                    </div>
                )}
            </ExpansionPanel>
        );
    }

}

JCardRule.defaultProps = { sign: '' };
JCardRule = withStyles(styles, { withTheme: true })(JCardRule);
export default JCardRule;