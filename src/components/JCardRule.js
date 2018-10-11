import React from 'react';
import {
    Typography,
    TableCell,
    TableRow,
    IconButton,
    // Select,
    // TextField,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';

class JCardRule extends React.Component {

    componentDidMount() {
        this.props.onRemoteFetchRuleList();
        this.props.onRemoteFetchRuleTypeList();
        this.props.onRemoteFetchActionList();
        this.props.onRemoteFetchHandlerList();
    }

    renderEdit({ rule, action, handler }) {
        const { id, value, result } = this.props;
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
                        {this.props.value ? `(${value})` : ''}
                    </Typography>
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                    <Typography color='textSecondary' style={{ textAlign: 'center', fontSize: '12px' }}>
                        {handler ? handler.name : ''}
                    </Typography>
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                    <Typography color='textSecondary' style={{ fontSize: '12px' }}>
                        {this.props.result ? `(${result})` : ''}
                    </Typography>
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                    <IconButton onClick={() => this.props.onRemoteDeleteRuleCardStore(id)}>
                        <Icons.Delete />
                    </IconButton>
                </TableCell>
            </TableRow>
        );
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
        const rule = this.props.rule.data
            ? this.props.rule.data.filter(rule => rule.id === this.props.ruleId)[0]
            : {};
        const action = this.props.action.data && rule
            ? this.props.action.data.filter(action => action.id === rule.action_id)[0]
            : {};
        const handler = this.props.handler.data && rule
            ? this.props.handler.data.filter(handler => handler.id === rule.handler_id)[0]
            : {};
        // const ruleType = this.props.ruleType.data.filter(ruleType => ruleType.id === rule.rule_type_id)[0];

        if (this.props.editing) return this.renderEdit({ rule, action, handler });
        return this.renderView({ rule, action, handler });
    }

}

export default JCardRule;