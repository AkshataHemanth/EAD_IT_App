import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import '../components/NewTicket.js'; // Import NewTicket component
import '../styles/NewTicket.css';

const Dashboard = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		ARNumber: '',
		severity: '',
		priority: '',
		requestorUsername: '',
		assigneeUsername: '',
		status: '',
		fromDate: '',
		toDate: '',
	});
	// Summary Generation based on User Input
	const generateSummary = () => {
		const { ARNumber, requestorUsername, assigneeUsername, escalationPath } = formData;
		if (ARNumber && requestorUsername && assigneeUsername) {
			return `Ticket #${ARNumber} created by ${requestorUsername} is assigned to ${assigneeUsername}. Escalation path: ${escalationPath || 'Not provided'}`;
		}
		return 'Please fill in all required fields to see the summary.';
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSearchTickets = (e) => {
		e.preventDefault();
		console.log('Searching for tickets:', formData);
	};

	const handleCreateTicket = () => {
		console.log('Redirecting to create ticket...');
	};

	const handleAssignedTickets = () => {
		console.log('Redirecting to assigned tickets...');
	};

	const handleTicketsApproval = () => {
		console.log('Redirecting to tickets needing approval...');
	};



	const handleLogout = () => {
		console.log('Logging out...');
		navigate('/components/Login');
	};

	return (
		<div className="dashboard-wrapper">
			{/* Left Column */}
			<div className="left-column">
				<h3>My Tickets</h3>
				<table className="tickets-table">
					<thead>
						<tr>
							<th>AR Number</th>
							<th>Ticket Status</th>
							<th>Ticket Assigned to</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>12345</td>
							<td>Open</td>
							<td>User A</td>
						</tr>
						<tr>
							<td>67890</td>
							<td>In Progress</td>
							<td>User B</td>
						</tr>
					</tbody>
				</table>

				{/* Navigation Buttons */}
				<div className="navigation">
					<button onClick={handleCreateTicket} className="navigation-button">
						Create a Ticket
					</button>
					<button onClick={handleAssignedTickets} className="navigation-button">
						Assigned Tickets
					</button>
					<button onClick={handleTicketsApproval} className="navigation-button">
						Tickets that need my approval
					</button>
				</div>
			</div>

			{/* Middle Column */}
			<div className="middle-column">
				<h2>IT Support Dashboard</h2>
				<form onSubmit={handleSearchTickets}>
					<div className="form-group">
						<label htmlFor="ARNumber">AR Number</label>
						<input
							type="text"
							id="ARNumber"
							name="ARNumber"
							value={formData.ARNumber}
							onChange={handleInputChange}
							placeholder="Enter AR Number"
						/>
						<button type="submit">Search Tickets</button>
					</div>
					<div className="form-group">
						<label htmlFor="ticketTitle">Ticket Title</label>
						<input
							type="text"
							id="ticketTitle"
							name="ticketTitle"
							value={formData.ticketTitle}
							onChange={handleInputChange}
							placeholder=" "
							disabled
						/>
					</div>

					<div className="form-group">
						<label htmlFor="ticketSummary">Ticket Summary</label>
						<textarea
							id="ticketSummary"
							name="ticketSummary"
							value={formData.ticketSummary}
							onChange={handleInputChange}
							placeholder=" "
							rows="7" // Set the number of rows to 7
							disabled
						></textarea>
					</div>

					<div className="form-group">
						<label htmlFor="ticketTitle">Ticket Priority</label>
						<input
							type="text"
							id="ticketTitle"
							name="ticketTitle"
							value={formData.ticketTitle}
							onChange={handleInputChange}
							placeholder=" "
							disabled
						/>
					</div>
					<div className="form-group">
						<label htmlFor="requestorUsername">Requestor Username</label>
						<input
							type="text"
							id="requestorUsername"
							name="requestorUsername"
							value={formData.requestorUsername}
							onChange={handleInputChange}
							placeholder="Enter Requestor Username"
						/>
					</div>


					<div className="form-group">
						<label htmlFor="assigneeUsername">Assignee Username</label>
						<input
							type="text"
							id="assigneeUsername"
							name="assigneeUsername"
							value={formData.assigneeUsername}
							onChange={handleInputChange}
							placeholder="Enter Assignee Username"
							disabled
						/>
					</div>
					<div className="form-group">
						<label htmlFor="escalationPath">Escalation Path</label>
						<input
							type="text"
							id="escalationPath"
							name="escalationPath"
							value={formData.escalationPath}
							onChange={handleInputChange}
							placeholder="Enter Escalation Path"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="ticketTitle">Ticket Status</label>
						<input
							type="text"
							id="ticketTitle"
							name="ticketTitle"
							value={formData.ticketTitle}
							onChange={handleInputChange}
							placeholder=" "
							disabled
						/>
					</div>

					<div className="form-group">
						<label htmlFor="fromDate">Ticket Created on</label>
						<input
							type="date"
							id="fromDate"
							name="fromDate"
							value={formData.fromDate}
							onChange={handleInputChange}
							disabled
						/>
					</div>
					<div className="form-group">
						<label htmlFor="toDate">Ticket Due on</label>
						<input
							type="date"
							id="toDate"
							name="toDate"
							value={formData.toDate}
							onChange={handleInputChange}
							disabled
						/>
					</div>
					{/* Display Summary */}
                    <div className="summary-section">
                        <h4>Summary</h4>
                        <p>{generateSummary()}</p>
                    </div>
				</form>
			</div>

			{/* Right Column */}
			<div className="right-column">
				<div className="user-info">
					<p><strong>User: Johnny Depp</strong></p>
				</div>

				{/* Right Column */}
				<div className="right-column">
					<div className="user-info">

						<a href="/user-info">
							<i className="fas fa-user"></i>
							<span className="icon">👤</span>
							<span>User Info</span>
						</a>
						<a href="/settings">
							<i className="fas fa-cog"></i>
							<span className="icon">⚙️</span>
							<span>Settings</span>
						</a>
						<a href="/logout" onClick={handleLogout} className="logout">
							<i className="fas fa-sign-out-alt"></i>
							<span className="icon">🔓</span>
							<span>Logout</span>
						</a>
					</div>
				</div>


			</div>
		</div>
	);
};

export default Dashboard;
