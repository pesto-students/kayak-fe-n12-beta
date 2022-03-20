import { Box, Divider, Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Fragment, memo } from 'react';

function EventCardSkeleton() {
  return (
    <Fragment>
      <Card
        sx={{
          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.2)',
          height: '100%',
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          transition: '0.15s',
          cursor: 'pointer',
          borderRadius: '4px',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: '0 10px 30px -6px rgba(0,0,0,0.2)'
          }
        }}>
        <Skeleton variant="rectangular" width={660} height={200} />
        <CardContent sx={{}}>
          <Box mb={1} display={'flex'} alignItems={'center'}>
            <Skeleton variant="text" width={140} />
          </Box>
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={180} />
          <Skeleton variant="text" width={100} />
        </CardContent>

        <Divider light />

        <CardActions
          sx={{
            padding: '8px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between'
          }}
          disableSpacing>
          <Box>
            <Skeleton variant="text" width={140} />
            <Skeleton variant="text" width={100} />
          </Box>
          <Skeleton variant="rectangular" width={100} height={44} />
        </CardActions>
      </Card>
    </Fragment>
  );
}

export default memo(EventCardSkeleton);
