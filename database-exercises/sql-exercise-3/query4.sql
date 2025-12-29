-- 4. Create your own variation that uses all 3: ORDER BY, LIMIT, and AS.

SELECT name AS Student, email AS `Email Address`
FROM students
WHERE email LIKE '%@gmail.com'
ORDER BY created_at DESC
LIMIT 1;