import React, { useState } from 'react';
import { useAssignmentStore } from '../../store/assignmentStore';

const MonthlyView: React.FC = () => {
  const { assignments } = useAssignmentStore();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  const monthStats = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    const dayAssignments = assignments.filter(
      (a) => new Date(a.deadline).toDateString() === date.toDateString()
    );
    const completed = dayAssignments.filter((a) => a.status === 'completed').length;
    return {
      day: i + 1,
      total: dayAssignments.length,
      completed,
      date,
    };
  });

  const totalAssignments = monthStats.reduce((sum, d) => sum + d.total, 0);
  const totalCompleted = monthStats.reduce((sum, d) => sum + d.completed, 0);
  const monthlyCompletionRate = totalAssignments > 0 ? Math.round((totalCompleted / totalAssignments) * 100) : 0;

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startingDayOfWeek = firstDay.getDay();

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            ← Prev
          </button>
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Assignments</p>
          <p className="text-2xl font-bold text-blue-600">{totalAssignments}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-green-600">{totalCompleted}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Completion Rate</p>
          <p className="text-2xl font-bold text-purple-600">{monthlyCompletionRate}%</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square"></div>
          ))}
          {monthStats.map((stat) => (
            <div
              key={stat.day}
              className={`aspect-square p-2 rounded-lg text-center text-sm font-medium cursor-pointer transition ${
                stat.total === 0
                  ? 'bg-gray-50 text-gray-400'
                  : stat.completed === stat.total
                  ? 'bg-green-100 text-green-800'
                  : stat.completed > 0
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
              title={`${stat.completed}/${stat.total} completed`}
            >
              <div>{stat.day}</div>
              {stat.total > 0 && (
                <div className="text-xs mt-1">
                  {stat.completed}/{stat.total}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyView;