// libraries
import { connect } from 'react-redux';

// actions
import { remoteFetchRuleCardStoreList } from "../actions/ruleCardStore";

// component
import JCardRules from '../components/JCardRules';

const mapStateToProps = state => ({
    ruleCardStore: state.ruleCardStore,
});

const mapDispatchToProps = dispatch => ({
    onRemoteFetchRuleCardStoreList: () => dispatch(remoteFetchRuleCardStoreList()),
});

const JCardRulesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JCardRules);

export default JCardRulesContainer;