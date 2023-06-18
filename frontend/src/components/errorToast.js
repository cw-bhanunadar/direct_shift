import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'

function ErrorToast(props) {
  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
    <Alert severity={props.severity ?? 'warning'} sx={{ width: '100%' }} onClose={props.handleClose}>
      {props.message}
    </Alert>
    </Snackbar>
  );
}

export default ErrorToast;