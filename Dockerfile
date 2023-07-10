# Use the official PostgreSQL image as the base image
FROM postgres:latest

ENV POSTGRES_USER myuser
ENV POSTGRES_PASSWORD mypassword
ENV POSTGRES_DB mydatabase

EXPOSE 5432

CMD ["postgres"]
