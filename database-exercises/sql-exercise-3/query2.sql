-- 2. Show only students with Gmail, sorted by name

SELECT * FROM students
WHERE email LIKE '%@gmail.com'
ORDER BY name ASC;