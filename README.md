<p align="center">
  <img src="assets/icons/icon-128.png" width="80" alt="금융 용어 쉽게 로고" />
</p>

<h1 align="center">금융 용어 쉽게</h1>

<p align="center">
  금융 약관, 이제 쉽게 읽어요 ✨
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-4A5B6C" alt="Version" />
  <img src="https://img.shields.io/badge/license-MIT-5C8A95" alt="License" />
  <img src="https://img.shields.io/badge/Chrome-Extension-FFCC00?logo=googlechrome&logoColor=white" alt="Chrome Extension" />
</p>

---

## 💡 프로젝트 목적

### 문제 정의

금융 약관 읽기 중 모르는 용어 발견 시 새 탭에서 검색 필요.

검색 후 복귀하면 읽던 위치를 잃어 흐름 중단.

### 해결 방법

**드래그/더블클릭**으로 용어 선택 시 즉시 설명 팝업 표시.

페이지 이탈 없이 **읽기 흐름 유지**.

---

## ✨ 주요 기능

| | 기능 | 설명 |
|:---:|:---|:---|
| 📖 | **30+ 금융 용어** | 금리, 상품구조, 세금, 예금보호 등 |
| 💬 | **쉬운 말 설명** | 숫자 예시와 함께 이해하기 쉽게 |
| ⚡ | **0.2초 반응** | 선택하면 바로 팝업 |
| 🔒 | **100% 로컬** | 개인정보 수집 없음, 외부 서버 통신 없음 |
| 🔘 | **ON/OFF 토글** | 확장 프로그램 아이콘으로 간편하게 활성화/비활성화 |

---

## 🚀 시작하기

### 설치 방법

```bash
# 1. 저장소 클론
git clone https://github.com/judy0/financial-terms-extension.git

# 2. 의존성 설치
npm install

# 3. 빌드
npm run build
```

**Chrome에 설치하기**

1. Chrome에서 `chrome://extensions/` 접속
2. 오른쪽 상단 **"개발자 모드"** 활성화
3. **"압축해제된 확장 프로그램을 로드합니다"** 클릭
4. `dist/` 폴더 선택

### 사용 방법

| 단계 | 설명 |
|:---:|:---|
| 1️⃣ | 은행 사이트에서 약관/상품설명 페이지 방문 |
| 2️⃣ | 모르는 용어를 **드래그** 또는 **더블클릭** |
| 3️⃣ | 팝업에서 쉬운 설명 확인! |

> 💡 **Tip**: ESC 키 또는 팝업 바깥을 클릭하면 닫혀요

---

## 📚 문서

프로젝트 관련 문서들입니다:

| 문서 | 설명 |
|:---|:---|
| [📋 기획안](docs/금융_용어_해설서비스_기획안_3차.md) | 서비스 전체 기획 |
| [🖼️ 와이어프레임](docs/wireframes/wireframe_금융용어해설서비스_2차.md) | UI 플로우 |
| [🎨 디자인 가이드](docs/디자인_가이드_금융용어해설서비스_2차.md) | 디자인 시스템 |
| [🏗️ 코드 아키텍처](docs/코드_아키텍처.md) | 기술 구조 |

---

## 📦 배포

### 개발 명령어

```bash
# 개발 모드 (Hot Reload)
npm run dev

# 프로덕션 빌드
npm run build

# 코드 린트
npm run lint

# 코드 포맷팅
npm run format
```

### 기술 스택

- **Chrome Extension** Manifest V3
- **JavaScript** ES2022+ (Vanilla JS)
- **Vite** 5.x (빌드 도구)
- **Shadow DOM** (스타일 격리)

### 지원 환경

| 브라우저 | 버전 |
|:---|:---|
| Chrome | 109+ |
| Edge | 109+ |

---

## 🔮 추후 방향

| 단계 | 내용 |
|:---:|:---|
| **MVP (현재)** | 즉시 반응성·안정성 우선. 로컬 JSON 기반 **약 47개 용어** |
| **고도화** | 공공데이터/외부 API 연동으로 **용어 커버리지 확장**. 캐싱 적용으로 **속도·안정성** 확보 |

---

## 📄 라이선스

MIT License

---

<p align="center">
  Made with 💙 by <b>judy0</b>
</p>

<p align="center">
  <b>v1.0.0</b> · 2026-01-22
</p>
