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
((SELECT user_id from Users where username='alice123'), 'Max', 'medium'),
((SELECT user_id from Users where username='carol123'), 'Bella', 'small'),
((SELECT user_id from Users where username='carol123'), 'Foxy', 'large'),
((SELECT user_id from Users where username='alexb'), 'Kevin', 'small'),
((SELECT user_id from Users where username='alexb'), 'Steve', 'medium');


/*
    A dog named Max, who is medium-sized and owned by alice123.
    A dog named Bella, who is small and owned by carol123.
    Three more dogs with details of your choosing.

*/