import React, {useState} from 'react';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateReferral from './createReferral';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from "../redux/actionTypes/actionTypes";

const Header = ({ user = '', fetchData = () => {} }) => {
	const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state.user);
    const [open, setOpen] = useState(false);

	const handleLogout = async() => {
		try {
      const apiUrl = process.env.REACT_APP_API_URL;
			const response = await axios.delete(`${apiUrl}/auth/sign_out`, { data: {
				uid: userDetail.email,
				client: userDetail.client,
				"access-token": userDetail.accessToken
      }
      });
      var user = {
        authorizationToken: '', 
        email: '', 
        client: '', 
        accessToken: ''
      }
      dispatch(setUserDetails(user));
      console.log(response);
      if (response.data?.success === true) {
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
