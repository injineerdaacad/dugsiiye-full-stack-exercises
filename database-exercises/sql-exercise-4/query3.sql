-- 3. How many students per domain?

SELECT
  SUBSTRING_INDEX(email, '@', -1) AS domain,
  COUNT(*) AS students_count
FROM students
GROUP BY domain
ORDER BY students_count DESC;