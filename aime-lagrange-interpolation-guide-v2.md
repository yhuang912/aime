# Lagrange Interpolation & Auxiliary Polynomials

---

* TOC
{:toc}

## 1. Overview & Formula

**Lagrange interpolation** is a standard technique on the AIME for reconstructing an unknown polynomial $P(x)$ of degree at most $n$ from $n+1$ known points, or for directly evaluating $P(k)$ at a single integer $k$ without finding its coefficients.

### The Formula
Given $n+1$ distinct points $(x_0, y_0), (x_1, y_1), \dots, (x_n, y_n)$, the unique polynomial $P(x)$ of degree $\le n$ passing through all of them is:

$$P(x) = \sum_{i=0}^{n} y_i \prod_{j \neq i} \frac{x - x_j}{x_i - x_j}$$

### Common Applications & Shortcuts

1. **Consecutive Integer Inputs ($x_i = 0, 1, \dots, n$)**
   AIME problems frequently give $P(0), P(1), \dots, P(n)$ and ask for $P(n+1)$. Substituting $x = n+1$ and $x_i = i$ simplifies the product into binomial coefficients:
   $$\prod_{j \neq i} \frac{(n+1) - j}{i - j} = (-1)^{n-i} \binom{n+1}{i}$$
   This gives the classic alternating binomial identity:
   $$P(n+1) = \sum_{i=0}^{n} (-1)^{n-i} \binom{n+1}{i} P(i)$$

2. **Symmetric Integer Inputs ($x_i = -n, \dots, n$)**
   When values are given at symmetric integers (e.g., $k = -n, \dots, n$), the denominators $(x_i - x_j)$ simplify cleanly into products of factorials: $(-1)^{n-i}(n+i)!(n-i)!$.

3. **Zeroing Out Terms (Auxiliary Polynomials)**
   If a problem states $P(x_i) = f(x_i)$ for $i = 0, 1, \dots, n$ where $f(x)$ is a simple polynomial or rational function, define $Q(x) = P(x) - f(x)$. Since $Q(x)$ has roots at $x_0, \dots, x_n$, you can write $Q(x) = c(x - x_0)(x - x_1)\cdots(x - x_n)$ and avoid full Lagrange expansion altogether.

4. **Extracting the Leading Coefficient**
   If you only need the leading coefficient $a_n$ of $P(x)$ (or want to prove a certain degree is impossible), take the coefficient of $x^n$ in the Lagrange formula:
   $$a_n = \sum_{i=0}^{n} \frac{y_i}{\prod_{j \neq i} (x_i - x_j)}$$

---

## 2. Proofs of Core Identities

### A. Proof of Existence & Uniqueness of Lagrange Interpolation

#### 1. Existence: Constructing the Basis Polynomials
Suppose we are given $n+1$ distinct points $(x_0, y_0), (x_1, y_1), \dots, (x_n, y_n)$. For each index $i \in \{0, 1, \dots, n\}$, define the **Lagrange basis polynomial** $L_i(x)$ as:

$$L_i(x) = \prod_{\substack{0 \le j \le n \\ j \neq i}} \frac{x - x_j}{x_i - x_j} = \frac{(x - x_0)\cdots(x - x_{i-1})(x - x_{i+1})\cdots(x - x_n)}{(x_i - x_0)\cdots(x_i - x_{i-1})(x_i - x_{i+1})\cdots(x_i - x_n)}$$

Key properties of $L_i(x)$:
1. **Degree:** The numerator is a product of $n$ linear factors $(x - x_j)$, and the denominator is a non-zero constant (since all $x_k$ are distinct). Thus, $\deg(L_i) = n$.
2. **Kronecker Delta Property at $x_k$:**
   * **Case 1 ($k \neq i$):** The factor $(x - x_k)$ appears in the numerator of $L_i(x)$. Plugging in $x = x_k$ forces the numerator to be $0$, so $L_i(x_k) = 0$.
   * **Case 2 ($k = i$):** Every factor in the numerator becomes $(x_i - x_j)$, matching the denominator identically. Thus, $L_i(x_i) = 1$.

Define $P(x)$ as the weighted sum of these basis polynomials:
$$P(x) = \sum_{i=0}^{n} y_i L_i(x)$$

* **Degree check:** Since $P(x)$ is a linear combination of polynomials of degree $n$, we have $\deg(P) \le n$.
* **Point check:** Evaluating $P(x)$ at any node $x_k$:
  $$P(x_k) = \sum_{i=0}^{n} y_i L_i(x_k) = y_k(1) + \sum_{i \neq k} y_i(0) = y_k$$

#### 2. Uniqueness: Why No Other Polynomial Works
Suppose another polynomial $Q(x)$ of degree at most $n$ also satisfies $Q(x_k) = y_k$ for all $k = 0, 1, \dots, n$. Define $D(x) = P(x) - Q(x)$:
* $\deg(D) \le n$.
* At every node $x_k$, $D(x_k) = P(x_k) - Q(x_k) = y_k - y_k = 0$.

Thus $D(x)$ has $n+1$ distinct roots: $x_0, x_1, \dots, x_n$. By the **Fundamental Theorem of Algebra**, a non-zero polynomial of degree at most $n$ can have at most $n$ roots. Therefore, $D(x) \equiv 0$, meaning $P(x) = Q(x)$. $\blacksquare$

---

### B. Proof of the Consecutive Integer Shortcut

We want to simplify:
$$\prod_{\substack{0 \le j \le n \\ j \neq i}} \frac{(n+1) - j}{i - j} = \frac{\prod_{j \neq i} (n+1-j)}{\prod_{j \neq i} (i-j)}$$

1. **Numerator:** As $j$ runs from $0$ to $n$ (skipping $i$), $(n+1-j)$ takes every integer value from $n+1$ down to $1$, except $(n+1-i)$:
   $$\prod_{\substack{0 \le j \le n \\ j \neq i}} (n+1 - j) = \frac{(n+1)!}{n+1-i}$$

2. **Denominator:** Split into $j < i$ and $j > i$:
   * **For $j < i$:** As $j$ goes from $0$ to $i-1$, $(i-j)$ runs from $i$ down to $1$, giving $i!$.
   * **For $j > i$:** Factoring $-1$ out of each of the $n - i$ negative terms gives:
     $$\prod_{j=i+1}^{n} (i - j) = (-1)^{n-i} \prod_{j=i+1}^{n} (j - i) = (-1)^{n-i} (n - i)!$$
   Multiplying both parts gives $(-1)^{n-i} \, i! \, (n - i)!$.

3. **Combine:**
   $$\frac{\frac{(n+1)!}{n+1-i}}{(-1)^{n-i} \, i! \, (n - i)!} = (-1)^{n-i} \frac{(n+1)!}{i! \, (n+1-i)(n - i)!} = (-1)^{n-i} \frac{(n+1)!}{i! \, (n+1-i)!} = (-1)^{n-i} \binom{n+1}{i}$$

---

### C. Proof of the Symmetric Integer Denominator ($x_i \in \{-n, \dots, n\}$)

For a fixed node $i \in \{-n, \dots, n\}$, the denominator $D_i$ of $L_i(x)$ is:
$$D_i = \prod_{\substack{-n \le j \le n \\ j \neq i}} (i - j) = \left( \prod_{j = -n}^{i - 1} (i - j) \right) \cdot \left( \prod_{j = i + 1}^{n} (i - j) \right)$$

1. **Left of $i$ ($j < i$):** As $j$ runs from $-n$ up to $i-1$, $(i - j)$ runs from $n + i$ down to $1$, yielding $(n + i)!$.
2. **Right of $i$ ($j > i$):** There are $n - i$ terms where $i - j < 0$. Factoring $-1$ from each term gives $(-1)^{n-i}(n - i)!$.

Combining both parts gives:
$$D_i = (-1)^{n-i}(n + i)!(n - i)!$$

Pulling $\frac{1}{(2n)!}$ out of the Lagrange sum converts the denominators into binomial coefficients:
$$P(x) = \frac{1}{(2n)!} \sum_{i=-n}^{n} (-1)^{n-i} \binom{2n}{n+i} y_i \prod_{j \neq i}(x - j)$$

---

## 3. Auxiliary Polynomials & Strategy

### How the Auxiliary Polynomial Trick Works
1. **Spot the pattern:** Find a simple function $f(x)$ (such as $x$, $x^2$, or $\frac{A(x)}{B(x)}$) matching $y_k$ at the given inputs.
2. **Define $Q(x)$:** Set $Q(x) = P(x) - f(x)$ (or clear denominators: $Q(x) = B(x)P(x) - A(x)$).
3. **Factor using roots:** Since $Q(x_k) = 0$ for each known input, write $Q(x) = c(x - x_0)(x - x_1)\cdots(x - x_n)$.
4. **Why $c$ is required:** Knowing the roots of a polynomial only determines it up to a constant multiple (its leading coefficient). Omitting $c$ assumes $Q(x)$ is monic, which generally leads to a contradiction when plugging in an extra point (like $x = 0$ when clearing denominators).

### Classic Example
> *Let $P(x)$ be a polynomial of degree $3$ such that $P(k) = \frac{1}{k}$ for $k = 1, 2, 3, 4$. Find $P(5)$.*

* **Solution:** Let $Q(x) = xP(x) - 1$. Since $\deg(P) = 3$, $\deg(Q) = 4$ with roots $1, 2, 3, 4$:
  $$xP(x) - 1 = c(x - 1)(x - 2)(x - 3)(x - 4)$$
* Plug in $x = 0$: $-1 = 24c \implies c = -\frac{1}{24}$.
* Plug in $x = 5$: $5P(5) - 1 = -\frac{1}{24}(24) = -1 \implies 5P(5) = 0 \implies P(5) = 0$.

### Decision Matrix: When to Use Which Method

| Problem Type                                                             | Best Method                                           | Why?                                                                                                                     |
| :----------------------------------------------------------------------- | :---------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| **Clean algebraic pattern** (e.g., $P(k) = \frac{1}{k}$ or $P(k) = k^2$) | **Auxiliary Polynomial**                              | Subtracting the pattern turns $n$ points into $n$ immediate roots.                                                       |
| **Arbitrary values / exponential outputs** (e.g., $P(k) = 2^k$)          | **Consecutive Integer Shortcut / Finite Differences** | The Factor Theorem only applies to polynomials; $P(x) - 2^x$ is transcendental and cannot be factored into linear terms. |
| **Inequalities or bounds** (e.g., $\vert{}P(k)\vert{} \le 1$)            | **Full Lagrange Interpolation**                       | Expressing $P(x) = \sum y_i L_i(x)$ lets you apply the triangle inequality directly.                                     |
| **Leading coefficient constraints**                                      | **Leading Coefficient Formula**                       | $a_n = \sum \frac{y_i}{\prod_{j \neq i}(x_i - x_j)}$ isolates the leading term immediately.                              |

---

## 4. Forward Differences & Difference Tables

The **forward difference operator** $\Delta$ measures step-by-step changes:
$$\Delta f(x) = f(x+1) - f(x), \qquad \Delta^k f(x) = \Delta(\Delta^{k-1} f(x)) = \sum_{j=0}^{k} (-1)^{k-j} \binom{k}{j} f(x+j)$$

* **Key Theorem:** For any polynomial $P(x)$ of degree $n$, $\Delta^n P(x) = n! \cdot a_n$ (a constant) and **$\Delta^{n+1} P(x) = 0$** (the discrete analogue of $P^{(n+1)}(x) = 0$).
* **Newton's Forward Formula:** Reconstructs $P(x)$ from the leftmost diagonal of a difference table:
  $$P(x) = \sum_{k=0}^{n} \Delta^k P(0) \binom{x}{k}$$

### Example Difference Table: $P(x) = x^3 + 2x$

| Row                 | $x=0$ | $x=1$ | $x=2$  | $x=3$  | $x=4$  | Meaning                     |
| :------------------ | :---: | :---: | :----: | :----: | :----: | :-------------------------- |
| **$P(x)$**          |   0   |   3   |   12   |   33   | **72** | Degree 3 values             |
| **$\Delta^1 P(x)$** |   3   |   9   |   21   | **39** |   —    | Degree 2                    |
| **$\Delta^2 P(x)$** |   6   |  12   | **18** |   —    |   —    | Degree 1                    |
| **$\Delta^3 P(x)$** |   6   | **6** |   —    |   —    |   —    | Constant ($3! \cdot 1 = 6$) |
| **$\Delta^4 P(x)$** | **0** |   —   |   —    |   —    |   —    | $\Delta^{n+1}P(x) = 0$      |

---

## 5. Interactive Practice Quiz (Auto-Graded)

<!-- > **Rendering Note:** Standard Markdown disables `<script>` execution for security. To use the auto-grading JavaScript quiz below, open this `.md` file in an HTML-enabled Markdown previewer (such as VS Code with scripts enabled, Typora, Obsidian with custom JS, or save the HTML block as an `.html` file in any browser). -->

<div id="aime-quiz-app" style="font-family: system-ui, -apple-system, sans-serif; max-width: 720px; margin: 20px 0; padding: 20px; border: 1px solid #d0d7de; border-radius: 10px; background: #f8fafc; color: #1e293b;">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px;">
    <h3 style="margin: 0; color: #0f172a;">AIME Interpolation &amp; Auxiliary Polynomials Quiz</h3>
    <span id="quiz-score-badge" style="background: #e2e8f0; color: #334155; font-weight: 600; padding: 4px 12px; border-radius: 999px; font-size: 0.9rem;">Score: 0 / 5</span>
  </div>

  <div id="quiz-container"></div>

  <div style="margin-top: 20px; display: flex; gap: 10px;">
    <button type="button" onclick="resetAimeQuiz()" style="background: #475569; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600;">Reset Quiz</button>
  </div>
</div>

<script>
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
</script>