-- Dogs

SELECT Dogs.name, Dogs.size, Users.username
FROM Dogs
JOIN Users ON Dogs.owner_id = Users.user_id;

-- Walk Requests

SELECT WalkRequests.request_id, Dogs.name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username
FROM WalkRequests
JOIN Dogs ON Dogs