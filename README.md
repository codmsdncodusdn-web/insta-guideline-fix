# insta-guideline-fix

릴스 스크립트, 영상, 카드뉴스를 메타 커뮤니티 규정과 인스타그램 추천 가이드라인에 맞게 고쳐 주는 Claude 스킬입니다. 문제 되는 문구를 찾아 **수정 전후 표**와 그대로 쓸 수 있는 수정본을 줍니다.

코딩을 몰라도 쓸 수 있고, Windows와 Mac 모두 지원합니다.

## 설치

**[Claude 앱](https://claude.ai/download)이 있어야 합니다.** 아래 방법 중 하나만 하면 됩니다. 가장 쉬운 방법은 1번입니다.

### 방법 1. Claude에게 부탁하기 (가장 쉬움)

Claude 앱의 **Code** 탭에 이 문장을 그대로 붙여넣으세요.

> https://github.com/codmsdncodusdn-web/insta-guideline-fix 저장소의 insta-guideline-fix 스킬을 내 개인 스킬 폴더 ~/.claude/skills에 설치해줘. 저장소의 plugins/insta-guideline-fix/skills/insta-guideline-fix 폴더를 복사하면 돼.

### 방법 2. 한 줄 설치

**Windows:** 시작 메뉴에서 `PowerShell`을 열고 아래 줄을 붙여넣은 뒤 Enter를 누르세요.

```powershell
irm https://raw.githubusercontent.com/codmsdncodusdn-web/insta-guideline-fix/main/install.ps1 | iex
```

**Mac:** Spotlight(`Cmd + Space`)에서 `터미널`을 열고 아래 줄을 붙여넣은 뒤 Enter를 누르세요.

```bash
curl -fsSL https://raw.githubusercontent.com/codmsdncodusdn-web/insta-guideline-fix/main/install.sh | bash
```

설치가 끝나면 **Claude 앱을 완전히 껐다가 다시 여세요.** 업데이트할 때도 같은 방법을 다시 실행하면 됩니다.

### 방법 3. Claude 채팅에 스킬 파일 올리기

[insta-guideline-fix.skill](https://github.com/codmsdncodusdn-web/insta-guideline-fix/raw/main/insta-guideline-fix.skill)을 내려받아 Claude 채팅에 올린 뒤 **Save skill** 버튼을 누르세요. 조직 설정에 따라 버튼이 보이지 않을 수 있습니다.

### 방법 4. 플러그인으로 설치 (터미널 Claude Code)

```text
/plugin marketplace add codmsdncodusdn-web/insta-guideline-fix
/plugin install insta-guideline-fix@insta-guideline-fix
```

## 사용법

Claude에게 원고를 주면서 이렇게 말하세요.

```text
이 스크립트 가이드라인에 맞게 고쳐줘.

(릴스 스크립트 붙여넣기)
```

카드뉴스는 문구를 붙여넣거나 이미지를 올리면 됩니다. `/insta-guideline-fix`라고 입력해도 실행됩니다.

## 결과 예시

| 등급 | 위치 | 수정 전 | 수정 후 | 문제와 근거 |
|---|---|---|---|---|
| 🔴 | 첫 문장 | 첫 10만 원 버는 방법 | 첫 손님 받는 방법 | 낮은 진입 조건과 수입을 묶은 약속 |

표 아래에 훅 후보 3개, 수정본 전체, 올릴 때 확인할 것이 함께 나옵니다.

## 더 있으면 좋은 프로그램 (없어도 됩니다)

스킬은 이 프로그램들이 없어도 동작합니다. 없으면 Claude가 직접 점검하거나 캡처를 요청합니다.

| | 쓰임 | Windows (PowerShell) | Mac (터미널) |
|---|---|---|---|
| Node.js | 돈 표현 자동 검사 | `winget install OpenJS.NodeJS.LTS` | `brew install node` |
| FFmpeg | 영상 화면 확인 | `winget install Gyan.FFmpeg` | `brew install ffmpeg` |

설치한 뒤에는 Claude 앱을 껐다가 다시 여세요.

## 문제가 생기면

| 증상 | 해결 |
|---|---|
| 스킬이 실행되지 않음 | Claude 앱을 완전히 껐다 켠 뒤, 대화창에 `/insta-guideline-fix`를 입력 |
| PowerShell에서 빨간 오류 | 인터넷 연결을 확인하고 같은 줄을 다시 실행. 그래도 안 되면 방법 1 사용 |
| Mac 터미널에서 오류 | 인터넷 연결을 확인하고 같은 줄을 다시 실행. 그래도 안 되면 방법 1 사용 |

## 이 스킬이 하지 않는 일

초성이나 특수문자로 표현을 숨기기, 제목만 바꾼 재업로드, 제재를 피하기 위한 새 계정처럼 규정을 회피하는 수정은 돕지 않습니다.

## 알아두실 점

- 메타 공식 도구가 아니며 메타와 관련이 없습니다.
- 위험을 줄이는 도구입니다. 메타는 판단 기준을 전부 공개하지 않으므로, 수정본도 삭제되지 않는다고 보장하지 않습니다.
- 규정 요약은 2026년 11월 3일 기준이며 자동으로 갱신되지 않습니다. 판단이 갈리면 [메타 커뮤니티 규정 원문](https://transparency.meta.com/policies/community-standards/)을 확인하세요.
- 법률 자문이 아닙니다. 광고 규정, 서비스 약관, 파트너 수익화 정책, 청소년 콘텐츠 가이드라인은 포함하지 않았습니다.
