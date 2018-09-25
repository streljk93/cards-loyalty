import React from 'react';

// own components
import JMenu from '../components/JMenu';
import JCardsStore from '../components/JCardsStore';

// const cards = [{
//     id: '',
//     slug: '',
//     image: '',
//     name: '',
//     description: '',
//     qrcode: '',
//     rule_card_store: [{
//         id: '',
//         card_store_id: '',
//         rule_id: '',
//         rule: {
//             id: '',
//             action_id: '',
//             handler_id: '',
//             rule_type_id: '',
//             action: {
//                 id: '',
//                 slug: '',
//                 name: '',
//             },
//             handler: {
//                 id: '',
//                 slug: '',
//                 name: '',
//             },
//             type: {
//                 id: '',
//                 slug: '',
//                 name: '',
//             },
//         },
//         sign: '',
//         value: '',
//         result: '',
//     }],
// }];

class JContentCardsStore extends React.Component {

    componentWillMount() {
        // load cards
        this.props.onFetchCardTypeList();
        this.props.onFetchCardStoreList();

        // load rules
        this.props.onFetchActionList();
        this.props.onFetchHandlerList();
        this.props.onFetchRuleTypeList();
        this.props.onFetchRuleList();
        this.props.onFetchRuleCardStoreList();
    }

    componentWillUpdate(props, state) {
        const isFetching = props.cardType.meta.isFetching ||
            props.cardStore.meta.isFetching ||
            props.action.meta.isFetching ||
            props.handler.meta.isFetching ||
            props.ruleType.meta.isFetching ||
            props.rule.meta.isFetching ||
            props.ruleCardStore.meta.isFetching;

        if (!isFetching) {
            this.makeCardList(isFetching);
        }
    }

    makeCardList(isFetching) {
        console.log(isFetching);
    }

    render() {
        return (
            <div>
                <JMenu
                    links={[{
                        to: '/root/cards/add',
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
                <JCardsStore items={this.props.cardStore.data} />
            </div>
        );
    }

}

export default JContentCardsStore;