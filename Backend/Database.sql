Create table admin_permission
(    id bigserial primary key not null,
    name varchar(500) unique not null,
    created_at timestamp default current_timestamp,

);

insert into admin_permission (name) values ("main");
-------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Admin (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    login varchar(100) not null unique,
	password varchar(500) not null,
    lastname varchar(100) not null,
    firstname varchar(100) not null,
    birthday DATE default '2004-04-21',
    permission_id integer not null,
    foreign key(permission_id) references admin_permission  (id),
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profile_url varchar(100)
);
insert into admin (name, login, password, lastname, firstname, permission_id, email) values
('Salom', 'salom1409', '$2b$10$6PyEX8fPzo39jT55rDVaj.lDEG8KehNoe/plSb6dOu.8W0w68y3Me', 'Ergashev', 'Jamshid', 1, 'jamshid14092002@gmail.com');
