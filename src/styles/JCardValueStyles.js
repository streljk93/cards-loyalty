export default theme => ({
    container: {
        padding: '5px 0',
    },
    textWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: theme.palette.primary.main,
    },
    textWrapDisabled: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: theme.palette.text.disabled,
    },
    icon: {
        paddingRight: 5,
    },
});