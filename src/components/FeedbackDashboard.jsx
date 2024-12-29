
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackDashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingFeedback, setEditingFeedback] = useState(null);
    const [newFeedback, setNewFeedback] = useState({
        courseName: '',
        courseDuration: '',
        feedbackRating: ''
    });

    // Fetch feedback data
    useEffect(() => {
        axios.get('http://localhost:5000/api/feedback')
            .then(res => {
                setFeedbacks(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    // Handle delete feedback
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/feedback/${id}`)
            .then(res => {
                setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
            })
            .catch(err => console.error('Error deleting feedback:', err));
    };

    // Handle edit feedback
    const handleEdit = (feedback) => {
        setEditingFeedback(feedback);
        setNewFeedback({
            courseName: feedback.courseName,
            courseDuration: feedback.courseDuration,
            feedbackRating: feedback.feedbackRating
        });
    };

    // Handle input change in edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFeedback(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Save edited feedback
    const handleSaveEdit = () => {
        axios.put(`http://localhost:5000/api/feedback/${editingFeedback._id}`, newFeedback)
            .then(res => {
                setFeedbacks(feedbacks.map(feedback =>
                    feedback._id === editingFeedback._id ? res.data : feedback
                ));
                setEditingFeedback(null);
                setNewFeedback({
                    courseName: '',
                    courseDuration: '',
                    feedbackRating: ''
                });
            })
            .catch(err => console.error('Error updating feedback:', err));
    };

    return (
        <div>
            <h2>Welcome</h2>
            {loading ? (
                <p>Loading feedbacks...</p>
            ) : feedbacks.length === 0 ? (
                <p>No feedback available yet.</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Course Duration</th>
                                <th>Feedback Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map(feedback => (
                                <tr key={feedback._id}>
                                    <td>{feedback.courseName}</td>
                                    <td>{feedback.courseDuration}</td>
                                    <td>{feedback.feedbackRating}</td>
                                    <td>
                                        <button onClick={() => handleEdit(feedback)}>Edit</button>
                                        <button onClick={() => handleDelete(feedback._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {editingFeedback && (
                        <div>
                            <h3>Edit Feedback</h3>
                            <form>
                                <div>
                                    <label>Course Name</label>
                                    <input
                                        type="text"
                                        name="courseName"
                                        value={newFeedback.courseName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label>Course Duration</label>
                                    <input
                                        type="text"
                                        name="courseDuration"
                                        value={newFeedback.courseDuration}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label>Feedback Rating</label>
                                    <input
                                        type="text"
                                        name="feedbackRating"
                                        value={newFeedback.feedbackRating}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="button" onClick={handleSaveEdit}>Save</button>
                                <button type="button" onClick={() => setEditingFeedback(null)}>Cancel</button>
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FeedbackDashboard;
