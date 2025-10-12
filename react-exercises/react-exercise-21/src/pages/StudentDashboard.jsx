import React from 'react';
import Header from '../components/layout/Header';
import StatsGrid from '../components/dashboard/StatsGrid';
import CourseProgress from '../components/dashboard/CourseProgress';
import UpcomingAssignments from '../components/dashboard/UpcomingAssignments';
import Announcements from '../components/dashboard/Announcements';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Header />
        <StatsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CourseProgress />
          </div>
          <div className="space-y-6">
            <UpcomingAssignments />
            <Announcements />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;