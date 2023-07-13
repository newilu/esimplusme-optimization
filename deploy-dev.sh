echo DOCKERHUB_PASSWORD_VALUE | docker login --username DOCKERHUB_USER_VALUE --password-stdin
docker pull appvillisdocker/landings:IMAGE_NAME_VALUE-VERSION_VALUE
docker rm -f pipeline-esim-dev
docker run -d --restart=always --name pipeline-esim-dev -p 127.0.0.1:6000:3000 appvillisdocker/landings:IMAGE_NAME_VALUE-VERSION_VALUE
if [[ $? -ne 0 ]]; then
  echo "deploy FAILED"
  docker logout
  exit 1;
else
  echo "deploy SUCCESS"  
fi
docker logout