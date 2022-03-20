import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import {
  Avatar,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import StatsService from '../../api/statsService';
import statsHero from '../../assets/images/stats.jpg';
import HeroImage from '../../material-components/HeroImage';
const statsDetails = [
  {
    statData: 0,
    statImage: <EventIcon sx={{ padding: '6px' }} fontSize="large" color="primary" />,
    statHeader: 'Projects Funded',
    statText: 'Take your idea to next level and see the possibilities you can achieve.'
  },
  {
    statData: 0,
    statImage: <AttachMoneyIcon sx={{ padding: '6px' }} fontSize="large" color="primary" />,
    statHeader: '+ Invested',
    statText: 'From few cents to a dollars we have reached it together'
  },
  {
    statData: 0,
    statImage: <GroupIcon sx={{ padding: '6px' }} fontSize="large" color="primary" />,
    statHeader: '+ Investors',
    statText:
      'A lot of our investors are from your network. Started small and now progressing exponentially.'
  }
];
const Stats = () => {
  const [stats, setStats] = useState<typeof statsDetails>(statsDetails);
  useEffect(() => {
    StatsService.getStatsData()
      .then((response) => {
        const newStatsDetails = [...stats];
        newStatsDetails[0].statData = response.data.totalEvents;
        newStatsDetails[1].statData = response.data.investedAmount;
        newStatsDetails[2].statData = response.data.investors;

        setStats(newStatsDetails);
      })
      .catch((error) => {
        console.log(error);
        // No action is taken as default value 0 will be shown to user.
      });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: '#C3E9E1',
        pt: 10,
        pb: 8
      }}>
      <Container>
        <Grid container alignItems={'center'}>
          {/* Stats for - within last week  */}
          <Grid item xs={12} sm={6} md={6}>
            <Typography fontWeight={'500'} component="h5" variant="h5" align="left" gutterBottom>
              Within Last Week
            </Typography>
            <List>
              {stats.map(({ statData, statImage, statHeader, statText }, index) => (
                <ListItem sx={{ paddingLeft: '0' }} key={index}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'white' }} alt={statHeader}>
                      {statImage}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={statData + ' ' + statHeader} secondary={statText} />
                </ListItem>
              ))}
            </List>
          </Grid>
          {/* Stats Image  */}
          <Grid xs={12} sm={6} md={6}>
            <HeroImage src={statsHero} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Stats;
