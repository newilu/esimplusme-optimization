docker pull appvillisdocker/landings:IMAGE_NAME_VALUE-VERSION_VALUE
docker rm -f esimplusme-prod-1 esimplusme-prod-2 esimplusme-prod-3
docker run -d --restart=always --name esimplusme-prod-1 -p 127.0.0.1:7001:3000 appvillisdocker/landings:IMAGE_NAME_VALUE-VERSION_VALUE
docker run -d --restart=always --name esimplusme-prod-2 -p 127.0.0.1:7002:3000 appvillisdocker/landings:IMAGE_NAME_VALUE-VERSION_VALUE
docker run -d --restart=always --name esimplusme-prod-3 -p 127.0.0.1:7003:3000 appvillisdocker/landings:IMAGE_NAME_VALUE-VERSION_VALUE
if [[ $? -ne 0 ]]; then
  echo "deploy FAILED"
  exit 1;
else
  echo "deploy SUCCESS"  
fi