import React from 'react';
import Card from '../ui/Card';
import { stats } from '../../data/dashboardData';

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <div className="flex items-center">
            <div className="text-2xl mr-4">{stat.icon}</div>
            <div>
              <div className="text-sm text-gray-500">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;