# okay to remove no-cache usually, runs in powershell, I have ARM laptop so I gotta specify
Remove-Item -Recurse -Force "./package"
Remove-Item -Force "./package.zip"
docker build --platform linux/amd64 --no-cache -t my-lambda .

docker create --name extract my-lambda

docker cp extract:/var/task ./package

docker rm extract

Compress-Archive -Path .\package\* -DestinationPath package.zip
