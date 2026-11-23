
(function () {
    const quizData = [
        {
            topic: "Auxiliary Polynomials & Rational Values",
            question: "Let P(x) be a polynomial of degree 4 such that P(k) = k / (k + 1) for k = 0, 1, 2, 3, 4. Find P(5).",
            hint: "Define Q(x) = (x + 1)P(x) - x. Find its degree and roots, then evaluate at x = -1 to solve for c.",
            options: [
                { text: "1/2", correct: false, reason: "Incorrect. This underestimates the result. Check the construction of Q(x) = (x + 1)P(x) - x." },
                { text: "3/5", correct: false, reason: "Incorrect. Make sure you account for the leading coefficient c when evaluating Q(x) at x = -1." },
                { text: "2/3", correct: true, reason: "Correct! Let Q(x) = (x + 1)P(x) - x = c·x(x - 1)(x - 2)(x - 3)(x - 4). Setting x = -1 gives 1 = -120c ⇒ c = -1/120. At x = 5, 6P(5) - 5 = (-1/120)(120) = -1 ⇒ P(5) = 4/6 = 2/3." },
                { text: "5/6", correct: false, reason: "Incorrect. Check the sign of c when plugging x = -1 into x(x - 1)(x - 2)(x - 3)(x - 4)." }
            ]
        },
        {
            topic: "Quadratic Perturbations",
            question: "A polynomial P(x) of degree 3 satisfies P(1) = 2, P(2) = 5, P(3) = 10, and P(4) = 29. Find P(5).",
            hint: "Compare P(1), P(2), P(3) with x² + 1, then define Q(x) = P(x) - (x² + 1).",
            options: [
                { text: "68", correct: false, reason: "Incorrect. Check your calculation of the cubic term c(x - 1)(x - 2)(x - 3) at x = 5." },
                { text: "50", correct: false, reason: "Incorrect. This overlooks the perturbation from x² + 1 at x = 5." },
                { text: "74", correct: true, reason: "Correct! Q(x) = P(x) - (x² + 1) has roots 1, 2, 3, so Q(x) = c(x - 1)(x - 2)(x - 3). Since Q(4) = 29 - 17 = 12, we get 6c = 12 ⇒ c = 2. Thus P(5) = 2(4)(3)(2) + 26 = 48 + 26 = 74." },
                { text: "82", correct: false, reason: "Incorrect. Double-check Q(4) = P(4) - (4² + 1) = 29 - 17 = 12." }
            ]
        },
        {
            topic: "Higher-Degree Perturbations",
            question: "Let P(x) be a polynomial of degree 4 such that P(1) = 1, P(2) = 4, P(3) = 9, P(4) = 16, and P(5) = 49. Find P(6).",
            hint: "P(k) = k² holds for k = 1, 2, 3, 4. Set Q(x) = P(x) - x² and use P(5) = 49 to find c.",
            options: [
                { text: "144", correct: false, reason: "Incorrect. This assumes P(x) = x² continues, ignoring P(5) = 49." },
                { text: "156", correct: true, reason: "Correct! Q(x) = P(x) - x² = c(x - 1)(x - 2)(x - 3)(x - 4). Using Q(5) = 49 - 25 = 24 gives 24c = 24 ⇒ c = 1. Thus P(6) = (5)(4)(3)(2) + 36 = 120 + 36 = 156." },
                { text: "121", correct: false, reason: "Incorrect. This is 11², which does not account for Q(6)." },
                { text: "169", correct: false, reason: "Incorrect. This is 13², overestimating P(6)." }
            ]
        },
        {
            topic: "Monic Polynomials & Root Construction",
            question: "Let P(x) be a monic polynomial of degree 4 such that P(-2) = -2, P(-1) = -1, P(1) = 1, and P(2) = 2. Find P(0).",
            hint: "Define Q(x) = P(x) - x. Since P(x) is monic of degree 4, so is Q(x).",
            options: [
                { text: "0", correct: false, reason: "Incorrect. Remember to add x back after evaluating Q(0)." },
                { text: "-2", correct: false, reason: "Incorrect. Recheck the constant term in (x + 2)(x + 1)(x - 1)(x - 2)." },
                { text: "4", correct: true, reason: "Correct! Q(x) = P(x) - x is monic of degree 4 with roots -2, -1, 1, 2, so Q(x) = (x² - 4)(x² - 1). Thus P(0) = Q(0) + 0 = (-4)(-1) = 4." },
                { text: "2", correct: false, reason: "Incorrect. Check the product of the four roots (-2)(-1)(1)(2)." }
            ]
        },
        {
            topic: "Finite Differences & Exponential Interpolation",
            question: "Let P(x) be a polynomial of degree 5 such that P(k) = 2^k for k = 0, 1, 2, 3, 4, 5. Find P(6).",
            hint: "For a degree 5 polynomial, the 6th forward difference vanishes: Δ⁶P(0) = 0.",
            options: [
                { text: "64", correct: false, reason: "Incorrect. 64 is 2⁶, which assumes P(x) = 2^x rather than a degree 5 polynomial." },
                { text: "32", correct: false, reason: "Incorrect. 32 is P(5), not P(6)." },
                { text: "63", correct: true, reason: "Correct! Δ⁶P(0) = ∑ (-1)^(6-j) C(6, j) P(j) = 0 ⇒ P(6) = 6(32) - 15(16) + 20(8) - 15(4) + 6(2) - 1 = 63 (or 2⁶ - 1)." },
                { text: "127", correct: false, reason: "Incorrect. Check the alternating binomial sum for Δ⁶P(0) = 0." }
            ]
        }
    ];

    const userAnswers = new Array(quizData.length).fill(null);

    function updateScore() {
        const score = userAnswers.reduce((acc, ans, idx) => {
            return acc + (ans !== null && quizData[idx].options[ans].correct ? 1 : 0);
        }, 0);
        document.getElementById("quiz-score-badge").textContent = `Score: ${score} / ${quizData.length}`;
    }

    window.selectAimeOption = function (qIdx, oIdx) {
        userAnswers[qIdx] = oIdx;
        renderAimeQuiz();
        updateScore();
    };

    window.toggleAimeHint = function (qIdx) {
        const el = document.getElementById(`hint-box-${qIdx}`);
        el.style.display = el.style.display === "none" ? "block" : "none";
    };

    window.resetAimeQuiz = function () {
        userAnswers.fill(null);
        renderAimeQuiz();
        updateScore();
    };

    function renderAimeQuiz() {
        const container = document.getElementById("quiz-container");
        container.innerHTML = quizData.map((item, qIdx) => {
            const selected = userAnswers[qIdx];
            const optionsHtml = item.options.map((opt, oIdx) => {
                let bg = "#ffffff";
                let border = "#cbd5e1";
                let badge = "";
                if (selected === oIdx) {
                    bg = opt.correct ? "#dcfce7" : "#fee2e2";
                    border = opt.correct ? "#16a34a" : "#dc2626";
                    badge = opt.correct ? " ✓" : " ✗";
                }
                return `
          <button type="button" onclick="selectAimeOption(${qIdx}, ${oIdx})"
            style="display: block; width: 100%; text-align: left; padding: 10px 14px; margin: 6px 0; border-radius: 6px; border: 1.5px solid ${border}; background: ${bg}; cursor: pointer; font-size: 0.95rem; color: #0f172a;">
            <strong>${String.fromCharCode(65 + oIdx)}.</strong> ${opt.text}${badge}
          </button>
        `;
            }).join("");

            let feedbackHtml = "";
            if (selected !== null) {
                const chosenOpt = item.options[selected];
                const fbColor = chosenOpt.correct ? "#15803d" : "#b91c1c";
                const fbBg = chosenOpt.correct ? "#f0fdf4" : "#fef2f2";
                feedbackHtml = `
          <div style="margin-top: 10px; padding: 10px 12px; border-left: 4px solid ${fbColor}; background: ${fbBg}; color: #1e293b; border-radius: 4px; font-size: 0.9rem;">
            ${chosenOpt.reason}
          </div>
        `;
            }

            return `
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #2563eb;">Question ${qIdx + 1} • ${item.topic}</span>
            <button type="button" onclick="toggleAimeHint(${qIdx})" style="background: none; border: 1px solid #94a3b8; border-radius: 4px; padding: 2px 8px; font-size: 0.8rem; cursor: pointer; color: #475569;">💡 Hint</button>
          </div>
          <p style="margin: 0 0 12px 0; font-weight: 500; font-size: 1rem;">${item.question}</p>
          <div id="hint-box-${qIdx}" style="display: none; margin-bottom: 10px; padding: 8px 12px; background: #fefce8; border-left: 3px solid #eab308; font-size: 0.88rem; color: #713f12;">
            <strong>Hint:</strong> ${item.hint}
          </div>
          <div>${optionsHtml}</div>
          ${feedbackHtml}
        </div>
      `;
        }).join("");
    }

    renderAimeQuiz();
})();