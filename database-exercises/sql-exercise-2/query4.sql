-- 4. Query combining `LIKE`, `AND`, and `OR

SELECT * FROM students
WHERE (email LIKE '%@gmail.com' OR name LIKE 'A%')
AND id > 1;