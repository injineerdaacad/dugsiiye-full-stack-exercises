-- 4. Use LEFT JOIN to list all students + their courses (NULL if none)

SELECT
    students.name AS student,
    courses.course_name AS course
FROM students
LEFT JOIN enrollments ON students.id = enrollments.student_id
LEFT JOIN courses ON enrollments.course_id = courses.id
ORDER BY students.name;