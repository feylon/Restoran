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
ALTER TABLE admin
ADD COLUMN active BOOLEAN DEFAULT true,
ADD COLUMN state BOOLEAN DEFAULT true;
insert into admin (name, login, password, lastname, firstname, permission_id, email) values
('Salom', 'salom1409', '$2b$10$6PyEX8fPzo39jT55rDVaj.lDEG8KehNoe/plSb6dOu.8W0w68y3Me', 'Ergashev', 'Jamshid', 1, 'jamshid14092002@gmail.com');
ALTER TABLE admin
ADD COLUMN reset_password_token VARCHAR(255),
ADD COLUMN reset_password_expires TIMESTAMP;


CREATE TABLE AdminSession (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admin_id UUID NOT NULL,
    foreign key(admin_id) references admin (id),
    token VARCHAR(255) NOT NULL,
    expires TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Food section

CREATE TABLE food_category (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_uz VARCHAR(50) NOT NULL unique,
    name_kril VARCHAR(50) NOT NULL unique,
    name_rus VARCHAR(50) NOT NULL unique,
    name_en VARCHAR(50) NOT NULL unique,
    created_at timestamp default current_timestamp,
	image_url varchar(500),
	status boolean default true,
    created_by UUID,
    FOREIGN KEY (created_by) REFERENCES admin(id),
	description TEXT
	);
CREATE TABLE food_item (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_uz VARCHAR(50) NOT NULL unique,
    name_kril VARCHAR(50) NOT NULL unique,
    name_rus VARCHAR(50) NOT NULL unique,
    name_en VARCHAR(50) NOT NULL unique,
    created_at TIMESTAMP DEFAULT current_timestamp,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0), 
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    status BOOLEAN DEFAULT TRUE,
    category_id UUID, 
    image_url VARCHAR(500)[], 
    param VARCHAR(500),
    FOREIGN KEY (category_id) REFERENCES food_category(id),
	discount boolean,	
	discount_value DECIMAL(10, 2) NOT NULL CHECK (discount_value >= 0) default 0,
    created_by UUID,
    FOREIGN KEY (created_by) REFERENCES admin(id),
	format varchar(50)
);
