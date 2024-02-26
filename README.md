
# MediaLibrary
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

A web application for streaming and sorting your personal media collection though a web interface.


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Environment Variables

To run this project, you will need to set the following environment variables


Mysql database settings

`MYSQL_HOST`
`MYSQL_USERNAME`
`MYSQL_PASSWORD`

Java marven profile: 
options 'dev' or 'prod' default is 'prod'

`PROFILE`


## Run Locally

Clone the project

```bash
  git clone https://github.com/VisualSource/MediaLibrary
```

Go to the project directory

```bash
  cd my-project
```

### Via Docker 

```bash
docker compose up --build 
```

### Non Docker

Start app

```bash
./mvnw spring-boot:run
```


## Authors

- [@VisualSource](https://www.github.com/visualsource)


## License

[MIT](https://choosealicense.com/licenses/mit/)
