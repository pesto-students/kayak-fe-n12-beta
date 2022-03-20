import { Chip, Divider, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { IEvent } from '../common/Interface/IEvent';
import { grey, primary } from '../styles/themeColors';
import { formatDate } from '../utils/date.utils';

const LargeImageCard = (eventData: IEvent) => {
  const getPercentageFunded = () => {
    if (eventData !== undefined) {
      return Math.round((eventData.totalFunding * 100) / eventData.expectedFunding);
    } else return 0;
  };
  return (
    <Link to={`/event/${eventData._id}`}>
      <Card
        sx={{
          position: 'relative',
          boxShadow: '0 4px 20px -3px rgba(0,0,0,0.2)',

          display: 'flex',
          flexDirection: 'column',
          transition: '0.15s',
          borderRadius: '4px',

          '&:hover': {
            transform: 'scale(1.005)',
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.2)'
          }
        }}>
        <CardMedia
          component="img"
          height="250"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            width: '100%'
          }}
          src={eventData.highlightingImageVideoURL}
          alt={eventData.name}
        />
        <Chip
          label={eventData.category.toUpperCase()}
          sx={{
            position: 'absolute',
            right: '16px',
            bottom: '16px',
            color: grey[100],
            fontWeight: '500',
            background: grey[700]
          }}
        />
        <CardHeader
          action={<IconButton aria-label="settings"></IconButton>}
          title={eventData.description}
          subheader={eventData.pitchDate}
        />

        <CardContent sx={{ position: 'relative', background: primary[700], width: 'fit-content' }}>
          <Typography
            color="secondary"
            className={'MuiTypography--heading'}
            variant={'h6'}
            align="left">
            {eventData.name}
          </Typography>
          <Typography
            gutterBottom
            color="secondary"
            className={'MuiTypography--subheading'}
            align="left">
            {eventData.description}
            <br></br>
          </Typography>
          <Typography
            fontWeight={'600'}
            color="secondary"
            variant={'caption'}
            className={'MuiTypography--subheading'}
            align="left">
            By {eventData.creatorName} | {getPercentageFunded()} % Funded
            <br></br>
          </Typography>
          <Typography
            fontWeight={'600'}
            color="secondary"
            className={'MuiTypography--subheading'}
            variant={'caption'}
            align="left">
            Start Date: {formatDate('MMM dd, yyyy', eventData.startDate)}
          </Typography>
        </CardContent>
        <Divider light />
        <CardActions disableSpacing></CardActions>
      </Card>
    </Link>
  );
};

export default memo(LargeImageCard);
