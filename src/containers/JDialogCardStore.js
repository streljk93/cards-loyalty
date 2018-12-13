// libraries
import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Grid, Slide, withStyles } from "@material-ui/core";

// actions
import { remoteFetchCardTypeList } from "../actions/cardType";
import { remoteFetchCardStoreList } from "../actions/cardStore";
import { closeDialogCardStore } from "../actions/ui";

// own components
import JCardStore from './JCardStore';
import JHeader from "../components/JHeader";
import styles from '../styles/JDialogMediaStyles';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class JDialogCardStore extends React.Component {

    componentDidMount() {
        this.props.onRemoteFetchCardTypeList();
        this.props.onRemoteFetchCardStoreList();
    }

    addTypeInfo(card) {
        this.props.cardType.forEach(type => {
            if (type.id === card.card_type_id) {
                card.slug = type.slug;
                card.qrcode = type.qrcode;
                card.typeId = type.id;
            }
        });

        return card;
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.isOpen}
                    onClose={this.props.onCloseDialogCardStore}
                    TransitionComponent={Transition}>
                    <JHeader
                        title='JK CardStore'
                        onAction={this.props.onCloseDialogCardStore}
                        iconAction='Close'
                        isLoading={false}
                        onlyMobile
                    />
                    <div className={classes.toolbar} />
                    <div className={classes.main}>
                        <div className={classes.content} style={{ paddingTop: 24, paddingBottom: 24 }}>
                            <Grid container spacing={16}>
                                {this.props.cardStore.sort((a, b) => new Date(b.lastupdated) - new Date(a.lastupdated))
                                    .map((card, i) =>
                                            <JCardStore
                                                key={i}
                                                {...this.addTypeInfo(card)}
                                                rules={this.props.rules.filter(rule => rule.card_store_id === card.id)}
                                                onSelect={this.props.onSelect}
                                                hasSelect
                                            />
                                    )}
                            </Grid>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }

}

JDialogCardStore = connect(
    state => ({
        cardType: state.cardType.data,
        rules: state.rule.data,
        isOpen: state.ui.dialogCardStore.isOpen,
        cardStore: state.cardStore.data,
    }),
    dispatch => ({
        onRemoteFetchCardTypeList: () => dispatch(remoteFetchCardTypeList()),
        onRemoteFetchCardStoreList: () => dispatch(remoteFetchCardStoreList()),
        onCloseDialogCardStore: () => dispatch(closeDialogCardStore()),
    })
)(JDialogCardStore);
JDialogCardStore = withStyles(styles, { withTheme: true })(JDialogCardStore);

export default JDialogCardStore;