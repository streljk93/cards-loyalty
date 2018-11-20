import React from 'react';
import 'moment/locale/ru';
import {
    Grid,
    withStyles,
} from '@material-ui/core';

// own components
import styles from '../styles/JCardsStoreStyles';
import JCardStore from '../containers/JCardStore';

class JCardsStore extends React.Component {

    addTypeInfo(card) {
        this.props.types.forEach(type => {
            if (type.id === card.card_type_id) {
                card.slug = type.slug;
                card.qrcode = type.qrcode;
                card.typeId = type.id;
            }
        });

        return card;
    }

    render() {
        const {
            classes,
            items,
        } = this.props;

        return (
            <Grid className={classes.container} container spacing={24}>
                {items.map((card, i) =>
                    <JCardStore
                        key={i}
                        {...this.addTypeInfo(card)}
                        rules={this.props.rules.filter(rule => rule.card_store_id === card.id)}
                    />
                )}
            </Grid>
        );
    }

}

JCardsStore = withStyles(styles, { withTheme: true })(JCardsStore);
export default JCardsStore;