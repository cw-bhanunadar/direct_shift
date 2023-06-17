import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from './Copyright';
import {useState} from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
	const [data, setData] = useState({
		email: undefined,
		password: undefined,
	})

	const handleSubmit = async(event) => {
		event.preventDefault();

		if (['', null, undefined].includes(data?.email) || ['', null, undefined].includes(data?.password)) {
			return (
				<Alert severity="error" color="info">
					Mandatory fields are required!
				</Alert>
			);
		} else {
			try {
				const response = await axios.post('http://34.16.132.47:3000/auth/sign_in', {
				  ...data,
				});
				console.log(response.data);
				console.log(response, 'response');
        navigate('/referrals');
			} catch (error) {
				console.error(error);
			}
		}	
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Grid container component="main" sx={{ height: '100vh' }}>
				<CssBaseline />

				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage:
							'url(https://source.unsplash.com/random?wallpapers)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) =>
							t.palette.mode === 'light'
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>

				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>

						<Typography component="h1" variant="h5">
							Sign In
						</Typography>

						<Box
							component="form"
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required={true}
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								value={data?.email}
								onChange={(e) => setData({...data, email: e.target?.value})}
							/>

							<TextField
								margin="normal"
								required={true}
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={data?.password}
								onChange={(e) => setData({...data, password: e.target?.value})}
							/>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onClick={handleSubmit}
							>
								Sign In
							</Button>

							<Grid container>
								<Link href="/signup" variant="body2">
									Don't have an account? Sign Up
								</Link>
							</Grid>

							<Copyright sx={{ mt: 5 }} />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
