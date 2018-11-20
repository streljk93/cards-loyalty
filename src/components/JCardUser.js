// libraries
import React from 'react';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    withStyles,
} from '@material-ui/core';
import { QRCode } from 'react-qr-svg';

// own components
import styles from '../styles/JCardStoreStyles';
import JCardValue from './JCardValue';
import moment from "moment/moment";

class JCardUser extends React.Component {

    render() {
        const { classes, image, qrcode, name, lastupdated } = this.props;
        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title={name}>
                        <div className={classes.qrcodeWrap}>
                            <QRCode
                                bgColor='#FFFFFF'
                                fgColor='#000000'
                                level='L'
                                className={classes.qrcode}
                                value={qrcode || 'notfound'}
                            />
                        </div>
                    </CardMedia>
                    <CardContent>
                        <Typography color="textSecondary">
                            {moment(lastupdated, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY')}
                        </Typography>
                        <Typography gutterBottom variant="headline" component="h2">
                            {name}
                        </Typography>
                        <div>
                            <JCardValue
                                icon='StarHalf'
                                unit='Бонусы'
                                value='50'
                                href='/users'
                            />
                            <JCardValue
                                icon='Cake'
                                unit='Подарок'
                                value='Ногти без лака и без полировки'
                                href='/users'
                            />
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

}

JCardUser = withStyles(styles, { withTheme: true })(JCardUser);

export default JCardUser;