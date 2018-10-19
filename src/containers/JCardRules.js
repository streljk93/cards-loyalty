import React from "react";
import { connect } from 'react-redux';

// actions
import { remoteFetchRuleCardTypeList } from "../actions/ruleCardType";
import {
    remoteFetchRuleCardStoreList,
    remoteCreateRuleCardStore,
    remoteUpdateRuleCardStoreField,
    remoteDeleteRuleCardStore,
    toggleExpandedRuleCardStore,
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
        const { cardId, cardTypeId, editing } = this.props;
        const ruleCardStoreList = this.props.ruleCardStore.data.filter(rule => rule.card_store_id === cardId);
        const ruleCardTypeList = this.props.ruleCardType.data.filter(rule => rule.card_type_id === cardTypeId);
        const ruleCardTypeListWithoutRelation = ruleCardTypeList.filter(ruleCT => {
            let isSave = true;
            ruleCardStoreList.forEach(ruleCS => {
                if (ruleCT.id === ruleCS.rule_card_type_id) isSave = false;
            });
            return isSave;
        });

        return (
            <div>
                {ruleCardStoreList.map((ruleCardStore, i) => {
                    const ruleCardType = ruleCardTypeList.filter(r => r.id === ruleCardStore.rule_card_type_id)[0] || {};
                    const rule = this.props.rule.data.filter(r => r.id === ruleCardType.rule_id)[0] || {};
                    const action = this.props.action.data.filter(a => a.id === rule.action_id)[0] || {};
                    const handler = this.props.handler.data.filter(h => h.id === rule.handler_id)[0] || {};

                    return (
                        <JCardRule
                            key={i}
                            id={ruleCardStore.id}
                            action={action.name}
                            handler={handler.name}
                            value={ruleCardStore.value}
                            result={ruleCardStore.result}
                            sign={rule.sign}
                            actionIsFill={rule.action_isfill}
                            handlerIsFill={rule.handler_isfill}
                            editing={editing}
                            isrequired={ruleCardType.isrequired}
                            isexpanded={ruleCardStore.isexpanded}
                            onToggleExpanded={this.props.onToggleExpanded}
                            onRemoteUpdateField={this.props.onRemoteUpdateField}
                            onRemoteDelete={this.props.onRemoteDelete}
                        />
                    );
                })}
                {(editing && ruleCardTypeListWithoutRelation.length > 0) && (
                    <JCardRuleAdd
                        cardStoreId={cardId}
                        ruleCardTypeList={ruleCardTypeListWithoutRelation}
                        rule={this.props.rule}
                        action={this.props.action}
                        handler={this.props.handler}
                        onRemoteCreate={this.props.onRemoteCreate}
                    />
                )}
            </div>
        )
    }

}

export default connect(
    state => ({
        ruleCardType: state.ruleCardType,
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
        onRemoteCreate: (data) => dispatch(remoteCreateRuleCardStore(data)),
        onRemoteUpdateField: (id, field, value) => dispatch(remoteUpdateRuleCardStoreField(id, field, value)),
        onRemoteDelete: (id) => dispatch(remoteDeleteRuleCardStore(id)),
        onToggleExpanded: (id) => dispatch(toggleExpandedRuleCardStore(id)),
    })
)(JCardRules);