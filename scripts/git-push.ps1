$git = "$env:LOCALAPPDATA\Programs\MinGit\cmd\git.exe"

& $git remote remove origin 2>$null
& $git remote add origin https://github.com/ZeeshanAbbasnetizen/portfolio.git
& $git remote -v

$env:GIT_TERMINAL_PROMPT = "0"
Write-Host "Attempting push to origin main..."
& $git push -u origin main
