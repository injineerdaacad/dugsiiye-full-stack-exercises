import React from 'react';
import Card from '../ui/Card';
import { courses } from '../../data/dashboardData';

const getProgressColor = (progress) => {
  if (progress < 50) return 'bg-red-500';
  if (progress < 80) return 'bg-yellow-500';
  return 'bg-green-500';
};

const CourseProgress = () => {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Progress</h2>
      <div className="space-y-4">
        {courses.map(course => (
          <div key={course.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-800">{course.name}</h3>
              <span className="text-sm text-gray-500">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${getProgressColor(course.progress)}`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-gray-500">Next: {course.nextLesson}</span>
              <span className="text-gray-500">{course.instructor}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CourseProgress;