// libraries
import { connect } from 'react-redux';

// actions
import { remoteFetchCardStoreList, remoteSaveCardStore } from '../actions/cardStore';
import { remoteFetchCardTypeList } from '../actions/cardType';
import { remoteCreateRuleCardStore } from "../actions/ruleCardStore";
import { remoteFetchRuleCardTypeList } from "../actions/ruleCardType";

// screen
import JScreenCardsStore from '../screen/JScreenCardsStore';

const mapStateToProps = (state) => ({
    cardType: state.cardType.data,
    cardStore: state.cardStore.data,
    ruleCardStore: state.ruleCardStore.data,
    ruleCardType: state.ruleCardType.data,
    ruleCardTypeMeta: state.ruleCardType.meta,
    store: state.store.data,
});

const mapDispatchToProps = (dispatch) => ({
    onRemoteFetchCardTypeList: () => dispatch(remoteFetchCardTypeList()),
    onRemoteFetchCardStoreList: () => dispatch(remoteFetchCardStoreList()),
    onRemoteSaveCardStore: (cardStore) => dispatch(remoteSaveCardStore(null, cardStore)),
    onRemoteCreateRuleCardStore: (ruleCardStore) => dispatch(remoteCreateRuleCardStore(ruleCardStore)),
    onRemoteFetchRuleCardTypeList: () => dispatch(remoteFetchRuleCardTypeList()),
});

const JScreenCardsStoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JScreenCardsStore);
export default JScreenCardsStoreContainer;