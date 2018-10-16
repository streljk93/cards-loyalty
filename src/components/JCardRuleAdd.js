import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Select,
    MenuItem,
    OutlinedInput,
    Button,
    withStyles,
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';

// own components
import styles from '../styles/JCardRuleAddStyles';

class JCardRuleAdd extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary classes={{
                    root: classes.expansionPanelSummeryRoot,
                    content: classes.expansionPanelSummeryContent,
                }}>
                    <Button color='primary' className={classes.buttonAdd}>
                        <Icons.Add style={{ fontSize: 18, marginRight: 5 }} />
                        Добавить правило
                    </Button>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ padding: 24 }}>
                    <div style={{ width: '100%' }}>
                        <Select
                            value={2}
                            classes={{ select: classes.selectSelect }}
                            input={<OutlinedInput labelWidth={0} fullWidth />}>
                            <MenuItem classes={{ root: classes.menuItemRoot }} value={1}>menu1</MenuItem>
                            <MenuItem classes={{ root: classes.menuItemRoot }} value={2}>Списание с карты</MenuItem>
                            <MenuItem classes={{ root: classes.menuItemRoot }} value={3}>menu3</MenuItem>
                            <MenuItem classes={{ root: classes.menuItemRoot }} value={4}>menu4</MenuItem>
                        </Select>
                        <Select
                            value={2}
                            style={{ marginTop: 8 }}
                            classes={{ select: classes.selectSelect }}
                            input={<OutlinedInput labelWidth={0} fullWidth />}>
                            <MenuItem classes={{ root: classes.menuItemRoot }} value={1}>menu1</MenuItem>
                            <MenuItem classes={{ root: classes.menuItemRoot }} value={2}>Конверти. (бонусы в деньги)</MenuItem>
                            <MenuItem classes={{ root: classes.menuItemRoot }} value={3}>menu3</MenuItem>
                            <MenuItem classes={{ root: classes.menuItemRoot }} value={4}>menu4</MenuItem>
                        </Select>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

}

export default withStyles(styles, { withTheme: true })(JCardRuleAdd);