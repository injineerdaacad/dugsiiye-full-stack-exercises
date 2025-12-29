-- 2. Insert students, courses, and enrollments

INSERT INTO students (name, email, score) VALUES
('Ahmed', 'ahmed@gmail.com', 85),
('Omar', 'omar@yahoo.com', 72),
('Ayan', 'ayan@gmail.com', 90),
('Khalid', 'khalid@outlook.com', 68),
('Abdi', 'abdi@gmail.com', 88),
('Hodan', 'hodan@edu.edu', 75),
('Noor', 'noor@gmail.com', 95);


INSERT INTO courses (course_name) VALUES
('SQL Basics'),
('Web Development'),
('App Development');


INSERT INTO enrollments (student_id, course_id) VALUES
(1, 1),  -- Ahmed
(1, 2),  -- Ahmed
(1, 3),  -- Ahmed

(2, 1),  -- Omar
(2, 2),  -- Omar

(3, 3),  -- Ayan
(3, 1),  -- Ayan

(4, 2),  -- Khalid

(5, 1),  -- Abdi
(5, 3),  -- Abdi

(6, 2),  -- Hodan

(7, 1);  -- Noor