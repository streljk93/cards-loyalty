import React from 'react';

// own components
import JMenu from '../components/JMenu';
import JCardsStore from '../components/JCardsStore';

class JContentCardsStore extends React.Component {

    componentDidMount() {
        this.props.onFetchCardTypeList();
        this.props.onFetchCardStoreList();
    }

    render() {
        return (
            <div>
                <JMenu
                    links={[{
                        to: '/cards/add',
                        color: 'primary',
                        variant: 'contained',
                        icon: 'Add',
                        name: 'Добавить',
                    }]}
                    filter={[{
                        icon: 'DateRange',
                        name: 'по дате',
                        handleClick: event => {
                            console.log('filter by date');
                        },
                    }]}
                />
                <JCardsStore
                    items={this.props.cardStore.data}
                    types={this.props.cardType.data}
                />
            </div>
        );
    }

}

export default JContentCardsStore;