
# JDK for docker to use
FROM openjdk:21-ea-1-jdk-slim

# COPY (from local machine) "." to place all on the docker container being created, from "." all
COPY . .

# inside the container use gradle to create a jar file executable to run.
# COPY command is wrong and would copy your local build file, rather than the docker container build file
RUN ./gradlew bootJar

# Run the move command, "mv", from the recently built jar file to a new file called app.jar
# make sure to verify the name "backend-0.0.1.jar" as named in gradle.build file where it says version = '0.0.1' or '0.0.1-SNAPSHOT' just make sure it matches.
RUN mv build/libs/backend-0.0.1-SNAPSHOT.jar app.jar

# EXPOSE lets devs know what port the container uses. Totally optional:
EXPOSE 8080

# run the app.jar
CMD ["java", "-jar", "app.jar"]