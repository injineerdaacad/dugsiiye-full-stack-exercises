-- 2. Insert 1000+ rows (manually, generator, or script)

SET GLOBAL local_infile = 1;

LOAD DATA LOCAL INFILE
'/home/eng-honest/Documents/projects/dugsiiye-full-stack-exercises/database-exercises/sql-exercise-6/users_1000.csv'
INTO TABLE users
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(username, email, age);