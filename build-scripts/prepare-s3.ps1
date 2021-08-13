Write-Output "======================================="
Write-Output "========  Prepare file for s3  ========"
Write-Output "======================================="


Write-Output "Creating Directory v1/metadata/icons"
New-Item "v1/metadata/icons" -Force -ItemType "directory" | Out-Null

Write-Output "Directory v1/metadata/icons created!"

Write-Output "Copying .\dist\tyler-icons-metadata-svg.json to .\v1\metadata\icons\tyler-icons-metadata-svg.v1.json"

Copy-Item .\dist\tyler-icons-metadata-svg.json .\v1\metadata\icons\tyler-icons-metadata-svg.v1.json

Write-Output "Copying complete!"

Write-Output "======================================="
Write-Output "`n"

