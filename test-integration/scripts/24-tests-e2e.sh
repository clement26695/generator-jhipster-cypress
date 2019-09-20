#!/bin/bash

#-------------------------------------------------------------------------------
# Specific for couchbase
#-------------------------------------------------------------------------------
cd "$HOME/$JHIPSTER_FOLDER_APP"
if [ -a src/main/docker/couchbase.yml ]; then
    docker-compose -f src/main/docker/couchbase.yml up -d
    sleep 20
    docker ps -a
fi

#-------------------------------------------------------------------------------
# Functions
#-------------------------------------------------------------------------------
launchCurlOrCypress() {
    retryCount=1
    maxRetry=10
    httpUrl="http://localhost:8080"
    if [[ "$JHI_APP" == *"micro"* ]]; then
        httpUrl="http://localhost:8081/management/health"
    fi

    rep=$(curl -v "$httpUrl")
    status=$?
    while [ "$status" -ne 0 ] && [ "$retryCount" -le "$maxRetry" ]; do
        echo "*** [$(date)] Application not reachable yet. Sleep and retry - retryCount =" $retryCount "/" $maxRetry
        retryCount=$((retryCount+1))
        sleep 10
        rep=$(curl -v "$httpUrl")
        status=$?
    done

    if [ "$status" -ne 0 ]; then
        echo "*** [$(date)] Not connected after" $retryCount " retries."
        return 1
    fi

    retryCount=0
    maxRetry=1
    until [ "$retryCount" -ge "$maxRetry" ]
    do
        result=0
        if [[ -f "tsconfig.json" ]]; then
            npm run e2e:cypress:headless
        fi
        result=$?
        [ $result -eq 0 ] && break
        retryCount=$((retryCount+1))
        echo "*** e2e tests failed... retryCount =" $retryCount "/" $maxRetry
        sleep 15
    done
    return $result
}

#-------------------------------------------------------------------------------
# Run the application
#-------------------------------------------------------------------------------
cd "$HOME/$JHIPSTER_FOLDER_APP"
# Run the app packaged as jar
java \
    -jar app.jar \
    --spring.profiles.active="$JHI_PROFILE" \
    --logging.level.ROOT=OFF \
    --logging.level.org.zalando=OFF \
    --logging.level.org.springframework.web=ERROR \
    --logging.level.io.github.jhipster=OFF \
    --logging.level.io.github.jhipster.sample=OFF \
    --logging.level.io.github.jhipster.travis=OFF &
echo $! > .pidRunJar
sleep 40

launchCurlOrCypress
resultRunJar=$?
kill $(cat .pidRunJar)

exit $((resultRunJar))
