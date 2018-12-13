// libraries
import React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio, Grid, TextField, withStyles } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

// own components
import JMaskPhone from './JMaskPhone';
import styles from '../styles/JDrawerEditorStyles';

class JUserEditor extends React.Component {

    onChangeLastname(lastname) {
        this.props.onChangeField('lastname', lastname);
    }

    onChangeFirstname(firstname) {
        this.props.onChangeField('firstname', firstname);
    }

    onChangeMiddlename(middlename) {
        this.props.onChangeField('middlename', middlename);
    }

    onChangeDob(dob) {
        this.props.onChangeField('dob', moment(dob).format('YYYY-MM-DD'));
    }

    onChangeEmail(email) {
        this.props.onChangeField('email', email);
    }

    onChangePhone(phone) {
        this.props.onChangeField('phone', phone);
    }

    onChangeGender(gender) {
        this.props.onChangeField('gender', gender);
    }

    render() {
        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <TextField
                        label='Фамилия'
                        value={this.props.lastname || ''}
                        onChange={({ target: { value }}) => this.onChangeLastname(value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Имя'
                        value={this.props.firstname || ''}
                        onChange={({ target: { value }}) => this.onChangeFirstname(value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Отчество'
                        value={this.props.middlename || ''}
                        onChange={({ target: { value }}) => this.onChangeMiddlename(value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            keyboard
                            mask={value => (value ? [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/] : [])}
                            format="DD.MM.YYYY"
                            placeholder='дата.месяц.год'
                            label='Дата рождения'
                            fullWidth
                            onChange={date => this.onChangeDob(date)}
                            value={this.props.dob || null}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='E-mail'
                        value={this.props.email || ''}
                        onChange={({ target: { value }}) => this.onChangeEmail(value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    {this.props.open && (
                        <TextField
                            label='Телефон'
                            value={this.props.phone || ''}
                            onChange={({ target: { value }}) => this.onChangePhone(value)}
                            autoFocus={!this.props.id}
                            InputProps={{
                                inputComponent: JMaskPhone,
                            }}
                            fullWidth
                        />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={this.props.gender || 'F'}
                            onChange={({ target: { value }}) => this.onChangeGender(value)}>
                            <FormControlLabel value='F' control={<Radio color='primary' />} label='Девушка' />
                            <FormControlLabel value='M' control={<Radio color='primary' />} label='Мужчина' />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        );
    }

}

JUserEditor = withStyles(styles, { withTheme: true })(JUserEditor);

export default JUserEditor;