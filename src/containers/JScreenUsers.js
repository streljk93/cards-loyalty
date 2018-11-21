// libraries
import { connect } from 'react-redux';

// actions
import { openDrawerEditor } from "../actions/ui";

// own components
import JScreenUsers from '../screen/JScreenUsers';

export default connect(
    state => ({
        users: state.user.data,
    }),
    dispatch => ({
        onOpenDrawerEditor: () => dispatch(openDrawerEditor()),
    })
)(JScreenUsers);