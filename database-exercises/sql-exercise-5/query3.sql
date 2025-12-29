-- 3. Use INNER JOIN to find who is enrolled

SELECT
    students.name AS student,
    courses.course_name AS course
FROM enrollments
INNER JOIN students ON enrollments.student_id = students.id
INNER JOIN courses ON enrollments.course_id = courses.id;