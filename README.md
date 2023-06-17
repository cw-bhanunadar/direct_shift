# Referral System

Before running this project, please ensure that you have the following software installed:

Docker: Version 24.0.2

Docker Compose: Version 1.29.2

If you do not have Docker and Docker Compose installed, please follow the instructions below to install them.

## Installing Docker

1. Visit the Docker website at https://www.docker.com/ and download the appropriate version of Docker for your operating system.

2. Run the Docker installer and follow the on-screen instructions to complete the installation.

3. After the installation is complete, open a terminal or command prompt and run the following command to verify that Docker is installed: `docker --version`


## Installing Docker Compose

Docker Compose is included with Docker on most platforms. However, if you don't have Docker Compose installed or need to upgrade it, you can follow the steps below.

Visit the Docker Compose GitHub repository at https://github.com/docker/compose.

In the GitHub repository, navigate to the "Releases" section and find the latest release of Docker Compose.

Depending on your operating system, follow the appropriate installation instructions provided in the Docker Compose documentation.

After the installation is complete, open a terminal or command prompt and run the following command to verify that Docker Compose is installed: `docker-compose --version`

## Getting Started

Follow these steps to run the project:

1. Clone the repository:
```
git clone https://github.com/cw-bhanunadar/direct_shift.git
```

2. Navigate to the project directory:

```
cd direct_shift
```

3. Add .env file in backend and frontend folder

```
// Backend

MYSQL_USER=xxx
MYSQL_PASSWORD=xxx
MYSQL_DATABASE=xx
DB_HOST=x
WEBSITE_URL=http://34.16.132.47/
EMAIL_PASSWORD=xxx
MYSQL_ROOT_PASSWORD=xxx

// Frontend
PORT=4000
REACT_APP_API_URL=http://localhost:3000
```

4. Build and start the Docker containers using Docker Compose:

```
docker-compose up
```