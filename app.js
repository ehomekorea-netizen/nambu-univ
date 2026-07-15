// 1. STATE & TEMPLATES DEFINITION
const state = {
    currentTopic: "", // Initialized dynamically from DOM value
    selectedAgency: "chest", // 'chest' = 산출중심형, 'enterprise' = 성과중심형, 'gov' = 성과확산형
    selectedBudget: "15,000,000원",
    selectedEvalOrg: "",
    selectedAppOrg: "",
    selectedRegion: ""
};

// Raw Prompt Templates (Plain text definitions, styling is applied dynamically)
const promptTemplates = {
    // === [3단계 통합 베이스캠프 프롬프트] ===
    "p-basecamp": `[임무 정의]
너는 지금부터 사회복지공동모금회 프로포절 당선작을 빌드하는 전문 기획가야.
아래에 제공하는 [1. 레퍼런스 논리 구조(2단계 추출물)]와 [2. 기획 기초 팩트 자료(1단계 구글독스/검색 결과)]를 머릿속에 완벽히 기억하고, 이 두 자료를 유기적으로 융합하여 내가 앞으로 지시할 기획서 초안을 단계별로 작성해줘.

■ 1. 레퍼런스 논리 구조 (2단계 추출물)
[이곳에 2단계에서 Gemini Advanced가 도출해준 '지시용 템플릿 및 뼈대 구조'를 복사-붙여넣기 하세요]

■ 2. 기획 기초 팩트 자료 (1단계 Google Docs / 리서치 결과물)
[이곳에 1단계 구글 딥리서치 결과가 저장된 Google Docs의 텍스트 본문 전체를 복사-붙여넣기 하세요]

이해했으면 핵심 맥락(사업 주제, 대상 지역, 예산 규모)만 한 문장으로 요약해서 대답하고 대기해줘. 지금부터 1단계 프롬프트부터 차례대로 세부 본문 작성을 요청할게.`,

    // === [성과중심형 연쇄 프롬프트 (4-1 트랙)] ===
    "p-step-4-1-1": `내가 기획하고자 하는 사업 주제는 "[TOPIC]"이야.
이 주제에 적합하며, 모금회 심사위원이 한눈에 사업을 직관적으로 파악할 수 있는 성과중심형 사업명(제목) 5개를 제안해줘.

[사업명 작성의 대원칙]
1. 공식 준수: [대상] + [목적(질적 성과 변화)] + [방법] 이 반드시 제목 내에 유기적으로 결합되어야 해.
   (예: "[저소득 난독증 아동]의 [언어역량 발달 및 정서회복]을 위한 [문해력 향상 교실 및 자전거 멘토링]")
2. 부제 활용: 한 눈에 각인될 수 있는 참신한 슬로건은 부제(부제목) 형태로 괄호나 말따옴표 안에 기재해줘.
3. 구체성: 제목만 읽고도 수혜대상, 구체적인 사업목적, 구체적인 프로그램 수행방법이 명확히 나타나야 해.`,

    "p-step-4-1-2": `내가 작성 중인 "[TOPIC]" 사업의 한글 양식 "2. 사업 필요성" 란에 들어갈 고도로 객관적이고 논리적인 배경 설명과 필요성을 도출해줘.

[작성 및 논리 구성 지침]
1. 구조화 작성: 필요성 본문은 아래 3가지 소제목으로 나누어 작성해줘.
   (1) 해당 사업 대상자(아동, 가정 등)가 현재 지역사회에서 겪고 있는 실질적이고 구체적인 기능적/정서적 결핍 상태
   (2) 이 문제를 반드시 해결해야만 하는 사회적/정책적 필요성 (방치할 시 아동 발달에 미칠 부정적 파급력)
   (3) 기존의 일반적 돌봄이나 보편적 서비스가 지닌 한계점 및 질적 성과 중심의 본 사업 도입 시급성
2. 팩트 및 데이터 기반: 통계청, 보건복지부 등의 통계 수치나 언론 보도를 인용하는 가상의 팩트 데이터를 출처와 함께 촘촘히 엮어줘.

위 지침을 준수하여 한글 파일에 바로 옮겨 적을 수 있는 개조식(음슴체) 형태의 완성된 필요성 뼈대를 작성해줘.`,

    "p-step-4-1-3": `내가 기획 중인 "[TOPIC]" 사업의 한글 양식 "3. 사업 내용 및 추진방법" 중 "1) 사업 참여자 및 인원" 단락을 수립해줘.

[작성 지침]
1. 참여자 구분: 아래 4가지 인구 집단과 구체적 수치를 표(Table) 형태로 도출해줘.
   - 일반집단: 사업 대상이 속한 지역 내 아동/가족 전체 수
   - 위기집단: 그중 경제적 취약성이나 사회적 배제가 의심되는 위험군 수
   - 표적집단: 실제 본 사업의 혜택을 받을 자격 요건을 갖춘 아동/가족 수
   - 클라이언트(핵심 참여자): 예산 및 센터 정원을 고려해 실제 선정하여 변화를 추적할 핵심 참여자 수 (예: 아동 20명)
2. 참여자 선정 기준: 
   - 참가자들이 충족해야 하는 공통 기준(지역 제한, 연령 등) 기재.
   - 모집 인원 초과 시 우선적으로 선정할 투명하고 구체적인 기준(소득 가구 형태 등) 제시.`,

    "p-step-4-1-4": `내가 기획 중인 "[TOPIC]" 사업의 성과중심형 핵심인 "성과 목표, 성과 지표 및 평가 도구(척도)"를 표(Table) 형태로 빌드해줘.

[성과 지표 설계 지침]
1. 질적 성과 목표: 세부 프로그램별로 달성하고자 하는 구체적인 질적 변화(예: 자아존중감 향상, 의사소통 능력 개선 등)를 성과 목표로 설정해줘.
2. 표준화된 척도 매핑: 각 성과 목표를 과학적으로 측정할 수 있는 표준화된 척도(예: Rosenberg 자아존중감 척도, 다문화 수용성 척도 등)와 사전/사후 검사 진행 시기 및 목표 달성 기준(예: 척도 점수 평균 15% 이상 향상)을 명확하게 매핑해줘.
3. 평가 방법: 설문조사, 행동 관찰, 전문가 소견 등 다각적인 평가 방법을 간결히 제시해줘.`,

    "p-step-4-1-5": `내가 기획 중인 "[TOPIC]" 사업의 한글 양식 "4. 예산편성(표)" 단락을 지원 한도 [BUDGET]에 맞추어 성과중심형 사업 성격에 맞게 설계해줘.

[예산 편성 대원칙]
1. 비목 구분: 인건비(직접 수행 수당, 외부 강사료 등), 사업비(교구비, 수강료, 간식비, 문화체험비, 척도 검사비 등), 관리운영비(간접 운영비) 3가지 비목으로 명확히 소계를 내어 분류해줘.
2. 촘촘한 산출근거 도출: 단가 * 수량 * 인원 * 횟수 공식을 100% 준수하여 한 치의 계산 오차도 없이 숫자를 채워줘.
3. 예산 조달 계획: 총계 대비 신청금액(모금회 지원금) 비율 90%와 기관 자부담 비율 10%의 비율로 자본 조달 비중을 정교하게 갈라 표에 마크해줘.`,

    // === [산출중심형 연쇄 프롬프트 (4-2 트랙)] ===
    "p-step-4-2-1": `내가 기획하고자 하는 사업 주제는 "[TOPIC]"이야.
이 주제에 적합하며, 모금회 심사위원이 한눈에 사업을 직관적으로 파악할 수 있는 산출중심형 사업명(제목) 5개를 제안해줘.

[사업명 작성의 대원칙]
1. 공식 준수: [대상] + [산출물/서비스 제공] + [방법] 이 반드시 제목 내에 유기적으로 결합되어야 해.
   (예: "[취약계층 독거노인]을 위한 [도시락 배달 서비스] 및 [이동 방역 지원사업]")
2. 부제 활용: 한 눈에 각인될 수 있는 참신한 슬로건은 부제(부제목) 형태로 괄호나 말따옴표 안에 기재해줘.
3. 구체성: 제목만 읽고도 수혜대상, 물리적 산출물 제공 형태, 프로그램 수행방법이 명확히 나타나야 해.`,

    "p-step-4-2-2": `내가 작성 중인 "[TOPIC]" 사업의 한글 양식 "2. 사업 필요성" 란에 들어갈 고도로 객관적이고 논리적인 배경 설명과 필요성을 도출해줘.

[작성 및 논리 구성 지침]
1. 구조화 작성: 필요성 본문은 아래 3가지 소제목으로 나누어 작성해줘.
   (1) 대상자가 현재 지역사회에서 겪고 있는 즉각적인 물리적/환경적 결핍 및 인프라 공백 상태
   (2) 이 문제를 신속히 해결(서비스 및 물품 투입)해야 하는 정책적/사회적 시급성
   (3) 물품/서비스 지원 공백을 메우기 위한 본 사업의 구체적 투입 타당성 및 도입 이점
2. 팩트 및 데이터 기반: 통계청, 지자체 통계 지표 등을 활용해 실질적인 수혜 결핍 수치를 출처와 함께 엮어줘.

위 지침을 준수하여 한글 파일에 바로 옮겨 적을 수 있는 개조식(음슴체) 형태의 완성된 필요성 뼈대를 작성해줘.`,

    "p-step-4-2-3": `내가 기획 중인 "[TOPIC]" 사업의 산출중심형 핵심인 "3. 세부사업 내용 및 일정표(표)" 단락을 설계해줘.

[작성 및 표 구성 지침]
1. 세부 프로그램 분류 및 정량적 산출목표(Output) 설계: 각 세부 프로그램의 물리적 서비스 수량을 칼같이 수치화해줘.
   * 공식 예시: "핵심 참여 대상 20명, 주 1회(회당 2시간), 연간 40회 진행 (연 누적 800명 지원)"
2. 활동 내용 및 수행 방법: 프로그램별로 담당 수행 인력, 구체적인 커리큘럼 및 활용 교구 등을 상세히 개조식으로 기술해줘.
3. 연간 일정 마킹: 각 세부 프로그램이 연중 어느 월(1월~12월)에 실시되는지 가로 타임라인 마크(■) 형태로 일목요연하게 표시해줘.`,

    "p-step-4-2-4": `내가 기획 중인 "[TOPIC]" 사업의 한글 양식 "4. 예산편성(표)" 단락을 지원 한도 [BUDGET]에 맞추어 산출중심형 예산 원칙에 맞추어 설계해줘.

[예산 편성 대원칙]
1. 비목 구분: 인건비(직접 수당), 사업비(물품 구입비, 자재비, 차량 임차비, 시설 개선 공사비 등), 관리운영비 3가지 비목으로 분류해줘.
2. 촘촘한 산출근거 도출: 단가 * 수량 * 인원 * 횟수 공식을 100% 준수하여 한 치의 계산 오차도 없이 숫자를 채워줘.
3. 예산 조달 계획: 총계 대비 신청금액(모금회 지원금) 비율 90%와 기관 자부담 비율 10%의 비율로 자본 조달 비중을 정교하게 갈라 표에 마크해줘.`,

    "p-step-4-2-5": `내가 기획 중인 "[TOPIC]" 사업의 산출중심형 "5. 기대효과 및 후속 환류 계획" 단락을 작성해줘.

[작성 지침]
1. 정량적 기대효과: 서비스 및 인프라 개선이 완료된 후, 지역사회와 수혜자에게 미칠 즉각적인 정량적/물리적 기대효과를 구체적으로 기술해줘.
2. 지속성 및 환류 계획: 사업 종료 후에도 시설 기능 및 물품의 관리 지속성을 담보하기 위한 구체적인 유지보수/환류 모니터링 계획을 제시해줘.`,

    // === [최종 마스터 조립 프롬프트] ===
    "p-master-docs-outcome": `# 역할 정의 (Role)
너는 사회복지공동모금회 프로포절 심사위원의 시각을 가진 15년 차 시니어 사회복지 기획 편집 전문가이다.

# 임무 (Mission)
내가 아래에 붙여넣은 [4-1단계 연쇄적 프롬프팅을 통해 도출한 부문별 초안 텍스트]는 이미 각 항목별로 작성이 완료된 상태이다. 이 초안 텍스트들을 하나의 완성된 성과중심형 기획서로 **조립(Assemble)하고, 어조를 통일(윤문)하며, 논리적 정합성을 검수**해라.
⚠️ 전체를 처음부터 새로 쓰지 마라. 내가 제공한 초안의 핵심 내용과 수치를 그대로 유지하되, 아래의 편집 작업만 수행해라.

# 편집 작업 지침 (Tasks)
1. 어조 통일 윤문: 공문서 규격인 개조식 종결어미(~함, ~임, ~계획임)로 일관되게 통일하고 소제목 계층 구조를 정렬한다.
2. 논리 흐름 감수: '사업 필요성'에서 제기된 문제점이 '세부 프로그램'과 '성과 지표/평가 도구'로 완벽히 매핑 및 해결되고 있는지 크로스체크한다.
3. 예산 총합 크로스체크: 각 비목의 산출식을 계산하여 소계가 맞는지 확인하고 신청금(90%)과 자부담(10%) 비율을 체크한다.
4. 구글 문서 호환 포맷 출력: Markdown 표 서식(|)으로 깔끔하게 출력해라.

# 최종 출력 목차
다음 순서로 조립하여 생략 없이 전체를 출력하라:
1. 사업명
2. 사업 필요성
3. 서비스 대상 및 인원수 (인원 표 포함)
4. 성과 목표 및 평가 계획 (상세 성과 지표 표 포함)
5. 예산 계획 (상세 산출근거 예산표 포함)

---
[아래에 4-1단계 연쇄적 프롬프팅을 통해 도출한 부문별 초안 텍스트들을 붙여넣으세요]`,

    "p-master-docs-output": `# 역할 정의 (Role)
너는 사회복지공동모금회 프로포절 심사위원의 시각을 가진 15년 차 시니어 사회복지 기획 편집 전문가이다.

# 임무 (Mission)
내가 아래에 붙여넣은 [4-2단계 연쇄적 프롬프팅을 통해 도출한 부문별 초안 텍스트]는 이미 각 항목별로 작성이 완료된 상태이다. 이 초안 텍스트들을 하나의 완성된 산출중심형 기획서로 **조립(Assemble)하고, 어조를 통일(윤문)하며, 논리적 정합성을 검수**해라.
⚠️ 전체를 처음부터 새로 쓰지 마라. 내가 제공한 초안의 핵심 내용과 수치를 그대로 유지하되, 아래의 편집 작업만 수행해라.

# 편집 작업 지침 (Tasks)
1. 어조 통일 윤문: 공문서 규격인 개조식 종결어미(~함, ~임, ~계획임)로 일관되게 통일하고 소제목 계층 구조를 정렬한다.
2. 논리 흐름 감수: '사업 필요성'에서 제기된 결핍 인프라가 '세부 프로그램'과 '정량적 산출목표'로 완벽히 해결 및 매핑되고 있는지 크로스체크한다.
3. 예산 총합 크로스체크: 각 비목의 산출식을 계산하여 소계가 맞는지 확인하고 신청금(90%)과 자부담(10%) 비율을 체크한다.
4. 구글 문서 호환 포맷 출력: Markdown 표 서식(|)으로 깔끔하게 출력해라.

# 최종 출력 목차
다음 순서로 조립하여 생략 없이 전체를 출력하라:
1. 사업명
2. 사업 필요성
3. 서비스 대상 및 인원수 (인원 표 포함)
4. 세부 사업 내용 및 일정표 (Gantt 표 포함)
5. 예산 계획 (상세 산출근거 예산표 포함)
6. 기대효과 및 후속 환류 계획

---
[아래에 4-2단계 연쇄적 프롬프팅을 통해 도출한 부문별 초안 텍스트들을 붙여넣으세요]`,

    // === [성과확산형 연쇄 프롬프트 (4-3 트랙)] ===
    "p-step-4-3-1": `내가 기획하고자 하는 사업 주제는 "[TOPIC]"이야.
이 주제에 적합하며, 모금회 심사위원이 한눈에 사업을 직관적으로 파악할 수 있는 성과확산형 사업명(제목) 5개를 제안해줘.

[사업명 작성의 대원칙]
1. 공식 준수: [대상] + [성과확산 및 네트워크 구축 목적] + [방법/매뉴얼/컨소시엄]이 제목 내에 유기적으로 결합되어야 해.
   (예: "[취약계층 아동]의 심리지원을 위한 [동행자 연계 및 지역사회 네트워크 확산 사업]")
2. 부제 활용: 한 눈에 각인될 수 있는 참신한 슬로건은 부제(부제목) 형태로 괄호나 말따옴표 안에 기재해줘.
3. 구체성: 제목만 읽고도 수혜대상, 성과 확산 목적, 연합 네트워크 수행방법이 명확히 나타나야 해.`,

    "p-step-4-3-2": `내가 작성 중인 "[TOPIC]" 사업의 한글 양식 "2. 사업 필요성" 란에 들어갈 고도로 객관적이고 논리적인 배경 설명과 필요성을 도출해줘.

[작성 및 논리 구성 지침]
1. 구조화 작성: 필요성 본문은 아래 3가지 소제목으로 나누어 작성해줘.
   (1) 우수 복지 사업 모델의 보급/확산 필요성 및 지역사회 내 복제 타당성
   (2) 유관 기관 간 다각적 네트워크 및 거버넌스 결여로 인한 사각지대 및 서비스 한계점
   (3) 프로그램 매뉴얼화 및 표준 보급 체계 구축을 통한 지속 가능한 성과 확산 시급성
2. 팩트 및 데이터 기반: 전국 단위의 복지 성공 지표나 보건복지부, 지자체 정책 근거 자료를 출처와 함께 촘촘히 엮어줘.

위 지침을 준수하여 한글 파일에 바로 옮겨 적을 수 있는 개조식(음슴체) 형태의 완성된 필요성 뼈대를 작성해줘.`,

    "p-step-4-3-3": `내가 기획 중인 "[TOPIC]" 사업의 성과확산형 핵심인 "3. 세부사업 내용 및 일정표(표)" 단락을 설계해줘.

[작성 및 표 구성 지침]
1. 세부 프로그램 분류 및 정량적 성과확산 목표 설계: 
   - 매뉴얼 개발 TF 정기 회의, 네트워크 참여 기관 연합 회의, 연합 세미나 및 보급 교육 횟수 등을 구체적으로 정량화해줘.
2. 활동 내용 및 수행 방법: 프로그램별로 보급 대상(참여 기관 수, 실무자 수), 구체적인 보급 방법 및 수행 절차를 상세히 기술해줘.
3. 연간 일정 마킹: 각 세부 프로그램의 실시 월을 타임라인 마크(■) 형태로 깔끔하게 표시해줘.`,

    "p-step-4-3-4": `내가 기획 중인 "[TOPIC]" 사업의 한글 양식 "4. 예산편성(표)" 단락을 지원 한도 [BUDGET]에 맞추어 성과확산형(네트워크/보급형) 예산 원칙에 맞게 설계해줘.

[예산 편성 대원칙]
1. 비목 구분: 인건비(전담 실무자 및 자문료), 사업비(매뉴얼 인쇄 제작비, 네트워크 회의비, 홍보 및 세미나 대관비, 강사료 등), 관리운영비 3가지 비목으로 분류해줘.
2. 촘촘한 산출근거 도출: 단가 * 수량 * 인원 * 횟수 공식을 100% 준수하여 한 치의 계산 오차도 없이 숫자를 채워줘.
3. 예산 조달 계획: 총계 대비 신청금액(모금회 지원금) 비율 90%와 기관 자부담 비율 10%의 비율로 자본 조달 비중을 정교하게 갈라 표에 마크해줘.`,

    "p-step-4-3-5": `내가 기획 중인 "[TOPIC]" 사업의 성과확산형 "5. 기대효과 및 향후 정책화 방안" 단락을 작성해줘.

[작성 지침]
1. 확산적 기대효과: 우수 사업 모델 전파를 통해 수혜 대상자가 속한 지역사회 전반에 미칠 다각적 파급 효과 및 매뉴얼 활용 성과를 기술해줘.
2. 후속 정책화 및 자립화: 시범 사업 성과를 바탕으로 지자체 조례 연계, 공공 복지 전달 체계 편입 등 향후 정책 의제화 및 제도권 편입 방안을 구체적으로 제시해줘.`,

    "p-master-docs-diffusion": `# 역할 정의 (Role)
너는 사회복지공동모금회 프로포절 심사위원의 시각을 가진 15년 차 시니어 사회복지 기획 편집 전문가이다.

# 임무 (Mission)
내가 아래에 붙여넣은 [4-3단계 연쇄적 프롬프팅을 통해 도출한 부문별 초안 텍스트]는 이미 각 항목별로 작성이 완료된 상태이다. 이 초안 텍스트들을 하나의 완성된 성과확산형(네트워크형) 기획서로 **조립(Assemble)하고, 어조를 통일(윤문)하며, 논리적 정합성을 검수**해라.
⚠️ 전체를 처음부터 새로 쓰지 마라. 내가 제공한 초안의 핵심 내용과 수치를 그대로 유지하되, 아래의 편집 작업만 수행해라.

# 편집 작업 지침 (Tasks)
1. 어조 통일 윤문: 공문서 규격인 개조식 종결어미(~함, ~임, ~계획임)로 일관되게 통일하고 소제목 계층 구조를 정렬한다.
2. 논리 흐름 감수: '사업 필요성'에서 제기된 사각지대 한계가 '세부 네트워크 활동'과 '성과 확산 정책화 비전'으로 완벽히 매핑되고 있는지 크로스체크한다.
3. 예산 총합 크로스체크: 각 비목의 산출식을 계산하여 소계가 맞는지 확인하고 신청금(90%)과 자부담(10%) 비율을 체크한다.
4. 구글 문서 호환 포맷 출력: Markdown 표 서식(|)으로 깔끔하게 출력해라.

# 최종 출력 목차
다음 순서로 조립하여 생략 없이 전체를 출력하라:
1. 사업명
2. 사업 필요성
3. 서비스 대상 및 파급 범위 (참여 기관 및 수혜자 수 포함)
4. 세부 확산 계획 및 일정표 (Gantt 표 포함)
5. 예산 계획 (상세 산출근거 예산표 포함)
6. 기대효과 및 향후 정책화 방안

---
[아래에 4-3단계 연쇄적 프롬프팅을 통해 도출한 부문별 초안 텍스트들을 붙여넣으세요]`,

    // === [기능보강형 연쇄 프롬프트 (4-4 트랙)] ===
    "p-step-4-4-1": `내가 기획하고자 하는 사업 주제는 "[TOPIC]"이야.
이 주제에 적합하며, 모금회 심사위원이 한눈에 사업을 직관적으로 파악할 수 있는 기능보강형 사업명(제목) 5개를 제안해줘.

[사업명 작성의 대원칙]
1. 공식 준수: [시설/기관명] + [기능보강 및 환경개선 목적] + [공사/장비구입명] 구조가 제목 내에 유기적으로 결합되어야 해.
   (예: "[남부지역아동센터] 아동의 위생 및 안전 환경 보강을 위한 [소방 안전 피난로 대피 시설 공사 및 장비 교체]")
2. 부제 활용: 한 눈에 각인될 수 있는 참신한 슬로건은 부제(부제목) 형태로 괄호나 말따옴표 안에 기재해줘.
3. 구체성: 제목만 읽고도 수혜기관, 구체적인 기능보강 목적(위생, 안전, 편의 등), 구체적인 시설 개보수/장비 내역이 명확히 나타나야 해.`,

    "p-step-4-4-2": `내가 작성 중인 "[TOPIC]" 사업의 한글 양식 "2. 사업 필요성" 란에 들어갈 고도로 객관적이고 논리적인 배경 설명과 필요성을 도출해줘.

[작성 및 논리 구성 지침]
1. 구조화 작성: 필요성 본문은 아래 3가지 소제목으로 나누어 작성해줘.
   (1) 해당 복지 시설/장비의 극심한 노후화 및 이용자 안전 상의 직접적 위험 요인 (객관적 안전진단 등급, 사진 근거, 내구연한 초과 내역 명시)
   (2) 기능보강 미이행 시 아동 및 이용 클라이언트에게 미칠 정서적/신체적 제약 및 복지 서비스 한계점
   (3) 복지 시설 자치 예산 조달의 곤란성 및 자부담(10% 매칭) 조달 타당성
2. 객관적 지표: 시설 안전 법규, 화재안전기준, 관련 지자체 권고사항 등을 팩트 데이터로 인용해 시급성을 드러내줘.

위 지침을 준수하여 한글 파일에 바로 옮겨 적을 수 있는 개조식(음슴체) 형태의 완성된 필요성 뼈대를 작성해줘.`,

    "p-step-4-4-3": `내가 기획 중인 "[TOPIC]" 사업의 기능보강형 핵심인 "3. 세부 기능보강 계획 및 규격(표)" 단락을 설계해줘.

[작성 및 표 구성 지침]
1. 기능보강 상세 내역 및 규격: 개보수할 공사 면적, 도입할 장비의 상세 스펙과 수량을 명확하게 정량화해줘.
2. 시공 업체 및 물품 구매 조달 계획: 공정한 비교견적 프로세스를 통한 최저가/적격 업체 선정 절차, 시공 감독 및 준공 검수 계획을 구체적으로 개조식 기술해줘.
3. 사업 추진 일정: 연간 추진 일정표(착공, 시공, 감리, 준공, 장비 검수 등)를 타임라인 마크(■) 형태로 작성해줘.`,

    "p-step-4-4-4": `내가 기획 중인 "[TOPIC]" 사업의 한글 양식 "4. 예산편성(표)" 단락을 지원 한도 [BUDGET]에 맞추어 기능보강형(시공/장비구입) 예산 원칙에 맞게 설계해줘.

[예산 편성 대원칙]
1. 비목 구분: 시설개보수 공사비(재료비, 노무비, 경비 등), 장비구입비(기기 단가), 부대비용(설계비, 수수료 등) 비목으로 명확하게 구분해줘.
2. 견적서 기반 단가 산출: 실제 시공 및 장비 견적서에 기반하여 단가 * 수량 * 횟수 공식을 철저하게 지켜 기재해줘.
3. 예산 조달 계획: 총계 대비 신청금액(모금회 지원금) 비율 90%와 기관 자부담 비율 10%의 비율로 자본 조달 비중을 정교하게 갈라 표에 마크해줘.`,

    "p-step-4-4-5": `내가 기획 중인 "[TOPIC]" 사업의 기능보강형 "5. 기대효과 및 시설/장비 사후 유지관리 계획" 단락을 작성해줘.

[작성 지침]
1. 안전/환경적 기대효과: 시설 개보수 및 장비 도입 완료 후, 이용자(아동 등)의 안전성 향상, 화재 예방, 쾌적성 향상 등 즉각적 개선 지표를 정량적으로 기술해줘.
2. 사후 유지관리 계획: 도입된 시설과 장비의 도난 방지, 화재 보험 가입, 장기 수선 계획 수립, 전담 관리자 지정 등 사업 종료 후 사후 모니터링 및 유지 보수 지속성 계획을 구체적으로 기재해줘.`,

    "p-master-docs-reinforcement": `# 역할 정의 (Role)
너는 사회복지공동모금회 프로포절 심사위원의 시각을 가진 15년 차 시니어 사회복지 기획 편집 전문가이다.

# 임무 (Mission)
내가 아래에 붙여넣은 [4-4단계 연쇄적 프롬프팅을 통해 도출한 부문별 초안 텍스트]는 이미 각 항목별로 작성이 완료된 상태이다. 이 초안 텍스트들을 하나의 완성된 기능보강형 기획서로 **조립(Assemble)하고, 어조를 통일(윤문)하며, 논리적 정합성을 검수**해라.
⚠️ 전체를 처음부터 새로 쓰지 마라. 내가 제공한 초안의 핵심 내용과 수치를 그대로 유지하되, 아래의 편집 작업만 수행해라.

# 편집 작업 지침 (Tasks)
1. 어조 통일 윤문: 공문서 규격인 개조식 종결어미(~함, ~임, ~계획임)로 일관되게 통일하고 소제목 계층 구조를 정렬한다.
2. 논리 흐름 감수: '사업 필요성'에서 지적된 안전 위협 및 시설 낙후성이 '세부 공사 계획'과 '사후 유지 관리 계획'으로 완벽히 매핑되고 해결되는지 크로스체크한다.
3. 예산 총합 크로스체크: 실제 비교견적서 합계액 및 신청금(90%), 자부담(10%) 계산이 틀리지 않았는지 크로스체크한다.
4. 구글 문서 호환 포맷 출력: Markdown 표 서식(|)으로 깔끔하게 출력해라.

# 최종 출력 목차
다음 순서로 조립하여 생략 없이 전체를 출력하라:
1. 사업명
2. 사업 필요성
3. 기능보강 대상 및 상세 규격 (공사 면적/장비 스펙 표 포함)
4. 세부 시공 계획 및 추진 일정 (일정표 포함)
5. 예산 계획 (견적서에 기반한 상세 산출식 예산표 포함)
6. 기대효과 및 사후 유지관리 계획

---
[아래에 4-4단계 연쇄적 프롬프팅을 통해 도출한 부문별 초안 텍스트들을 붙여넣으세요]`
};

// 2. WINDOW INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    initInteractiveTopic(); // Initialize this first to capture correct state.currentTopic from HTML input
    initDeepResearchGenerator();
    initScrollSpy();
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Accordion Logic (Redesigned to avoid cross-group toggle bugs)
function initAccordion() {
    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const isActive = item.classList.contains("active");

            // Close other items only within the SAME container group
            const container = item.closest(".accordion-group") || item.closest(".space-y-4");
            if (container) {
                container.querySelectorAll(".accordion-item").forEach(el => {
                    el.classList.remove("active");
                    const body = el.querySelector(".accordion-body");
                    if (body) body.style.maxHeight = null;
                });
            }

            if (!isActive) {
                item.classList.add("active");
                const body = item.querySelector(".accordion-body");
                if (body) {
                    body.style.maxHeight = body.scrollHeight + 150 + "px";
                }
            }
        });
    });

    // Starting all accordions closed by default as per user request.
}

// Topic Synchronization and Rendering Highlights
function initInteractiveTopic() {
    const topicInput = document.getElementById("user-topic");
    if (!topicInput) return;

    // Capture initial value from HTML (prevent rollback bugs)
    state.currentTopic = topicInput.value || "";
    renderAllPrompts(state.currentTopic);

    topicInput.addEventListener("input", (e) => {
        state.currentTopic = e.target.value || "";
        renderAllPrompts(state.currentTopic);
        if (typeof window.updateDeepResearchPrompt === "function") {
            window.updateDeepResearchPrompt(); 
        }
    });

    // Run Accordion initializer immediately after DOM binding
    initAccordion();
}

// Helper: Wrap variable text in orange contrast badge (Meng To Style)
function getHighlightSpan(text, placeholder) {
    if (!text || text.trim() === "") {
        return `<span class="text-rose-400 font-black bg-rose-500/10 px-2 py-0.5 rounded-lg border border-rose-500/35 animate-pulse text-xs md:text-sm">[⚠️ ${placeholder} 입력 필요]</span>`;
    }
    return `<span class="text-orange-500 font-extrabold bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">${text}</span>`;
}

function getRawText(text, placeholder) {
    if (!text || text.trim() === "") {
        return `[${placeholder} 입력 필요]`;
    }
    return text;
}

function renderAllPrompts(topic) {
    const topicSpan = getHighlightSpan(topic, "사업 주제");
    const budgetSpan = getHighlightSpan(state.selectedBudget, "예산 한도");
    const evalOrgSpan = getHighlightSpan(state.selectedEvalOrg, "심사 기관");
    const appOrgSpan = getHighlightSpan(state.selectedAppOrg, "신청 기관 유형");
    const regionSpan = getHighlightSpan(state.selectedRegion, "사업 수행 지역");
    
    const targetSpan = getHighlightSpan("저소득 난독증 아동", "대상");
    const goalSpan = getHighlightSpan("언어역량 발달 및 정서회복", "목적");
    const methodSpan = getHighlightSpan("문해력 향상 교실 및 자전거 멘토링", "방법");

    const targetSpanOutput = getHighlightSpan("취약계층 독거노인", "대상");
    const goalSpanOutput = getHighlightSpan("결식 예방 및 위생 개선", "목적");
    const methodSpanOutput = getHighlightSpan("도시락 배달 및 이동 방역 지원", "방법");

    for (const [id, template] of Object.entries(promptTemplates)) {
        const divEl = document.getElementById(id);
        if (divEl) {
            let renderedHtml = template
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/\n/g, "<br>")
                .replace(/\[TOPIC\]/g, topicSpan)
                .replace(/\[EVAL_ORG\]/g, evalOrgSpan)
                .replace(/\[APP_ORG\]/g, appOrgSpan)
                .replace(/\[REGION\]/g, regionSpan);

            if (id === "p-step-4-1-5" || id === "p-step-4-2-4" || id === "p-step-4-3-4" || id === "p-step-4-4-4" || id === "p-master-docs-outcome" || id === "p-master-docs-output" || id === "p-master-docs-diffusion" || id === "p-master-docs-reinforcement") {
                renderedHtml = renderedHtml.replace(/\[BUDGET\]/g, budgetSpan);
            }

            if (id === "p-step-4-1-1") {
                renderedHtml = renderedHtml
                    .replace(/\[저소득 난독증 아동\]/g, targetSpan)
                    .replace(/\[언어역량 발달 및 정서회복\]/g, goalSpan)
                    .replace(/\[문해력 향상 교실 및 자전거 멘토링\]/g, methodSpan);
            }

            if (id === "p-step-4-2-1") {
                renderedHtml = renderedHtml
                    .replace(/\[취약계층 독거노인\]/g, targetSpanOutput)
                    .replace(/\[도시락 배달 서비스 및 이동 방역 지원사업\]/g, goalSpanOutput)
                    .replace(/\[도시락 배달 및 이동 방역 지원\]/g, methodSpanOutput);
            }

            if (id === "p-step-4-3-1") {
                const targetSpanDiff = getHighlightSpan("취약계층 아동", "대상");
                const goalSpanDiff = getHighlightSpan("심리지원 동행자 연계 및 네트워크 확산", "목적");
                const methodSpanDiff = getHighlightSpan("동행자 연계 및 지역사회 거버넌스 구축", "방법");
                renderedHtml = renderedHtml
                    .replace(/\[취약계층 아동\]/g, targetSpanDiff)
                    .replace(/\[심리지원 동행자 연계 및 네트워크 확산 사업\]/g, goalSpanDiff)
                    .replace(/\[동행자 연계 및 지역사회 네트워크 확산 사업\]/g, methodSpanDiff);
            }

            if (id === "p-step-4-4-1") {
                const targetSpanRe = getHighlightSpan("남부지역아동센터", "기관/대상");
                const goalSpanRe = getHighlightSpan("아동의 위생 및 안전 환경 보강", "목적");
                const methodSpanRe = getHighlightSpan("소방 안전 피난로 대피 시설 공사 및 장비 교체", "방법");
                renderedHtml = renderedHtml
                    .replace(/\[남부지역아동센터\]/g, targetSpanRe)
                    .replace(/\[소방 안전 피난로 대피 시설 공사 및 장비 교체\]/g, methodSpanRe);
            }

            divEl.innerHTML = renderedHtml;

            // Recalculate parent accordion body height if it is currently open
            const activeItem = divEl.closest(".accordion-item.active");
            if (activeItem) {
                const body = activeItem.querySelector(".accordion-body");
                if (body) {
                    body.style.maxHeight = body.scrollHeight + 150 + "px";
                }
            }
        }
    }
}

// Deep Research Widget Generator (Updated: Incorporating '2025/2026' temporal prompt instruction)
function initDeepResearchGenerator() {
    const agencyRadios = document.querySelectorAll("input[name='var-agency']");
    const evalInput = document.getElementById("var-eval-org");
    const appInput = document.getElementById("var-app-org");
    const regionInput = document.getElementById("var-region");
    const budgetSelect = document.getElementById("var-budget");

    if (!agencyRadios.length || !evalInput || !appInput || !regionInput || !budgetSelect) return;

    const updatePrompt = () => {
        let agency = "chest";
        agencyRadios.forEach(r => {
            if (r.checked) agency = r.value;
        });

        const budget = budgetSelect.value;
        const evalOrg = evalInput.value || "";
        const appOrg = appInput.value || "";
        const region = regionInput.value || "";

        state.selectedAgency = agency;
        state.selectedBudget = budget;
        state.selectedEvalOrg = evalOrg;
        state.selectedAppOrg = appOrg;
        state.selectedRegion = region;
        
        renderAllPrompts(state.currentTopic);

        let typeName = "";
        if (agency === "chest") {
            typeName = "산출중심형";
        } else if (agency === "enterprise") {
            typeName = "성과중심형";
        } else if (agency === "gov") {
            typeName = "성과확산형";
        } else if (agency === "reinforcement") {
            typeName = "기능보강형";
        }

        const typeSpan = getHighlightSpan(typeName, "사업 유형");
        const budgetSpan = getHighlightSpan(budget, "예산 한도");
        const topicSpan = getHighlightSpan(state.currentTopic, "사업 주제");
        const evalOrgSpan = getHighlightSpan(evalOrg, "심사 기관");
        const appOrgSpan = getHighlightSpan(appOrg, "신청 기관 유형");
        const regionSpan = getHighlightSpan(region, "사업 수행 지역");
        
        const rawTopic = getRawText(state.currentTopic, "사업 주제");
        const rawRegion = getRawText(region, "사업 수행 지역");
        const rawApp = getRawText(appOrg, "신청 기관 유형");
        const rawEval = getRawText(evalOrg, "제출 심사 기관");

        // 2025/2026 최신 기준 강조 변수 추가
        const yearSpan = getHighlightSpan("최근 2025년~2026년 기준", "연도 기준");

        // Raw plain text for clipboard (No HTML, variables cleanly injected with 2025/2026 time constraint)
        const rawPrompt = `[기획 사업 개요]
- 사업 주제: ${rawTopic}
- 수행 지역: ${rawRegion}
- 신청 기관: ${rawApp}
- 공모 기관: ${rawEval}
- 예산 한도: ${budget}
- 사업 유형: ${typeName} (최근 2025년~2026년 기준)

위 사업의 기획 근거와 타당성 마련을 위해 다음 3가지 영역을 심층 조사하고, 데이터와 명확한 출처를 함께 밝혀줘:

1. ${rawRegion} 내 ${rawTopic} 관련 아동/취약계층의 구체적인 결핍 실태, 대상 인구 수, 복지 사각지대 수치 자료
2. 보건복지부, 교육부 또는 해당 지자체(광주광역시 등)의 이 사업 주제 관련 최근 정책 아젠다 및 조례적 지원 근거
3. 타 기관에서 수행하여 효과성이 객관적으로 입증된 유사 사업 명칭과 당시 활용된 구체적인 성과 평가 척도(검사 도구) 정보`;

        // Render in UI with color code highlights
        const uiText = `[기획 사업 개요]
- 사업 주제: ${topicSpan}
- 수행 지역: ${regionSpan}
- 신청 기관: ${appOrgSpan}
- 공모 기관: ${evalOrgSpan}
- 예산 한도: ${budgetSpan}
- 사업 유형: ${typeSpan} (${yearSpan})

위 사업의 기획 근거와 타당성 마련을 위해 다음 3가지 영역을 심층 조사하고, 데이터와 명확한 출처를 함께 밝혀줘:

1. ${regionSpan} 내 ${topicSpan} 관련 아동/취약계층의 구체적인 결핍 실태, 대상 인구 수, 복지 사각지대 수치 자료
2. 보건복지부, 교육부 또는 해당 지자체(광주광역시 등)의 이 사업 주제 관련 최근 정책 아젠다 및 조례적 지원 근거
3. 타 기관에서 수행하여 효과성이 객관적으로 입증된 유사 사업 명칭과 당시 활용된 구체적인 성과 평가 척도(검사 도구) 정보`;

        const divEl = document.getElementById("deep-research-result");
        if (divEl) {
            divEl.innerHTML = uiText.replace(/\n/g, "<br>");
            divEl.dataset.raw = rawPrompt;
        }
    };

    agencyRadios.forEach(radio => {
        radio.addEventListener("change", updatePrompt);
    });
    evalInput.addEventListener("input", updatePrompt);
    appInput.addEventListener("input", updatePrompt);
    regionInput.addEventListener("input", updatePrompt);
    budgetSelect.addEventListener("change", updatePrompt);

    updatePrompt();
    window.updateDeepResearchPrompt = updatePrompt;
}

// Copy to Clipboard (Copies values with variable replacements, stripping highlight DOM tags)
window.copyPrompt = function(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let textToCopy = "";

    if (elementId === "deep-research-result" && el.dataset.raw) {
        textToCopy = el.dataset.raw;
    } else {
        textToCopy = el.innerText;
    }

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            const toast = document.getElementById("toast");
            toast.classList.add("translate-y-0", "opacity-100");
            toast.classList.remove("translate-y-24");
            
            setTimeout(() => {
                toast.classList.add("translate-y-24");
                toast.classList.remove("translate-y-0", "opacity-100");
            }, 2500);
        })
        .catch(err => {
            console.error("복사 실패: ", err);
            alert("자동 복사에 실패했습니다. 마우스로 영역을 지정해 수동 복사하세요.");
        });
};

// Sidebar ScrollSpy (Redesigned dynamically for Steps 1-6)
function initScrollSpy() {
    const navLinks = document.querySelectorAll("aside nav a");
    const progressLine = document.getElementById("sidebar-progress-line");

    if (!navLinks.length) return;

    const sections = Array.from(navLinks).map(link => {
        const href = link.getAttribute("href");
        return document.querySelector(href);
    }).filter(el => el !== null);

    const handleScroll = () => {
        try {
            let activeIdx = 0;

            sections.forEach((section, idx) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 200) {
                    activeIdx = idx;
                }
            });

            navLinks.forEach((link, idx) => {
                const dot = link.querySelector(".nav-dot");
                
                if (idx === activeIdx) {
                    link.classList.add("bg-white/10", "text-white");
                    link.classList.remove("text-slate-400", "text-slate-500", "text-slate-300");
                    if (dot) {
                        dot.classList.add("active");
                        dot.classList.remove("completed");
                    }
                } else if (idx < activeIdx) {
                    link.classList.remove("bg-white/10", "text-white");
                    link.classList.add("text-slate-300");
                    link.classList.remove("text-slate-400", "text-slate-500");
                    if (dot) {
                        dot.classList.add("completed");
                        dot.classList.remove("active");
                    }
                } else {
                    link.classList.remove("bg-white/10", "text-white", "text-slate-300");
                    link.classList.add("text-slate-500");
                    if (dot) {
                        dot.classList.remove("active", "completed");
                    }
                }
            });

            if (progressLine && navLinks[0] && activeIdx >= 0) {
                const firstDot = navLinks[0].querySelector(".nav-dot");
                const activeDot = navLinks[activeIdx].querySelector(".nav-dot");
                if (firstDot && activeDot) {
                    const startY = firstDot.getBoundingClientRect().top;
                    const activeY = activeDot.getBoundingClientRect().top;
                    const diffY = activeY - startY;
                    progressLine.style.height = `${diffY}px`;
                }
            }
        } catch (e) {
            console.error("Error in handleScroll:", e);
        }
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 100);
}
