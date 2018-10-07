import React from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// own components
import JMenu from '../components/JMenu';
import JCardsStore from '../components/JCardsStore';

class JContentCardsStore extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        };
    }

    openMenuCardType(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    closeMenuCardType() {
        this.setState({ anchorEl: null });
    }

    componentDidMount() {
        this.props.remoteFetchCardTypeList();
        this.props.remoteFetchCardStoreList();
    }

    render() {
        return (
            <div>
                <JMenu>
                    <Button
                        area-owns={this.state.anchorEl ? 'cardTypeMenu' : null}
                        area-haspopup="true"
                        variant='contained'
                        color='primary'
                        onClick={this.openMenuCardType.bind(this)}>
                        <Icons.Add /> Добавить
                    </Button>
                    <Menu
                        id="cardTypeMenu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.closeMenuCardType.bind(this)}>
                        {this.props.cardType.map(card =>
                            <MenuItem
                                key={card.id}
                                onClick={this.closeMenuCardType.bind(this)}>
                                {card.name}
                            </MenuItem>
                        )}
                    </Menu>
                </JMenu>

                <JCardsStore
                    items={this.props.cardStore}
                    types={this.props.cardType}
                />
            </div>
        );
    }

}

export default JContentCardsStore;