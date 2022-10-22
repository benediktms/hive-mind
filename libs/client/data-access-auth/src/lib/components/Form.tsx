import { Box } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const Form: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      maxWidth={400}
      sx={{
        '& > div': { mb: '1rem' },
      }}
    >
      {children}
    </Box>
  );
};
