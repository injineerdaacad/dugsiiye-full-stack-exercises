import React from 'react';
import Card from '../ui/Card';
import { assignments } from '../../data/dashboardData';

const UpcomingAssignments = () => {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Assignments</h2>
      <div className="space-y-4">
        {assignments.map(assignment => (
          <div key={assignment.id} className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">{assignment.title}</h3>
              <p className="text-sm text-gray-500">{assignment.course}</p>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
                  assignment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                {assignment.status}
              </span>
              <p className="text-xs text-gray-500 mt-1">Due {assignment.dueDate}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingAssignments;