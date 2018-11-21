export default theme => ({
    drawerPaper: {
        [theme.breakpoints.up('sm')]: {
            width: 400,
        },
        [theme.breakpoints.only('xs')]: {
            width: '100%',
        },
        overflowY: 'unset',
        height: '100%',
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
    },
    menuLeftSide: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
    },
    menuRightSide: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    icon: { marginRight: theme.spacing.unit },
    toolbar: theme.mixins.toolbar,
    content: {
        height: '84%',
        overflowY: 'auto',
        padding: theme.spacing.unit * 3,
        backgroundColor: theme.palette.background.default,
        flex: 1,
    },
});