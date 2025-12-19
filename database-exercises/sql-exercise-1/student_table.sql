-- Creating the students table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Inserting sample data
INSERT INTO students (name, email) VALUES
('Ahmed', 'ahmed@gmail.com'),
('Omar', 'omar@yahoo.com'),
('Ayan', 'ayan@gmail.com'),
('Khalid', 'khalid@outlook.com'),
('Abdi', 'abdi@gmail.com'),
('Hodan', 'hodan@edu.edu'),
('Noor', 'noor@gmail.com');