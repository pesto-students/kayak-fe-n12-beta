import { Chip, Divider } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { IEvent } from '../common/Interface/IEvent';
import { grey } from '../styles/themeColors';
import { formatDate } from '../utils/date.utils';

function EventCard(eventData: IEvent) {
  const getPercentageFunded = () => {
    if (eventData !== undefined) {
      return Math.round((eventData.totalFunding * 100) / eventData.expectedFunding);
    } else return 0;
  };
  return (
    <Link to={`/event/${eventData._id}`}>
      <Card
        sx={{
          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: '0.15s',
          cursor: 'pointer',
          borderRadius: '4px',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
          }
        }}>
        <CardMedia
          component="img"
          height="194"
          // image="src/assets/images/landingHero.jpg"
          src={eventData.highlightingImageVideoURL}
          alt={eventData.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography className={'MuiTypography--heading'} variant={'h6'} gutterBottom align="left">
            {eventData.name}
          </Typography>
          <Typography className={'MuiTypography--subheading'} align="left">
            {eventData.description}
          </Typography>
          <Typography
            fontWeight={'600'}
            className={'MuiTypography--subheading'}
            variant={'caption'}
            align="left">
            By {eventData.creatorName} | {getPercentageFunded()}% Funded
          </Typography>
        </CardContent>

        <Divider light />

        <CardActions sx={{ padding: '8px', position: 'relative' }} disableSpacing>
          <Typography
            fontWeight={'600'}
            className={'MuiTypography--subheading'}
            variant={'caption'}
            align="left">
            Start Date: {formatDate('MMM dd, yyyy', eventData.startDate)}
          </Typography>
          <Chip
            size="small"
            label={eventData.category.toUpperCase()}
            sx={{
              position: 'absolute',
              right: '16px',
              color: grey[100],
              fontWeight: '500',
              background: grey[700]
            }}
          />
        </CardActions>
      </Card>
    </Link>
  );
}

export default memo(EventCard);
