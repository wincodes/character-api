# Awesome Project Build with TypeORM
## Setup postgres database configurations
- before running the application with npm or docker please ensure the instruction below is completed
### Copy contents of ormconfig.example.json in a new file named `ormconfig.json` and update the postgres database connection variables in the new created file `ormconfig.json`

## Start application with npm:

1. On the root directory Run `npm i` command
2. Run `npm start` command for production and `npm run dev` for development

## Run App with Docker

1. On the root directory run `docker-compose build` to build the docker image
2. After build, run `docker-compose up` to start the image
