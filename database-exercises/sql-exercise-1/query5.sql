-- 5. Create your own search: maybe by domain, or name pattern (e.g., find all students with .edu email addresses).

SELECT * FROM students
WHERE email LIKE '%.edu';