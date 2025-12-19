-- 1. Use `AND` to select students who are Gmail users with an ID greater than 2

SELECT * FROM students
WHERE email LIKE '%@gmail.com'
AND id > 2;