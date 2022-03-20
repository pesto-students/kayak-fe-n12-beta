import { Box } from '@mui/system';

interface IHeroImage {
  src: string;
  height?: string;
  width?: string;
}
function HeroImage({ src, height, width }: IHeroImage) {
  return (
    <Box
      component={'img'}
      sx={{
        borderRadius: '4px',
        objectFit: 'cover',
        height: height ? height : '95%',
        width: width ? width : '96%',
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)'
      }}
      src={src}
      alt="Image"
    />
  );
}

export default HeroImage;
