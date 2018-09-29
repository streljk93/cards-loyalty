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
    BottomNavigation,
    BottomNavigationAction,
    Tabs,
    Tab,
    withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as Icons from '@material-ui/icons';
import moment from 'moment';

import styles from '../styles/JCardStoreStyles';
import JCardRules from "../containers/JCardRules";

moment.locale('ru');

function TabContainer(props) {
    const { children, dir } = props;

    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

class JCardStore extends React.Component {

    render() {
        const { classes, id, image, name, description, qrcode, lastupdated } = this.props;

        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <div>
                        <CardMedia
                            className={classes.media}
                            image={image}
                            title={name}>
                            <div style={{ position: 'absolute', top: 0, right: 0, height: '100%', display: 'flex', padding: '4%' }}>
                                <QRCode
                                    bgColor='#FFFFFF'
                                    fgColor='#000000'
                                    level='L'
                                    style={{ height: '70%', padding: '10px', background: 'white' }}
                                    value={qrcode}
                                />
                            </div>
                        </CardMedia>
                        <CardActions>
                            <Tabs
                                value={0}
                                onChange={() => console.log('ok')}
                                indicatorColor="primary"
                                textColor="primary"
                                fullWidth>
                                <Tab label="Информация" />
                                <Tab label="Правила" />
                            </Tabs>
                        </CardActions>
                        <CardContent>
                            <Typography color="textSecondary">
                                {moment(lastupdated, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY')}
                            </Typography>
                            <Typography gutterBottom variant="headline" component="h2">
                                {name}
                            </Typography>
                            <Typography
                                color='textSecondary'
                                style={{ height: '80px', overflowY: 'auto' }}>
                                {description}
                            </Typography>
                            {/*<div className={classes.expansions}>*/}
                                {/*<ExpansionPanel>*/}
                                    {/*<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>*/}
                                        {/*<Icons.Settings />*/}
                                        {/*<Typography className={classes.expansionTitle}>*/}
                                            {/*Правила...*/}
                                        {/*</Typography>*/}
                                    {/*</ExpansionPanelSummary>*/}
                                    {/*<ExpansionPanelDetails>*/}

                                        {/*/!* RULES *!/*/}
                                        {/*<JCardRules cardId={id} />*/}

                                    {/*</ExpansionPanelDetails>*/}
                                {/*</ExpansionPanel>*/}
                            {/*</div>*/}
                        </CardContent>
                    </div>
                    <CardActions>
                        <Grid container>
                            <Grid item xs={6}>
                                <Link to={`/cards/${id}`}>
                                    <Button
                                        className={classes.cardActionLeft}
                                        variant='outlined'
                                        size='small'
                                        color='primary'>
                                        <Icons.Edit />
                                        изменить
                                    </Button>
                                </Link>
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
                    {/*<BottomNavigation*/}
                        {/*value={0}*/}
                        {/*onChange={() => console.log('ok')}*/}
                        {/*showLabels>*/}
                        {/*<BottomNavigationAction label="Информация" icon={<Icons.Info />} />*/}
                        {/*<BottomNavigationAction label="Правила" icon={<Icons.ListAlt />} />*/}
                        {/*<BottomNavigationAction label="Изменить" icon={<Icons.Edit />} />*/}
                        {/*<BottomNavigationAction label="Удалить" icon={<Icons.Delete />} />*/}
                    {/*</BottomNavigation>*/}
                </Card>
            </Grid>
        );
    }

}

JCardStore = withStyles(styles, { withTheme: true })(JCardStore);
export default JCardStore;