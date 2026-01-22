# 금융 용어 해설 서비스 - Wireframe 문서

> **서비스명**: 금융 용어 쉽게 (가칭)  
> **문서 버전**: v1.0  
> **최종 수정일**: 2026-01-22  
> **작성자**: judy0

---

## 📝 목차

1. [사용자 플로우 전체 개요](#1-사용자-플로우-전체-개요)
2. [확장 프로그램 설치 및 온보딩](#2-확장-프로그램-설치-및-온보딩)
   - 2.1 [Chrome 웹 스토어 페이지](#21-chrome-웹-스토어-페이지)
   - 2.2 [온보딩 화면 1: 환영 및 소개](#22-온보딩-화면-1-환영-및-소개)
   - 2.3 [온보딩 화면 2: 사용 방법](#23-온보딩-화면-2-사용-방법)
   - 2.4 [온보딩 화면 3: 이용약관 동의](#24-온보딩-화면-3-이용약관-동의)
3. [핵심 기능 화면](#3-핵심-기능-화면)
   - 3.1 [은행 웹사이트 - 용어 하이라이트](#31-은행-웹사이트---용어-하이라이트)
   - 3.2 [용어 팝업 - PC 버전](#32-용어-팝업---pc-버전)
   - 3.3 [용어 팝업 - 모바일 버전](#33-용어-팝업---모바일-버전)
   - 3.4 [브라우저 툴바 확장 아이콘](#34-브라우저-툴바-확장-아이콘)
4. [설정 화면](#4-설정-화면)
   - 4.1 [설정 메뉴 구조](#41-설정-메뉴-구조)
   - 4.2 [설정 항목 상세](#42-설정-항목-상세)
5. [부가 기능 화면](#5-부가-기능-화면)
   - 5.1 [비교 메모 기능](#51-비교-메모-기능)
   - 5.2 [이용약관 및 개인정보처리방침](#52-이용약관-및-개인정보처리방침)
6. [주요 인터랙션 시나리오](#6-주요-인터랙션-시나리오)
   - 6.1 [시나리오 1: 첫 사용자의 여정](#61-시나리오-1-첫-사용자의-여정)
   - 6.2 [시나리오 2: 약관 읽기 중 용어 조회](#62-시나리오-2-약관-읽기-중-용어-조회)
   - 6.3 [시나리오 3: 여러 은행 상품 비교](#63-시나리오-3-여러-은행-상품-비교)

---

## 1. 사용자 플로우 전체 개요

전체 서비스의 사용자 경험 플로우입니다.

```mermaid
graph TD
    Start[사용자가 Chrome 웹 스토어 방문] --> Install[확장 프로그램 설치]
    Install --> Onboarding1[온보딩 1: 환영 화면]
    Onboarding1 --> Onboarding2[온보딩 2: 사용 방법]
    Onboarding2 --> Onboarding3[온보딩 3: 이용약관 동의]
    Onboarding3 --> Complete[설정 완료]
    
    Complete --> BankVisit[은행 웹사이트 방문]
    BankVisit --> AutoActivate[확장 프로그램 자동 활성화]
    AutoActivate --> Scan[페이지 내 용어 스캔]
    Scan --> Highlight[용어 하이라이트 표시]
    
    Highlight --> UserAction{사용자 액션}
    UserAction -->|마우스 오버| Hover[팝업 표시 0.3초 후]
    UserAction -->|클릭| Click[팝업 즉시 표시 고정]
    UserAction -->|무시| Continue[약관 계속 읽기]
    
    Hover --> PopupView[용어 설명 확인]
    Click --> PopupView
    PopupView --> Related{관련 용어 클릭?}
    Related -->|예| PopupView
    Related -->|아니오| ClosePopup[팝업 닫기]
    
    ClosePopup --> Continue
    Continue --> NextBank{다른 은행 비교?}
    NextBank -->|예| BankVisit
    NextBank -->|아니오| Decision[가입 의사결정]
    
    UserAction -.->|툴바 아이콘 클릭| Settings[설정 메뉴]
    Settings --> SettingsMenu[ON/OFF, 하이라이트 스타일 변경]
    SettingsMenu --> BankVisit
```

---

## 2. 확장 프로그램 설치 및 온보딩

### 2.1 Chrome 웹 스토어 페이지

확장 프로그램 설치 진입점으로서의 기본 구조입니다.

```mermaid
graph TD
    Store[Chrome 웹 스토어 설치 진입점]
    Store --> Info[확장 프로그램 소개]
    Store --> Preview[미리보기 이미지]
    Store --> InstallBtn[Chrome에 추가]
    InstallBtn --> Permission[권한 요청]
    Permission --> Installed[설치 완료]
```

### 2.2 온보딩 화면 1: 환영 및 소개

설치 직후 나타나는 첫 번째 온보딩 화면입니다.

```mermaid
graph TD
    Onboarding1[온보딩 화면 1: 환영]
    
    Onboarding1 --> Layout1[화면 레이아웃]
    
    Layout1 --> Logo[서비스 로고<br/>금융 용어 쉽게]
    Layout1 --> Title1[환영합니다!]
    Layout1 --> Subtitle1[약관 읽기가 쉬워집니다]
    Layout1 --> MainMessage[금융 상품의 약관과 상품 설명을 읽을 때<br/>어려운 전문용어를 별도 검색 없이<br/>즉시 그 자리에서 이해할 수 있습니다]
    
    Layout1 --> Icon1[아이콘 1: 돋보기]
    Layout1 --> Icon2[아이콘 2: 전구]
    Layout1 --> Icon3[아이콘 3: 체크]
    
    Icon1 --> Text1[용어 자동 감지]
    Icon2 --> Text2[쉬운 설명 제공]
    Icon3 --> Text3[빠른 이해]
    
    Layout1 --> ProgressIndicator[진행 표시: 1/3]
    Layout1 --> ButtonNext[다음 버튼]
    Layout1 --> ButtonSkip[건너뛰기 링크]
    
    ButtonNext --> Onboarding2[온보딩 2로 이동]
    ButtonSkip --> Complete[온보딩 완료]
```

### 2.3 온보딩 화면 2: 사용 방법

서비스 사용 방법을 안내하는 두 번째 온보딩 화면입니다.

```mermaid
graph TD
    Onboarding2[온보딩 화면 2: 사용 방법]
    
    Onboarding2 --> Layout2[화면 레이아웃]
    
    Layout2 --> Title2[이렇게 사용하세요]
    Layout2 --> StepSection[단계별 안내]
    
    StepSection --> Step1[Step 1: 은행 웹사이트 방문]
    StepSection --> Step2[Step 2: 용어에 마우스 올리기]
    StepSection --> Step3[Step 3: 팝업에서 설명 확인]
    
    Step1 --> Step1Img[일러스트: 은행 사이트 화면]
    Step1 --> Step1Text[KB국민은행, 신한은행 등<br/>어떤 금융기관이든 자동 작동]
    
    Step2 --> Step2Img[일러스트: 하이라이트된 용어]
    Step2 --> Step2Text[복리, 세전금리 등<br/>하이라이트된 용어 클릭]
    
    Step3 --> Step3Img[일러스트: 팝업 표시]
    Step3 --> Step3Text[쉬운 설명과 예시를<br/>즉시 확인]
    
    Layout2 --> TipBox[💡 팁: 툴바 아이콘을 클릭하면<br/>언제든 ON/OFF 가능]
    Layout2 --> Progress2[진행 표시: 2/3]
    Layout2 --> ButtonBack[이전]
    Layout2 --> ButtonNext2[다음]
    
    ButtonBack --> Onboarding1[온보딩 1로 복귀]
    ButtonNext2 --> Onboarding3[온보딩 3으로 이동]
```

### 2.4 온보딩 화면 3: 이용약관 동의

법적 고지사항과 이용약관 동의를 받는 세 번째 온보딩 화면입니다.

```mermaid
graph TD
    Onboarding3[온보딩 화면 3: 이용약관]
    
    Onboarding3 --> Layout3[화면 레이아웃]
    
    Layout3 --> Title3[시작하기 전에]
    Layout3 --> DisclaimerBox[면책 조항 박스]
    
    DisclaimerBox --> DTitle[⚠️ 중요 안내]
    DisclaimerBox --> D1[본 서비스는 참고용 정보 제공 서비스입니다]
    DisclaimerBox --> D2[정확한 정보는 해당 금융기관에 확인하세요]
    DisclaimerBox --> D3[투자 자문이나 상품 추천이 아닙니다]
    
    Layout3 --> CheckboxSection[동의 체크박스]
    
    CheckboxSection --> CB1[✓ 이용약관 동의 필수]
    CheckboxSection --> CB2[✓ 개인정보처리방침 동의 필수]
    CheckboxSection --> CB3[☐ 익명 사용 통계 수집 동의 선택]
    
    CB1 --> Link1[전체 보기 링크]
    CB2 --> Link2[전체 보기 링크]
    CB3 --> Info[서비스 개선 목적으로만 사용]
    
    Layout3 --> Progress3[진행 표시: 3/3]
    Layout3 --> ButtonBack2[이전]
    Layout3 --> ButtonStart[시작하기 버튼]
    
    ButtonStart --> ValidCheck{필수 동의 체크?}
    ValidCheck -->|아니오| ErrorMsg[필수 항목에 동의해주세요]
    ValidCheck -->|예| Success[온보딩 완료<br/>자동으로 탭 닫힘]
    
    ErrorMsg --> CheckboxSection
    ButtonBack2 --> Onboarding2[온보딩 2로 복귀]
```

---

## 3. 핵심 기능 화면

### 3.1 은행 웹사이트 - 용어 하이라이트

사용자가 은행 웹사이트를 방문했을 때 확장 프로그램이 작동하는 화면입니다.

```mermaid
graph TD
    BankPage[은행 웹사이트 페이지]
    
    BankPage --> PageLoad[페이지 로드 완료]
    PageLoad --> ExtActivate[확장 프로그램 자동 활성화]
    
    ExtActivate --> Scan[페이지 텍스트 스캔<br/>1초 이내]
    Scan --> Found{용어 발견?}
    
    Found -->|예| Highlight[용어 하이라이트 적용]
    Found -->|아니오| NoAction[아무 동작 없음]
    
    Highlight --> VisualStyle[시각적 스타일]
    VisualStyle --> Style1[점선 밑줄]
    VisualStyle --> Style2[연한 배경색]
    VisualStyle --> Style3[볼드체 선택적]
    
    Highlight --> IconBadge[툴바 아이콘에 배지 표시]
    IconBadge --> BadgeNumber[감지된 용어 수: 예 12]
    
    BankPage --> ExampleLayout[화면 예시 구조]
    
    ExampleLayout --> BankHeader[은행 헤더<br/>KB국민은행 로고]
    ExampleLayout --> ProductTitle[상품명: KB 정기예금]
    ExampleLayout --> ProductDesc[상품 설명 영역]
    
    ProductDesc --> Text1[연이율 3.5%]
    ProductDesc --> Text2[복리 적용 하이라이트]
    ProductDesc --> Text3[세전금리 기준 하이라이트]
    ProductDesc --> Text4[만기일시지급식 하이라이트]
    ProductDesc --> Text5[예금자보호법 적용 하이라이트]
    
    Text2 --> Cursor[마우스 커서 오버 시]
    Text3 --> Cursor
    Text4 --> Cursor
    Text5 --> Cursor
    
    Cursor --> PopupTrigger[팝업 트리거]
```

### 3.2 용어 팝업 - PC 버전

PC 환경에서 용어를 클릭했을 때 표시되는 팝업 구조입니다.

```mermaid
graph TD
    Popup[용어 팝업 - PC]
    
    Popup --> Trigger{트리거 방식}
    Trigger -->|마우스 오버| Hover[0.3초 지연 후 표시]
    Trigger -->|클릭| Click[즉시 표시 + 고정 모드]
    
    Hover --> PopupShow[팝업 표시]
    Click --> PopupShow
    
    PopupShow --> PopupLayout[팝업 레이아웃 구조]
    
    PopupLayout --> Header[헤더 영역]
    PopupLayout --> Body[본문 영역]
    PopupLayout --> Footer[푸터 영역]
    PopupLayout --> CloseBtn[닫기 버튼 X]
    
    Header --> TermName[용어명: 복리]
    Header --> Category[카테고리: 금리 관련]
    
    Body --> Section1[쉬운 말 설명 섹션]
    Body --> Section2[예시 섹션]
    Body --> Section3[중요성 섹션]
    Body --> Section4[관련 용어 섹션]
    
    Section1 --> Desc[이자에도 이자가 붙는 방식이에요.<br/>마치 눈덩이가 굴러가면서<br/>점점 커지는 것처럼...]
    
    Section2 --> ExIcon[💡 예시]
    Section2 --> ExText[100만원을 연 3% 복리로 2년간<br/>예금하면...<br/>1년 후: 103만원<br/>2년 후: 106만900원]
    
    Section3 --> WhyIcon[❗ 왜 중요한가요?]
    Section3 --> WhyText[같은 금리라도 복리로 계산하면<br/>단리보다 수익이 많아요]
    
    Section4 --> RelIcon[🔗 관련 용어]
    Section4 --> Link1[단리 클릭 가능]
    Section4 --> Link2[연이율 클릭 가능]
    Section4 --> Link3[만기일시지급식 클릭 가능]
    
    Link1 --> NewPopup[새로운 팝업 표시]
    Link2 --> NewPopup
    Link3 --> NewPopup
    
    Footer --> Disclaimer[※ 본 설명은 참고용이며,<br/>정확한 정보는 해당 금융기관에<br/>확인하세요.]
    
    PopupLayout --> Position[팝업 위치]
    Position --> Above[용어 위쪽 우선]
    Position --> Below[화면 밖이면 아래쪽]
    Position --> Adjust[자동 위치 조정]
    
    CloseBtn --> CloseAction{닫기 동작}
    CloseAction -->|X 버튼| DirectClose[팝업 닫힘]
    CloseAction -->|ESC 키| DirectClose
    CloseAction -->|팝업 밖 클릭| DirectClose
    CloseAction -->|마우스 아웃| AutoClose[자동 닫힘 오버 모드만]
```

### 3.3 용어 팝업 - 모바일 버전

모바일 환경에서의 팝업 구조입니다.

```mermaid
graph TD
    MobilePopup[용어 팝업 - 모바일]
    
    MobilePopup --> MTrigger[트리거: 터치]
    MTrigger --> MShow[즉시 팝업 표시]
    
    MShow --> MLayout[모바일 레이아웃]
    
    MLayout --> MSize[화면 크기 대응]
    MSize --> FullWidth[전체 너비 80-90%]
    MSize --> VerticalCenter[세로 중앙 배치]
    MSize --> Scrollable[세로 스크롤 가능]
    
    MLayout --> MHeader[헤더: 용어명]
    MLayout --> MBody[본문: PC와 동일 구조]
    MLayout --> MFooter[푸터: 면책 조항]
    MLayout --> MCloseBtn[닫기 버튼 상단 우측]
    
    MBody --> MDesc[쉬운 설명]
    MBody --> MExample[예시]
    MBody --> MWhy[중요성]
    MBody --> MRelated[관련 용어 터치 가능]
    
    MLayout --> Overlay[반투명 배경 오버레이]
    Overlay --> OverlayClick[오버레이 터치 시]
    OverlayClick --> MClose[팝업 닫힘]
    
    MCloseBtn --> MClose
    
    MLayout --> TouchOpt[터치 최적화]
    TouchOpt --> BigButton[큰 터치 영역]
    TouchOpt --> ClearSpace[여백 충분히]
    TouchOpt --> ReadableFont[가독성 높은 폰트 크기]
```

### 3.4 브라우저 툴바 확장 아이콘

브라우저 툴바에 표시되는 확장 프로그램 아이콘과 드롭다운 패널입니다.

```mermaid
graph TD
    ToolbarIcon[툴바 확장 아이콘]
    
    ToolbarIcon --> IconState{아이콘 상태}
    IconState -->|활성화| ActiveIcon[컬러 아이콘]
    IconState -->|비활성화| InactiveIcon[그레이스케일 아이콘]
    
    ActiveIcon --> Badge[배지 표시]
    Badge --> BadgeNum[감지된 용어 수<br/>예: 12]
    
    ToolbarIcon --> IconClick[아이콘 클릭]
    IconClick --> Dropdown[드롭다운 패널 표시]
    
    Dropdown --> PanelLayout[패널 레이아웃]
    
    PanelLayout --> PHeader[헤더 영역]
    PanelLayout --> PStatus[상태 영역]
    PanelLayout --> PActions[액션 영역]
    PanelLayout --> PLinks[링크 영역]
    
    PHeader --> ServiceName[금융 용어 쉽게]
    PHeader --> Version[v1.0]
    
    PStatus --> CurrentPage[현재 페이지]
    CurrentPage --> PageInfo[KB국민은행 정기예금]
    CurrentPage --> TermsFound[감지된 용어: 12개]
    
    PStatus --> ToggleSwitch[ON/OFF 토글 스위치]
    ToggleSwitch --> On[켜짐 - 파란색]
    ToggleSwitch --> Off[꺼짐 - 회색]
    
    On --> ToggleAction1[용어 하이라이트 활성화]
    Off --> ToggleAction2[용어 하이라이트 비활성화]
    
    PActions --> QuickSettings[빠른 설정]
    QuickSettings --> QS1[하이라이트 스타일]
    QuickSettings --> QS2[팝업 표시 방식]
    
    PLinks --> LinkSettings[⚙️ 전체 설정]
    PLinks --> LinkHelp[❓ 도움말]
    PLinks --> LinkFeedback[💬 피드백 보내기]
    
    LinkSettings --> SettingsPage[설정 페이지 열기]
    LinkHelp --> HelpPage[도움말 페이지]
    LinkFeedback --> FeedbackForm[피드백 양식]
```

---

## 4. 설정 화면

### 4.1 설정 메뉴 구조

확장 프로그램의 설정 화면 전체 구조입니다.

```mermaid
graph TD
    Settings[설정 화면]
    
    Settings --> SLayout[레이아웃 구조]
    
    SLayout --> SHeader[헤더]
    SLayout --> SSidebar[사이드바 네비게이션]
    SLayout --> SContent[콘텐츠 영역]
    
    SHeader --> STitle[설정 - 금융 용어 쉽게]
    SHeader --> SClose[닫기 버튼]
    
    SSidebar --> Nav[네비게이션 메뉴]
    Nav --> Nav1[일반 설정]
    Nav --> Nav2[표시 설정]
    Nav --> Nav3[개인정보]
    Nav --> Nav4[정보]
    
    Nav1 --> Content1[일반 설정 패널]
    Nav2 --> Content2[표시 설정 패널]
    Nav3 --> Content3[개인정보 패널]
    Nav4 --> Content4[정보 패널]
    
    SContent --> ActivePanel[활성 패널 표시]
```

### 4.2 설정 항목 상세

각 설정 패널의 상세 항목들입니다.

```mermaid
graph TD
    SettingsDetail[설정 항목 상세]
    
    SettingsDetail --> Panel1[일반 설정 패널]
    SettingsDetail --> Panel2[표시 설정 패널]
    SettingsDetail --> Panel3[개인정보 패널]
    SettingsDetail --> Panel4[정보 패널]
    
    Panel1 --> G1[자동 활성화]
    G1 --> G1Toggle[ON/OFF 스위치<br/>기본: ON]
    G1 --> G1Desc[은행 사이트 방문 시<br/>자동으로 용어 감지]
    
    Panel1 --> G2[지원 사이트]
    G2 --> G2List[모든 금융기관 사이트<br/>특정 사이트만 선택 옵션]
    
    Panel2 --> D1[하이라이트 스타일]
    D1 --> D1Options[선택 옵션]
    D1Options --> D1Opt1[⚪ 점선 밑줄]
    D1Options --> D1Opt2[⚪ 배경 색상]
    D1Options --> D1Opt3[⚪ 밑줄 + 배경]
    
    Panel2 --> D2[하이라이트 색상]
    D2 --> D2Color[색상 선택기<br/>기본: 연한 파란색]
    
    Panel2 --> D3[팝업 표시 방식]
    D3 --> D3Options[선택 옵션]
    D3Options --> D3Opt1[⚪ 마우스 오버 + 클릭]
    D3Options --> D3Opt2[⚪ 클릭만]
    
    Panel2 --> D4[팝업 딜레이 시간]
    D4 --> D4Slider[슬라이더: 0.1초 ~ 1.0초<br/>기본: 0.3초]
    
    Panel2 --> PreviewBox[미리보기 영역]
    PreviewBox --> PreviewText[복리 하이라이트 예시]
    
    Panel3 --> P1[데이터 수집]
    P1 --> P1Checkbox[☐ 익명 사용 통계 수집 동의]
    P1 --> P1Desc[서비스 개선 목적으로만 사용<br/>개인정보는 수집하지 않습니다]
    
    Panel3 --> P2[로컬 데이터]
    P2 --> P2Info[비교 메모: 3건<br/>설정 정보: 로컬 저장]
    P2 --> P2Btn[모두 삭제 버튼]
    
    Panel3 --> P3[링크]
    P3 --> P3Link1[개인정보처리방침 보기]
    P3 --> P3Link2[이용약관 보기]
    
    Panel4 --> I1[서비스 정보]
    I1 --> I1Version[버전: 1.0.0]
    I1 --> I1Date[최종 업데이트: 2026-01-22]
    
    Panel4 --> I2[용어 사전]
    I2 --> I2Count[등록된 용어: 50개]
    I2 --> I2Category[카테고리: 금리, 상품구조, 세금 등]
    
    Panel4 --> I3[문의 및 피드백]
    I3 --> I3Email[이메일: support@example.com]
    I3 --> I3Github[GitHub 링크]
    
    Panel4 --> I4[법적 고지]
    I4 --> I4Text[본 서비스는 참고용 정보 제공<br/>투자 자문 아님]
```

---

## 5. 부가 기능 화면

### 5.1 비교 메모 기능

여러 은행 상품을 비교할 때 메모를 작성하는 기능입니다. (P3 우선순위)

```mermaid
graph TD
    Memo[비교 메모 기능]
    
    Memo --> Access[접근 방법]
    Access --> Method1[툴바 아이콘 클릭]
    Access --> Method2[드롭다운에서 메모 탭]
    
    Method1 --> MemoPanel[메모 패널]
    Method2 --> MemoPanel
    
    MemoPanel --> MLayout[레이아웃]
    
    MLayout --> MHeader[헤더: 상품 비교 메모]
    MLayout --> MList[메모 목록 영역]
    MLayout --> MAdd[+ 새 메모 버튼]
    
    MList --> MEmpty{메모 존재?}
    MEmpty -->|아니오| EmptyState[비어있음 상태]
    EmptyState --> EmptyMsg[아직 작성한 메모가 없어요]
    EmptyState --> EmptyBtn[첫 메모 작성하기]
    
    MEmpty -->|예| MItems[메모 아이템 목록]
    
    MItems --> Item1[메모 카드 1]
    MItems --> Item2[메모 카드 2]
    MItems --> Item3[메모 카드 3]
    
    Item1 --> IHeader[은행명: KB국민은행]
    Item1 --> ITime[작성: 5분 전]
    Item1 --> IContent[메모 내용:<br/>금리 3.5%, 복리 적용<br/>우대조건: 급여이체]
    Item1 --> IActions[수정 | 삭제]
    
    MAdd --> CreateMemo[메모 작성 화면]
    
    CreateMemo --> CLayout[작성 레이아웃]
    CLayout --> CBank[은행명 입력]
    CLayout --> CProduct[상품명 입력]
    CLayout --> CText[메모 내용 텍스트 영역]
    CLayout --> CSave[저장 버튼]
    CLayout --> CCancel[취소 버튼]
    
    CSave --> Validate{필수 항목 입력?}
    Validate -->|예| SaveSuccess[저장 완료]
    Validate -->|아니오| ErrorMsg[필수 항목을 입력하세요]
    
    SaveSuccess --> MList
```

### 5.2 이용약관 및 개인정보처리방침

법적 문서를 확인할 수 있는 화면입니다.

```mermaid
graph TD
    Legal[법적 문서 화면]
    
    Legal --> Access[접근 방법]
    Access --> From1[설정 > 개인정보 > 링크]
    Access --> From2[온보딩 > 전체 보기 링크]
    Access --> From3[팝업 푸터 > 면책 조항 링크]
    
    From1 --> LegalPage[법적 문서 페이지]
    From2 --> LegalPage
    From3 --> LegalPage
    
    LegalPage --> LLayout[레이아웃]
    
    LLayout --> LHeader[헤더]
    LLayout --> LTabs[탭 네비게이션]
    LLayout --> LContent[콘텐츠 영역]
    
    LTabs --> Tab1[이용약관]
    LTabs --> Tab2[개인정보처리방침]
    LTabs --> Tab3[면책 조항]
    
    Tab1 --> Terms[이용약관 내용]
    Terms --> T1[제1조 목적]
    Terms --> T2[제2조 정의]
    Terms --> T3[제3조 서비스 내용]
    Terms --> T4[제4조 책임의 한계]
    Terms --> T5[기타 조항...]
    
    Tab2 --> Privacy[개인정보처리방침]
    Privacy --> Pr1[1. 수집하는 정보]
    Privacy --> Pr2[2. 정보 사용 목적]
    Privacy --> Pr3[3. 정보 저장 방식]
    Privacy --> Pr4[4. 사용자 권리]
    
    Pr1 --> Pr1Detail[최소한의 정보만 수집<br/>설정 정보 로컬 저장]
    Pr2 --> Pr2Detail[서비스 제공 및 개선]
    
    Tab3 --> Disclaimer[면책 조항 상세]
    Disclaimer --> Dis1[1. 정보의 정확성]
    Disclaimer --> Dis2[2. 책임의 한계]
    Disclaimer --> Dis3[3. 금융 상품 가입]
    Disclaimer --> Dis4[4. 정보의 최신성]
    Disclaimer --> Dis5[5. 제3자 웹사이트]
    
    Dis1 --> Dis1Text[참고용 정보이며<br/>법적 효력 없음]
    Dis2 --> Dis2Text[서비스 정보 활용으로 인한<br/>손해 책임 없음]
```

---

## 6. 주요 인터랙션 시나리오

### 6.1 시나리오 1: 첫 사용자의 여정

신규 사용자가 서비스를 처음 사용하는 전체 여정입니다.

```mermaid
sequenceDiagram
    participant User as 사용자
    participant Store as Chrome 스토어
    participant Ext as 확장 프로그램
    participant Bank as 은행 사이트
    
    User->>Store: 확장 프로그램 검색
    Store->>User: 검색 결과 표시
    User->>Store: "Chrome에 추가" 클릭
    Store->>User: 권한 요청 팝업
    User->>Store: 수락
    Store->>Ext: 설치 완료
    
    Ext->>User: 온보딩 1 표시 (환영)
    User->>Ext: "다음" 클릭
    Ext->>User: 온보딩 2 표시 (사용법)
    User->>Ext: "다음" 클릭
    Ext->>User: 온보딩 3 표시 (약관)
    User->>Ext: 약관 동의 + "시작하기"
    Ext->>User: 온보딩 완료
    
    User->>Bank: KB국민은행 사이트 방문
    Bank->>User: 상품 페이지 로드
    Ext->>Bank: 페이지 스캔
    Ext->>User: 용어 하이라이트 표시
    Ext->>User: 툴바 배지 "12" 표시
    
    User->>Ext: "복리" 용어에 마우스 오버
    Ext->>User: 0.3초 후 팝업 표시
    User->>Ext: 팝업 내용 읽기
    User->>Ext: "단리" 관련 용어 클릭
    Ext->>User: 단리 팝업 표시
    User->>Ext: 팝업 닫기
    
    User->>Bank: 약관 계속 읽기
```

### 6.2 시나리오 2: 약관 읽기 중 용어 조회

사용자가 약관을 읽으면서 여러 용어를 조회하는 시나리오입니다.

```mermaid
stateDiagram-v2
    [*] --> ReadingTerms: 약관 페이지 읽기 시작
    
    ReadingTerms --> TermFound: 하이라이트된 용어 발견
    
    TermFound --> HoverTerm: 마우스 오버
    HoverTerm --> PopupShow: 0.3초 후 팝업 표시
    
    TermFound --> ClickTerm: 클릭
    ClickTerm --> PopupFixed: 팝업 고정 모드
    
    PopupShow --> ReadPopup: 설명 읽기
    PopupFixed --> ReadPopup
    
    ReadPopup --> RelatedClick: 관련 용어 클릭
    RelatedClick --> PopupShow: 새 팝업 표시
    
    ReadPopup --> ClosePopup: 팝업 닫기
    ClosePopup --> ReadingTerms: 약관 계속 읽기
    
    ReadingTerms --> NextTerm: 다음 용어 발견
    NextTerm --> TermFound
    
    ReadingTerms --> Understood: 약관 이해 완료
    Understood --> [*]
```

### 6.3 시나리오 3: 여러 은행 상품 비교

사용자가 여러 은행을 방문하며 상품을 비교하는 시나리오입니다.

```mermaid
graph TD
    Start[상품 비교 시작]
    
    Start --> Bank1[KB국민은행 방문]
    Bank1 --> Read1[약관 읽기 + 용어 조회]
    Read1 --> Understand1[KB 상품 이해 완료]
    
    Understand1 --> Memo1{메모 작성?}
    Memo1 -->|예| WriteMemo1[메모 작성:<br/>KB - 금리 3.5%, 복리]
    Memo1 -->|아니오| Next1[다음 은행으로]
    WriteMemo1 --> Next1
    
    Next1 --> Bank2[신한은행 방문]
    Bank2 --> Read2[약관 읽기 + 용어 조회]
    Read2 --> Understand2[신한 상품 이해 완료]
    
    Understand2 --> Memo2{메모 작성?}
    Memo2 -->|예| WriteMemo2[메모 작성:<br/>신한 - 금리 3.3%, 단리]
    Memo2 -->|아니오| Next2[다음 은행으로]
    WriteMemo2 --> Next2
    
    Next2 --> Bank3[하나은행 방문]
    Bank3 --> Read3[약관 읽기 + 용어 조회]
    Read3 --> Understand3[하나 상품 이해 완료]
    
    Understand3 --> CompareMemos[메모 비교하기]
    CompareMemos --> Analysis[메모 목록 확인<br/>KB vs 신한 vs 하나]
    
    Analysis --> Decision{결정 완료?}
    Decision -->|아니오| MoreBanks[더 알아보기]
    MoreBanks --> Bank1
    
    Decision -->|예| FinalChoice[최종 선택: KB국민은행]
    FinalChoice --> Apply[가입 진행]
    Apply --> End[완료]
```

---

## 7. 기술적 구현 참고사항

### 7.1 반응형 디자인

```mermaid
graph LR
    Responsive[반응형 디자인]
    
    Responsive --> Desktop[데스크톱 1024px+]
    Responsive --> Tablet[태블릿 768-1023px]
    Responsive --> Mobile[모바일 ~767px]
    
    Desktop --> DLayout[팝업: 고정 너비 400px]
    Desktop --> DHover[마우스 오버 지원]
    Desktop --> DKeyboard[키보드 단축키]
    
    Tablet --> TLayout[팝업: 가변 너비 60%]
    Tablet --> TTouch[터치 최적화]
    
    Mobile --> MLayout[팝업: 전체 너비 90%]
    Mobile --> MTouch[큰 터치 영역]
    Mobile --> MBottom[하단 고정 옵션]
```

### 7.2 접근성 고려사항

```mermaid
graph TD
    A11y[접근성 Accessibility]
    
    A11y --> Keyboard[키보드 네비게이션]
    A11y --> ScreenReader[스크린 리더 지원]
    A11y --> ColorContrast[색상 대비]
    A11y --> FontSize[폰트 크기 조절]
    
    Keyboard --> TabNav[Tab 키로 이동]
    Keyboard --> Enter[Enter로 선택]
    Keyboard --> Esc[ESC로 닫기]
    
    ScreenReader --> AriaLabels[ARIA 레이블]
    ScreenReader --> AltText[대체 텍스트]
    
    ColorContrast --> WCAG[WCAG AA 준수]
    ColorContrast --> HighContrast[고대비 모드]
    
    FontSize --> ZoomSupport[브라우저 확대 지원]
    FontSize --> MinSize[최소 14px]
```

### 7.3 성능 최적화

```mermaid
graph TD
    Performance[성능 최적화]
    
    Performance --> LoadTime[로딩 시간]
    Performance --> Scanning[스캔 속도]
    Performance --> Memory[메모리 사용]
    
    LoadTime --> Target1[페이지 로드 영향 없음]
    LoadTime --> Target2[하이라이트 1초 이내]
    
    Scanning --> Efficient[효율적인 알고리즘]
    Scanning --> Debounce[디바운싱 적용]
    Scanning --> Cache[용어 캐싱]
    
    Memory --> Lightweight[가벼운 확장]
    Memory --> Cleanup[메모리 정리]
    Memory --> LimitPopups[팝업 수 제한]
```

---

## 8. 디자인 시스템

### 8.1 컬러 팔레트

```mermaid
graph TD
    Colors[컬러 시스템]
    
    Colors --> Primary[Primary 파란색]
    Colors --> Secondary[Secondary 회색]
    Colors --> Accent[Accent 주황색]
    Colors --> Status[상태 색상]
    
    Primary --> P1[#2563EB 메인 파란색]
    Primary --> P2[#EFF6FF 연한 배경]
    Primary --> P3[#1E40AF 진한 파란색]
    
    Secondary --> S1[#6B7280 텍스트 회색]
    Secondary --> S2[#F3F4F6 배경 회색]
    Secondary --> S3[#1F2937 진한 회색]
    
    Accent --> A1[#F59E0B 강조 주황]
    Accent --> A2[#FEF3C7 연한 주황]
    
    Status --> Success[#10B981 성공 녹색]
    Status --> Warning[#F59E0B 경고 주황]
    Status --> Error[#EF4444 오류 빨강]
    Status --> Info[#3B82F6 정보 파랑]
```

### 8.2 타이포그래피

```mermaid
graph TD
    Typography[타이포그래피]
    
    Typography --> FontFamily[폰트 패밀리]
    Typography --> FontSizes[폰트 크기]
    Typography --> FontWeights[폰트 굵기]
    
    FontFamily --> Korean[한글: Pretendard]
    FontFamily --> English[영문: Inter]
    FontFamily --> Fallback[Fallback: system-ui]
    
    FontSizes --> H1[H1: 24px 페이지 제목]
    FontSizes --> H2[H2: 20px 섹션 제목]
    FontSizes --> H3[H3: 18px 서브 제목]
    FontSizes --> Body[Body: 16px 본문]
    FontSizes --> Small[Small: 14px 보조]
    FontSizes --> Tiny[Tiny: 12px 캡션]
    
    FontWeights --> Bold[Bold: 700]
    FontWeights --> SemiBold[SemiBold: 600]
    FontWeights --> Regular[Regular: 400]
```

---

## 부록: 와이어프레임 버전 이력

| 버전 | 작성일 | 주요 변경사항 |
|------|--------|--------------|
| v1.0 | 2026-01-22 | 최초 작성 - 전체 화면 구조 및 플로우 다이어그램 작성 |

---

**문서 종료**
