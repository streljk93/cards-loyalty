import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import {
    Grid,
    withStyles,
} from '@material-ui/core';
import styles from '../styles/JCardsStoreStyles';

// own components
import JCardStore from './JCardStore';

moment.locale('ru');

class JCardsStore extends React.Component {

    render() {
        const { classes, items } = this.props;

        return (
            <Grid className={classes.container} container spacing={24}>
                {items.map((card, i) => {
                    return (
                        <JCardStore
                            key={i}
                            image={card.image}
                            qr={card.qr}
                            title={card.title}
                            content={card.content}
                            rules={card.rules}
                            date={moment(card.date, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY')}
                        />
                    );
                })}
            </Grid>
        );
    }

}

JCardsStore = withStyles(styles, { withTheme: true })(JCardsStore);
export default JCardsStore;