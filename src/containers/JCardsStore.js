import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'moment/locale/ru';
import {
    Grid,
    withStyles,
} from '@material-ui/core';

// actions
import { changeCardStoreTab, uploadCardStore } from "../actions/cardStore";

// own components
import styles from '../styles/JCardsStoreStyles';
import JCardStore from '../components/JCardStore';

class JCardsStore extends React.Component {

    addTypeInfo(card) {
        this.props.types.forEach(type => {
            if (type.id === card.card_type_id) {
                card.slug = type.slug;
                card.qrcode = type.qrcode;
            }
        });

        return card;
    }

    // componentWillUpdate() {
    //     this.dt1 = Date.now();
    // }
    //
    // componentDidUpdate() {
    //     this.dt2 = Date.now();
    //     console.log((this.dt2 - this.dt1) / 1000);
    // }

    render() {
        const { classes, items, onChangeCardStoreTab, onUploadCardEditing } = this.props;

        return (
            <Grid className={classes.container} container spacing={24}>
                {items.map((card, i) => {
                    const id = this.props.match.params.id;
                    const info = this.addTypeInfo(card);
                    return (
                        <JCardStore
                            key={info.id}
                            {...info}
                            onUploadCardEditing={onUploadCardEditing}
                            onChangeTab={onChangeCardStoreTab}
                            editing={id && id === info.id}
                        />
                    );
                })}
            </Grid>
        );
    }

}

JCardsStore = withRouter(withStyles(styles, { withTheme: true })(JCardsStore));
export default connect(
    state => ({

    }),
    dispatch => ({
        onChangeCardStoreTab: (id, tab) => dispatch(changeCardStoreTab(id, tab)),
        onUploadCardEditing: (id, data) => dispatch(uploadCardStore(id, data)),
    })
)(JCardsStore);