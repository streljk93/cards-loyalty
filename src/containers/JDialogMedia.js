import React from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Dialog,
    AppBar,
    Toolbar,
    Slide,
    Button,
    IconButton,
    Typography,
    withStyles,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// actions
import { remoteFetchMediaList, remoteUploadMedia } from "../actions/media";

// own components
import styles from '../styles/JDialogMediaStyles';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class JDialogMedia extends React.Component {

    componentWillMount() {
        this.props.onRemoteFetchMediaList();
    }

    render() {
        const { classes, media, onRemoteUploadMedia } = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onClose={this.props.onClose}
                    TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                            <IconButton color="inherit" onClick={this.props.onClose} aria-label="Close">
                                <Icons.Close />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.navTitle}>
                                JKMedia
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.toolbar} />
                    <div className={classes.main}>
                        <div className={classes.button}>
                            <Button size="large" color="secondary" fullWidth>
                                <Icons.CloudUpload className={classes.leftIcon} /> Загрузить картинку
                            </Button>
                            <input
                                accept="image/*"
                                className={classes.uploadInput}
                                type="file"
                                onChange={({ target: { files }}) => onRemoteUploadMedia(files[0])}
                            />
                        </div>
                        <div className={classes.content}>
                            <Grid container spacing={16}>
                                {media.sort((a, b) => new Date(b.lastupdated) - new Date(a.lastupdated))
                                    .map((item, i) =>
                                        <Grid
                                            key={i}
                                            item
                                            xs={12} sm={6} md={4}
                                            onClick={() => {
                                                this.props.onSaveUrl(item.url);
                                                this.props.onClose();
                                            }}
                                            className={classes.mediaItem}>
                                            <img src={item.url} className={classes.media} alt={item.url} />
                                        </Grid>
                                )}
                            </Grid>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }

}

JDialogMedia = withStyles(styles, { withTheme: true })(JDialogMedia);
JDialogMedia = connect(
    state => ({
        media: state.media.data,
    }),
    dispatch => ({
        onRemoteFetchMediaList: () => dispatch(remoteFetchMediaList()),
        onRemoteUploadMedia: (image) => dispatch(remoteUploadMedia(image)),
    })
)(JDialogMedia);
export default JDialogMedia;