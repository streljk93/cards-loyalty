export default theme => ({
    container: {
        [theme.breakpoints.up('lg')]: {
            width: 600,
        },
        [theme.breakpoints.only('md')]: {
            width: 500,
        },
        [theme.breakpoints.only('sm')]: {
            width: 400,
        },
        [theme.breakpoints.only('xs')]: {
            width: 250,
        },
    },
});