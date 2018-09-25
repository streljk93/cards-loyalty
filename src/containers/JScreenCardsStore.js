import { connect } from 'react-redux';
import { fetchCardStoreList } from '../actions/cardStore';
import { fetchCardTypeList } from '../actions/cardType';
import JScreenCardsStore from '../screen/JScreenCardsStore';

const mapStateToProps = (state) => ({
    cardType: state.cardType,
    cardStore: state.cardStore,
    action: state.action,
    handler: state.handler,
    ruleType: state.ruleType,
    rule: state.rule,
    ruleCardStore: state.ruleCardStore,
});

const mapDispatchToProps = (dispatch) => ({
    // load cards
    onFetchCardTypeList: () => dispatch(fetchCardTypeList()),
    onFetchCardStoreList: () => dispatch(fetchCardStoreList()),

    // load rules
    onFetchActionList: () => {},
    onFetchHandlerList: () => {},
    onFetchRuleTypeList: () => {},
    onFetchRuleList: () => {},
    onFetchRuleCardStoreList: () => {},
});

const JScreenCardsStoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JScreenCardsStore);
export default JScreenCardsStoreContainer;