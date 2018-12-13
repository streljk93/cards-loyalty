// libraries
import { connect } from 'react-redux';

// actions
import {
    clearUserEditing,
    changeUserEditingField,
    remoteFetchUserList,
    remoteSaveUser,
} from "../actions/user";
import { openDrawerEditor, closeDrawerEditor } from "../actions/ui";

// own components
import JScreenUsers from '../screen/JScreenUsers';

export default connect(
    state => ({
        userSelected: state.user.selected,
        drawerEditorIsOpen: state.ui.drawerEditorIsOpen,
        userEditing: state.user.editing,
        users: state.user.data,
    }),
    dispatch => ({
        onClearUserEditing: () => dispatch(clearUserEditing()),
        onChangeUserEditingField: (name, value) => dispatch(changeUserEditingField(name, value)),
        onRemoteFetchUserList: () => dispatch(remoteFetchUserList()),
        onRemoteSaveUser: () => dispatch(remoteSaveUser()),
        onOpenDrawerEditor: () => dispatch(openDrawerEditor()),
        onCloseDrawerEditor: () => dispatch(closeDrawerEditor()),
    })
)(JScreenUsers);