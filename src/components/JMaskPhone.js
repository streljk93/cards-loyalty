import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

class JMaskPhone extends React.Component {

    render() {
        const { inputRef, ...other } = this.props;
        return (
            <MaskedInput
                {...other}
                ref={inputRef}
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                placeholderChar={'\u2000'}
            />
        );
    }

}

JMaskPhone.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

export default JMaskPhone;