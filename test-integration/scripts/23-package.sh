#!/bin/bash

set -e

#-------------------------------------------------------------------------------
# Package the application
#-------------------------------------------------------------------------------
if [ -f "mvnw" ]; then
    ./mvnw -ntp verify -DskipTests -P"$JHI_PROFILE"
    mv target/*.jar app.jar
elif [ -f "gradlew" ]; then
    ./gradlew bootJar -P"$JHI_PROFILE" -x test
    mv build/libs/*SNAPSHOT.jar app.jar
else
    echo "*** no mvnw or gradlew"
    exit 0
fi
if [ $? -ne 0 ]; then
    echo "*** error when packaging"
    exit 1
fi
