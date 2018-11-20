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

    componentDidMount() {
        this.props.onRemoteFetchCardTypeList();
        this.props.onRemoteFetchCardStoreList();
    }

    openMenuCardType(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    closeMenuCardType() {
        this.setState({ anchorEl: null });
    }

    createCardStore(cardType) {
        const cardStore = {
            card_type_id: cardType.id,
            store_id: this.props.store.id,
            image: cardType.image,
            name: cardType.name,
            description: cardType.description,
        };
        this.props.onRemoteSaveCardStore(cardStore).then(data => {
            if (data.success) {
                if (!this.props.ruleCardTypeMeta.updated) {
                    this.props.onRemoteFetchRuleCardTypeList().then(({ success }) => {
                        if (success) {
                            this.createRuleCardStore(data.info);
                        }
                    });
                } else {
                    this.createRuleCardStore(data.info);
                }
            }
        });
        this.closeMenuCardType();
    }

    createRuleCardStore(cardStore) {
        this.props.ruleCardType.forEach(rule => {
            if (cardStore.card_type_id === rule.card_type_id && rule.isrequired) {
                this.props.onRemoteCreateRuleCardStore({
                    card_store_id: cardStore.id,
                    rule_card_type_id: rule.id,
                    value: rule.value,
                    result: rule.result,
                });
            }
        });
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
                        {this.props.cardType.map((card, i) =>
                            <MenuItem
                                key={i}
                                onClick={() => this.createCardStore(card)}>
                                {card.name}
                            </MenuItem>
                        )}
                    </Menu>
                </JMenu>

                <JCardsStore
                    items={this.props.cardStore}
                    types={this.props.cardType}
                    rules={this.props.ruleCardStore}
                />
            </div>
        );
    }

}

export default JContentCardsStore;