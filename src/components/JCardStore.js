import React from 'react';
import { QRCode } from 'react-qr-svg';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Typography,
    Tabs,
    Tab,
    TextField,
    withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as Icons from '@material-ui/icons';
import moment from 'moment';

import JCardRules from '../containers/JCardRules';
import JDialogAddRules from './JDialogAddRules';
import styles from '../styles/JCardStoreStyles';

moment.locale('ru');

class JCardStore extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            card: {
                image: 'notfound.img',
                name: '',
                description: '',
            },
        };
    }

    componentDidMount() {
        this.setState({
            card: {
                image: this.props.image,
                name: this.props.name,
                description: this.props.description,
            },
        });
    }

    onEditName({ value }) {
        this.setState((state) => state.card.name = value);
    }

    onEditDescription({ value }) {
        this.setState(state => state.card.description = value);
    }

    renderHeader() {
        const { classes, qrcode } = this.props;
        const { image, name } = this.state.card;

        return (
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
                        value={qrcode || 'notfound'}
                    />
                </div>
            </CardMedia>
        );
    }

    renderHeaderEdit() {
        const { classes, theme, qrcode } = this.props;
        const { image, name } = this.state.card;

        return (
            <CardMedia
                className={classes.media}
                image={image}
                title={name}>
                <div
                    onClick={() => console.log('edit image')}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                }}>
                    <Icons.AddAPhoto style={{ color: theme.palette.grey[50], fontSize: '70px' }} />
                </div>
                <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', display: 'flex', padding: '4%' }}>
                    <QRCode
                        bgColor='#FFFFFF'
                        fgColor='#000000'
                        level='L'
                        style={{ height: '70%', padding: '10px', background: 'white' }}
                        value={qrcode || 'notfound'}
                    />
                </div>
            </CardMedia>
        );
    }

    renderBodyInfo() {
        const { lastupdated } = this.props;
        const { name, description } = this.state.card;

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

    renderBodyInfoEdit() {
        const { name, description } = this.state.card;

        return (
            <CardContent>
                <TextField
                    label='Название карты'
                    value={name}
                    onChange={({ target }) => this.onEditName(target)}
                    margin='normal'
                    variant='outlined'
                />
                <TextField
                    label='Описание карты'
                    value={description}
                    onChange={({ target }) => this.onEditDescription(target)}
                    margin='normal'
                    variant='outlined'
                    multiline
                    rowsMax='5'
                    style={{ width: '100%' }}
                />
            </CardContent>
        );
    }

    renderBodyRules() {
        const { id } = this.props;

        return (
            <CardContent>
                <JCardRules cardId={id} />
            </CardContent>
        );
    }

    renderBodyRulesEdit() {
        const { id } = this.props;

        return (
            <CardContent>
                <JDialogAddRules onOpen={} />
                <JCardRules cardId={id} editing={true} />
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
        const { id, onUploadCardEditing } = this.props;
        return (
            <CardActions>
                <Grid container>
                    <Grid item xs={12}>
                        <Link to={'/cards'}>
                            <Button
                                onClick={() => onUploadCardEditing(id, this.state.card)}
                                variant='outlined'
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
        const { classes, id, editing, meta, onChangeTab } = this.props;
        const tab = (meta && meta.tab) ? meta.tab : 0;

        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <div>
                        <div>
                            {editing ? this.renderHeaderEdit() : this.renderHeader()}
                            <CardActions>
                                <Tabs
                                    value={tab}
                                    onChange={(event, value) => onChangeTab(id, value)}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    fullWidth>
                                    <Tab label="Информация" />
                                    <Tab label="Правила" />
                                </Tabs>
                            </CardActions>
                        </div>
                        {tab === 0 && (editing
                            ? this.renderBodyInfoEdit()
                            : this.renderBodyInfo())}
                        {tab === 1 && (editing
                            ? this.renderBodyRulesEdit()
                            : this.renderBodyRules())}
                    </div>
                    {editing ? this.renderFooterEdit() : this.renderFooter()}
                </Card>
            </Grid>
        );
    }

}

JCardStore = withStyles(styles, { withTheme: true })(JCardStore);
export default JCardStore;