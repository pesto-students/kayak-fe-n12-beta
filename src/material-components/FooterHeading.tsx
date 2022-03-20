import { Typography } from '@mui/material';

interface IProps {
  heading: string;
}

const FooterHeading = ({ heading }: IProps) => {
  return (
    <Typography marginBottom={2} color="primary" component="h6" variant="h6" align="left">
      {heading}
    </Typography>
  );
};

export default FooterHeading;
