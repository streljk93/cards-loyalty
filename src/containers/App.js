import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    openDrawer,
    closeDrawer,
    toggleDrawer,
} from '../actions/ui';
import App from '../components/App';

const mapStateToProps = (state) => ({
    drawerIsOpen: state.ui.drawerIsOpen,
});

const mapDispatchToProps = (dispatch) => ({
    onOpenDrawer: () => {
        dispatch(openDrawer());
    },
    onCloseDrawer: () => {
        dispatch(closeDrawer());
    },
    onToggleDrawer: () => {
        dispatch(toggleDrawer());
    },
});

const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
export default AppContainer;