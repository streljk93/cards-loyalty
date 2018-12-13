// libraries
import React from 'react';
import { Button } from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// own components
import JMenu from '../components/JMenu';
import JUsers from '../components/JUsers';
import JDrawerEditor from '../components/JDrawerEditor';
import JUserEditor from '../components/JUserEditor';
import JDialogCardStore from '../containers/JDialogCardStore';

class JScreenUsers extends React.Component {

    componentDidMount() {
        this.props.onRemoteFetchUserList();
    }

    onAddUser() {
        this.props.onClearUserEditing();
        this.props.onOpenDrawerEditor();
    }

    render() {

        return (
            <div>
                <JMenu>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={this.onAddUser.bind(this)}>
                        <Icons.Add /> Добавить
                    </Button>
                </JMenu>

                <JUsers data={this.props.users} userSelected={this.props.userSelected} />

                <JDrawerEditor
                    open={this.props.drawerEditorIsOpen}
                    onSave={this.props.onRemoteSaveUser}
                    onClose={this.props.onCloseDrawerEditor}>
                    <JUserEditor
                        {...this.props.userEditing}
                        open={this.props.drawerEditorIsOpen}
                        onChangeField={this.props.onChangeUserEditingField}
                    />
                </JDrawerEditor>
                <JDialogCardStore onSelect={this.props.onSelectCardStore} />
            </div>
        );
    }

}

export default JScreenUsers;