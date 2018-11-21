// libraries
import React from 'react';

// own components
import JUser from '../containers/JUser';

class JUsers extends React.Component {

    render() {
        return (
            <div>
                <JUser
                    firstname='JK'
                    middlename='Mik'
                    lastname='Strelnikov'
                    email='strel.jk.93@gmail.com'
                    phone='9103684565'
                    dob='27.09.1993'
                    date='12.12.2018'
                />
                <JUser
                    firstname='Иван'
                    middlename='Васильевич'
                    lastname='Профессоров'
                    email='prof@mail.ru'
                    phone='9103684355'
                    dob='27.09.1983'
                    date='12.12.2018'
                />
                <JUser
                    firstname='Андрей'
                    middlename='Андреевич'
                    lastname='Андреев'
                    email='andrei.andrei.andrei@mail.ru'
                    phone='9103684565'
                    dob='27.09.1993'
                    date='12.12.2018'
                    onOpenDrawerEditor={this.props.onOpenDrawerEditor}
                />
            </div>
        );
    }

}

export default JUsers;