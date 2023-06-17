import React, {useState} from 'react';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateReferral from './createReferral';

const Header = ({ user = '', fetchData = () => {} }) => {
	const navigate = useNavigate();

    const [open, setOpen] = useState(false);

	const handleLogout = async() => {
		try {
			const response = await axios.delete('http://34.16.132.47:3000/auth/sign_out', {
				'uid': user,
				"client": "iXb93R71gMedAVQ5frXxCg",
				"access-token": "D61q48ZL-VwWiVQbFGgNNQ"
			});

            if (response.data?.status === 'success') {
                navigate('/');
            }
		} catch (error) {
			console.error(error);
		}

	}

	const toolTipContent = (
		<div>
			<div>{user}</div>
			<div>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					onClick={handleLogout}
				>
					Log Out
				</Button>
			</div>
		</div>
	)

	return (
        <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                <div style={{ marginRight: '30px'}}><h1>Referrals List</h1></div>

                <div style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => setOpen(true)}>
                    Create Referral
                </div>
            </div>

            <div style={{ cursor: 'pointer'}}>
                <Tooltip title={toolTipContent}>
                    <AccountCircleIcon />
                </Tooltip>
            </div>

            {open ? <CreateReferral open={open} setOpen={setOpen} fetchData={fetchData} /> : null}
        </div>
	);
};

export default Header;
