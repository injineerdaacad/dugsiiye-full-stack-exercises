-- 3. Limit results to 1 row and rename the columns to Student and Email Address.

SELECT name AS Student, email AS `Email Address` 
FROM students
LIMIT 1;
