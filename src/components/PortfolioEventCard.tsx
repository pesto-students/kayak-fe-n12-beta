import { Box, Chip, Divider } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { IEvent } from '../common/Interface/IEvent';
import { blue, error, grey, success, warning } from '../styles/themeColors';
import { formatDate } from '../utils/date.utils';

function PortfolioEventCard(eventData: IEvent) {
  const getPercentageFunded = () => {
    if (eventData !== undefined) {
      return Math.round((eventData.totalFunding * 100) / eventData.expectedFunding);
    } else return 0;
  };

  const getStatusChipColor = () => {
    switch (eventData.transactionStatus) {
      case 'pending': {
        return warning.main;
      }
      case 'success': {
        return success[700];
      }
      case 'failed': {
        return error[700];
      }
      default:
        return 'transparent';
    }
  };
  return (
    <Link to={`/event/${eventData._id}`}>
      <Card
        sx={{
          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
          height: '100%',
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          transition: '0.15s',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
          }
        }}>
        {eventData.transactionStatus && (
          <Chip
            size="small"
            label={eventData.transactionStatus.toUpperCase()}
            sx={{
              position: 'absolute',
              top: '16px',
              right: 16,
              color: grey[100],
              fontWeight: '500',
              fontSize: '10px',
              background: getStatusChipColor()
            }}
          />
        )}
        <CardMedia
          component="img"
          height="194"
          // image="src/assets/images/landingHero.jpg"
          src={eventData.highlightingImageVideoURL}
          alt={eventData.name}
        />
        <CardContent sx={{}}>
          <Box mb={1} display={'flex'} alignItems={'center'}>
            <Typography
              marginRight={1}
              className={'MuiTypography--heading'}
              variant={'h6'}
              align="left">
              {eventData.name}
            </Typography>
            <Chip
              size="small"
              label={eventData.category.toUpperCase()}
              sx={{
                color: grey[100],
                fontWeight: '500',
                fontSize: '10px',
                background: grey[700]
              }}
            />
          </Box>
          <Typography className={'MuiTypography--subheading'} align="left">
            {eventData.description}
          </Typography>
          <Typography
            fontSize={'12px'}
            fontWeight={'600'}
            className={'MuiTypography--subheading'}
            align="left">
            By {eventData.creatorName} | {getPercentageFunded()}% Funded
          </Typography>
          <Typography
            fontWeight={'600'}
            className={'MuiTypography--subheading'}
            variant={'caption'}
            align="left">
            Start Date: {formatDate('MMM dd, yyyy', eventData.startDate)}
          </Typography>
        </CardContent>

        <Divider light />

        <CardActions sx={{ padding: '8px', position: 'relative' }} disableSpacing>
          <Box>
            {eventData.transactionId && (
              <Typography
                fontSize={'12px'}
                fontWeight={'600'}
                className={'MuiTypography--subheading'}
                align="left">
                Transaction Id: {eventData.transactionId}
              </Typography>
            )}
            {eventData.transactionDate && (
              <Typography
                fontWeight={'600'}
                className={'MuiTypography--subheading'}
                variant={'caption'}
                align="left">
                Transaction Date: {formatDate('MMM dd yyyy hh:mm a', eventData.transactionDate)}
              </Typography>
            )}
          </Box>
          {eventData.transactionAmount && (
            <Chip
              size="small"
              label={`Amount: ₹ ${parseInt(eventData.transactionAmount).toLocaleString()}`}
              sx={{
                position: 'absolute',
                right: 16,
                color: grey[100],
                fontWeight: '500',
                fontSize: '12px',
                background: blue[900]
              }}
            />
          )}
        </CardActions>
      </Card>
    </Link>
  );
}

export default memo(PortfolioEventCard);
