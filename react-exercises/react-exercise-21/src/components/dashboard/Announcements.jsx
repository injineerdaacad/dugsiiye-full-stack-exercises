import React from 'react';
import Card from '../ui/Card';
import { announcements } from '../../data/dashboardData';

const Announcements = () => {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Announcements</h2>
      <div className="space-y-4">
        {announcements.map(announcement => (
          <div key={announcement.id} className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-medium text-gray-800">{announcement.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{announcement.message}</p>
            <p className="text-xs text-gray-400 mt-1">{announcement.time}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Announcements;