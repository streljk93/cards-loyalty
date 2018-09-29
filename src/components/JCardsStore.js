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
import JCardStoreEdit from './JCardStoreEdit';

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

    renderCard(info) {
        if (this.props.match.params.id) {
            if (this.props.match.params.id === info.id) {
                return (
                    <JCardStoreEdit
                        key={info.id}
                        id={info.id}
                        slug={info.slug}
                        image={info.image}
                        name={info.name}
                        description={info.description}
                        qrcode={info.qrcode}
                        lastupdated={info.lastupdated}
                    />
                );
            }
        }

        return (
            <JCardStore
                key={info.id}
                id={info.id}
                slug={info.slug}
                image={info.image}
                name={info.name}
                description={info.description}
                qrcode={info.qrcode}
                lastupdated={info.lastupdated}
            />
        );
    }

    render() {
        console.log(this.props);
        const { classes, items } = this.props;

        return (
            <Grid className={classes.container} container spacing={24}>
                {items.map((card, i) => {
                    card = this.addTypeInfo(card);
                    return this.renderCard(card);
                })}
            </Grid>
        );
    }

}

JCardsStore = withRouter(withStyles(styles, { withTheme: true })(JCardsStore));
export default JCardsStore;