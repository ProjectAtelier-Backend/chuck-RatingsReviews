COPY reviews(review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/Users/chuck/Desktop/Project_Atelier_files/Data/reviews.csv'
DELIMITER ','
CSV HEADER
WHERE LENGTH(summary) < 61;

-- COPY photos(photo_id, review_id, url)
-- FROM '/Users/chuck/Desktop/Project_Atelier_files/Data/reviews_photos.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY characteristics(id, product_id, type)
-- FROM '/Users/chuck/Desktop/Project_Atelier_files/Data/characteristics.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY characteristic_reviews(id, characteristic_id, review_id, value)
-- FROM '/Users/chuck/Desktop/Project_Atelier_files/Data/characteristic_reviews.csv'
-- DELIMITER ','
-- CSV HEADER;