-- 4. What is the average score of each domain group?

SELECT
  SUBSTRING_INDEX(email, '@', -1) AS domain,
  AVG(score) AS avg_score,
  COUNT(*) AS students_count
FROM students
GROUP BY domain
HAVING COUNT(*) > 0
ORDER BY avg_score DESC;