// libraries
import { connect } from 'react-redux';

// actions
import { fetchCardStoreList } from '../actions/cardStore';
import { fetchCardTypeList } from '../actions/cardType';

// screen
import JScreenCardsStore from '../screen/JScreenCardsStore';

const mapStateToProps = (state) => ({
    cardType: state.cardType,
    cardStore: state.cardStore,
});

const mapDispatchToProps = (dispatch) => ({
    onFetchCardTypeList: () => dispatch(fetchCardTypeList()),
    onFetchCardStoreList: () => dispatch(fetchCardStoreList()),
});

const JScreenCardsStoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JScreenCardsStore);
export default JScreenCardsStoreContainer;