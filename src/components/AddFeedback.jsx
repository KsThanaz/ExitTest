
import React, { useState } from 'react';
import axios from 'axios';

const AddFeedback = () => {
    const [formData, setFormData] = useState({
        courseName: '',
        courseDuration: '',
        feedbackRating: '',
        feedbackComments: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/feedback', formData)
            .then(() => {
                setSuccessMessage('Your response has been saved!');
                setFormData({
                    courseName: '',
                    courseDuration: '',
                    feedbackRating: '',
                    feedbackComments: ''
                });
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Add Feedback</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Course Name</label>
                    <input
                        type="text"
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Course Duration</label>
                    <input
                        type="text"
                        name="courseDuration"
                        value={formData.courseDuration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Feedback Rating</label>
                    <input
                        type="number"
                        name="feedbackRating"
                        value={formData.feedbackRating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div>
                    <label>Feedback Comments</label>
                    <textarea
                        name="feedbackComments"
                        value={formData.feedbackComments}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddFeedback;
