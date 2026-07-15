const quizQuestions = [
    {
        id: 1,
        question: "AI를 활용해 당선 가능한 고품질 프로포절을 작성하기 위한 '프롬프트 지침셋(붕어빵 거푸집)'의 본질적인 역할로 가장 적절한 것은?",
        options: [
            "복사할 양식을 자동으로 다운로드해 주는 기능",
            "AI의 수학적 연산 오류를 자동으로 보정하는 수학 알고리즘",
            "누가 입력해도 일관되고 완성도 높은 결과물을 찍어내도록 역할, 재료, 제약 조건을 구조화해 둔 쇠틀(금형)",
            "인터넷 통계를 무제한으로 수집하는 크롤러"
        ],
        answer: 2,
        explanation: "프롬프트 지침셋은 붕어빵을 구워내는 '거푸집(금형)'처럼, AI에게 명확한 페르소나(역할), 실태 데이터(재료), 작성 규격(제약 조건)을 부여해 늘 균일하고 고품질의 기획서 초안을 찍어내도록 유도하는 틀입니다."
    },
    {
        id: 2,
        question: "프로포절 작성의 1단계인 '전략 딥리서치' 단계의 목표와 실무적 마인드셋으로 올바르지 않은 것은?",
        options: [
            "구글 딥리서치 기능을 활용해 타겟 자치구의 최신 아동 통계 및 정책 근거를 자율 수집한다.",
            "AI가 수집한 모든 수치와 정보를 검증 없이 100% 신뢰하여 그대로 기획서에 반영한다.",
            "도출된 실태 자료와 공공데이터를 실무자가 눈으로 확인하며 1차 검증한다.",
            "단순한 웹 검색을 넘어 다차원적인 입증 자료를 기획의 기초 재료로 수집한다."
        ],
        answer: 1,
        explanation: "AI가 딥리서치로 수집한 실태 통계나 데이터일지라도 가짜 정보나 환각이 섞여 있을 수 있으므로, 반드시 실무자가 직접 확인하여 1차 정제 및 검증(Human Calibration)을 거쳐야 합니다."
    },
    {
        id: 3,
        question: "2단계에서 NotebookLM을 이용해 선정된 우수 프로포절 PDF를 역기획(구조 분석)할 때, 우리가 흡수해야 할 가장 적절한 요소는 무엇인가?",
        options: [
            "수년 전 과거 기획서에 기록된 예산 단가와 실태 조사 통계 수치",
            "심사위원을 설득하기 위해 논리를 전개한 구성 방식과 프로그램 구조(Logic Model 뼈대)",
            "과거 타 기관이 등록한 후원자 및 아동들의 개인 신상 정보",
            "우수사례 텍스트 전체를 복사해서 그대로 붙여넣을 완성본 텍스트"
        ],
        answer: 1,
        explanation: "우수사례 역기획은 그들이 문제를 설득한 '논리적 뼈대(Structure)'와 '활동 구성 방식'만 프레임워크로 배우는 것이며, 수치나 구체적 예산 등 과거 데이터는 현재 기획서에 그대로 사용하면 안 됩니다."
    },
    {
        id: 4,
        question: "왜 3단계에서 본격적인 기획서 작성을 시작하기 전에 '데이터 맥락 주입 베이스 프롬프트'를 먼저 실행해야 하는가?",
        options: [
            "AI의 단기 기억 속에 최신 실태 팩트와 우수 뼈대를 예습시켜 '논리적 정합성'을 락(Lock)을 걸어 유지하기 위해",
            "기획서 작성을 즉시 완료하고 한글 파일로 강제 다운로드받기 위해",
            "AI에게 코딩 명령을 시켜 예산 계산기를 제작하기 위해",
            "AI의 서버 사용량을 줄여 비용을 절감하기 위해"
        ],
        answer: 0,
        explanation: "3단계 베이스캠프 프롬프트는 1단계의 데이터(재료)와 2단계의 뼈대(모형틀)를 결합한 통합 맥락을 AI에게 주입해 락(Lock)을 걺으로써, 다음 단계의 부문별 작성 시 앞뒤 문맥과 수치가 어긋나지 않도록 방어하는 역할을 합니다."
    },
    {
        id: 5,
        question: "기획서를 한 번에 통째로 생성하지 않고, 4단계처럼 단계를 나누어 연쇄적으로 프롬프팅하는 궁극적인 이유는?",
        options: [
            "AI가 한 번에 방대한 글을 쓸 경우 세부 규격이나 자부담 비율 같은 제약 조건을 잊어버리거나 얼버무리기 때문",
            "단계를 나눌수록 AI 서버의 처리 속도가 2배 빨라지기 때문",
            "복사 붙여넣기 횟수를 강제로 늘려 마우스 조작 속도를 향상시키기 때문",
            "복지 기관의 회계 감사 기준에 한 번에 쓰는 것이 위배되기 때문"
        ],
        answer: 0,
        explanation: "AI(LLM)는 컨텍스트 윈도우 한계로 인해 긴 글을 한 번에 쓰게 지시하면 뒷부분으로 갈수록 규격을 무시하거나 대충 얼버무리는 문제(Context Loss)가 있습니다. 따라서 단계별로 쪼개어 연쇄적으로 프롬프트를 먹여 집필해야 촘촘한 결과물이 나옵니다."
    },
    {
        id: 6,
        question: "공동모금회 프로포절 기획의 4대 유형(성과중심, 산출중심, 성과확산, 기능보강) 중 '기능보강형' 기획 시 프롬프트 지침에 들어가야 할 필수적인 제약 조건으로 올바른 것은?",
        options: [
            "참가 아동들의 정서적 우울감 지표 변화를 측정할 척도 설정",
            "낙후 시설의 개보수 및 장비 구입에 대한 표준 견적서 비교, 공간 개조의 타당성과 유지 보수 계획 수립",
            "주민 조직가들이 2년차 사업에서 타 자치구로 성과를 보급하는 매뉴얼화 계획",
            "후원 연계 기업의 홍보 마케팅 지수 극대화 방안"
        ],
        answer: 1,
        explanation: "기능보강형 프로포절은 시설 보수, 장비 구입 등이 주 목적이므로, 단순 만족도가 아니라 물리적 공간 개조의 필요성 및 정확한 표준 견적 비교, 사후 유지 관리 계획 등이 필수적으로 들어가야 합니다."
    },
    {
        id: 7,
        question: "5단계 최종 정합성 검증 단계에서 '예산 산출식'과 관련해 실무자가 취해야 할 행동으로 가장 올바른 것은?",
        options: [
            "AI가 수학 연산을 정확히 완수하므로, 출력된 예산 표를 그대로 복사해 한글 파일에 이식하고 제출한다.",
            "AI는 사칙연산 환각(Hallucination) 오류가 잦으므로, 반드시 엑셀이나 계산기로 사람이 최종 단가 공식을 크로스체크한다.",
            "예산이 틀려도 전체 논리가 그럴싸하면 심사에 합격하므로 오타는 무시한다.",
            "1원이라도 불일치하면 가점 대상이 되므로 예산을 0원으로 기재하여 접수한다."
        ],
        answer: 1,
        explanation: "AI(LLM)는 수학적 연산 능력이 약해 [단가 x 수량 = 합계] 산출식에서 환각 오류를 일으킵니다. 복지 공동모금회 심사에서 단 1원의 예산 오차는 즉각적인 탈락 사유이므로, 예산은 반드시 사람이 엑셀에서 최종 재검증해야 합니다."
    },
    {
        id: 8,
        question: "공동모금회 기획사업 프로포절 접수 시, 신청 금액과 자부담 예산 편성 비율의 공식적인 규정으로 올바른 것은?",
        options: [
            "신청 금액은 제한이 없으며, 자부담은 예산의 50%를 기관이 자체 적립해야 한다.",
            "자부담을 0원으로 제출하는 것이 성실성 면에서 높은 가점을 받는다.",
            "신청 금액(90%)과 자부담(10% 이상)의 조달 비율 분배를 준수해야 하며, 자부담 비율이 어긋나면 심사 탈락 대상이 될 수 있다.",
            "자부담은 인력 멘토링 활동비로만 구성할 수 있으며 현금 자부담은 절대 불가능하다"
        ],
        answer: 2,
        explanation: "공동모금회 표준 심사 규정상 신청 금액과 자부담(총사업비의 10% 이상) 비율 분배가 어긋나거나 미달할 경우 즉각적인 감점 및 심사 탈락 사유가 될 수 있습니다."
    },
    {
        id: 9,
        question: "다문화 가정 아동들을 대상으로 하는 '기초 한국어 단어 카드놀이 세트'나 학습 확인을 위한 '안전 수칙 이해도 시험지'를 순식간에 제작하고 싶을 때, NotebookLM 스튜디오에서 각각 활용하기 가장 적절한 기능 한 쌍은?",
        options: [
            "보고서(Study Guide)와 AI 오디오 오버뷰(Audio Overview)",
            "플래시카드(Flashcards)와 퀴즈(Quiz)",
            "슬라이드 자료(Slides)와 동영상 개요(Video Outline)",
            "마인드맵(Mindmap)과 인포그래픽(Infographic)"
        ],
        answer: 1,
        explanation: "플래시카드는 앞뒷면 질문/답변 카드를 만들어 언어 카드놀이 등에 적합하고, 퀴즈는 이해도를 테스트할 시험 문제를 출제하는 데 매우 유용합니다."
    },
    {
        id: 10,
        question: "센터 게시판에 붙일 '아동 어휘력 향상을 위한 가정 내 5대 수칙' 안내 포스터나 카드뉴스 레이아웃을 기획하고 싶을 때, 활용하기 가장 적절한 NotebookLM 기능과 성공 비결은?",
        options: [
            "마인드맵 기능을 사용하여 긴 영문 팟캐스트 녹음 대본을 텍스트 파일로 출력한다.",
            "인포그래픽(Infographic) 기능을 사용하고, 포스터에 들어갈 문구와 레이아웃 구도를 200% 정밀화하기 위한 '맞춤형 세부 프롬프트'를 추가 지시하여 생성한다.",
            "플래시카드 생성 버튼만 단 한번 클릭하고 아무것도 수정하지 않는다.",
            "동영상 개요 기능을 활용해 5분 분량의 교육용 안전 수칙 동영상을 완전 자동 렌더링하여 다운로드받는다."
        ],
        answer: 1,
        explanation: "안내문이나 포스터의 레이아웃 기획에는 인포그래픽 기능이 유용하며, 클릭 한 번에 그치지 않고 구체적인 들어갈 카드 구성안 등을 묘사하도록 '세부 프롬프트'를 추가로 지시해야 실감 나는 시안 기획서가 완성됩니다."
    }
];

let activeQuestions = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener("DOMContentLoaded", () => {
    initQuiz();
    initQuizEvents();
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

function initQuiz() {
    activeQuestions = shuffleArray([...quizQuestions]);
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById("quiz-container");
    container.innerHTML = "";

    activeQuestions.forEach((q, idx) => {
        const qBox = document.createElement("div");
        qBox.className = "quiz-question-box bg-[#0d1326]/50 border border-white/10 rounded-3xl p-6 md:p-8 space-y-5";
        qBox.dataset.qId = q.id;

        const qTitle = document.createElement("h4");
        qTitle.className = "text-xl font-bold text-white leading-snug";
        qTitle.innerText = `Q${idx + 1}. ${q.question}`;
        qBox.appendChild(qTitle);

        const optionsDiv = document.createElement("div");
        optionsDiv.className = "flex flex-col gap-3";

        const mappedOptions = q.options.map((opt, oIdx) => ({ text: opt, originalIdx: oIdx }));
        const shuffledOptions = shuffleArray(mappedOptions);

        shuffledOptions.forEach((optObj) => {
            const optItem = document.createElement("div");
            optItem.className = "option-item border border-white/10 bg-slate-950/40 rounded-2xl px-5 py-4 cursor-pointer text-base text-slate-350 flex items-center gap-4 transition";
            optItem.dataset.originalIdx = optObj.originalIdx;
            optItem.innerHTML = `
                <input type="radio" name="q-${q.id}" id="q-${q.id}-o-${optObj.originalIdx}" class="pointer-events-none" style="margin: 0;">
                <label style="cursor:pointer; width:100%;" class="font-medium text-slate-300">${optObj.text}</label>
            `;

            optItem.addEventListener("click", () => {
                optionsDiv.querySelectorAll(".option-item").forEach(item => {
                    item.classList.remove("selected");
                    item.querySelector("input").checked = false;
                });
                optItem.classList.add("selected");
                optItem.querySelector("input").checked = true;
            });

            optionsDiv.appendChild(optItem);
        });

        qBox.appendChild(optionsDiv);
        container.appendChild(qBox);
    });
}

function initQuizEvents() {
    const submitBtn = document.getElementById("submit-quiz-btn");
    const resetBtn = document.getElementById("reset-quiz-btn");
    const resultBox = document.getElementById("quiz-result");

    submitBtn.addEventListener("click", () => {
        let score = 0;
        let unanswered = false;

        activeQuestions.forEach(q => {
            const selectedOpt = document.querySelector(`.quiz-question-box[data-q-id="${q.id}"] .option-item.selected`);
            if (!selectedOpt) {
                unanswered = true;
                return;
            }

            const userChoice = parseInt(selectedOpt.dataset.originalIdx);
            selectedOpt.classList.remove("selected");

            if (userChoice === q.answer) {
                score++;
                selectedOpt.classList.add("correct");
            } else {
                selectedOpt.classList.add("incorrect");
                
                const correctOpt = document.querySelector(`.quiz-question-box[data-q-id="${q.id}"] .option-item[data-original-idx="${q.answer}"]`);
                if (correctOpt) {
                    correctOpt.style.border = "1.5px dashed #10b981";
                }
            }
        });

        if (unanswered) {
            alert("모든 문제를 풀고 제출해주세요!");
            return;
        }

        resultBox.classList.remove("hidden");
        const pass = score >= 7;
        resultBox.className = `p-8 rounded-[24px] border-2 transition duration-300 ${pass ? 'border-emerald-500 bg-emerald-500/5 text-emerald-400' : 'border-red-500 bg-red-500/5 text-red-400'}`;

        let resultHtml = `<h3 class="text-2xl font-black mb-1">📝 채점 결과: ${score} / 10 문제 맞춤 (${score * 10}점)</h3>`;
        resultHtml += `<p class="text-base text-white/80 font-medium mb-4">${pass ? '🎉 축하합니다! 교육 이수 기준을 성공적으로 통과하셨습니다.' : '⚠️ 오답 피드백을 확인하고 다시 복습해 풀어보세요.'}</p>`;
        resultHtml += `<div class="divide-y divide-white/10 text-base">`;

        activeQuestions.forEach((q, idx) => {
            const userOpt = document.querySelector(`.quiz-question-box[data-q-id="${q.id}"] .option-item.correct`);
            const isCorrect = !!userOpt;
            resultHtml += `
                <div class="py-4">
                    <strong class="${isCorrect ? 'text-emerald-400' : 'text-red-400'}">Q${idx + 1}. ${isCorrect ? '정답' : '오답'}</strong>
                    <p class="text-slate-300 mt-1"><strong>해설:</strong> ${q.explanation}</p>
                </div>
            `;
        });
        resultHtml += `</div>`;

        resultBox.innerHTML = resultHtml;
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    resetBtn.addEventListener("click", () => {
        resultBox.classList.add("hidden");
        initQuiz();
    });
}
