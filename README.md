# FaceSense - backend

1. Clone this repo
2. Run `npm install`
3. Run `npm start`
4. You must add your own database in the db variable in `server.js`
5. Create an SQL DB with these queries: 
```
CREATE TABLE users (
id serial PRIMARY KEY,
name VARCHAR(100),
email text UNIQUE NOT NULL,
entries BIGINT DEFAULT 0,
joined TIMESTAMP NOT NULL);

CREATE TABLE login(
id serial PRIMARY KEY,
hash VARCHAR(100) NOT NULL,
email text UNIQUE NOT NULL);

```
7. [Frontend side of FaceSense](https://github.com/ErinBejtaa/FaceSense/)


