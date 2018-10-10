export default (theme) => ({
    appBar: {},
    toolbar: theme.mixins.toolbar,
    navTitle: {
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Russo One',
    },
    main: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        flexGrow: 1,
        height: '100vh',
    },
    button: {
        position: 'relative',
        padding: theme.spacing.unit * 3,
    },
    uploadInput: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        opacity: 0,
        cursor: 'pointer',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    content: {
        flexGrow: 1,
        overflowY: 'scroll',
        overflowX: 'visible',
        display: 'inline-block',
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    mediaItem: {
        cursor: 'pointer',
    },
    media: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    }
});