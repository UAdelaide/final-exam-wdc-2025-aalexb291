-- Dogs

SELECT Dogs.name, Dogs.size, Users.username
FROM Dogs
JOIN Users ON Dogs.owner_id = Users.user_id;

-- Walk Requests

SELECT WalkRequests.request_id, Dogs.name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username
FROM WalkRequests
JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
JOIN Users ON Dogs.owner_id = Users.user_id
WHERE WalkRequests.status='open';

-- Walker Summary

SELECT Users.user_id, COUNT(WalkRequests.rating_id) AS total_ratings, AVG(WalkRequests.rating) AS average_rating, COUNT(WalkRequests.request_id) AS completed_walks
FROM WalkRatings
JOIN Users ON WalkRequests.walker_id = Users.user_id
GROUP BY WalkRequests.walker_id, User.username;