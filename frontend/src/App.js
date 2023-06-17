import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signUp';
import ReferralsList from './pages/home';

function App() {
	return (
		<Router>
			<Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/referrals' element={<ReferralsList />} />
      </Routes>
		</Router>
	);
}

export default App;
