import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';

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
    const [data, setData] = useState({
        name: '',
		email: '',
	});

    const handleCreate = async(event) => {
        event.preventDefault();

		try {
            const response = await axios.post('http://34.16.132.47:3000/referral', data, {
                headers: { 
                    'Authorization': 'Bearer eyJhY2Nlc3MtdG9rZW4iOiI0S28xNVpoT19LSS1kQ0QtSkZ4aXB3IiwidG9rZW4tdHlwZSI6IkJlYXJlciIsImNsaWVudCI6IlFoVTFyMjMtdXpsTk5wV1lwLXJpb3ciLCJleHBpcnkiOiIxNjg4MjEwNzIzIiwidWlkIjoibmFyZW5AZ21haWwuY29tIn0=',
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