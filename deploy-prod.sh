docker pull appvillisdocker/landings:IMAGE_NAME_VALUE-VERSION_VALUE
docker rm -f pipeline-esim-prod
docker run -d --restart=always --name pipeline-esim-prod -p 127.0.0.1:6001:3000 appvillisdocker/landings:IMAGE_NAME_VALUE-VERSION_VALUE
if [[ $? -ne 0 ]]; then
  echo "deploy FAILED"
  exit 1;
else
  echo "deploy SUCCESS"  
fi