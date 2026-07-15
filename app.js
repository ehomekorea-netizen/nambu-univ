// 1. STATE & TEMPLATES DEFINITION
const state = {
    currentTopic: "", // Initialized dynamically from DOM value
    selectedAgency: "chest", // 'chest' = 산출중심형, 'enterprise' = 성과중심형, 'gov' = 성과확산형
    selectedBudget: "15,000,000원",
    selectedEvalOrg: "사회복지공동모금회",
    selectedAppOrg: "지역아동센터",
    selectedRegion: "광주광역시 남구"
};

// Raw Prompt Templates (Plain text definitions, styling is applied dynamically)
const promptTemplates = {
    // 3-1 Step: 사업명 선정
    "p-step-1": `내가 기획하고자 하는 사업 주제는 "[TOPIC]"이야.
이 주제에 적합하며, 모금회 심사위원이 한눈에 사업을 직관적으로 파악할 수 있는 사업명(제목) 5개를 제안해줘.

[사업명 작성의 대원칙]
1. 공식 준수: [대상] + [목적] + [방법] 이 반드시 제목 내에 유기적으로 결합되어야 해.
2. 부제 활용: 한 눈에 각인될 수 있는 참신한 슬로건은 부제(부제목) 형태로 괄호나 말따옴표 안에 기재해줘.
3. 구체성: 제목만 읽고도 "누구에게(예: [저소득 난독증 아동]처럼 기관 상황에 맞춘 수혜대상)", "무엇을 해결하기 위해(예: [언어역량 발달 및 정서회복]처럼 구체적인 사업목적)", "어떤 방법으로(예: [문해력 향상 교실 및 자전거 멘토링]처럼 구체적인 프로그램 수행방법)" 사업을 하는지 명확히 나타나야 해.

이 유형별 패턴을 참조하여, 완성도 높은 5가지 사업명 후보군을 제시해줘.`,

    // 3-2 Step: 사업 필요성 도출
    "p-step-2": `내가 작성 중인 "[TOPIC]" 사업의 한글 양식 "2. 사업 필요성" 란에 들어갈 고도로 객관적이고 논리적인 배경 설명과 필요성을 도출해줘.

[작성 및 논리 구성 지침]
1. 구조화 작성: 필요성 본문은 아래 3가지 소제목으로 나누어 작성해줘.
   (1) 해당 사업 대상자(아동, 가정 등)가 현재 지역사회에서 겪고 있는 실질적이고 구체적인 어려움
   (2) 이 문제를 반드시 해결해야만 하는 사회적/정책적 필요성 (방치할 시 일어날 부정적 파급력)
   (3) 기존의 일반적 돌봄이나 보편적 서비스가 지닌 한계점 및 본 사업의 도입 시급성
2. 팩트 및 데이터 기반: 감정적이거나 호소하는 조의 글쓰기를 배제하고, 공신력 있는 기관(통계청, 보건복지부, 아동권리보장원 등)의 통계 수치나 언론 보도를 인용하는 가상의 팩트 데이터를 출처와 함께 촘촘히 엮어줘.

위 지침을 준수하여 한글 파일에 바로 옮겨 적을 수 있는 개조식(음슴체) 형태의 완성된 필요성 뼈대를 작성해줘.`,

    // 3-3 Step: 대상자 선정
    "p-step-3": `내가 기획 중인 "[TOPIC]" 사업의 한글 양식 "3. 사업 내용 및 추진방법" 중 "1) 사업 참여자 및 인원" 단락을 수립해줘.

[작성 지침]
1. 참여자 구분: 아래 4가지 인구 집단과 구체적 수치를 표(Table) 형태로 도출해줘.
   - 일반집단: 사업 대상이 속한 지역 내 아동/가족 전체 수
   - 위기집단: 그중 경제적 취약성이나 사회적 배제가 의심되는 위험군 수
   - 표적집단: 실제 본 사업의 혜택을 받을 자격 요건을 갖춘 아동/가족 수
   - 클라이언트(핵심 참여자): 예산 및 센터 정원을 고려해 실제 선정하여 서비스를 제공하고 변화를 모니터링할 인원수 (예: 아동 20명)
2. 참여자 선정 기준: 
   - 참가자들이 충족해야 하는 공통 기준(지역 제한, 연령 등) 기재.
   - 모집 인원 초과 시 우선적으로 선정할 투명하고 구체적인 소득 및 가구 형태 기준(기초수급, 차상위, 한부모, 조손가정 등) 제시.

이 가이드를 준수하여 깔끔한 표와 텍스트 형태로 최종 대상자 선정 계획을 구성해줘.`,

    // 3-4 Step: 세부내용 표
    "p-step-4": `내가 기획 중인 "[TOPIC]" 사업의 한글 양식 "3. 사업 내용 및 추진방법" 중 "2) 사업내용 및 방법(표)" 단락을 작성해줘.

[작성 및 표 구성 지침]
1. 세부 사업 분류: 전체 사업을 대표하는 3~4개의 세부 프로그램명으로 쪼개어 구성해줘. (예: 기초 학습 지도, 정서 케어 체험, 영양 급식 지원 등)
2. 정량적 산출목표(Output) 설계: 산출중심형 사업에 맞게 각 세부 프로그램의 물리적 서비스 수량을 칼같이 수치화해줘.
   * 공식 예시: "핵심 참여 아동 20명 대상, 주 1회(회당 2시간), 연간 40회 진행 (연 누적 인원 800명 참여)"
3. 활동 내용 및 수행 방법: 프로그램별로 담당 수행 인력(사회복지사, 외부 전문강사 등), 구체적인 커리큘럼 및 활용 교구 등을 상세히 개조식으로 기술해줘.
4. 연간 일정 마킹: 각 세부 프로그램이 연중 어느 월(1월~12월)에 실시되는지 가로 타임라인 마크(■) 형태로 일목요연하게 표시해줘.

광주공동모금회 산출중심형 한글 파일 표준 양식의 표(Table) 구조에 그대로 복사-붙여넣기 할 수 있게 출력해줘.`,

    // 3-5 Step: 예산 계획
    "p-step-5": `내가 기획 중인 "[TOPIC]" 사업의 한글 양식 "4. 예산편성(표)" 단락을 지원 한도 [BUDGET]에 맞추어 세부적으로 설계해줘.

[예산 편성 대원칙]
1. 비목 구분: 인건비(직접 수행 사회복지사 수당, 외부 강사료 등), 사업비(교구비, 수강료, 간식비, 문화체험비, 셔틀버스 등), 관리운영비(간접 운영비) 3가지 비목으로 명확히 소계를 내어 분류해줘.
2. 촘촘한 산출근거 도출: 뭉뚱그린 금액 기재를 절대 배제하고, 단가 * 수량 * 인원 * 횟수 공식을 100% 준수하여 한 치의 계산 오차도 없이 숫자를 채워줘.
   (예: 외부 전문 강사료: 50,000원 * 1명 * 2시간 * 20회 = 2,000,000원)
3. 예산 조달 계획: 총계 대비 신청금액(모금회 지원금) 비율 90%와 기관 자부담 비율 10%의 비율로 자본 조달 비중을 정교하게 갈라 표에 마크해줘.

이 모든 수치가 완벽히 매칭되어 한글 예산표에 drop-in 할 수 있는 최종 예산 편성 표(Table)를 생성해줘.`,

    // 최종 조립 및 윤문 마스터 프롬프트
    "p-master-docs": `# 역할 정의 (Role)
너는 사회복지공동모금회 프로포절 심사위원의 시각을 가진 15년 차 시니어 사회복지 기획 편집 전문가이다.

# 임무 (Mission)
내가 아래에 붙여넣은 [3단계 연쇄적 프롬프팅을 통해 도출한 부문별 초안 텍스트]는 이미 각 항목별로 작성이 완료된 상태이다. 이 초안 텍스트들을 하나의 완성된 기획서로 **조립(Assemble)하고, 어조를 통일(윤문)하며, 논리적 정합성을 검수**해라.
⚠️ 전체를 처음부터 새로 쓰지 마라. 내가 제공한 초안의 핵심 내용과 수치를 그대로 유지하되, 아래의 편집 작업만 수행해라.

# 편집 작업 지침 (Tasks)

## Task 1: 어조 통일 윤문
- 모든 문장의 어미를 공문서 규격인 개조식 종결어미(~함, ~임, ~계획임, ~예정임)로 일관되게 통일한다.
- 소제목 계층 구조를 1 -> 가. -> 1) -> (1) -> - 순으로 엄격하게 정렬한다.
- 중복되거나 상충되는 서술이 있으면 통합하되, 원본 데이터는 삭제하지 않는다.

## Task 2: 논리 흐름 감수 (Logic Model 크로스체크)
- '사업 필요성'에서 제기된 문제점이 '세부 프로그램'의 활동 내용으로 해결되고 있는지 확인한다.
- '세부 프로그램'의 활동이 '예산'의 비목(강사료, 교구비 등)에 정확히 반영되어 있는지 확인한다.
- 논리가 끊기는 구간이 발견되면, 해당 부분을 [⚠️ 논리 불일치 발견] 태그로 표시하고 수정 제안을 함께 기재한다.

## Task 3: 예산 총합 크로스체크
- 각 비목의 산출식(단가 × 수량 × 인원 × 횟수)을 재계산하여 소계가 맞는지 확인한다.
- 인건비 + 사업비 + 관리운영비의 합계가 총 사업 예산 [BUDGET]과 일치하는지 검증한다.
- 신청금(90%)과 자부담(10%) 비율이 정확한지 확인한다.
- 산출식 오류가 발견되면 [⚠️ 예산 산출식 오류] 태그로 표시하고 올바른 계산 결과를 병기한다.

## Task 4: 구글 문서(Google Docs) 호환 포맷 출력
- 표(Table)가 필요한 부분은 Markdown 표 서식(|)으로 깔끔하게 출력해라.
- 완성된 기획서를 Google Docs에 복사-붙여넣기하면 바로 양식이 잡히도록 서식을 정돈해라.

# 최종 출력 목차
다음 순서로 조립하여 생략 없이 전체를 출력하라:
1. 사업명
2. 사업 필요성
3. 서비스 대상 및 인원수 (인원 표 포함)
4. 세부사업 내용 (연간 일정 타임라인 표 포함)
5. 예산 계획 (상세 산출근거 예산표 포함)
6. 기대효과 및 평가 계획

---
[아래에 3단계 연쇄적 프롬프팅을 통해 도출한 부문별 초안 텍스트들을 붙여넣으세요]`
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

// Accordion Logic
function initAccordion() {
    const headers = document.querySelectorAll(".accordion-header");
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const isActive = item.classList.contains("active");

            document.querySelectorAll(".accordion-item").forEach(el => {
                el.classList.remove("active");
                el.querySelector(".accordion-body").style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add("active");
                const body = item.querySelector(".accordion-body");
                body.style.maxHeight = body.scrollHeight + 150 + "px";
            }
        });
    });

    const firstItem = document.querySelector(".accordion-item");
    if (firstItem) {
        firstItem.classList.add("active");
        const body = firstItem.querySelector(".accordion-body");
        body.style.maxHeight = body.scrollHeight + 150 + "px";
    }
}

// Topic Synchronization and Rendering Highlights
function initInteractiveTopic() {
    const topicInput = document.getElementById("user-topic");
    if (!topicInput) return;

    // Capture initial value from HTML (prevent rollback bugs)
    state.currentTopic = topicInput.value || "사업 주제 없음 (입력 필요)";
    renderAllPrompts(state.currentTopic);

    topicInput.addEventListener("input", (e) => {
        state.currentTopic = e.target.value || "사업 주제 없음 (입력 필요)";
        renderAllPrompts(state.currentTopic);
        if (typeof window.updateDeepResearchPrompt === "function") {
            window.updateDeepResearchPrompt(); 
        }
    });

    // Run Accordion initializer immediately after DOM binding
    initAccordion();
}

// Helper: Wrap variable text in orange contrast badge (Meng To Style)
function getHighlightSpan(text) {
    return `<span class="text-orange-500 font-extrabold bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">${text}</span>`;
}

function renderAllPrompts(topic) {
    const topicSpan = getHighlightSpan(topic);
    const budgetSpan = getHighlightSpan(state.selectedBudget);
    const evalOrgSpan = getHighlightSpan(state.selectedEvalOrg);
    const appOrgSpan = getHighlightSpan(state.selectedAppOrg);
    const regionSpan = getHighlightSpan(state.selectedRegion);
    
    const targetSpan = getHighlightSpan("저소득 난독증 아동");
    const goalSpan = getHighlightSpan("언어역량 발달 및 정서회복");
    const methodSpan = getHighlightSpan("문해력 향상 교실 및 자전거 멘토링");

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

            if (id === "p-step-5" || id === "p-master-docs") {
                renderedHtml = renderedHtml.replace(/\[BUDGET\]/g, budgetSpan);
            }

            if (id === "p-step-1") {
                renderedHtml = renderedHtml
                    .replace(/\[저소득 난독증 아동\]/g, targetSpan)
                    .replace(/\[언어역량 발달 및 정서회복\]/g, goalSpan)
                    .replace(/\[문해력 향상 교실 및 자전거 멘토링\]/g, methodSpan);
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
        const evalOrg = evalInput.value || "사회복지공동모금회";
        const appOrg = appInput.value || "지역아동센터";
        const region = regionInput.value || "광주광역시 남구";

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
        } else {
            typeName = "성과확산형";
        }

        const typeSpan = getHighlightSpan(typeName);
        const budgetSpan = getHighlightSpan(budget);
        const topicSpan = getHighlightSpan(state.currentTopic);
        const evalOrgSpan = getHighlightSpan(evalOrg);
        const appOrgSpan = getHighlightSpan(appOrg);
        const regionSpan = getHighlightSpan(region);
        
        // 2025/2026 최신 기준 강조 변수 추가
        const yearSpan = getHighlightSpan("최근 2025년~2026년 기준");

        // Raw plain text for clipboard (No HTML, variables cleanly injected with 2025/2026 time constraint)
        const rawPrompt = `[기획 사업 개요]
- 사업 주제: ${state.currentTopic}
- 수행 지역: ${region}
- 신청 기관: ${appOrg}
- 공모 기관: ${evalOrg}
- 예산 한도: ${budget}
- 사업 유형: ${typeName} (최근 2025년~2026년 기준)

위 정보를 바탕으로, [공모 기관] 심사위원을 설득하기 위해 내가 수집해야 할 아래의 '최신 통계 및 객관적 근거 자료'들을 구글 검색(Google Search)을 통해 직접 탐색하고, 구체적인 수치 데이터와 함께 출처(기관명, 보고서명 또는 URL)를 명확히 밝혀 수집해줘:

1. [대상 지역의 실태 통계]: ${region} 내 ${state.currentTopic} 관련 아동/취약계층의 실질적인 결핍, 인구 수, 혹은 복지 사각지대 지표
2. [정부/지자체 정책 근거]: 보건복지부, 교육부 또는 해당 지자체에서 추진하고 있는 이 사업 주제 관련 최근 정책 아젠다 및 조례적 지원 근거
3. [검증된 우수 프로그램 선례]: 타 기관에서 수행하여 효과성이 객관적으로 입증된 유사 사업 명칭과 당시 활용된 구체적인 성과 평가 척도 도구`;

        // Render in UI with color code highlights
        const uiText = `[기획 사업 개요]
- 사업 주제: ${topicSpan}
- 수행 지역: ${regionSpan}
- 신청 기관: ${appOrgSpan}
- 공모 기관: ${evalOrgSpan}
- 예산 한도: ${budgetSpan}
- 사업 유형: ${typeSpan} (${yearSpan})

위 정보를 바탕으로, [공모 기관] 심사위원을 설득하기 위해 내가 수집해야 할 아래의 '최신 통계 및 객관적 근거 자료'들을 구글 검색(Google Search)을 통해 직접 탐색하고, 구체적인 수치 데이터와 함께 출처(기관명, 보고서명 또는 URL)를 명확히 밝혀 수집해줘:

1. [대상 지역의 실태 통계]: ${regionSpan} 내 ${topicSpan} 관련 아동/취약계층의 실질적인 결핍, 인구 수, 혹은 복지 사각지대 지표
2. [정부/지자체 정책 근거]: 보건복지부, 교육부 또는 해당 지자체에서 추진하고 있는 이 사업 주제 관련 최근 정책 아젠다 및 조례적 지원 근거
3. [검증된 우수 프로그램 선례]: 타 기관에서 수행하여 효과성이 객관적으로 입증된 유사 사업 명칭과 당시 활용된 구체적인 성과 평가 척도 도구`;

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

// Sidebar ScrollSpy
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
