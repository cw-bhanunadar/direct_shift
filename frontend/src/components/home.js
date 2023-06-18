import { useEffect, useState } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { capitalize } from '@material-ui/core';
import Header from './header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));
	
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const Referrals = () => {
  const navigate = useNavigate();
  const token = useSelector(state => state.user.authorizationToken);
	const [referrals, setReferrals] = useState([]);
  if (!token) {
    navigate('/');
  }

	const fetchData = () => {
		try {
      const apiUrl = process.env.REACT_APP_API_URL;
			fetch(`${apiUrl}/referral/list`, {
				headers: { Authorization: token}
			})
				.then(response => {
					return response.json()
				})
				.then(data => {
					setReferrals(data?.list)
				})
		} catch (error) {
      setReferrals([])
			console.error(error);
		}
	}

	useEffect(() => {
			fetchData();
	}, []);

	function createData(name, email, status, created) {
		return { name, email, status, created };
	}

	const user = referrals?.[0]?.referred_by;

	const rows = referrals?.map((item) => createData(item.name, item.email, item.status, item.created_at)) ?? [];

	return (
		<div>
			<Header user={user} fetchData={fetchData} />		

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell align="center">Email</StyledTableCell>
							<StyledTableCell align="center">Referral Status</StyledTableCell>
							<StyledTableCell align="center">Referral Created At</StyledTableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{rows.map((row) => (
							<StyledTableRow key={row.name}>
							<StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
							<StyledTableCell align="center">{row.email}</StyledTableCell>
							<StyledTableCell align="center">{capitalize(row?.status)}</StyledTableCell>
							<StyledTableCell align="center">{row?.created ? new Date(row?.created).toLocaleDateString("en-US") : '-'}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Referrals;
