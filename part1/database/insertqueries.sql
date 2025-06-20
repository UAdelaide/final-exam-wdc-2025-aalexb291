USE DogWalkService;
INSERT INTO Users (username, email, password_hash, role)
VALUES
('alice123', 'alice@example.com', 'hashed123', 'owner'),
('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
('carol123', 'carol@example.com', 'hashed789', 'owner'),
('jimmy223', 'jimmy@example.com', 'hashed0123', 'walker'),
('alexb', 'alexb@example.com', 'hashed0456', 'owner');

INSERT INTO Dogs (owner_id, name, size)
VALUES
((SELECT user_id FROM Users WHERE username='alice123'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username='carol123'), 'Bella', 'small'),
((SELECT user_id FROM Users WHERE username='carol123'), 'Foxy', 'large'),
((SELECT user_id FROM Users WHERE username='alexb'), 'Kevin', 'small'),
((SELECT user_id FROM Users WHERE username='alexb'), 'Steve', 'medium');

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
VALUES
((SELECT dog_id FROM Dogs WHERE name='Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
((SELECT dog_id FROM Dogs WHERE name='Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'open'),


/*

    A request for Max at 2025-06-10 08:00:00 for 30 minutes at Parklands, with status open.
    A request for Bella at 2025-06-10 09:30:00 for 45 minutes at Beachside Ave, with status accepted.
    Three more walk requests with details of your choosing.


*/