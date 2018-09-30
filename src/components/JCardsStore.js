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

    // componentWillUpdate() {
    //     this.dt1 = Date.now();
    // }
    //
    // componentDidUpdate() {
    //     this.dt2 = Date.now();
    //     console.log((this.dt2 - this.dt1) / 1000);
    // }

    render() {
        const { classes, items } = this.props;

        return (
            <Grid className={classes.container} container spacing={24}>
                {items.map((card, i) => {
                    const id = this.props.match.params.id;
                    const info = this.addTypeInfo(card);
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
                            editing={id && id === info.id}
                        />
                    );
                })}
            </Grid>
        );
    }

}

JCardsStore = withRouter(withStyles(styles, { withTheme: true })(JCardsStore));
export default JCardsStore;