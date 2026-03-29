import type { TopicMeta, MCQuestion } from '../../../src/types/curriculum';

export const meta: TopicMeta = {
  id: 4, sem: 1,
  title: 'Basic Algebra & Manipulation',
  desc: 'Algebraic expressions, like terms, expansion, factorisation'
}

export const notes: string | null = `
  <h2>Basic Algebra &amp; Manipulation</h2>
  <p class="topic-desc">Algebraic expressions, like terms, expansion and factorisation</p>

  <div class="notes-card">
    <h3>1. Algebraic Expressions</h3>
    <p>An <strong>algebraic expression</strong> is a combination of numbers, variables (letters), and operations. It has no equals sign.</p>
    <div class="example">
      3x + 5 &nbsp;&nbsp; 2a&sup2; &minus; 4b &nbsp;&nbsp; 7(m + n)<br><br>
      <strong>Term:</strong> a single number, variable, or product &rarr; e.g. 3x, &minus;4b, 7<br>
      <strong>Coefficient:</strong> the number in front of a variable &rarr; in 3x, the coefficient is <span class="highlight">3</span><br>
      <strong>Constant:</strong> a term with no variable &rarr; e.g. 5, &minus;2
    </div>
  </div>

  <div class="notes-card">
    <h3>2. Like Terms</h3>
    <p><strong>Like terms</strong> have exactly the same variable(s) and power(s). Only like terms can be added or subtracted.</p>
    <div class="example">
      <strong>Like:</strong> 3x and 5x &rarr; can combine: <span class="highlight">8x</span><br>
      <strong>Unlike:</strong> 3x and 5x&sup2; &rarr; cannot combine (different powers)<br>
      <strong>Unlike:</strong> 3x and 5y &rarr; cannot combine (different variables)<br><br>
      Simplify 5a + 3b &minus; 2a + b:<br>
      = (5a &minus; 2a) + (3b + b) = <span class="highlight">3a + 4b</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>3. Expansion (Removing Brackets)</h3>
    <p>Multiply the term outside the bracket by <strong>every term</strong> inside.</p>
    <div class="example">
      <strong>a(b + c) = ab + ac</strong><br><br>
      3(x + 4) = 3x + 12<br>
      &minus;2(y &minus; 5) = &minus;2y + 10<br>
      x(x + 3) = x&sup2; + 3x<br><br>
      <strong>Expand and simplify:</strong> 2(3a + 1) + 4(a &minus; 2)<br>
      = 6a + 2 + 4a &minus; 8 = <span class="highlight">10a &minus; 6</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>4. Factorisation (Inserting Brackets)</h3>
    <p>Factorisation is the reverse of expansion. Find the <strong>highest common factor (HCF)</strong> of all terms, then place it outside the bracket.</p>
    <div class="example">
      6x + 9 &rarr; HCF is 3 &rarr; <span class="highlight">3(2x + 3)</span><br>
      4a&sup2; &minus; 8a &rarr; HCF is 4a &rarr; <span class="highlight">4a(a &minus; 2)</span><br>
      5xy + 10y &rarr; HCF is 5y &rarr; <span class="highlight">5y(x + 2)</span><br><br>
      <strong>Check:</strong> Always expand back to verify your answer.
    </div>
  </div>

  <div class="notes-card">
    <h3>5. Substitution</h3>
    <p>Replace each variable with its given value, then evaluate using BODMAS.</p>
    <div class="example">
      If a = 3 and b = &minus;2, find 2a&sup2; &minus; 3b:<br>
      = 2(3)&sup2; &minus; 3(&minus;2)<br>
      = 2(9) + 6<br>
      = 18 + 6 = <span class="highlight">24</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>Quick Reference</h3>
    <div class="formula">Like terms: same variable &amp; same power</div>
    <div class="formula">Expansion: a(b + c) = ab + ac</div>
    <div class="formula">Factorisation: ab + ac = a(b + c)</div>
  </div>
`

export const questions: MCQuestion[] | null = [
  // ═══════════════════════════════════════════
  // LIKE TERMS (Q1–35)
  // ═══════════════════════════════════════════
  { q:"Simplify 7x + 3x.", opts:["10x","10x²","21x","4x"], ans:0, explain:"7x and 3x are like terms. 7 + 3 = 10, so the answer is 10x." },
  { q:"Simplify 9a − 4a.", opts:["5a","13a","5","36a"], ans:0, explain:"9a − 4a: subtract coefficients → 9 − 4 = 5, giving 5a." },
  { q:"Simplify 4x + 3y − x + 2y.", opts:["3x + 5y","7x + 5y","3x + y","5x + 5y"], ans:0, explain:"x terms: 4x − x = 3x. y terms: 3y + 2y = 5y. Answer: 3x + 5y." },
  { q:"Simplify 6a − 2b + a − 3b.", opts:["7a − 5b","5a − 5b","7a + b","5a + b"], ans:0, explain:"6a + a = 7a; −2b − 3b = −5b. Answer: 7a − 5b." },
  { q:"Simplify 5m + 2n − 3m + n.", opts:["2m + 3n","8m + 3n","2m + n","2m − 3n"], ans:0, explain:"5m − 3m = 2m; 2n + n = 3n. Answer: 2m + 3n." },
  { q:"Simplify 8p − 3p + p.", opts:["6p","12p","4p","11p"], ans:0, explain:"8p − 3p + p = (8 − 3 + 1)p = 6p." },
  { q:"Simplify 2a + 5b + 3a − b.", opts:["5a + 4b","5a − 4b","5a + 6b","2a + 4b"], ans:0, explain:"2a + 3a = 5a; 5b − b = 4b. Answer: 5a + 4b." },
  { q:"Simplify 10x − 4x − 2x.", opts:["4x","8x","6x","16x"], ans:0, explain:"10x − 4x − 2x = (10 − 4 − 2)x = 4x." },
  { q:"Simplify 3ab + 2ab − ab.", opts:["4ab","6ab","3ab","2ab"], ans:0, explain:"3 + 2 − 1 = 4, so 4ab." },
  { q:"Simplify 7x² + 3x − 2x² + x.", opts:["5x² + 4x","10x² + 4x","5x² + 2x","9x² + 4x"], ans:0, explain:"x² terms: 7 − 2 = 5, giving 5x². x terms: 3 + 1 = 4, giving 4x. Answer: 5x² + 4x." },
  { q:"Which of the following are like terms?", opts:["3x and 3y","5a and 5a²","4xy and 4x","6p and 2p"], ans:3, explain:"Like terms must have exactly the same variable(s) and power(s). 6p and 2p both have variable p to power 1." },
  { q:"Simplify 4x + 2 − x − 5.", opts:["3x − 3","5x − 3","3x + 7","3x − 7"], ans:0, explain:"x terms: 4x − x = 3x. Constants: 2 − 5 = −3. Answer: 3x − 3." },
  { q:"Simplify 6y − 3 + 2y + 7.", opts:["8y + 4","8y − 4","4y + 4","8y + 10"], ans:0, explain:"y terms: 6y + 2y = 8y. Constants: −3 + 7 = 4. Answer: 8y + 4." },
  { q:"Simplify 9k − 6k + 2.", opts:["3k + 2","5k + 2","3k − 2","15k + 2"], ans:0, explain:"9k − 6k = 3k. The constant 2 stays. Answer: 3k + 2." },
  { q:"Simplify 5a + 3b − 5a + b.", opts:["4b","6b","10a + 4b","0 + 4b"], ans:0, explain:"5a − 5a = 0. 3b + b = 4b. Answer: 4b." },
  { q:"Simplify 2x + 3y + 4z − x − y.", opts:["x + 2y + 4z","x + 4y + 4z","3x + 2y + 4z","x + 2y − 4z"], ans:0, explain:"x: 2x − x = x. y: 3y − y = 2y. z: 4z unchanged. Answer: x + 2y + 4z." },
  { q:"Simplify 12m − 7m.", opts:["5m","19m","5","84m"], ans:0, explain:"12m − 7m = (12 − 7)m = 5m." },
  { q:"Simplify −3x + 8x.", opts:["5x","11x","−5x","−24x"], ans:0, explain:"−3x + 8x = (−3 + 8)x = 5x." },
  { q:"Simplify 4p − 7p.", opts:["−3p","3p","−11p","11p"], ans:0, explain:"4p − 7p = (4 − 7)p = −3p." },
  { q:"Simplify 3a² + 5a².", opts:["8a²","8a⁴","15a²","8a"], ans:0, explain:"3a² + 5a² = 8a². The variable and power don't change when combining like terms." },
  { q:"Simplify 6x² − 4x².", opts:["2x²","10x²","2x","6x²"], ans:0, explain:"6x² − 4x² = (6 − 4)x² = 2x²." },
  { q:"Simplify 5xy − 2xy + xy.", opts:["4xy","7xy","3xy","8xy"], ans:0, explain:"5 − 2 + 1 = 4, so 4xy." },
  { q:"Simplify 3a + 4b + 2a − 6b + 1.", opts:["5a − 2b + 1","5a + 10b + 1","a − 2b + 1","5a − 2b − 1"], ans:0, explain:"a terms: 3a + 2a = 5a. b terms: 4b − 6b = −2b. Constant: 1. Answer: 5a − 2b + 1." },
  { q:"Simplify 7 − 3x + 2x − 1.", opts:["−x + 6","−5x + 6","x + 6","x + 8"], ans:0, explain:"x terms: −3x + 2x = −x. Constants: 7 − 1 = 6. Answer: −x + 6." },
  { q:"Simplify 2(x) + 3(x) without expanding fully — treat as like terms.", opts:["5x","6x","5x²","2x + 3x"], ans:0, explain:"2x and 3x are like terms: 2x + 3x = 5x." },
  { q:"Simplify 4ab − ab + 3ab.", opts:["6ab","8ab","7ab","3ab"], ans:0, explain:"4 − 1 + 3 = 6, so 6ab." },
  { q:"Simplify 10x − 3 − 4x + 8.", opts:["6x + 5","6x − 5","14x + 5","6x + 11"], ans:0, explain:"x terms: 10x − 4x = 6x. Constants: −3 + 8 = 5. Answer: 6x + 5." },
  { q:"Simplify 3p + 4q − 2p + q − 5.", opts:["p + 5q − 5","p + 3q − 5","5p + 5q − 5","p + 5q + 5"], ans:0, explain:"p: 3p − 2p = p. q: 4q + q = 5q. Constant: −5. Answer: p + 5q − 5." },
  { q:"Simplify 8k + 3j − 5k − 3j.", opts:["3k","3k + 6j","13k","3k − 6j"], ans:0, explain:"k terms: 8k − 5k = 3k. j terms: 3j − 3j = 0. Answer: 3k." },
  { q:"Simplify 6n − n.", opts:["5n","6","6n","−n"], ans:0, explain:"6n − n = (6 − 1)n = 5n. Remember: n = 1n." },
  { q:"Simplify a + a + a + a.", opts:["4a","a⁴","4","a + 4"], ans:0, explain:"a + a + a + a = 4 × a = 4a." },
  { q:"Simplify 5x² + 3x + 2x² − x.", opts:["7x² + 2x","8x² + 2x","7x² + 4x","7x + 2x²"], ans:0, explain:"x² terms: 5 + 2 = 7, giving 7x². x terms: 3 − 1 = 2, giving 2x. Answer: 7x² + 2x." },
  { q:"Simplify 4mn + 3m − mn + 2m.", opts:["3mn + 5m","5mn + 5m","3mn + m","7mn + 5m"], ans:0, explain:"mn terms: 4mn − mn = 3mn. m terms: 3m + 2m = 5m. Answer: 3mn + 5m." },
  { q:"Simplify −2x − 3x + 10.", opts:["−5x + 10","5x + 10","−5x − 10","−x + 10"], ans:0, explain:"−2x − 3x = −5x. Constant 10 unchanged. Answer: −5x + 10." },
  { q:"Simplify 3a − (−2a).", opts:["5a","a","−5a","a²"], ans:0, explain:"Subtracting a negative is addition: 3a − (−2a) = 3a + 2a = 5a." },

  // ═══════════════════════════════════════════
  // EXPANSION — single bracket (Q36–65)
  // ═══════════════════════════════════════════
  { q:"Expand 3(x + 4).", opts:["3x + 4","3x + 7","3x + 12","x + 12"], ans:2, explain:"3 × x = 3x; 3 × 4 = 12. Answer: 3x + 12." },
  { q:"Expand −2(y − 5).", opts:["−2y − 10","−2y + 10","2y − 10","2y + 5"], ans:1, explain:"−2 × y = −2y; −2 × −5 = +10. Answer: −2y + 10." },
  { q:"Expand 5(2a + 3).", opts:["10a + 3","10a + 8","10a + 15","7a + 15"], ans:2, explain:"5 × 2a = 10a; 5 × 3 = 15. Answer: 10a + 15." },
  { q:"Expand 4(3x − 2).", opts:["12x − 2","12x − 8","7x − 8","12x + 8"], ans:1, explain:"4 × 3x = 12x; 4 × −2 = −8. Answer: 12x − 8." },
  { q:"Expand x(x + 5).", opts:["x + 5","x² + 5","x² + 5x","2x + 5"], ans:2, explain:"x × x = x²; x × 5 = 5x. Answer: x² + 5x." },
  { q:"Expand 2x(3x − 4).", opts:["6x² − 4","6x² − 8x","5x − 8x","6x − 8"], ans:1, explain:"2x × 3x = 6x²; 2x × −4 = −8x. Answer: 6x² − 8x." },
  { q:"Expand −3(2x + 1).", opts:["−6x + 1","−6x − 1","−6x − 3","6x − 3"], ans:2, explain:"−3 × 2x = −6x; −3 × 1 = −3. Answer: −6x − 3." },
  { q:"Expand 7(a − b).", opts:["7a − b","a − 7b","7a − 7b","7a + 7b"], ans:2, explain:"7 × a = 7a; 7 × −b = −7b. Answer: 7a − 7b." },
  { q:"Expand −(3x − 4).", opts:["−3x − 4","3x − 4","−3x + 4","3x + 4"], ans:2, explain:"−1 × 3x = −3x; −1 × −4 = +4. Answer: −3x + 4." },
  { q:"Expand 6(2 − x).", opts:["12 − x","12 − 6x","2 − 6x","12 + 6x"], ans:1, explain:"6 × 2 = 12; 6 × −x = −6x. Answer: 12 − 6x." },
  { q:"Expand a(a + 1).", opts:["a + 1","a² + 1","a² + a","2a + 1"], ans:2, explain:"a × a = a²; a × 1 = a. Answer: a² + a." },
  { q:"Expand 3x(x − 2).", opts:["3x − 6","3x² − 6","3x² − 6x","3x² + 6x"], ans:2, explain:"3x × x = 3x²; 3x × −2 = −6x. Answer: 3x² − 6x." },
  { q:"Expand 2(3 + 4y).", opts:["5 + 4y","6 + 4y","6 + 8y","10y"], ans:2, explain:"2 × 3 = 6; 2 × 4y = 8y. Answer: 6 + 8y." },
  { q:"Expand 5a(a + 3).", opts:["5a + 3","5a² + 3","5a² + 15a","5a² + 15"], ans:2, explain:"5a × a = 5a²; 5a × 3 = 15a. Answer: 5a² + 15a." },
  { q:"Expand −4(x − 3).", opts:["−4x − 12","−4x + 12","4x − 12","4x + 12"], ans:1, explain:"−4 × x = −4x; −4 × −3 = +12. Answer: −4x + 12." },
  { q:"Expand 3(2p + 5q).", opts:["6p + 5q","5p + 8q","6p + 15q","6p + 15"], ans:2, explain:"3 × 2p = 6p; 3 × 5q = 15q. Answer: 6p + 15q." },
  { q:"Expand 2y(y − 4).", opts:["2y − 8","2y² − 4","2y² − 8y","2y² + 8y"], ans:2, explain:"2y × y = 2y²; 2y × −4 = −8y. Answer: 2y² − 8y." },
  { q:"Expand −5(−2x + 1).", opts:["10x − 5","−10x + 5","10x + 5","−10x − 5"], ans:0, explain:"−5 × −2x = +10x; −5 × 1 = −5. Answer: 10x − 5." },
  { q:"Expand 4(x² + 3x − 1).", opts:["4x² + 3x − 4","4x² + 12x − 1","4x² + 12x − 4","x² + 12x − 4"], ans:2, explain:"4 × x² = 4x²; 4 × 3x = 12x; 4 × −1 = −4. Answer: 4x² + 12x − 4." },
  { q:"Expand 3m(2m + n).", opts:["6m + 3mn","6m² + 3mn","6m² + mn","6m² + 3n"], ans:1, explain:"3m × 2m = 6m²; 3m × n = 3mn. Answer: 6m² + 3mn." },
  { q:"Expand 2(5 − 3k).", opts:["10 − 3k","10 − 6k","7 − 6k","10 + 6k"], ans:1, explain:"2 × 5 = 10; 2 × −3k = −6k. Answer: 10 − 6k." },
  { q:"Expand x(2x − y).", opts:["2x − xy","2x² − xy","2x² − y","x² − xy"], ans:1, explain:"x × 2x = 2x²; x × −y = −xy. Answer: 2x² − xy." },
  { q:"Expand −2a(3a − 5).", opts:["−6a² − 10a","−6a² + 10a","6a² − 10a","6a² + 10a"], ans:1, explain:"−2a × 3a = −6a²; −2a × −5 = +10a. Answer: −6a² + 10a." },
  { q:"Expand 9(x + y − 2).", opts:["9x + 9y − 2","9x + y − 18","9x + 9y − 18","x + 9y − 18"], ans:2, explain:"9 × x = 9x; 9 × y = 9y; 9 × −2 = −18. Answer: 9x + 9y − 18." },
  { q:"Expand 3b(b + 4).", opts:["3b + 4","3b² + 4","3b² + 12b","3b² + 12"], ans:2, explain:"3b × b = 3b²; 3b × 4 = 12b. Answer: 3b² + 12b." },
  { q:"Expand −(5a + 3b).", opts:["5a + 3b","−5a − 3b","−5a + 3b","5a − 3b"], ans:1, explain:"Multiply each term by −1: −1 × 5a = −5a; −1 × 3b = −3b. Answer: −5a − 3b." },
  { q:"Expand 4k(k − 1).", opts:["4k − 4","4k² − 1","4k² − 4k","4k² + 4k"], ans:2, explain:"4k × k = 4k²; 4k × −1 = −4k. Answer: 4k² − 4k." },
  { q:"Expand 6(4a − 3b + 2).", opts:["24a − 3b + 2","24a − 18b + 12","24a − 18b + 2","10a − 3b + 8"], ans:1, explain:"6 × 4a = 24a; 6 × −3b = −18b; 6 × 2 = 12. Answer: 24a − 18b + 12." },
  { q:"Expand 2n(3 − n).", opts:["6n − n²","6n − 2n²","6 − 2n²","6n − 2n"], ans:1, explain:"2n × 3 = 6n; 2n × −n = −2n². Answer: 6n − 2n²." },
  { q:"Expand −3x(x + 4).", opts:["−3x² + 12","−3x² − 12x","3x² − 12x","−3x² + 12x"], ans:1, explain:"−3x × x = −3x²; −3x × 4 = −12x. Answer: −3x² − 12x." },
  { q:"Expand 5(3 − 2x + x²).", opts:["15 − 10x + 5x²","15 − 2x + x²","15 − 10x + x²","5 − 10x + 5x²"], ans:0, explain:"5 × 3 = 15; 5 × −2x = −10x; 5 × x² = 5x². Answer: 15 − 10x + 5x²." },

  // ═══════════════════════════════════════════
  // EXPAND AND SIMPLIFY (Q66–95)
  // ═══════════════════════════════════════════
  { q:"Expand and simplify 2(3a + 1) + 4(a − 2).", opts:["10a − 6","10a + 6","10a − 2","14a − 6"], ans:0, explain:"2(3a+1) = 6a+2; 4(a−2) = 4a−8. Combine: 10a − 6." },
  { q:"Expand and simplify 3(x + 2) + 2(x + 5).", opts:["5x + 16","5x + 7","6x + 16","5x + 14"], ans:0, explain:"3(x+2) = 3x+6; 2(x+5) = 2x+10. Combine: 5x + 16." },
  { q:"Expand and simplify 4(2x − 1) − 3(x + 2).", opts:["5x − 10","5x − 2","5x + 10","8x − 10"], ans:0, explain:"4(2x−1) = 8x−4; 3(x+2) = 3x+6. 8x−4 − (3x+6) = 5x − 10." },
  { q:"Expand and simplify 2(a + 3) + 3(a − 1).", opts:["5a + 3","5a + 6","5a − 3","2a + 3"], ans:0, explain:"2(a+3) = 2a+6; 3(a−1) = 3a−3. Combine: 5a + 3." },
  { q:"Expand and simplify 5(x − 2) − 2(x − 4).", opts:["3x − 2","3x − 18","7x − 2","3x + 2"], ans:0, explain:"5(x−2) = 5x−10; 2(x−4) = 2x−8. 5x−10 − 2x+8 = 3x − 2." },
  { q:"Expand and simplify 3(2b + 4) − 4(b − 1).", opts:["2b + 16","2b + 12","2b + 8","6b + 16"], ans:0, explain:"3(2b+4) = 6b+12; 4(b−1) = 4b−4. 6b+12 − 4b+4 = 2b + 16." },
  { q:"Expand and simplify 2(3x + 1) − (x + 5).", opts:["5x − 3","5x + 3","7x − 3","7x + 3"], ans:0, explain:"2(3x+1) = 6x+2; −(x+5) = −x−5. 6x+2 − x−5 = 5x − 3." },
  { q:"Expand and simplify 4(p + q) + 2(p − q).", opts:["6p + 2q","6p − 2q","6p + 6q","2p + 6q"], ans:0, explain:"4(p+q) = 4p+4q; 2(p−q) = 2p−2q. Combine: 6p + 2q." },
  { q:"Expand and simplify 3(2x − y) − 2(x − 3y).", opts:["4x + 3y","4x − 7y","8x + 3y","4x + 7y"], ans:0, explain:"3(2x−y) = 6x−3y; −2(x−3y) = −2x+6y. Add: 6x−3y − 2x+6y = 4x + 3y." },
  { q:"Expand and simplify 5(a − 3) + 3(a + 5).", opts:["8a","8a + 15","8a − 15","8a + 30"], ans:0, explain:"5(a−3) = 5a−15; 3(a+5) = 3a+15. Combine: 8a + 0 = 8a." },
  { q:"Expand and simplify 2(x + y) − 3(x − y).", opts:["−x + 5y","−x − 5y","5x + y","x + 5y"], ans:0, explain:"2(x+y) = 2x+2y; −3(x−y) = −3x+3y. Combine: −x + 5y." },
  { q:"Expand and simplify 4(3x + 2) + 2(x − 6).", opts:["14x − 4","14x + 4","12x − 4","14x + 20"], ans:0, explain:"4(3x+2) = 12x+8; 2(x−6) = 2x−12. Combine: 14x − 4." },
  { q:"Expand and simplify 3(k − 4) − 2(k − 6).", opts:["k","k − 24","k + 24","5k + 24"], ans:0, explain:"3(k−4) = 3k−12; −2(k−6) = −2k+12. Combine: k + 0 = k." },
  { q:"Expand and simplify 2(5m + 3) − 4(2m − 1).", opts:["2m + 10","2m − 10","2m + 2","10m + 10"], ans:0, explain:"2(5m+3) = 10m+6; 4(2m−1) = 8m−4. 10m+6 − 8m+4 = 2m + 10." },
  { q:"Expand and simplify 3(2x + 1) + 2(4x − 3).", opts:["14x − 3","14x + 3","14x − 9","10x + 3"], ans:0, explain:"3(2x+1) = 6x+3; 2(4x−3) = 8x−6. Combine: 14x − 3." },
  { q:"Expand and simplify −2(3a − 4) + 5(a + 2).", opts:["−a + 18","−a − 18","−a + 2","a + 18"], ans:0, explain:"−2(3a−4) = −6a+8; 5(a+2) = 5a+10. Combine: −a + 18." },
  { q:"Expand and simplify 6(x + 1) − 3(2x + 1).", opts:["3","0 + 3","−6x + 3","6x + 3"], ans:0, explain:"6(x+1) = 6x+6; 3(2x+1) = 6x+3. 6x+6 − 6x−3 = 3." },
  { q:"Expand and simplify 4(2a + 3b) − 2(a + b).", opts:["6a + 10b","6a − 10b","8a + 10b","6a + 12b"], ans:0, explain:"4(2a+3b) = 8a+12b; 2(a+b) = 2a+2b. 8a+12b − 2a−2b = 6a + 10b." },
  { q:"Expand and simplify 3(x − 2y) + 2(3x + y).", opts:["9x − 4y","9x + 4y","9x − 8y","3x − 4y"], ans:0, explain:"3(x−2y) = 3x−6y; 2(3x+y) = 6x+2y. Combine: 9x − 4y." },
  { q:"Expand and simplify 5(2x − 1) − 3(3x + 2).", opts:["x − 11","x + 11","x − 1","11x − 11"], ans:0, explain:"5(2x−1) = 10x−5; 3(3x+2) = 9x+6. 10x−5 − 9x−6 = x − 11." },
  { q:"Expand and simplify 2(4p − 3) + 3(p + 2).", opts:["11p","11p + 5","11p − 5","11p + 1"], ans:0, explain:"2(4p−3) = 8p−6; 3(p+2) = 3p+6. Combine: 11p + 0 = 11p." },
  { q:"Expand and simplify 4(3x − 2) − 2(5x − 1).", opts:["2x − 6","2x + 6","2x − 10","12x − 6"], ans:0, explain:"4(3x−2) = 12x−8; 2(5x−1) = 10x−2. 12x−8 − 10x+2 = 2x − 6." },
  { q:"Expand and simplify 3(a + b) + 4(a − b).", opts:["7a − b","7a + b","7a − 7b","a − b"], ans:0, explain:"3(a+b) = 3a+3b; 4(a−b) = 4a−4b. Combine: 7a − b." },
  { q:"Expand and simplify 2(3n + 4) + 3(n − 2).", opts:["9n + 2","9n − 2","9n + 8","6n + 2"], ans:0, explain:"2(3n+4) = 6n+8; 3(n−2) = 3n−6. Combine: 9n + 2." },
  { q:"Expand and simplify 5(2x + 3) − 2(4x − 1).", opts:["2x + 17","2x − 17","18x + 17","2x + 13"], ans:0, explain:"5(2x+3) = 10x+15; 2(4x−1) = 8x−2. 10x+15 − 8x+2 = 2x + 17." },
  { q:"Expand and simplify 3(x + 4) − (x − 2).", opts:["2x + 14","2x + 10","2x + 2","4x + 14"], ans:0, explain:"3(x+4) = 3x+12; −(x−2) = −x+2. Combine: 2x + 14." },
  { q:"Expand and simplify 2x(x + 3) + x(x − 1).", opts:["3x² + 5x","3x² + 7x","2x² + 5x","3x² − 5x"], ans:0, explain:"2x(x+3) = 2x²+6x; x(x−1) = x²−x. Combine: 3x² + 5x." },
  { q:"Expand and simplify a(2a + 1) + 3(a − 4).", opts:["2a² + 4a − 12","2a² + a − 12","2a² + 4a + 12","2a + 4a − 12"], ans:0, explain:"a(2a+1) = 2a²+a; 3(a−4) = 3a−12. Combine: 2a² + 4a − 12." },
  { q:"Expand and simplify 3(2m − 1) − 2(m + 3).", opts:["4m − 9","4m + 9","4m − 3","8m − 9"], ans:0, explain:"3(2m−1) = 6m−3; 2(m+3) = 2m+6. 6m−3 − 2m−6 = 4m − 9." },
  { q:"Expand and simplify 4(x − 2) + 3(2 − x).", opts:["x − 2","x + 2","7x − 2","x − 14"], ans:0, explain:"4(x−2) = 4x−8; 3(2−x) = 6−3x. 4x−8 + 6−3x = x − 2." },
  { q:"Expand and simplify 2(3x − 4) − 3(x − 2) + x.", opts:["4x − 2","4x + 2","10x − 2","4x − 10"], ans:0, explain:"6x−8 − 3x+6 + x = 4x − 2." },

  // ═══════════════════════════════════════════
  // FACTORISATION (Q96–125)
  // ═══════════════════════════════════════════
  { q:"Factorise 6x + 9.", opts:["3(2x + 3)","6(x + 3)","3(2x + 9)","9(x + 1)"], ans:0, explain:"HCF of 6 and 9 is 3. 6x ÷ 3 = 2x; 9 ÷ 3 = 3. Answer: 3(2x + 3)." },
  { q:"Factorise 4a² − 8a.", opts:["4(a² − 8)","4a(a − 2)","2a(2a − 4)","4a(a² − 2)"], ans:1, explain:"HCF is 4a. 4a² ÷ 4a = a; −8a ÷ 4a = −2. Answer: 4a(a − 2)." },
  { q:"Factorise 5xy + 10y.", opts:["5y(x + 2)","5x(y + 2)","10y(x + 1)","5(xy + 2y)"], ans:0, explain:"HCF is 5y. 5xy ÷ 5y = x; 10y ÷ 5y = 2. Answer: 5y(x + 2)." },
  { q:"Factorise 12m + 8.", opts:["4(3m + 2)","4(3m + 8)","2(6m + 4)","8(m + 1)"], ans:0, explain:"HCF of 12 and 8 is 4. 12m ÷ 4 = 3m; 8 ÷ 4 = 2. Answer: 4(3m + 2)." },
  { q:"Factorise 15x − 10.", opts:["5(3x − 2)","5(3x − 10)","10(x − 1)","15(x − 1)"], ans:0, explain:"HCF of 15 and 10 is 5. 15x ÷ 5 = 3x; 10 ÷ 5 = 2. Answer: 5(3x − 2)." },
  { q:"Factorise 7a + 7b.", opts:["7(a − b)","7(a + b)","a(7 + b)","14(a + b)"], ans:1, explain:"HCF is 7. 7a ÷ 7 = a; 7b ÷ 7 = b. Answer: 7(a + b)." },
  { q:"Factorise 9x² − 6x.", opts:["3x(3x − 6)","3x(3x − 2)","x(9x − 6)","6x(x − 1)"], ans:1, explain:"HCF is 3x. 9x² ÷ 3x = 3x; −6x ÷ 3x = −2. Answer: 3x(3x − 2)." },
  { q:"Factorise 8p + 12q.", opts:["4(2p + 3q)","4(2p + 12q)","2(4p + 6q)","8(p + q)"], ans:0, explain:"HCF of 8 and 12 is 4. 8p ÷ 4 = 2p; 12q ÷ 4 = 3q. Answer: 4(2p + 3q)." },
  { q:"Factorise 3x² + 6x.", opts:["3x(x + 6)","3x(x + 2)","3(x² + 2x)","6x(x + 1)"], ans:1, explain:"HCF is 3x. 3x² ÷ 3x = x; 6x ÷ 3x = 2. Answer: 3x(x + 2)." },
  { q:"Factorise 20ab − 15a.", opts:["5a(4b − 3)","5(4ab − 3a)","a(20b − 15)","5a(4b − 15)"], ans:0, explain:"HCF is 5a. 20ab ÷ 5a = 4b; −15a ÷ 5a = −3. Answer: 5a(4b − 3)." },
  { q:"Factorise 2x + 4.", opts:["2(x + 4)","2(x + 2)","4(x + 1)","x(2 + 4)"], ans:1, explain:"HCF is 2. 2x ÷ 2 = x; 4 ÷ 2 = 2. Answer: 2(x + 2)." },
  { q:"Factorise 14y − 21.", opts:["7(2y − 3)","7(2y − 21)","14(y − 1)","3(y − 7)"], ans:0, explain:"HCF of 14 and 21 is 7. 14y ÷ 7 = 2y; 21 ÷ 7 = 3. Answer: 7(2y − 3)." },
  { q:"Factorise 10a² + 5a.", opts:["5a(2a + 1)","5a(2a + 5)","5(2a + a)","10a(a + 1)"], ans:0, explain:"HCF is 5a. 10a² ÷ 5a = 2a; 5a ÷ 5a = 1. Answer: 5a(2a + 1)." },
  { q:"Factorise 6m − 18n.", opts:["6(m − 3n)","6(m − 18n)","3(2m − 6n)","18(m − n)"], ans:0, explain:"HCF of 6 and 18 is 6. 6m ÷ 6 = m; 18n ÷ 6 = 3n. Answer: 6(m − 3n)." },
  { q:"Factorise 4x² + 8xy.", opts:["4x(x + 2y)","4x(x + 8y)","4(x² + 2y)","8x(x + y)"], ans:0, explain:"HCF is 4x. 4x² ÷ 4x = x; 8xy ÷ 4x = 2y. Answer: 4x(x + 2y)." },
  { q:"Factorise 3a + 6b − 9c.", opts:["3(a + 2b − 3c)","3(a + 6b − 9c)","9(a + 2b − c)","3(a + 2b − 9c)"], ans:0, explain:"HCF is 3. 3a ÷ 3 = a; 6b ÷ 3 = 2b; 9c ÷ 3 = 3c. Answer: 3(a + 2b − 3c)." },
  { q:"Factorise 16x − 24.", opts:["8(2x − 3)","4(4x − 6)","8(2x − 24)","16(x − 1)"], ans:0, explain:"HCF of 16 and 24 is 8. 16x ÷ 8 = 2x; 24 ÷ 8 = 3. Answer: 8(2x − 3)." },
  { q:"Factorise 5ab + 15b.", opts:["5b(a + 3)","5b(a + 15)","5(ab + 3b)","b(5a + 15)"], ans:0, explain:"HCF is 5b. 5ab ÷ 5b = a; 15b ÷ 5b = 3. Answer: 5b(a + 3)." },
  { q:"Factorise 6x²y + 9xy.", opts:["3xy(2x + 3)","3xy(2x + 9)","3x(2xy + 3y)","9xy(x + 1)"], ans:0, explain:"HCF is 3xy. 6x²y ÷ 3xy = 2x; 9xy ÷ 3xy = 3. Answer: 3xy(2x + 3)." },
  { q:"Factorise 25a − 15.", opts:["5(5a − 3)","5(5a − 15)","25(a − 1)","15(a − 1)"], ans:0, explain:"HCF of 25 and 15 is 5. 25a ÷ 5 = 5a; 15 ÷ 5 = 3. Answer: 5(5a − 3)." },
  { q:"Factorise 8m²n − 12mn².", opts:["4mn(2m − 3n)","4mn(2m − 12n)","4m(2mn − 3n²)","mn(8m − 12n)"], ans:0, explain:"HCF is 4mn. 8m²n ÷ 4mn = 2m; 12mn² ÷ 4mn = 3n. Answer: 4mn(2m − 3n)." },
  { q:"Factorise 2x + 10.", opts:["2(x + 5)","2(x + 10)","10(x + 1)","2x(1 + 5)"], ans:0, explain:"HCF is 2. 2x ÷ 2 = x; 10 ÷ 2 = 5. Answer: 2(x + 5)." },
  { q:"Factorise 18p + 24q.", opts:["6(3p + 4q)","6(3p + 24q)","3(6p + 8q)","18(p + q)"], ans:0, explain:"HCF of 18 and 24 is 6. 18p ÷ 6 = 3p; 24q ÷ 6 = 4q. Answer: 6(3p + 4q)." },
  { q:"Factorise 7x² − 14x.", opts:["7x(x − 2)","7x(x − 14)","7(x² − 2x)","14x(x − 1)"], ans:0, explain:"HCF is 7x. 7x² ÷ 7x = x; 14x ÷ 7x = 2. Answer: 7x(x − 2)." },
  { q:"Factorise 4a + 4b + 4c.", opts:["4(a + b + c)","4(a + b + 4c)","a(4 + b + c)","4a(1 + b + c)"], ans:0, explain:"HCF is 4. Divide each term: a + b + c. Answer: 4(a + b + c)." },
  { q:"Factorise 10xy − 5x.", opts:["5x(2y − 1)","5x(2y − 5)","5(2xy − x)","x(10y − 5)"], ans:0, explain:"HCF is 5x. 10xy ÷ 5x = 2y; 5x ÷ 5x = 1. Answer: 5x(2y − 1)." },
  { q:"Factorise 3n² + 9n.", opts:["3n(n + 3)","3n(n + 9)","n(3n + 9)","9n(n + 1)"], ans:0, explain:"HCF is 3n. 3n² ÷ 3n = n; 9n ÷ 3n = 3. Answer: 3n(n + 3)." },
  { q:"Factorise 15ab − 20a.", opts:["5a(3b − 4)","5a(3b − 20)","a(15b − 20)","5(3ab − 4a)"], ans:0, explain:"HCF is 5a. 15ab ÷ 5a = 3b; 20a ÷ 5a = 4. Answer: 5a(3b − 4)." },
  { q:"Factorise 12x + 18y − 6.", opts:["6(2x + 3y − 1)","6(2x + 3y − 6)","3(4x + 6y − 2)","6(2x + 18y − 1)"], ans:0, explain:"HCF is 6. 12x ÷ 6 = 2x; 18y ÷ 6 = 3y; 6 ÷ 6 = 1. Answer: 6(2x + 3y − 1)." },
  { q:"Factorise 4p² + 6pq.", opts:["2p(2p + 3q)","2p(2p + 6q)","p(4p + 6q)","4p(p + q)"], ans:0, explain:"HCF is 2p. 4p² ÷ 2p = 2p; 6pq ÷ 2p = 3q. Answer: 2p(2p + 3q)." },
  { q:"Which is the fully factorised form of 6x + 12?", opts:["2(3x + 6)","3(2x + 4)","6(x + 2)","x(6 + 12)"], ans:2, explain:"HCF of 6 and 12 is 6. 6x ÷ 6 = x; 12 ÷ 6 = 2. Fully factorised: 6(x + 2). Options A and B are partially factorised." },

  // ═══════════════════════════════════════════
  // SUBSTITUTION (Q126–150)
  // ═══════════════════════════════════════════
  { q:"If x = 4, find 3x − 5.", opts:["7","17","12","2"], ans:0, explain:"3(4) − 5 = 12 − 5 = 7." },
  { q:"If a = 3 and b = −2, find 2a² − 3b.", opts:["24","12","18","0"], ans:0, explain:"2(3)² − 3(−2) = 2(9) + 6 = 18 + 6 = 24." },
  { q:"If x = 2, find 5x + 3.", opts:["13","11","10","16"], ans:0, explain:"5(2) + 3 = 10 + 3 = 13." },
  { q:"If y = −3, find 4y + 7.", opts:["−5","19","−19","5"], ans:0, explain:"4(−3) + 7 = −12 + 7 = −5." },
  { q:"If p = 5 and q = 2, find 3p − 4q.", opts:["7","23","−7","22"], ans:0, explain:"3(5) − 4(2) = 15 − 8 = 7." },
  { q:"If a = 0, find 6a² + 3a − 9.", opts:["−9","9","0","3"], ans:0, explain:"6(0)² + 3(0) − 9 = 0 + 0 − 9 = −9." },
  { q:"If x = 3, find x².", opts:["9","6","3","27"], ans:0, explain:"x² = 3² = 9." },
  { q:"If m = 2 and n = 5, find mn + m.", opts:["12","10","14","7"], ans:0, explain:"mn + m = 2(5) + 2 = 10 + 2 = 12." },
  { q:"If x = −1, find x³.", opts:["−1","1","−3","3"], ans:0, explain:"(−1)³ = −1 × −1 × −1 = −1." },
  { q:"If a = 4, find 3(a − 2).", opts:["6","4","10","14"], ans:0, explain:"3(4 − 2) = 3(2) = 6." },
  { q:"If x = 5 and y = −2, find x + y.", opts:["3","7","−3","10"], ans:0, explain:"5 + (−2) = 5 − 2 = 3." },
  { q:"If k = 3, find 2k² − k.", opts:["15","21","9","6"], ans:0, explain:"2(3)² − 3 = 2(9) − 3 = 18 − 3 = 15." },
  { q:"If a = −2 and b = 3, find a² + b.", opts:["7","1","−1","11"], ans:0, explain:"(−2)² + 3 = 4 + 3 = 7." },
  { q:"If x = ½, find 4x + 6.", opts:["8","6","4","10"], ans:0, explain:"4(½) + 6 = 2 + 6 = 8." },
  { q:"If m = 10, find m/5 − 1.", opts:["1","3","−1","21"], ans:0, explain:"10 ÷ 5 − 1 = 2 − 1 = 1." },
  { q:"If p = 2 and q = −1, find p² − q².", opts:["3","5","−3","1"], ans:0, explain:"p² − q² = 4 − 1 = 3." },
  { q:"If x = 6, find 2(x − 3).", opts:["6","14","3","12"], ans:0, explain:"2(6 − 3) = 2(3) = 6." },
  { q:"If a = 2 and b = 4, find a(b + 1).", opts:["10","12","6","14"], ans:0, explain:"a(b + 1) = 2(4 + 1) = 2(5) = 10." },
  { q:"If y = −4, find y² − 2y.", opts:["24","8","−8","16"], ans:0, explain:"(−4)² − 2(−4) = 16 + 8 = 24." },
  { q:"If x = 3 and y = 2, find 2xy − y².", opts:["8","16","10","2"], ans:0, explain:"2(3)(2) − (2)² = 12 − 4 = 8." },
  { q:"If a = 5, find (a − 3)².", opts:["4","2","10","22"], ans:0, explain:"(5 − 3)² = (2)² = 4." },
  { q:"If x = −2, find 3 − x.", opts:["5","1","−5","−1"], ans:0, explain:"3 − (−2) = 3 + 2 = 5." },
  { q:"If p = 4 and q = 3, find 2p + 3q.", opts:["17","14","19","8"], ans:0, explain:"2(4) + 3(3) = 8 + 9 = 17." },
  { q:"If m = −3 and n = 2, find m² − n².", opts:["5","13","1","−5"], ans:0, explain:"m² − n² = (−3)² − 2² = 9 − 4 = 5." },
  { q:"If x = 2, find x³ + 2x.", opts:["12","10","14","16"], ans:0, explain:"2³ + 2(2) = 8 + 4 = 12." },
]
