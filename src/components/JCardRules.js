import React from "react";

import JCardRule from '../containers/JCardRule';

class JCardRules extends React.Component {

    componentDidMount() {
        this.props.onRemoteFetchRuleCardStoreList();
    }

    render() {
        const ruleCS = this.props.ruleCardStore.data.filter(rule => rule.card_store_id === this.props.cardId);
        return (
            <div>
                {ruleCS && ruleCS.map((rule, i) =>
                    <JCardRule
                        key={i}
                        id={rule.id}
                        ruleId={rule.rule_id}
                        sign={rule.sign}
                        value={rule.value}
                        result={rule.result}
                        editing={this.props.editing}
                    />
                )}
            </div>
        )
    }

    // render() {
    //     const ruleCardStore = this.props.ruleCardStore.data.filter(ruleCardStore =>
    //         ruleCardStore.card_store_id === this.props.cardId
    //     );
    //     return (
    //         <Table>
    //             <TableBody>
    //                 {ruleCardStore && ruleCardStore.length > 0 && ruleCardStore.map((rule, i) =>
    //                     <JCardRule
    //                         key={i}
    //                         id={rule.id}
    //                         ruleId={rule.rule_id}
    //                         sign={rule.sign}
    //                         value={rule.value}
    //                         result={rule.result}
    //                         editing={this.props.editing}
    //                     />
    //                 )}
    //             </TableBody>
    //         </Table>
    //     );
    // }

}

export default JCardRules;