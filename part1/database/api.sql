-- Dogs

SELECT Dogs.name, Dogs.size, Users.username
FROM Dogs
JOIN Users ON Dogs.owner_id = Users.user_id;

-- Walk Requests

SELECT WalkRequests.request_id, 