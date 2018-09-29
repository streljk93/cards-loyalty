import React from 'react';
import {
    Typography,
    TableCell,
    TableRow,
    Select,
    MenuItem,
    TextField,
} from '@material-ui/core';

class JCardRule extends React.Component {

    componentDidMount() {
        this.props.onFetchRuleList();
        this.props.onFetchRuleTypeList();
        this.props.onFetchActionList();
        this.props.onFetchHandlerList();
    }

    renderEdit({ rule, action, handler }) {
        return (
            <TableRow>
                <TableCell style={{ padding: 0 }}>
                    <Select
                        native
                        defaultValue={this.props.sign}
                        onChange={() => console.log('change')}
                        margin='dense'>
                        <option value='>'>&gt;</option>
                        <option value='>='>&gt;=</option>
                        <option value='='>=</option>
                        <option value='<'>&lt;</option>
                        <option value='<='>&lt;=</option>
                    </Select>
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                    <Typography color='textSecondary' style={{ paddingLeft: '5px', fontSize: '12px' }}>
                        {action ? action.name : ''}
                    </Typography>
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                    {this.props.value && (
                        <TextField
                            defaultValue={this.props.value}
                            onChange={() => console.log('change')}
                            margin='dense'
                            type='number'
                        />
                    )}
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                    <Typography color='textSecondary' style={{ textAlign: 'center', fontSize: '12px' }}>
                        {handler ? handler.name : ''}
                    </Typography>
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                    {this.props.result && (
                        <TextField
                            defaultValue={this.props.result}
                            onChange={() => console.log('change')}
                            margin='dense'
                        />
                    )}
                </TableCell>
            </TableRow>
        )
    }

    renderView({ rule, action, handler }) {
        return (
            <TableRow>
                <TableCell style={{ padding: 0 }}>
                    <Typography color='textSecondary' style={{ fontSize: '12px' }}>
                        {this.props.sign}
                    </Typography>
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                    <Typography color='textSecondary' style={{ paddingLeft: '5px', fontSize: '12px' }}>
                        {action ? action.name : ''}
                    </Typography>
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                    <Typography color='textSecondary' style={{ paddingLeft: '5px', fontSize: '12px' }}>
                        {this.props.value ? `(${this.props.value})` : ''}
                    </Typography>
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                    <Typography color='textSecondary' style={{ textAlign: 'center', fontSize: '12px' }}>
                        {handler ? handler.name : ''}
                    </Typography>
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                    <Typography color='textSecondary' style={{ fontSize: '12px' }}>
                        {this.props.result ? `(${this.props.result})` : ''}
                    </Typography>
                </TableCell>
            </TableRow>
        );
    }

    render() {
        const rule = this.props.rule.data.filter(rule => rule.id === this.props.ruleId)[0];
        const action = this.props.action.data.filter(action => action.id === rule.action_id)[0];
        const handler = this.props.handler.data.filter(handler => handler.id === rule.handler_id)[0];
        // const ruleType = this.props.ruleType.data.filter(ruleType => ruleType.id === rule.rule_type_id)[0];

        if (this.props.editing) return this.renderEdit({ rule, action, handler });
        return this.renderView({ rule, action, handler });
    }

}

export default JCardRule;