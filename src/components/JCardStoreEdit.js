import React from 'react';
import { QRCode } from 'react-qr-svg';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    TextField,
    withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as Icons from '@material-ui/icons';
import moment from 'moment';

import styles from '../styles/JCardStoreEditStyles';
import JCardRules from "../containers/JCardRules";

moment.locale('ru');

class JCardStoreEdit extends React.Component {

    render() {
        const { classes, id, image, name, description, qrcode, lastupdated } = this.props;

        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <div>
                        <CardMedia
                            className={classes.media}
                            image={image}
                            title={name}>
                            <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', display: 'flex', padding: '4%' }}>
                                <QRCode
                                    bgColor='#FFFFFF'
                                    fgColor='#000000'
                                    level='L'
                                    style={{ height: '70%', padding: '10px', background: 'white' }}
                                    value={qrcode}
                                />
                            </div>
                        </CardMedia>
                        <CardContent>
                            <TextField
                                label='Название карты'
                                value={name}
                                onChange={() => console.log('change')}
                                margin='normal'
                                variant='outlined'
                            />
                            <TextField
                                label='Описание карты'
                                value={description}
                                onChange={() => console.log('change')}
                                margin='normal'
                                variant='outlined'
                                multiline
                                rowsMax='5'
                                style={{ width: '100%' }}
                            />
                            <div className={classes.expansions}>
                                {/* RULES */}
                                <JCardRules cardId={id} editing={true} />
                            </div>
                        </CardContent>
                    </div>
                    <CardActions>
                        <Grid container>
                            <Grid item xs={12}>
                                <Link to={`/cards/${id}`}>
                                    <Button
                                        variant='outlined'
                                        size='small'
                                        fullWidth
                                        color='primary'>
                                        <Icons.Save />
                                        сохранить
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        );
    }

}

JCardStoreEdit = withStyles(styles, { withTheme: true })(JCardStoreEdit);
export default JCardStoreEdit;