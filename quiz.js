const quizQuestions = [
    {
        id: 1,
        question: "공동모금회 프로포절 작성 시 반드시 포함해야 하는 핵심 요소가 아닌 것은?",
        options: [
            "사업명 및 필요성(배경)",
            "구체적인 세부 사업내용 및 추진일정",
            "세부 산출근거가 명확한 예산계획",
            "후원자들의 개인 주민등록번호 및 신상 정보"
        ],
        answer: 3,
        explanation: "공동모금회 기획서 작성 시에는 대상자 권리 보호 및 개인정보 보안 법률에 따라 후원자나 클라이언트의 주민등록번호와 같은 민감 개인정보는 완전히 지워야 하며, 사업 배경, 세부 사업내용, 단가식 예산 등이 핵심 필수 기입 사항입니다."
    },
    {
        id: 2,
        question: "배분사업에서 사업의 효과성을 평가할 때 심사위원이 지속적으로 운영 가능한지 여부를 확인하는 가장 중요한 평가지표는?",
        options: [
            "신청한 사회복지사의 연령",
            "사업의 지속 가능성 및 자원 연계 계획",
            "수행 기관의 지리적 위치",
            "기관의 최초 설립 연도"
        ],
        answer: 1,
        explanation: "배분 사업은 단발성 예산 지원에 그치지 않고, 사업 종료 후에도 주민 자조모임이나 지역 연계 등을 통해 지속될 수 있는 구조적 '지속 가능성'을 핵심 평가요소로 삼습니다."
    },
    {
        id: 3,
        question: "배분사업 성과 측정 및 목표 설정 시 가장 적절한 성과목표 기술 방식은?",
        options: [
            "단순히 예산 집행률을 100% 달성하는 것만 기록한다.",
            "참여자의 구체적인 변화(예: 자아존중감 증진)와 이를 검증할 표준 척도/평가계획을 연계한다.",
            "수행 기관의 주관적인 만족만을 기술한다.",
            "참여 인원수를 최대한 부풀려 보고한다."
        ],
        answer: 1,
        explanation: "성과 측정은 단순히 만족도나 예산 집행 내역이 아니라, 참여자에게 나타난 실제적인 변화(Outcome)를 객관적인 척도집과 평가 도구를 활용하여 과학적으로 증명하는 것이 핵심입니다."
    },
    {
        id: 4,
        question: "배분사업에 제출하는 예산계획 수립 시 가장 중요한 기본 원칙은 무엇인가?",
        options: [
            "추후 삭감될 것을 대비해 예산을 최대한 과다하게 편성한다.",
            "무조건 최저가로만 책정하여 예산 절감만을 강조한다.",
            "사업의 세부 프로그램 목적에 맞게 실제 적용 단가, 수량, 횟수를 구체적으로 명시하여 편성한다.",
            "대략적인 뭉칫돈 형태로 뭉뚱그려 예산을 요구한다."
        ],
        answer: 2,
        explanation: "예산은 사업 목표와 활동에 맞추어 실제 단가, 인원수, 횟수를 상세하게 제시하는 '구체성'과 '타당성'이 최우선 원칙입니다."
    },
    {
        id: 5,
        question: "프로포절 작성 시 사업 목적(목표)을 설정할 때 준수해야 할 가장 적합한 기준은?",
        options: [
            "추상적이고 거창한 사회적 가치를 광범위하게 강조한다.",
            "유연성을 위해 최대한 모호하고 넓게 작성한다.",
            "측정 가능하고 구체적인 수치(SMART 원칙)를 적용해 명확하게 설정한다.",
            "목표보다는 기관의 역사를 더 상세히 서술한다."
        ],
        answer: 2,
        explanation: "목표는 구체적이고(Specific), 측정 가능하며(Measurable), 행동 지향적이고(Action-oriented), 현실적이며(Realistic), 기한이 정해진(Time-bound) SMART 기준에 맞출 때 평가 및 실행이 용이합니다."
    },
    {
        id: 6,
        question: "프로포절 작성 시 사업의 '필요성'을 강조하기 위해 심사위원을 설득하는 가장 효과적인 서술 방법은?",
        options: [
            "작성자의 주관적인 경험과 느낌만을 감성적으로 표현한다.",
            "국가 공인 통계 데이터, 정부 보고서, 언론 기사 등 객관적이고 신뢰성 있는 자료를 출처와 함께 제시한다.",
            "위기감을 극대화하기 위해 사실을 과장하여 포장한다.",
            "타 복지관의 사업계획서 필요성을 그대로 복사해 붙여넣는다."
        ],
        answer: 1,
        explanation: "필요성 기술 시에는 공신력 있는 기관의 통계(KOSIS 등), 최신 연구자료, 보도 수치 등의 객관적 데이터를 논리적인 뼈대로 삼아야 심사 시 높은 신뢰를 얻습니다."
    },
    {
        id: 7,
        question: "성공적인 복지 사업 수행을 위한 '지역사회 기관 연계 협력 전략'에 부합하는 것은?",
        options: [
            "보안 유지를 위해 외부 기관과 소통하지 않고 단독으로만 사업을 운영한다.",
            "학교, 주민센터, 전문상담소 등 지역사회 자원을 적극 매칭하여 시너지를 내고 사각지대를 보완한다.",
            "협력 기관과의 책임이나 역할 구분을 모호하게 하여 분쟁을 피한다.",
            "예산 지원만 받고 실제 협업은 진행하지 않는다."
        ],
        answer: 1,
        explanation: "다양한 유관기관과 협력체계를 구축하고 명확한 역할 분담을 명시할수록 전문성이 보완되어 사업 공모 선정 확률이 높아집니다."
    },
    {
        id: 8,
        question: "생성형 AI를 이용해 프로포절을 작성할 때 프롬프트를 사용하는 가장 핵심적인 목적은 무엇인가?",
        options: [
            "AI로 하여금 아무 내용이나 자유롭게 지어내어 분량을 채우게 하기 위해",
            "AI가 복지 사업의 논리 구조, 가이드라인, 제약 조건을 반영하여 고품질의 실무 초안을 작성하도록 유도하기 위해",
            "심사위원이 읽기 싫어하는 긴 문장을 한 줄로 요약하기 위해",
            "인터넷의 모든 개인 정보를 자동으로 수집하기 위해"
        ],
        answer: 1,
        explanation: "프롬프트는 AI에게 명확한 역할(Role)과 맥락(Context), 규칙을 줌으로써 작성자가 원하는 공문서 형식의 정확하고 논리적인 사업계획 초안을 설계해 내는 핵심 조종 타 역할을 합니다."
    },
    {
        id: 9,
        question: "ChatGPT의 '딥서치(Deep Search)' 및 Genspark의 심층 검색 기능을 활용할 때의 장점으로 적절하지 않은 것은?",
        options: [
            "인터넷상에 흩어진 신뢰성 있는 최신 연구 통계 및 논문을 빠르게 탐색해 요약한다.",
            "검색 범위가 넓어 다차원적인 입증 근거를 뼈대로 삼을 수 있다.",
            "해당 아동이나 주민의 비공개 비밀 상담 일지나 개인정보를 안전하게 수집해준다.",
            "객관적인 사실(Fact) 중심의 사업 필요성 데이터를 효율적으로 빌드업한다."
        ],
        answer: 2,
        explanation: "딥서치 도구는 공개 웹 데이터를 심층적으로 수집 및 요약하지만, 법적으로 비공개된 개인정보나 사생활 기록에는 접근할 수 없으며 입력해서도 안 됩니다."
    },
    {
        id: 10,
        question: "사회복지사들이 지역 아동의 학력 격차, 돌봄 실태 등 지역 통계를 조사할 때 활용하기 적합한 공공데이터 통계 포털 사이트가 아닌 것은?",
        options: [
            "KOSIS 국가통계포털",
            "서울 열린 데이터 광장",
            "통합데이터지도",
            "블랙키위 (키워드 검색 통계)"
        ],
        answer: 3,
        explanation: "KOSIS, 지역 데이터 광장 등은 공공 영역의 인구/복지 통계를 제공하는 플랫폼이지만, 블랙키위는 포털사이트의 키워드 검색량 및 마케팅 지수를 확인하는 민간 도구입니다."
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
    // 1. Shuffle the order of questions
    activeQuestions = shuffleArray([...quizQuestions]);
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById("quiz-container");
    container.innerHTML = "";

    activeQuestions.forEach((q, idx) => {
        const qBox = document.createElement("div");
        qBox.className = "quiz-question-box bg-slate-900/50 border border-white/10 rounded-3xl p-6 md:p-8 space-y-5";
        qBox.dataset.qId = q.id;

        const qTitle = document.createElement("h4");
        qTitle.className = "text-xl font-bold text-white leading-snug";
        qTitle.innerText = `Q${idx + 1}. ${q.question}`;
        qBox.appendChild(qTitle);

        const optionsDiv = document.createElement("div");
        optionsDiv.className = "flex flex-col gap-3";

        // Map original indices so that correct checking remains valid after shuffle
        const mappedOptions = q.options.map((opt, oIdx) => ({ text: opt, originalIdx: oIdx }));
        // 2. Shuffle the order of option choices
        const shuffledOptions = shuffleArray(mappedOptions);

        shuffledOptions.forEach((optObj) => {
            const optItem = document.createElement("div");
            optItem.className = "option-item border border-white/10 bg-slate-950/40 rounded-2xl px-5 py-4 cursor-pointer text-base text-slate-300 flex items-center gap-4 transition";
            optItem.dataset.originalIdx = optObj.originalIdx;
            optItem.innerHTML = `
                <input type="radio" name="q-${q.id}" id="q-${q.id}-o-${optObj.originalIdx}" class="pointer-events-none" style="margin: 0;">
                <label style="cursor:pointer; width:100%;" class="font-medium">${optObj.text}</label>
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
