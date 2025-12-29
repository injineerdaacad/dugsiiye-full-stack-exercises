-- 1. Show the last 2 students who registered

SELECT * FROM students
ORDER BY created_at DESC
LIMIT 2;