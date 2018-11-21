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
import { openDrawerEditor, openAlert } from "../actions/ui";

// own components
import JCardsUser from '../components/JCardsUser';
import JUserSummary from '../components/JUserSummary';
import JUserInfo from '../components/JUserInfo';
import JUserActions from '../components/JUserActions';

class JUser extends React.Component {

    state = {
        expanded: false,
    };

    render() {
        const {
            firstname,
            middlename,
            lastname,
            email,
            phone,
            dob,
        } = this.props;

        return (
            <ExpansionPanel expanded={this.state.expanded}>
                <ExpansionPanelSummary
                    expandIcon={
                        <Icons.ExpandMore
                            onClick={() => this.setState({ expanded: !this.state.expanded })}
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
                    onOpenDrawerEditor={this.props.onOpenDrawerEditor}
                    onOpenAlert={this.props.onOpenAlert}
                />

                <ExpansionPanelDetails style={{ padding: 24 }}>
                    <JCardsUser />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

}

JUser = connect(
    null,
    dispatch => ({
        onOpenDrawerEditor: () => dispatch(openDrawerEditor()),
        onOpenAlert: (title, content, callback) => dispatch(openAlert(title, content, callback)),
    }),
)(JUser);

export default JUser;