// libraries
import { connect } from 'react-redux';

// actions
import { remoteFetchCardStoreList } from '../actions/cardStore';
import { remoteFetchCardTypeList } from '../actions/cardType';

// screen
import JScreenCardsStore from '../screen/JScreenCardsStore';

const mapStateToProps = (state) => ({
    cardType: state.cardType.data,
    cardStore: state.cardStore.data,
    ruleCardStore: state.ruleCardStore.data,
});

const mapDispatchToProps = (dispatch) => ({
    remoteFetchCardTypeList: () => dispatch(remoteFetchCardTypeList()),
    remoteFetchCardStoreList: () => dispatch(remoteFetchCardStoreList()),
});

const JScreenCardsStoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JScreenCardsStore);
export default JScreenCardsStoreContainer;