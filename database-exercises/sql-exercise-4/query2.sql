-- 2. What’s the highest and lowest score?

SELECT
  MAX(score) AS highest_score,
  MIN(score) AS lowest_score
FROM students;