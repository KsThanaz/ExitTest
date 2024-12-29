
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import FeedbackDashboard from './components/FeedbackDashboard';
import AddFeedback from './components/AddFeedback';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/add-feedback">Add Feedback</NavLink>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/dashboard" element={<FeedbackDashboard />} />
                <Route path="/add-feedback" element={<AddFeedback />} />
            </Routes>
        </Router>
    );
}

export default App;
