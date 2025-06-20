-- Dogs

SELECT Dogs.name, Dogs.size, Users.username
FROM Dogs
JOIN users ON dogs.owner_id = Users.user_id;