# sheba
Online Learning Platform

Docker commands:

For development environment:
To build image: docker build --target development -t sheba .
To run docker with an attached shell: docker run --name sheba -p 8000:8000 -v ${pwd}/build:/app sheba (for command prompt, use $(pwd))

For production environment:
To build image: docker build --target production -t sheba .
To run docker with an attached shell: docker run --name sheba -p 8000:8000 sheba

