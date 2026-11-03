#!/usr/bin/env bash
# insta-guideline-fix 설치 (Mac)
# 사용법: 터미널에 아래 한 줄 붙여넣기
#   curl -fsSL https://raw.githubusercontent.com/codmsdncodusdn-web/insta-guideline-fix/main/install.sh | bash

set -euo pipefail
REPO="codmsdncodusdn-web/insta-guideline-fix"
SKILL="insta-guideline-fix"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "스킬을 내려받는 중..."
curl -fsSL "https://github.com/$REPO/archive/refs/heads/main.tar.gz" | tar -xz -C "$TMP"
ROOT="$(find "$TMP" -mindepth 1 -maxdepth 1 -type d | head -1)"

DEST="$HOME/.claude/skills"
mkdir -p "$DEST"
rm -rf "$DEST/$SKILL"
cp -R "$ROOT/plugins/$SKILL/skills/$SKILL" "$DEST/$SKILL"
echo
echo '설치 완료. Claude 앱을 다시 열고 "이 스크립트 가이드라인에 맞게 고쳐줘"라고 말해 보세요.'
