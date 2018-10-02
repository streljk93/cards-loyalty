import React from "react";
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';

import JCardRule from '../containers/JCardRule';

class JCardRules extends React.Component {

    componentDidMount() {
        this.props.onFetchRuleCardStoreList();
    }

    render() {
        const ruleCardStore = this.props.ruleCardStore.data.filter(ruleCardStore =>
            ruleCardStore.card_store_id === this.props.cardId
        );
        return (
            <Table>
                <TableBody>
                    {ruleCardStore && ruleCardStore.length > 0 && ruleCardStore.map((rule, i) =>
                        <JCardRule
                            key={i}
                            ruleId={rule.rule_id}
                            sign={rule.sign}
                            value={rule.value}
                            result={rule.result}
                            editing={this.props.editing}
                        />
                    )}
                    {this.props.editing && (
                        <TableRow>
                            <TableCell colSpan={6} style={{ padding: 0 }}>
                                <Button size='small' color='default' fullWidth>
                                    <Icons.Add />
                                    Добавить правило
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        );
    }

}

export default JCardRules;