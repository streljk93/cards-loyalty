export default (theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    media: {
        height: 0,
        paddingTop: '50%', // 16:9
        position: 'relative',
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