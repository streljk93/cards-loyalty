import React from 'react';
import { QRCode } from 'react-qr-svg';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    IconButton,
    Typography,
    Tabs,
    Tab,
    TextField,
    withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as Icons from '@material-ui/icons';
import moment from 'moment';

import styles from '../styles/JCardStoreStyles';

moment.locale('ru');

class JCardStore extends React.Component {

    renderHeader() {
        const { classes, image, name, qrcode } = this.props;

        return (
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
                <CardActions>
                    <Tabs
                        value={0}
                        onChange={() => console.log('ok')}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth>
                        <Tab label="Информация" />
                        <Tab label="Правила" />
                    </Tabs>
                </CardActions>
            </div>
        );
    }

    renderHeaderEdit() {
        const { classes, theme, image, name, qrcode } = this.props;

        return (
            <div>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={name}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    }} />
                    <IconButton style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        zIndex: 2,
                    }}>
                        <Icons.AddAPhoto style={{ color: theme.palette.primary.main, fontSize: '50px' }} />
                    </IconButton>
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
                <CardActions>
                    <Tabs
                        value={0}
                        onChange={() => console.log('ok')}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth>
                        <Tab label="Информация" />
                        <Tab label="Правила" />
                    </Tabs>
                </CardActions>
            </div>
        );
    }

    renderBody() {
        const { name, description, lastupdated } = this.props;

        return (
            <CardContent>
                <Typography color="textSecondary">
                    {moment(lastupdated, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY')}
                </Typography>
                <Typography gutterBottom variant="headline" component="h2">
                    {name}
                </Typography>
                <Typography
                    color='textSecondary'
                    style={{ height: '80px', overflowY: 'auto' }}>
                    {description}
                </Typography>
            </CardContent>
        )
    }

    renderBodyEdit() {
        const { name, description } = this.props;

        return (
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
            </CardContent>
        );
    }

    renderFooter() {
        const { classes, id } = this.props;

        return (
            <CardActions>
                <Grid container>
                    <Grid item xs={6}>
                        <Link to={`/cards/${id}`}>
                            <Button
                                className={classes.cardActionLeft}
                                variant='outlined'
                                size='small'
                                color='primary'>
                                <Icons.Edit />
                                изменить
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            className={classes.cardActionRight}
                            variant='outlined'
                            size='small'
                            color='secondary'>
                            <Icons.Delete />
                            удалить
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        );
    }

    renderFooterEdit() {
        return (
            <CardActions>
                <Grid container>
                    <Grid item xs={12}>
                        <Link to={'/cards'}>
                            <Button
                                variant='contained'
                                size='small'
                                color='primary'
                                fullWidth>
                                <Icons.Save />
                                сохранить
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </CardActions>
        );
    }

    render() {
        const { classes, editing } = this.props;

        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <div>
                        {editing ? this.renderHeaderEdit() : this.renderHeader()}
                        {editing ? this.renderBodyEdit() : this.renderBody()}
                    </div>
                    {editing ? this.renderFooterEdit() : this.renderFooter()}
                </Card>
            </Grid>
        );
    }

}

JCardStore = withStyles(styles, { withTheme: true })(JCardStore);
export default JCardStore;