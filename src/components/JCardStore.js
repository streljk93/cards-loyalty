import React from 'react';
import { connect } from 'react-redux';
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

// actions
import { editCardStore, cancelEditCardStore, remoteSaveCardStore } from "../actions/cardStore";
import { startCommonLoader } from "../actions/ui";

import JCardRules from '../containers/JCardRules';
import JDialogAddRules from './JDialogAddRules';
import styles from '../styles/JCardStoreStyles';

moment.locale('ru');

class JCardStore extends React.Component {

    state = {
        tab: 0,
    };

    // shouldComponentUpdate(props, state, context) {
    //
    //     let updating = false;
    //     for (let keyNext in props) {
    //         if (!this.props[keyNext] || this.props[keyNext] !== props[keyNext]) {
    //             console.log(keyNext);
    //             console.log(this.props[keyNext], props[keyNext]);
    //             updating = true;
    //         }
    //     }
    //
    //     return updating;
    //
    // }

    onEdit() {
        this.props.onEdit(this.props.id);
    }

    onCancel() {
        this.props.onCancelEdit(this.props.id);
    }

    onEditName({ target: { value }}) {
        console.log(value);
    }

    onEditDescription({ target: { value }}) {
        console.log(value);
    }

    onChangeTab(value) {
        this.setState({
            tab: value,
        });
    }

    renderHeader() {
        const { classes, image, name, qrcode } = this.props;

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
        const { classes, theme, image, name, qrcode } = this.props;

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

    renderBodyInfoEdit() {
        const { name, description } = this.props;

        return (
            <CardContent>
                <TextField
                    label='Название карты'
                    defaultValue={name}
                    onChange={this.onEditName.bind(this)}
                    margin='normal'
                    variant='outlined'
                />
                <TextField
                    label='Описание карты'
                    defaultValue={description}
                    onChange={this.onEditDescription.bind(this)}
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
            <CardContent style={{ overflowX: 'scroll' }}>
                <JCardRules cardId={id} editing={true} />
            </CardContent>
        );
    }

    renderFooter() {
        const { classes } = this.props;

        return (
            <CardActions>
                <Grid container>
                    <Grid item xs={6}>
                        <Button
                            onClick={this.onEdit.bind(this)}
                            className={classes.cardActionLeft}
                            variant='outlined'
                            size='small'
                            color='primary'>
                            <Icons.Edit />
                            изменить
                        </Button>
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

    renderFooterInfoEdit() {
        // const { isLoading } = this.props;
        return (
            <CardActions>
                <Grid container>
                    <Grid item xs={12}>
                        <Button
                            variant='outlined'
                            size='small'
                            color='primary'
                            // disabled={isLoading}
                            onClick={this.onCancel.bind(this)}
                            fullWidth>
                            <Icons.ArrowBackIos />
                            назад
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        );
    }

    renderFooterRulesEdit() {
        // const { classes, isLoading } = this.props;
        const { classes } = this.props;
        return (
            <CardActions>
                <Grid container>
                    <Grid item xs={6}>
                        <Link to={'/cards'}>
                            <Button
                                className={classes.cardActionLeft}
                                variant='outlined'
                                size='small'
                                color='primary'
                                // disabled={isLoading}
                                onClick={this.onCancel.bind(this)}
                                fullWidth>
                                <Icons.ArrowBackIos />
                                назад
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <JDialogAddRules classButton={classes.cardActionRight} />
                    </Grid>
                </Grid>
            </CardActions>
        );
    }

    render() {
        const { classes, editing } = this.props;
        const tab = this.state.tab || 0;

        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <div>
                        <div>
                            {editing ? this.renderHeaderEdit() : this.renderHeader()}
                            <CardActions>
                                <Tabs
                                    value={tab}
                                    onChange={(event, value) => this.onChangeTab(value)}
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
                    {tab === 0 && (editing
                        ? this.renderFooterInfoEdit()
                        : this.renderFooter())}
                    {tab === 1 && (editing
                        ? this.renderFooterRulesEdit()
                        : this.renderFooter())}
                </Card>
            </Grid>
        );
    }

}

JCardStore = withStyles(styles, { withTheme: true })(JCardStore);
export default connect(
    null,
    dispatch => ({
        onEdit: (id) => dispatch(editCardStore(id)),
        onCancelEdit: (id) => dispatch(cancelEditCardStore(id)),
        onStartCommonLoader: () => dispatch(startCommonLoader()),
        onRemoteUpdate: (id, data) => dispatch(remoteSaveCardStore(id, data)),
    }),
)(JCardStore);