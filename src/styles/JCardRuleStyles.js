export default theme => ({
    typography: {
        fontSize: 12,
    },
    field: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        textAlign: 'center',
    },
    sign: {
        display: 'flex',
        alignItems: 'center',
    },
    textFieldRoot: {
        marginTop: 0,
        marginBottom: 0,
    },
    textFieldRootEditing: {
        marginTop: 0,
        marginBottom: 0,
        background: 'rgba(0,0,0,0.05)',
    },
    selectField: {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: 4,
        width: '100%',
    },
    select: {
        paddingLeft: 17,
        paddingRight: 17,
    },
    selectEditing: {
        paddingLeft: 17,
        paddingRight: 17,
        background: 'rgba(0,0,0,0.05)',
    },
    selectIcon: {
        display: 'none',
    },
});