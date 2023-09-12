docker pull appvillisdocker/landings:IMAGE_NAME_VALUE-VERSION_VALUE
docker rm -f esimplusme-dev
docker run -d --restart=always --name esimplusme-dev -p 127.0.0.1:6000:3000 -e BUILD_MODE=runtime appvillisdocker/landings:IMAGE_NAME_VALUE-VERSION_VALUE
if [[ $? -ne 0 ]]; then
  echo "deploy FAILED"
  exit 1;
else
  echo "deploy SUCCESS"  
fi