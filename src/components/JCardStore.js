import React from 'react';
import { QRCode } from 'react-qr-svg';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    withStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as Icons from '@material-ui/icons';
import styles from '../styles/JCardStoreStyles';

class JCardStore extends React.Component {

    render() {
        const { classes, image, qr, title, content, rules, date } = this.props;

        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <div>
                        <CardMedia
                            className={classes.media}
                            image={image}
                            title={title}>
                            <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', display: 'flex', padding: '4%' }}>
                                <QRCode
                                    bgColor='#FFFFFF'
                                    fgColor='#000000'
                                    level='L'
                                    style={{ height: '70%', padding: '10px', background: 'white' }}
                                    value={qr}
                                />
                            </div>
                        </CardMedia>
                        <CardContent>
                            <Typography color="textSecondary">
                                {date}
                            </Typography>
                            <Typography gutterBottom variant="headline" component="h2">
                                {title}
                            </Typography>
                            <Typography
                                color='textSecondary'
                                style={{ height: '80px', overflowY: 'auto' }}>
                                {content}
                            </Typography>
                            <div className={classes.expansions}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Icons.Settings />
                                        <Typography className={classes.expansionTitle}>
                                            Правила...
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography color='textSecondary'>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque debitis doloribus necessitatibus placeat! Accusantium, ad eligendi et eum iure porro quod saepe sit vitae. Alias aspernatur autem esse ipsum odit?
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>
                        </CardContent>
                        {rules && rules.length > 0 &&
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    Правила
                                </Typography>
                                {rules.map((rule, i) => {
                                    return (
                                        <Grid key={i} container>
                                            <Grid item xs={1}>
                                                <Typography color='textSecondary'>{rule.sign}</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography color='textSecondary' style={{ paddingLeft: '5px' }}>
                                                    {rule.left}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Typography color='textSecondary' style={{ textAlign: 'right' }}>
                                                    {rule.right}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                            </CardContent>
                        }
                    </div>
                    <CardActions>
                        <Grid container>
                            <Grid item xs={6}>
                                <Button
                                    className={classes.cardActionLeft}
                                    variant='outlined'
                                    size='small'
                                    color='primary'>
                                    <Icons.Edit />
                                    изменить
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    className={classes.cardActionRight}
                                    variant='outlined'
                                    size='small'
                                    color='secondary'>
                                    <Icons.Delete />
                                    удалить
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        );
    }

}

JCardStore = withStyles(styles, { withTheme: true })(JCardStore);
export default JCardStore;