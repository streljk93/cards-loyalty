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
    LinearProgress,
    TextField,
    withStyles,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import moment from 'moment';

// actions
import { remoteUpdateCardStoreField } from "../actions/cardStore";

import JCardRules from './JCardRules';
import JDialogMedia from './JDialogMedia';
import styles from '../styles/JCardStoreStyles';

moment.locale('ru');

class JCardStore extends React.Component {

    constructor(props) {
        super(props);

        this.time = null;
        this.state = {
            tab: 0,
            editing: false,
            dialogMedia: false,
        };
    }

    onChangeTab(value) {
        this.setState({
            tab: value,
        });
    }

    onEdit() {
        this.setState({ editing: true });
    }

    onCancel() {
        this.setState({ editing: false });
    }

    onRemoteUpdateField(field, value) {
        this.props.onRemoteUpdateField(this.props.id, field, value);
    }

    onEditName({ target: { value }}) {
        this.onRemoteUpdateField('name', value);
    }

    onEditDescription({ target: { value }}) {
        this.onRemoteUpdateField('description', value);
    }

    onEditImage(url) {
        this.onRemoteUpdateField('image', url);
    }

    openDialogMedia() {
        this.setState({
            dialogMedia: true,
        });
    }

    closeDialogMedia() {
        this.setState({
            dialogMedia: false,
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
                <JDialogMedia
                    open={this.state.dialogMedia}
                    onClose={this.closeDialogMedia.bind(this)}
                    onSaveUrl={this.onEditImage.bind(this)}
                />
                <div
                    onClick={this.openDialogMedia.bind(this)}
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
        const { id, typeId } = this.props;

        return (
            <CardContent>
                <JCardRules cardId={id} cardTypeId={typeId} />
            </CardContent>
        );
    }

    renderBodyRulesEdit() {
        const { id, typeId } = this.props;

        return (
            <CardContent>
                <JCardRules cardId={id} cardTypeId={typeId} editing={true} />
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

    renderFooterEdit() {
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

    render() {
        const { classes, isactive } = this.props;
        const { tab, editing } = this.state;
        const cardTab = tab || 0;

        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    {(isactive === null ||
                        (this.props.rules.filter(rule => null === rule.isactive).length > 0)) && (
                            <LinearProgress color="primary" className={classes.loader} />
                    )}
                    <div>
                        <div>
                            {editing ? this.renderHeaderEdit() : this.renderHeader()}
                            <CardActions>
                                <Tabs
                                    value={cardTab}
                                    onChange={(event, value) => this.onChangeTab(value)}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    fullWidth>
                                    <Tab classes={{ root: classes.tabRoot }} label="Информация" />
                                    <Tab classes={{ root: classes.tabRoot }} label="Правила" />
                                </Tabs>
                            </CardActions>
                        </div>
                        {cardTab === 0 && (editing
                            ? this.renderBodyInfoEdit()
                            : this.renderBodyInfo())}
                        {cardTab === 1 && (editing
                            ? this.renderBodyRulesEdit()
                            : this.renderBodyRules())}
                    </div>
                    {editing
                        ? this.renderFooterEdit()
                        : this.renderFooter()}
                </Card>
            </Grid>
        );
    }

}

JCardStore = withStyles(styles, { withTheme: true })(JCardStore);
export default connect(
    null,
    dispatch => ({
        onRemoteUpdateField: (id, field, value) => dispatch(remoteUpdateCardStoreField(id, field, value)),
        // onRemoteSync: (id) => dispatch(remoteSyncCardStore(id)),
    })
)(JCardStore);