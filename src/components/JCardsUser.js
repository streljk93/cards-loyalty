// libraries
import React from 'react';
import { Grid } from '@material-ui/core';

// own components
import JCardUser from './JCardUser';
import JCardUserAdd from './JCardUserAdd';

class JCardsUser extends React.Component {

    render() {
        return (
            <Grid container spacing={24}>
                <JCardUser
                    image='http://www.marei.ie/wp-content/uploads/2018/04/featured-image-index.jpg'
                    qrcode='default'
                    name='Бонусная карта'
                    lastupdated='2018-09-09 11:11:11'
                />
                <JCardUser
                    image='http://www.marei.ie/wp-content/uploads/2018/04/featured-image-index.jpg'
                    qrcode='default'
                    name='Бонусная карта'
                    lastupdated='2018-09-09 11:11:11'
                />
                <JCardUser
                    image='http://www.marei.ie/wp-content/uploads/2018/04/featured-image-index.jpg'
                    qrcode='default'
                    name='Бонусная карта'
                    lastupdated='2018-09-09 11:11:11'
                />
                <JCardUser
                    image='http://www.marei.ie/wp-content/uploads/2018/04/featured-image-index.jpg'
                    qrcode='default'
                    name='Бонусная карта'
                    lastupdated='2018-09-09 11:11:11'
                />
                <JCardUserAdd />
            </Grid>
        );
    }

}

export default JCardsUser;