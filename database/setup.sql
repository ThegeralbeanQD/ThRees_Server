DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS recycling;
DROP TABLE IF EXISTS general;
DROP TABLE IF EXISTS compost;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS wastes;


CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    user_username VARCHAR (50) UNIQUE NOT NULL,
    user_password CHAR(60) NOT NULL,
    user_postcode VARCHAR (10),
    user_profile_pic VARCHAR (100),
    PRIMARY KEY (user_id)
);

CREATE TABLE posts (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    post_title VARCHAR (100) NOT NULL,
    post_content VARCHAR (500) NOT NULL,
    post_category VARCHAR (100) NOT NULL,
    post_image bytea,
    post_time TIME DEFAULT CURRENT_TIME,
    post_date DATE DEFAULT CURRENT_DATE,
    post_user_id INT,
    FOREIGN KEY (post_user_id) REFERENCES users(user_id),
    PRIMARY KEY (post_id)
);

CREATE TABLE wastes (
    waste_id INT GENERATED ALWAYS AS IDENTITY,
    waste_postcode VARCHAR (10) UNIQUE NOT NULL,
    PRIMARY KEY (waste_id)
);

CREATE TABLE recycling (
    recycling_id INT GENERATED ALWAYS AS IDENTITY,
    recycling_waste_id INT NOT NULL,
    recycling_days INT,
    recycling_last_collection DATE,
    recycling_next_collection DATE,
    FOREIGN KEY (recycling_waste_id) REFERENCES wastes(waste_id),
    PRIMARY KEY (recycling_id)
);

CREATE TABLE general (
    general_id INT GENERATED ALWAYS AS IDENTITY,
    general_waste_id INT NOT NULL,
    general_days INT,
    general_last_collection DATE,
    general_next_collection DATE,
    FOREIGN KEY (general_waste_id) REFERENCES wastes(waste_id),
    PRIMARY KEY (general_id)
);

CREATE TABLE compost (
    compost_id INT GENERATED ALWAYS AS IDENTITY,
    compost_waste_id INT NOT NULL,
    compost_days INT,
    compost_last_collection DATE,
    compost_next_collection DATE,
    FOREIGN KEY (compost_waste_id) REFERENCES wastes(waste_id),
    PRIMARY KEY (compost_id)
);

CREATE TABLE tokens (
  token_id INT GENERATED ALWAYS AS IDENTITY,
  token_user_id INT NOT NULL,
  token_token CHAR(36) UNIQUE NOT NULL,
  PRIMARY KEY (token_id),
  FOREIGN KEY (token_user_id) REFERENCES users(user_id)
);

INSERT INTO users (user_username, user_password, user_postcode)
VALUES 
('First User', 'pass1', 'PCODE1'),
('Second User', 'pass2', 'PCODE2'),
('Third User', 'pass3', 'PCODE3'),
('Forth User', 'pass3', 'PCODE4');

-- INSERT INTO posts (post_title, post_content, post_category, post_image, post_user_id)
-- VALUES 
-- ('How to Recycle Electronic Devices', 'CONTENT 2', 'Environment', 'electronics-recycling.jpg', 1),
-- ('Recycling 101: The Basics', 'CONTENT 2', 'Paper', 'paper.jpg', 2),
-- ('The Benefits of Composting', 'CONTENT 3', 'Gardening', 'composting.jpg', 1),
-- ('How to Recycle Plastic Bottles', 'CONTENT 4', 'Environment', 'plastic-bottles.jpg', 3),
-- ('Creative Ideas for Upcycling', 'CONTENT 5', 'DIY', 'upcycling.jpg', 3);

INSERT INTO wastes (waste_postcode)
VALUES 
('PCODE1'),
('PCODE2'),
('PCODE3'),
('PCODE4');

INSERT INTO recycling (recycling_waste_id, recycling_days, recycling_last_collection)
VALUES 
(1, 7, '2023-05-03'),
(2, 7, '2023-05-03'),
(3, 18, '2023-04-29'),
(4, 18, '2023-04-29');

INSERT INTO general (general_waste_id, general_days, general_last_collection)
VALUES 
(1, 8, '2023-05-01'),
(2, 8, '2023-05-03'),
(3, 10, '2023-05-03');
INSERT INTO compost (compost_waste_id, compost_days, compost_last_collection)
VALUES 
(1, 10, '2023-05-02'),
(2, 14, '2023-05-03'),
(3, 15, '2023-04-28');
