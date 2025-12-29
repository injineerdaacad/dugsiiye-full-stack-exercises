-- 4. Measure it with and without index using EXPLAIN

-- Without Index
EXPLAIN SELECT * FROM users
WHERE email = 'user800@gmail.com';

-- Creating Index
CREATE INDEX idx_users_email ON users(email);

-- Show Index
SHOW INDEX FROM users;

-- With Index
EXPLAIN SELECT * FROM users
WHERE email = 'user800@gmail.com';