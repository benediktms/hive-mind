import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef, FC } from 'react';
import { NotificationPopup } from './notificationStore';

type Props = NotificationPopup & {
  open: boolean;
  onClose: () => void;
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const NotificationAlert: FC<Props> = ({
  message,
  type,
  onClose,
  open,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
