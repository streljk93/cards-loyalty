import { connect } from 'react-redux';
import {
    fetchCardStoreList,
} from '../actions/cardStore';
import JScreenCardsStore from '../screen/JScreenCardsStore';

const mapStateToProps = (state) => ({
    cardStore: state.cardStore,
});

const mapDispatchToProps = (dispatch) => ({
    onFetchCardStoreList: () => {
        dispatch(fetchCardStoreList());
    },
});

const JScreenCardsStoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(JScreenCardsStore);
export default JScreenCardsStoreContainer;