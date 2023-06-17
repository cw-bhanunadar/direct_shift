import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateReferral({setOpen = () => {}, open = false, fetchData = () => {}}) {
  const token = useSelector(state => state.user.authorizationToken);
    const [data, setData] = useState({
        name: '',
		email: '',
	});

    const handleCreate = async(event) => {
        event.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
		try {
      const response = await axios.post(`${apiUrl}/referral`, data, {
          headers: { 
              'Authorization': token,
          },
      });
      console.log(response)
      if (response.data?.data?.status === 'success') {
          setOpen(false);
          fetchData();
      }
        } catch (error) {
            console.error(error);
        }
    }
 
    return (
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                  Create Referral
              </Typography>

              <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
              >
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      value={data?.name}
                      onChange={(e) => setData({...data, name: e.target?.value})}
                  />

                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={data?.email}
                      onChange={(e) => setData({...data, email: e.target?.value})}
      />

                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleCreate}
                  >
                      Create
                  </Button>
              </Box>
          </Box>
        </Modal>
      </div>
    );
}