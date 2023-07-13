echo DOCKERHUB_PASSWORD_VALUE | docker login --username DOCKERHUB_USER_VALUE --password-stdin
docker pull appvillisdocker/landings:IMAGE_NAME_VALUE-VERSION_VALUE
docker rm -f pipeline-esim-dev
docker run -d --restart-always --name pipeline-esim-dev -p 127.0.0.1:6000:3000 appvillisdocker/landings:IMAGE_NAME_VALUE-VERSION_VALUE
echo "container pipeline-esim-dev started"
