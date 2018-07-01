import React from 'react';
import {
    Typography,
    Hidden,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Button,
    withStyles,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import styles from './JDrawerStyles';

class JDrawer extends React.Component {

    state = {
        mobileOpen: false,
        open: false,
        anchorEl: null,
    };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    render() {
        const { classes, theme } = this.props;
        const { anchorEl } = this.state;
        const drawer = (
            <div>
                <div className={classes.toolbar} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.light,
                }}>
                    <Typography
                            className={classes.navTitle}
                            variant='title'
                            color='inherit'
                            noWrap>
                            JK 
                            <Hidden>
                                <Icons.CardGiftcard style={{
                                    paddingRight: '10px',
                                    paddingLeft: '10px',
                                }} />
                            </Hidden>
                            Card
                        </Typography>
                </div>
                {this.props.menu.map((items, i1) => {
                    let blockMenu = [];
                    items.map((item, i2) => {

                        const IconList = Icons[item.icon];
                        blockMenu.push(
                            <ListItem key={i1 + '' + i2} button>
                                <ListItemIcon>
                                    <IconList />
                                </ListItemIcon>
                                <ListItemText inset primary={item.title} />
                            </ListItem>
                        );

                    });

                    return (
                        <div key={i1}>
                            <Divider />
                            <List>
                                {blockMenu}
                            </List>
                        </div>
                    );
                })}
                <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Open Menu
        </Button>
                 <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => console.log('ok menu')}>
                    <MenuItem onClick={() => console.log('ok')}>Profile</MenuItem>
                    <MenuItem onClick={() => console.log('ok')}>My account</MenuItem>
                    <MenuItem onClick={() => console.log('ok')}>Logout</MenuItem>
                </Menu>
            </div>
        );
        return (
            <div>
                <Hidden mdUp>
                    <Drawer
                        variant='temporary'
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation='css'>
                    <Drawer
                        variant='permanent'
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}>
                        {drawer}
                    </Drawer>
                </Hidden>
            </div>
        );
    }

}

export default withStyles(styles, { withTheme: true })(JDrawer);