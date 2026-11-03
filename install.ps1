# insta-guideline-fix 설치 (Windows)
# 사용법: PowerShell에 아래 한 줄 붙여넣기
#   irm https://raw.githubusercontent.com/codmsdncodusdn-web/insta-guideline-fix/main/install.ps1 | iex

$ErrorActionPreference = 'Stop'
$repo = 'codmsdncodusdn-web/insta-guideline-fix'
$skill = 'insta-guideline-fix'

$tmp = Join-Path $env:TEMP ('insta-guideline-fix-' + [guid]::NewGuid())
New-Item -ItemType Directory -Path $tmp | Out-Null
try {
  Write-Host '스킬을 내려받는 중...'
  $zip = Join-Path $tmp 'repo.zip'
  Invoke-WebRequest "https://github.com/$repo/archive/refs/heads/main.zip" -OutFile $zip -UseBasicParsing
  Expand-Archive -Path $zip -DestinationPath $tmp -Force
  $root = Get-ChildItem -Path $tmp -Directory | Select-Object -First 1

  $dest = Join-Path $HOME '.claude\skills'
  New-Item -ItemType Directory -Force -Path $dest | Out-Null
  $to = Join-Path $dest $skill
  if (Test-Path $to) { Remove-Item -Recurse -Force $to }
  Copy-Item -Recurse -Path (Join-Path $root.FullName "plugins\$skill\skills\$skill") -Destination $to
  Write-Host ''
  Write-Host '설치 완료. Claude 앱을 다시 열고 "이 스크립트 가이드라인에 맞게 고쳐줘"라고 말해 보세요.'
} finally {
  Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
}
