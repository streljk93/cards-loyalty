import React from 'react';
import {
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';

class JButtonFilter extends React.Component {

    state = {
        buttonFilterNode: null,
    };

    handleClick = event => {
        this.setState({ buttonFilterNode: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ buttonFilterNode: null });
    };

    render() {
        const { buttonFilterNode } = this.state;
        const { items } = this.props;
        return (
            <span>
                <IconButton
                    area-owns='j-button-filter'
                    variant='contained'
                    area-haspopup='true'
                    onClick={this.handleClick}>
                    <Icons.FilterList />
                </IconButton>
                <Menu
                    id='j-button-filter'
                    anchorEl={buttonFilterNode}
                    open={Boolean(buttonFilterNode)}
                    onClose={this.handleClose}>
                    {items.map((item, i) => {
                        const Icon = Icons[item.icon];
                        return (
                            <MenuItem key={i} onClick={(event) => {
                                this.handleClose();
                                item.handleClick(event);
                            }}>
                                <Icon />
                                <Typography style={{ paddingLeft: '10px' }}>{item.name}</Typography>
                            </MenuItem>
                        );
                    })}
                </Menu>
            </span>
        );
    }

};

export default JButtonFilter;