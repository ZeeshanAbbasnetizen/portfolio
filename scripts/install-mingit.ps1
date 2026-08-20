$dest = "$env:LOCALAPPDATA\Programs\MinGit"
if (!(Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest -Force | Out-Null
}
$zip = "$env:TEMP\mingit.zip"
Write-Host "Downloading MinGit..."
Invoke-WebRequest -Uri 'https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/MinGit-2.47.1-64-bit.zip' -OutFile $zip
Write-Host "Extracting MinGit to $dest..."
Expand-Archive -Path $zip -DestinationPath $dest -Force
Remove-Item $zip -Force
Write-Host "Verifying git.exe..."
& "$dest\cmd\git.exe" --version
