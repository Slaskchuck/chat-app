# Chat App
Chat app using docker-compose

# Installation
Just run `docker-compose up` this will build all the neccessary images. All env variables are already been set for easy installation.

If there's an changes in the package, you first gonna run this in order
`docker-compose down` `docker rmi <image>` `docker-compose up`

# List of custom docker images
- chat_web
- chat_api
- chat_socket