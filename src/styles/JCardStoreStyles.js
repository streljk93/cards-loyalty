export default (theme) => ({
    card: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    loader: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 2,
    },
    top: {
        backgroundColor: theme.palette.primary.main,
    },
    topDisabled: {
        backgroundColor: theme.palette.grey[400],
    },
    topNumber: {
        fontSize: 13,
        color: theme.palette.common.white,
    },
    media: {
        height: 0,
        paddingTop: '50%', // 16:9
        position: 'relative',
    },
    mediaDisabled: {
        height: 0,
        paddingTop: '50%', // 16:9
        position: 'relative',
        opacity: 0.2,
    },
    qrcodeWrap: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        display: 'flex',
        padding: '4%',
    },
    qrcode: {
        height: '70%',
        padding: '10px',
        background: 'white',
    },
    textDisabled: {
        color: theme.palette.text.disabled,
    },
    tabRoot: {
        minWidth: 72,
    },
    expansions: {
        marginTop: '20px',
    },
    expansionTitle: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '5px',
    },
    cardActionLeft: {
        width: '100%',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    cardActionRight: {
        width: '100%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftWidth: 0,
    },
});