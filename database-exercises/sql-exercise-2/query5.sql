-- 5. Safe `UPDATE` or `DELETE` (using SELECT first)

-- Step 1: SELECT (check first)

SELECT * FROM students
WHERE name = 'Ahmed';

-- Step 2: UPDATE (safe)

UPDATE students
SET email = 'ahmed.updated@gmail.com'
WHERE name = 'Ahmed';

-- (Alternative safe DELETE)

DELETE FROM students
WHERE id = 1;