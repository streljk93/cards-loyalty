// libraries
import React from 'react';
import { Drawer, withStyles } from '@material-ui/core';

// own components
import styles from '../styles/JDrawerEditorStyles';

class JDrawerEditor extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <Drawer
                anchor='right'
                variant='temporary'
                open={false}
                onClose={() => console.log('close')}
                ModalProps={{
                    keepMounted: true,
                }}>
                <div className={classes.container}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A at, atque aut deleniti dolorum eos facere harum, impedit laborum libero molestiae, nisi obcaecati pariatur rem repellat reprehenderit voluptatum. Nostrum, quae!
                </div>
            </Drawer>
        );
    }

}

JDrawerEditor = withStyles(styles, { withTheme: true })(JDrawerEditor);

export default JDrawerEditor;