import React from 'react';

// own components
import JMenu from './JMenu';
import JCardsStore from './JCardsStore';

const cards = [
    {
        image: 'http://tattooremovalcreamsguide.com/wp-content/uploads/2017/08/image.jpg',
        qr: 'http://jkcms.ru/index.php/products/buy/1',
        title: 'Бонусная карта',
        content: 'Позволяет потребителям копить баллы за совершенные в магазинах покупки, а также, при наличии достаточного количества баллов, расплачиваться ими наряду с деньгами',
        type: 1,
        rules: [{
            rule: 1,
            sign: '=',
            left: 20,
            right: 1
        }],
        date: '2018-07-04 17:45:55',
    },
    {
        image: 'https://cdn4.superdeal.ua/uploaded/new_campaign_pictures/283841/data/main720x340/3c731b1a8b6cd097_7.jpg?1488905197',
        qr: 'http://jkcms.ru/index.php/products/buy/2',
        title: 'Дисконтная карта',
        content: 'Возможность получение потребителем скидки в торговых точках продавца (-ов) или участников дисконтного клуба при соблюдении правил использования дисконтных карт',
        type: 2,
        rules: [{
            rule: 1,
            sign: '=',
            left: 20,
            right: 1
        }],
        date: '2018-06-25 17:45:55',
    }
];

class JContentCardsStore extends React.Component {

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
                <JCardsStore items={cards} />
            </div>
        );
    }

}

export default JContentCardsStore;