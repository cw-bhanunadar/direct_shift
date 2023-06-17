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
	const [referrals, setReferrals] = useState([]);

	async function fetchData() {
		try {
			fetch('http://34.16.132.47:3000/referral/list', {
				headers: { Authorization: 'Bearer eyJhY2Nlc3MtdG9rZW4iOiI0S28xNVpoT19LSS1kQ0QtSkZ4aXB3IiwidG9rZW4tdHlwZSI6IkJlYXJlciIsImNsaWVudCI6IlFoVTFyMjMtdXpsTk5wV1lwLXJpb3ciLCJleHBpcnkiOiIxNjg4MjEwNzIzIiwidWlkIjoibmFyZW5AZ21haWwuY29tIn0='}
			})
				.then(response => {
					return response.json()
				})
				.then(data => {
					setReferrals(data?.list)
				})
		} catch (error) {
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

	const rows = referrals?.map((item) => createData(item.name, item.email, item.status, item.created_at));

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
