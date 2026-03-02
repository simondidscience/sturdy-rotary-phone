import React, { useState } from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

const DailyView = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [assignments, setAssignments] = useState([
        { title: 'Math Homework', completed: false },
        { title: 'Science Project', completed: true },
    ]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // Here you would typically fetch assignments for the selected date.
    };

    const completionPercentage = () => {
        const completedAssignments = assignments.filter(a => a.completed).length;
        return Math.round((completedAssignments / assignments.length) * 100);
    };

    return (
        <div>
            <h1>Daily Assignments for {selectedDate.toLocaleDateString()}</h1>
            <DatePicker onChange={handleDateChange} />
            <div style={{ width: '100%', background: '#ccc', margin: '20px 0' }}>
                <div style={{ width: `${completionPercentage()}%`, background: 'green', padding: '10px', color: 'white' }}>
                    {completionPercentage()}% Completed
                </div>
            </div>
            <ul>
                {assignments.map((assignment, index) => (
                    <li key={index} style={{ textDecoration: assignment.completed ? 'line-through' : 'none' }}>
                        {assignment.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DailyView;