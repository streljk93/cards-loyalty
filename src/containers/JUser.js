// libraries
import React from 'react';
import { connect } from 'react-redux';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Hidden,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// actions
import { remoteDeleteUser, selectUserEditing, selectUser } from "../actions/user";
import { openDrawerEditor, openAlert, openDialogCardStore } from "../actions/ui";

// own components
import JCardsUser from './JCardsUser';
import JUserSummary from '../components/JUserSummary';
import JUserInfo from '../components/JUserInfo';
import JUserActions from '../components/JUserActions';

class JUser extends React.Component {

    render() {
        const {
            id,
            firstname,
            middlename,
            lastname,
            email,
            phone,
            dob,
        } = this.props;

        return (
            <ExpansionPanel expanded={this.props.selected}>
                <ExpansionPanelSummary
                    expandIcon={
                        <Icons.ExpandMore
                            onClick={() => this.props.onSelectUser(id)}
                        />
                    }
                    style={{ userSelect: 'auto', cursor: 'default' }}>
                    <JUserSummary
                        firstname={firstname}
                        middlename={middlename}
                        lastname={lastname}
                        email={email}
                        phone={phone}
                        dob={dob}
                    />
                </ExpansionPanelSummary>

                {/* MOBILE */}
                <Hidden mdUp>
                    <JUserInfo
                        dob={dob}
                        phone={phone}
                        email={email}
                    />
                </Hidden>
                {/* MOBILE END */}

                <JUserActions
                    userId={id}
                    onSelectUserEditing={this.props.onSelectUserEditing}
                    onOpenDrawerEditor={this.props.onOpenDrawerEditor}
                    onOpenAlert={this.props.onOpenAlert}
                    onRemoteDeleteUser={this.props.onRemoteDeleteUser}
                    onOpenDialogCardStore={this.props.onOpenDialogCardStore}
                />

                <ExpansionPanelDetails style={{ padding: 24 }}>
                    <JCardsUser userId={id} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

}

JUser = connect(
    null,
    dispatch => ({
        onSelectUser: (id) => dispatch(selectUser(id)),
        onSelectUserEditing: (user) => dispatch(selectUserEditing(user)),
        onRemoteDeleteUser: (id) => dispatch(remoteDeleteUser(id)),
        onOpenDrawerEditor: () => dispatch(openDrawerEditor()),
        onOpenAlert: (title, content, callback) => dispatch(openAlert(title, content, callback)),
        onOpenDialogCardStore: () => dispatch(openDialogCardStore()),
    }),
)(JUser);

export default JUser;