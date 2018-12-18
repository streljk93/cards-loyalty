// libraries
import React from 'react';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    withStyles, Button, CardActions,
} from '@material-ui/core';
import { QRCode } from 'react-qr-svg';

// own components
import styles from '../styles/JCardStoreStyles';
import JCardValue from './JCardValue';
import * as Icons from "@material-ui/icons";

class JCardUser extends React.Component {

    render() {
        const { classes, id, image, qrcode, name, number, isactive } = this.props;
        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent className={isactive ? classes.top : classes.topDisabled}>
                        <Typography color="textSecondary" className={classes.topNumber}>
                            {number}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        className={isactive ? classes.media : classes.mediaDisabled}
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
                        <Typography
                            gutterBottom
                            variant="headline"
                            component="h2"
                            className={isactive ? '' : classes.textDisabled}>
                            {name}
                        </Typography>
                        <div>
                            <JCardValue
                                icon='StarHalf'
                                unit='Бонусы'
                                value='50'
                                href='/users'
                                isactive={isactive}
                            />
                            <JCardValue
                                icon='Cake'
                                unit='Подарок'
                                value='Ногти без лака и без полировки'
                                href='/users'
                                isactive={isactive}
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <Grid container>
                            <Grid item xs={6}>
                                <Button
                                    variant='outlined'
                                    size='small'
                                    color='primary'
                                    onClick={() => console.log('update')}
                                    className={classes.cardActionLeft}
                                    fullWidth>
                                    <Icons.Edit style={{ paddingRight: 5 }} />
                                    изменить
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                {isactive ? (
                                    <Button
                                        variant='outlined'
                                        size='small'
                                        color='secondary'
                                        onClick={() => this.props.onRemoteDelete(id)}
                                        className={classes.cardActionRight}
                                        fullWidth>
                                        <Icons.VisibilityOff style={{ paddingRight: 5 }} />
                                        отключить
                                    </Button>
                                ) : (
                                    <Button
                                        variant='outlined'
                                        size='small'
                                        color='primary'
                                        onClick={() => this.props.onRemoteRestore(id)}
                                        className={classes.cardActionRight}
                                        fullWidth>
                                        <Icons.RemoveRedEye style={{ paddingRight: 5 }} />
                                        включить
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        );
    }

}

JCardUser = withStyles(styles, { withTheme: true })(JCardUser);

export default JCardUser;