import React from "react";
import { connect } from 'react-redux';

// actions
import { remoteFetchRuleCardTypeList } from "../actions/ruleCardType";
import {
    remoteDeleteRuleCardStore,
    remoteFetchRuleCardStoreList,
    remoteUpdateRuleCardStoreField
} from "../actions/ruleCardStore";
import { remoteFetchRuleList } from "../actions/rule";
import { remoteFetchRuleTypeList } from "../actions/ruleType";
import { remoteFetchActionList } from "../actions/action";
import { remoteFetchHandlerList } from "../actions/handler";

// own components
import JCardRule from '../components/JCardRule';
import JCardRuleAdd from '../components/JCardRuleAdd';

class JCardRules extends React.Component {

    componentDidMount() {
        this.props.onRemoteFetchRuleCardTypeList();
        this.props.onRemoteFetchRuleCardStoreList();
        this.props.onRemoteFetchRuleList();
        this.props.onRemoteFetchRuleTypeList();
        this.props.onRemoteFetchActionList();
        this.props.onRemoteFetchHandlerList();
    }

    render() {
        const { cardId, editing } = this.props;
        const ruleCardStoreList = this.props.ruleCardStore.data.filter(rule => rule.card_store_id === cardId);

        return (
            <div>
                {ruleCardStoreList.map((ruleCardStore, i) => {
                    const rule = this.props.rule.data.filter(r => r.id === ruleCardStore.rule_id)[0] || {};
                    const action = this.props.action.data.filter(a => a.id === rule.action_id)[0] || {};
                    const handler = this.props.handler.data.filter(h => h.id === rule.handler_id)[0] || {};
                    const ruleCardType = this.props.ruleCardType.data.filter(r => r.id === ruleCardStore.rule_card_type_id)[0];

                    return (
                        <JCardRule
                            key={i}
                            id={ruleCardStore.id}
                            cardStoreId={ruleCardStore.card_store_id}
                            ruleId={ruleCardStore.rule_id}
                            action={action.name}
                            handler={handler.name}
                            value={ruleCardStore.value}
                            result={ruleCardStore.result}
                            sign={rule.sign}
                            actionIsFill={rule.action_isfill}
                            handlerIsFill={rule.handler_isfill}
                            editing={editing}
                            onRemoteUpdateField={this.props.onRemoteUpdateField}
                            onRemoteDelete={this.props.onRemoteDelete}
                        />
                    );
                })}
                {editing && (
                    <JCardRuleAdd />
                )}
            </div>
        )
    }

}

export default connect(
    state => ({
        ruleCardStore: state.ruleCardStore,
        rule: state.rule,
        ruleType: state.ruleType,
        action: state.action,
        handler: state.handler,
    }),
    dispatch => ({
        onRemoteFetchRuleCardTypeList: () => dispatch(remoteFetchRuleCardTypeList()),
        onRemoteFetchRuleCardStoreList: () => dispatch(remoteFetchRuleCardStoreList()),
        onRemoteFetchRuleList: () => dispatch(remoteFetchRuleList()),
        onRemoteFetchRuleTypeList: () => dispatch(remoteFetchRuleTypeList()),
        onRemoteFetchActionList: () => dispatch(remoteFetchActionList()),
        onRemoteFetchHandlerList: () => dispatch(remoteFetchHandlerList()),
        onRemoteUpdateField: (id, field, value) => dispatch(remoteUpdateRuleCardStoreField(id, field, value)),
        onRemoteDelete: (id) => dispatch(remoteDeleteRuleCardStore(id)),
    })
)(JCardRules);