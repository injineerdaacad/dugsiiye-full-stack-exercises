-- 3. Fix the query using parentheses
-- SELECT * FROM students
-- WHERE name = 'Ayan' OR name = 'Max' AND id < 3;

SELECT * FROM students
WHERE (name = 'Ayan' OR name = 'Max')
AND id < 3;