$git = "$env:LOCALAPPDATA\Programs\MinGit\cmd\git.exe"

Write-Host "Initializing Git repo..."
& $git init
& $git config user.name "Zeeshan Abbas"
& $git config user.email "zeeshan.abbas.dev@gmail.com"
& $git branch -M main
& $git add .
& $git status
& $git commit -m "Initial commit: Zeeshan 3D developer portfolio"
