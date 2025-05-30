param (
    [string[]]$FoldersToBuild
)

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$lambdaRoot = Join-Path $root "lambdas"

# Get all lambda subdirectories unless specific ones are provided
$folders = if ($FoldersToBuild) {
    $FoldersToBuild | ForEach-Object { Join-Path $lambdaRoot $_ }
} else {
    Get-ChildItem -Path $lambdaRoot -Directory | ForEach-Object { $_.FullName }
}

foreach ($folder in $folders) {
    $name = Split-Path $folder -Leaf
    Write-Host "`n=== Building Lambda Function: $name ==="

    Push-Location $folder

    # Cleanup previous artifacts
    Remove-Item -Recurse -Force "./package" -ErrorAction SilentlyContinue
    Remove-Item -Force "./package.zip" -ErrorAction SilentlyContinue

    # Build Docker image
    docker build --platform linux/amd64 --no-cache -t "$name-lambda" .

    # Extract built files from container
    docker create --name extract "$name-lambda"
    docker cp extract:/var/task ./package
    docker rm extract

    # Create zip package
    Compress-Archive -Path .\package\* -DestinationPath package.zip

    Pop-Location
}
