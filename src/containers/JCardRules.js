// libraries
import { connect } from 'react-redux';

// actions
import { fetchRuleCardStoreList } from "../actions/ruleCardStore";

// component
import JCardRules from '../components/JCardRules';

const mapStateToProps = state => ({
    ruleCardStore: state.ruleCardStore,
});

const mapDispatchToProps = dispatch => ({
    onFetchRuleCardStoreList: () => dispatch(fetchRuleCardStoreList()),
});

const JCardRulesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JCardRules);

export default JCardRulesContainer;