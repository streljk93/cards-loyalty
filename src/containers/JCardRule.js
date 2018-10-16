// libraries
import { connect } from 'react-redux';

// actions
import { remoteFetchRuleList } from "../actions/rule";
import { remoteFetchRuleTypeList } from "../actions/ruleType";
import { remoteFetchActionList } from "../actions/action";
import { remoteFetchHandlerList } from "../actions/handler";
import { remoteDeleteRuleCardStore, remoteUpdateRuleCardStoreField } from "../actions/ruleCardStore";

// component
import JCardRule from '../components/JCardRule';

const mapStateToProps = state => ({
    rule: state.rule,
    ruleType: state.ruleType,
    action: state.action,
    handler: state.handler,
});

const mapDispatchToProps = dispatch => ({
    onRemoteFetchRuleList: () => dispatch(remoteFetchRuleList()),
    onRemoteFetchRuleTypeList: () => dispatch(remoteFetchRuleTypeList()),
    onRemoteFetchActionList: () => dispatch(remoteFetchActionList()),
    onRemoteFetchHandlerList: () => dispatch(remoteFetchHandlerList()),
    onRemoteUpdateField: (id, field, value) => dispatch(remoteUpdateRuleCardStoreField(id, field, value)),
    onRemoteDeleteRuleCardStore: (id) => dispatch(remoteDeleteRuleCardStore(id)),
});

const JCardRuleContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JCardRule);

export default JCardRuleContainer;