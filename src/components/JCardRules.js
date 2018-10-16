import React from "react";

// own components
import JCardRule from '../containers/JCardRule';
import JCardRuleAdd from '../components/JCardRuleAdd';

class JCardRules extends React.Component {

    componentDidMount() {
        this.props.onRemoteFetchRuleCardStoreList();
    }

    render() {
        const { cardId, ruleCardStore, editing } = this.props;
        const ruleCS = ruleCardStore.data.filter(rule => rule.card_store_id === cardId);

        return (
            <div>
                {ruleCS && ruleCS.map((rule, i) =>
                    <JCardRule
                        key={i}
                        id={rule.id}
                        cardStoreId={rule.card_store_id}
                        ruleId={rule.rule_id}
                        value={rule.value}
                        result={rule.result}
                        editing={editing}
                    />
                )}
                {editing && <JCardRuleAdd />}
            </div>
        )
    }

}

export default JCardRules;