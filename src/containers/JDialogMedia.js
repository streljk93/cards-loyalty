import React from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Dialog,
    Slide,
    Button,
    withStyles,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// actions
import { remoteFetchMediaList, remoteUploadMedia, remoteDeleteMedia } from "../actions/media";

// own components
import JHeader from '../components/JHeader';
import styles from '../styles/JDialogMediaStyles';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class JDialogMedia extends React.Component {

    componentWillMount() {
        this.props.onRemoteFetchMediaList();
    }

    render() {
        const {
            classes,
            isLoading,
            media,
            onRemoteUploadMedia,
            onRemoteDeleteMedia,
            onClose,
            onSaveUrl,
            open
        } = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={open}
                    onClose={onClose}
                    TransitionComponent={Transition}>
                    <JHeader
                        title='JK Media'
                        onAction={onClose}
                        iconAction='Close'
                        isLoading={isLoading}
                        onlyMobile
                    />
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
                                        <Grid key={i} item xs={12} sm={6} md={4} className={classes.mediaItem}>
                                            <img
                                                src={item.url}
                                                className={classes.media}
                                                alt={item.url}
                                                onClick={() => {
                                                    onSaveUrl(item.url);
                                                    onClose();
                                                }}
                                            />
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                className={classes.buttonDelete}
                                                onClick={() => onRemoteDeleteMedia(item.id)}>
                                                Удалить
                                            </Button>
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
        isLoading: state.ui.isLoading,
    }),
    dispatch => ({
        onRemoteFetchMediaList: () => dispatch(remoteFetchMediaList()),
        onRemoteUploadMedia: (image) => dispatch(remoteUploadMedia(image)),
        onRemoteDeleteMedia: (id) => dispatch(remoteDeleteMedia(id)),
    })
)(JDialogMedia);
export default JDialogMedia;