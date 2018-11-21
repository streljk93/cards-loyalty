// libraries
import React from 'react';
import { Button } from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// own components
import JMenu from '../components/JMenu';
import JUsers from '../components/JUsers';
import JDrawerEditor from '../containers/JDrawerEditor';
import JUserEditor from '../components/JUserEditor';

class JScreenUsers extends React.Component {

    render() {

        return (
            <div>
                <JMenu>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={this.props.onOpenDrawerEditor}>
                        <Icons.Add /> Добавить
                    </Button>
                </JMenu>

                <JUsers data={this.props.users} />

                <JDrawerEditor onSave={() => console.log('save')}>
                    <JUserEditor />
                </JDrawerEditor>
            </div>
        );
    }

}

export default JScreenUsers;