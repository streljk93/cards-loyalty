// libraries
import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

// actions
import {
    remoteFetchCardUserList,
    remoteDeleteCardUser,
    remoteRestoreCardUser,
} from "../actions/cardUser";

// own components
import JCardUser from '../components/JCardUser';

class JCardsUser extends React.Component {

    componentDidMount() {
        this.props.onRemoteFetchCardUserList();
    }

    render() {
        const cardUserList = this.props.cardUser.filter(cardUser => cardUser.user_id === this.props.userId);
        return (
            <Grid container spacing={24}>
                {cardUserList.map((cardUser, i) => {
                    const card = this.props.cardStore.filter(card => card.id === cardUser.card_store_id)[0];
                    return (
                        <JCardUser
                            key={i}
                            id={cardUser.id}
                            image={card.image}
                            qrcode={cardUser.qrcode}
                            name={card.name}
                            number={cardUser.number}
                            isactive={cardUser.isactive}
                            onRemoteDelete={this.props.onRemoteDeleteCardUser}
                            onRemoteRestore={this.props.onRemoteRestoreCardUser}
                        />
                    );
                })}
            </Grid>
        );
    }

}

JCardsUser = connect(
    state => ({
        cardUser: state.cardUser.data,
        cardStore: state.cardStore.data,
    }),
    dispatch => ({
        onRemoteFetchCardUserList: () => dispatch(remoteFetchCardUserList()),
        onRemoteDeleteCardUser: id => dispatch(remoteDeleteCardUser(id)),
        onRemoteRestoreCardUser: id => dispatch(remoteRestoreCardUser(id)),
    })
)(JCardsUser);

export default JCardsUser;