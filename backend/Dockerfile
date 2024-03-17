FROM maven:3.9.6-eclipse-temurin-21-alpine

#COPY pom.xml /workspace/
#COPY src /workspace/src/
COPY . /workspace

WORKDIR /workspace/

CMD ["mvn", "compile", "quarkus:dev"]
