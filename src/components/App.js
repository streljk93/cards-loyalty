import React from 'react';

// own components
import ScreenAdmin from './ScreenAdmin';

class App extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div style={{ height: '100%' }}>
                <ScreenAdmin />
            </div>
        );
    }

};

export default App;