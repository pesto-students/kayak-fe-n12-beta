import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import { Fragment, memo } from 'react';
import { grey } from '../styles/themeColors';

const LargeImageCard = () => {
  return (
    <Fragment>
      <Card
        sx={{
          position: 'relative',
          boxShadow: '0 4px 20px -3px rgba(0,0,0,0.1)',

          display: 'flex',
          flexDirection: 'column',
          height: '260px',
          transition: '0.15s',
          borderRadius: '4px',

          '&:hover': {
            transform: 'scale(1.005)',
            boxShadow: '0 10px 30px -6px rgba(0,0,0,0.1)'
          }
        }}>
        <Skeleton
          sx={{
            position: 'absolute',
            borderRadius: '12px',
            top: '16px',
            right: '16px',
            color: grey[200]
          }}
          variant="rectangular"
          height={24}
          width={120}
        />
        <Skeleton
          sx={{ position: 'absolute', top: '88px', color: grey[200] }}
          variant="rectangular"
          width={240}
          height={140}
        />
        <Skeleton sx={{ marginTop: '98px', color: grey[500] }} variant="text" width={200} />
        <Skeleton sx={{ color: grey[400] }} variant="text" width={160} />
        <Skeleton sx={{ color: grey[400] }} variant="text" width={120} />
        <Skeleton sx={{ color: grey[400] }} variant="text" width={120} />
        <Skeleton sx={{ marginBottom: '30px', color: grey[500] }} variant="text" width={180} />
        <Skeleton
          sx={{ position: 'absolute', bottom: '16px', right: '16px' }}
          variant="rectangular"
          width={130}
          height={44}
        />
      </Card>
    </Fragment>
  );
};

export default memo(LargeImageCard);
