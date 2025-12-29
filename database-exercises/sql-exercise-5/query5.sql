-- 5. BONUS: Count how many students per course using GROUP BY

SELECT
    courses.course_name,
    COUNT(enrollments.student_id) AS total_students
FROM courses
LEFT JOIN enrollments ON courses.id = enrollments.course_id
GROUP BY courses.course_name;