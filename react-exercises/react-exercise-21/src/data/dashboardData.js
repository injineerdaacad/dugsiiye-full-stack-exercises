export const courses = [
    { id: 1, name: 'React Fundamentals', progress: 75, instructor: 'Eng. Mc Hamouda', nextLesson: 'Components & Props' },
    { id: 2, name: 'JavaScript Advanced', progress: 45, instructor: 'Eng. Omar Tood', nextLesson: 'Async/Await' },
    { id: 3, name: 'UI/UX Design', progress: 90, instructor: 'Mr. Sharafdin', nextLesson: 'Color Theory' },
];

export const assignments = [
    { id: 1, title: 'Build a Todo App', course: 'React Fundamentals', dueDate: '2024-03-20', status: 'pending' },
    { id: 2, title: 'API Integration', course: 'JavaScript Advanced', dueDate: '2024-03-18', status: 'completed' },
    { id: 3, title: 'Design System', course: 'UI/UX Design', dueDate: '2024-03-25', status: 'in-progress' },
];

export const announcements = [
    { id: 1, title: 'New Course Available', message: 'Check out our new TypeScript course!', time: '2 hours ago' },
    { id: 2, title: 'Maintenance Notice', message: 'Platform updates scheduled for tonight', time: '5 hours ago' },
];

export const stats = [
    { label: 'Average Grade', value: '88%', icon: '📊' },
    { label: 'Courses', value: '3', icon: '📚' },
    { label: 'Study Hours', value: '45h', icon: '⏰' },
    { label: 'Assignments', value: '12', icon: '✍️' },
];
