// libraries
import { connect } from 'react-redux';

// actions
import { fetchRuleList } from "../actions/rule";
import { fetchRuleTypeList } from "../actions/ruleType";
import { fetchActionList } from "../actions/action";
import { fetchHandlerList } from "../actions/handler";

// component
import JCardRule from '../components/JCardRule';

const mapStateToProps = state => ({
    rule: state.rule,
    ruleType: state.ruleType,
    action: state.action,
    handler: state.handler,
});

const mapDispatchToProps = dispatch => ({
    onFetchRuleList: () => dispatch(fetchRuleList()),
    onFetchRuleTypeList: () => dispatch(fetchRuleTypeList()),
    onFetchActionList: () => dispatch(fetchActionList()),
    onFetchHandlerList: () => dispatch(fetchHandlerList()),
});

const JCardRuleContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JCardRule);

export default JCardRuleContainer;