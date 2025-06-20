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
((SELECT dog_id FROM Dogs WHERE name='Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
((SELECT dog_id FROM Dogs WHERE name='Foxy'), '2025-06-08 10:00:00', 60, 'Botanic Gardens', 'completed'),
((SELECT dog_id FROM Dogs WHERE name='Kevin'), '2025-06-08 11:00:00', 50, 'Kosciuszko', 'cancelled'),
((SELECT dog_id FROM Dogs WHERE name='Steve'), '2025-06-12 10:00:00', 30, 'Henley Beach', 'open');

INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments)
VALUES
()