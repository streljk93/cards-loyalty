// libraries
import React from 'react';

// own components
import JUser from '../containers/JUser';

class JUsers extends React.Component {

    render() {
        return (
            <div>
                {this.props.data.map((user, i) =>
                    <JUser
                        key={i}
                        id={user.id}
                        firstname={user.firstname}
                        middlename={user.middlename}
                        lastname={user.lastname}
                        email={user.email}
                        phone={user.phone}
                        dob={user.dob}
                        date={user.date}
                        selected={this.props.userSelected.id === user.id}
                    />
                )}
            </div>
        );
    }

}

export default JUsers;