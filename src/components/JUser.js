// libraries
import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Hidden,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// own components
import JCardsUser from './JCardsUser';
import JUserSummary from './JUserSummary';
import JUserInfo from './JUserInfo';
import JUserActions from './JUserActions';

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

                <JUserActions />

                <ExpansionPanelDetails style={{ padding: 24 }}>
                    <JCardsUser />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

}

export default JUser;