import React from 'react';
import { withRouter } from 'react-router-dom';
import 'moment/locale/ru';
import {
    Grid,
    withStyles,
} from '@material-ui/core';

// own components
import styles from '../styles/JCardsStoreStyles';
import JCardStore from './JCardStore';

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

    render() {
        const {
            classes,
            items,
        } = this.props;

        return (
            <Grid className={classes.container} container spacing={24}>
                {items.map(card => {
                    const info = this.addTypeInfo(card);
                    return (
                        <JCardStore
                            key={info.id}
                            {...info}
                        />
                    );
                })}
            </Grid>
        );
    }

}

export default withRouter(withStyles(styles, { withTheme: true })(JCardsStore));