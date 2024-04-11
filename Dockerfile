# pull official base image
FROM python:3.10-alpine
#FROM python:3


# the directory will contain the code of the running Django project
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev jpeg-dev zlib-dev

# installing python dependencies after making a copy of the requirements.txt
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt 


# copy over the whole project itself
COPY . . 







