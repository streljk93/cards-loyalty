// libraries
import React from 'react';
import { Button } from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// own components
import JMenu from '../components/JMenu';
import JUsers from '../components/JUsers';
import JDrawerEditor from '../components/JDrawerEditor';

class JScreenUsers extends React.Component {

    render() {

        return (
            <div>
                <JMenu>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => console.log('add user')}>
                        <Icons.Add /> Добавить
                    </Button>
                </JMenu>

                <JUsers />

                <JDrawerEditor />
            </div>
        );
    }

}

export default JScreenUsers;