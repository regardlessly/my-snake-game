import type { TopicMeta, MCQuestion } from '../../../src/types/curriculum';

export const meta: TopicMeta = {
  id: 2, sem: 1,
  title: 'Integers, Rational & Real Numbers',
  desc: 'Negative numbers, operations with integers, real number system'
}

export const notes: string | null = `
  <h2>Integers, Rational &amp; Real Numbers</h2>
  <p class="topic-desc">Negative numbers, operations with integers, rational and real numbers</p>

  <div class="notes-card">
    <h3>1. The Number System</h3>
    <p>Numbers are classified into sets that nest inside each other:</p>
    <div class="example">
      <strong>Natural numbers (ℕ):</strong> 1, 2, 3, 4, … (counting numbers)<br>
      <strong>Whole numbers:</strong> 0, 1, 2, 3, … (includes zero)<br>
      <strong>Integers (ℤ):</strong> …, −3, −2, −1, 0, 1, 2, 3, … (positive &amp; negative whole numbers)<br>
      <strong>Rational numbers (ℚ):</strong> any number that can be written as p/q where p, q are integers, q ≠ 0<br>
      &nbsp;&nbsp;e.g. ¾, −2, 0.5, 0.3̄<br>
      <strong>Irrational numbers:</strong> cannot be expressed as p/q — e.g. √2, π, √3<br>
      <strong>Real numbers (ℝ):</strong> all rational + irrational numbers
    </div>
  </div>

  <div class="notes-card">
    <h3>2. Adding &amp; Subtracting Integers</h3>
    <div class="example">
      <strong>Same signs → add, keep sign:</strong><br>
      (+3) + (+4) = +7 &nbsp;&nbsp; (−3) + (−4) = −7<br><br>
      <strong>Different signs → subtract, keep sign of larger:</strong><br>
      (+7) + (−3) = +4 &nbsp;&nbsp; (−7) + (+3) = −4<br><br>
      <strong>Subtracting negatives:</strong><br>
      5 − (−3) = 5 + 3 = 8 &nbsp;&nbsp; −2 − (−6) = −2 + 6 = 4
    </div>
  </div>

  <div class="notes-card">
    <h3>3. Multiplying &amp; Dividing Integers</h3>
    <div class="example">
      <strong>Signs rule:</strong><br>
      (+) × (+) = + &nbsp;&nbsp; (−) × (−) = + &nbsp;&nbsp; (+) × (−) = − &nbsp;&nbsp; (−) × (+) = −<br><br>
      (+) ÷ (+) = + &nbsp;&nbsp; (−) ÷ (−) = + &nbsp;&nbsp; (+) ÷ (−) = − &nbsp;&nbsp; (−) ÷ (+) = −<br><br>
      Examples: (−3) × (−4) = 12 &nbsp;&nbsp; (−15) ÷ 3 = −5 &nbsp;&nbsp; 6 × (−2) = −12
    </div>
  </div>

  <div class="notes-card">
    <h3>4. Order of Operations (BODMAS)</h3>
    <p><strong>B</strong>rackets → <strong>O</strong>rder (powers/roots) → <strong>D</strong>ivision → <strong>M</strong>ultiplication → <strong>A</strong>ddition → <strong>S</strong>ubtraction</p>
    <div class="example">
      3 + 4 × 2 = 3 + 8 = <span class="highlight">11</span> (not 14 — multiply first)<br>
      (3 + 4) × 2 = 7 × 2 = <span class="highlight">14</span> (brackets first)<br>
      −2² = −(2²) = −4 &nbsp;&nbsp; (−2)² = 4
    </div>
  </div>

  <div class="notes-card">
    <h3>5. Rational Numbers</h3>
    <p>A rational number can be written as a fraction p/q. Decimals that terminate or recur are rational.</p>
    <div class="example">
      <strong>Terminating:</strong> 0.5 = ½, 0.25 = ¼<br>
      <strong>Recurring:</strong> 0.333… = ⅓, 0.142857… = 1/7<br>
      <strong>Irrational:</strong> √2 = 1.41421… (non-terminating, non-recurring)<br>
      π = 3.14159… (non-terminating, non-recurring)
    </div>
  </div>

  <div class="notes-card">
    <h3>Quick Reference</h3>
    <div class="formula">− × − = + &nbsp; + × − = − &nbsp; − × + = −</div>
    <div class="formula">a − (−b) = a + b</div>
    <div class="formula">BODMAS: Brackets, Order, ÷, ×, +, −</div>
    <div class="formula">Rational: terminating or recurring decimal</div>
  </div>
`

export const questions: MCQuestion[] | null = [
  // ═══════════════════════════════════════════
  // NUMBER SYSTEM CLASSIFICATION (Q1–20)
  // ═══════════════════════════════════════════
  { q:"Which of the following is an integer?", opts:["0.5","√2","−7","⅔"], ans:2, explain:"Integers are whole numbers including negatives: …, −2, −1, 0, 1, 2, … −7 is an integer." },
  { q:"Which of the following is NOT a rational number?", opts:["0.5","−3","√5","¾"], ans:2, explain:"√5 is irrational — its decimal expansion is non-terminating and non-recurring. The others can be written as fractions." },
  { q:"Which of the following is a natural number?", opts:["0","−1","½","7"], ans:3, explain:"Natural numbers are the counting numbers: 1, 2, 3, … 7 is a natural number. 0 and negatives are excluded." },
  { q:"π (pi) belongs to which set?", opts:["Integers","Rational numbers","Irrational numbers","Natural numbers"], ans:2, explain:"π = 3.14159… is non-terminating and non-recurring, so it is irrational." },
  { q:"Which statement is true?", opts:["All integers are natural numbers","All natural numbers are integers","All rational numbers are integers","All real numbers are rational"], ans:1, explain:"Natural numbers (1, 2, 3, …) are a subset of integers (…, −1, 0, 1, 2, …). So all natural numbers are integers." },
  { q:"0.333… (recurring) is:", opts:["Irrational","An integer","Rational","Natural"], ans:2, explain:"0.333… = 1/3. Recurring decimals are rational — they can be written as fractions." },
  { q:"Which of these is irrational?", opts:["0.25","√9","√7","−4"], ans:2, explain:"√7 ≈ 2.6457… is non-terminating and non-recurring. √9 = 3 (rational), 0.25 = ¼ (rational), −4 (integer)." },
  { q:"Which set contains ALL of the following: −5, 0, 3, ½?", opts:["Integers","Natural numbers","Rational numbers","Irrational numbers"], ans:2, explain:"Rational numbers include integers, fractions, and zero. ½ is not an integer, so integers don't work. Rational fits all four." },
  { q:"Which of the following is a rational number?", opts:["√2","√3","√4","√5"], ans:2, explain:"√4 = 2, which is an integer and therefore rational. The others are irrational." },
  { q:"Is −3.75 a rational number?", opts:["No, it is negative","No, it is a decimal","Yes, it equals −15/4","Yes, but only because it is negative"], ans:2, explain:"−3.75 = −15/4, a ratio of two integers. All terminating decimals are rational." },
  { q:"Which number is between −3 and −1 on the number line?", opts:["−4","0","−2","1"], ans:2, explain:"−3 < −2 < −1, so −2 lies between −3 and −1." },
  { q:"Which set does NOT include 0?", opts:["Integers","Rational numbers","Natural numbers","Real numbers"], ans:2, explain:"Natural numbers start at 1: {1, 2, 3, …}. Zero is not a natural number." },
  { q:"Which is the correct ordering from smallest to largest?", opts:["−5, −3, 0, 2","−3, −5, 0, 2","0, −3, 2, −5","2, 0, −3, −5"], ans:0, explain:"On the number line: −5 < −3 < 0 < 2." },
  { q:"The absolute value |−8| equals:", opts:["−8","0","8","16"], ans:2, explain:"The absolute value of a number is its distance from zero, always non-negative. |−8| = 8." },
  { q:"Which of the following is true?", opts:["|−5| < |3|","|−5| > |3|","|−5| = |3|","|−5| = −5"], ans:1, explain:"|−5| = 5 and |3| = 3. Since 5 > 3, |−5| > |3|." },
  { q:"Which is larger: −0.1 or −10?", opts:["−10","−0.1","They are equal","Cannot compare"], ans:1, explain:"On the number line, −0.1 is closer to 0 and therefore greater. −0.1 > −10." },
  { q:"Which of the following correctly classifies √16?", opts:["Irrational only","Rational only","Both integer and rational","Natural, integer, and rational"], ans:3, explain:"√16 = 4. Since 4 is a natural number, it is also an integer and a rational number." },
  { q:"A recurring decimal is always:", opts:["Irrational","An integer","Rational","Natural"], ans:2, explain:"Recurring decimals can be written as fractions, so they are rational. e.g. 0.7̄ = 7/9." },
  { q:"Which number line correctly shows −2 to the left of −1?", opts:["Always true","Only true for positive numbers","Never true","Sometimes true"], ans:0, explain:"On the number line, more negative means further left. −2 is always to the left of −1." },
  { q:"How many integers are there between −4 and 4 (exclusive)?", opts:["6","7","8","9"], ans:1, explain:"Integers between −4 and 4 (not including −4 and 4): −3, −2, −1, 0, 1, 2, 3 — that's 7." },

  // ═══════════════════════════════════════════
  // ADDITION & SUBTRACTION OF INTEGERS (Q21–55)
  // ═══════════════════════════════════════════
  { q:"Calculate −3 + (−4).", opts:["7","−7","1","−1"], ans:1, explain:"−3 + (−4): same signs (both negative), add and keep negative. 3 + 4 = 7, so answer is −7." },
  { q:"Calculate 7 + (−3).", opts:["−4","4","10","−10"], ans:1, explain:"7 + (−3): different signs, subtract. 7 − 3 = 4. Larger number (7) is positive, so answer is +4." },
  { q:"Calculate −8 + 3.", opts:["11","−11","5","−5"], ans:3, explain:"−8 + 3: different signs. 8 − 3 = 5. Larger (8) is negative, so answer is −5." },
  { q:"Calculate 5 − 9.", opts:["14","−14","4","−4"], ans:3, explain:"5 − 9 = −4. Since we're taking more than we have, result is negative." },
  { q:"Calculate −6 − 2.", opts:["−8","8","−4","4"], ans:0, explain:"−6 − 2 = −6 + (−2). Same signs, add: 6 + 2 = 8, keep negative → −8." },
  { q:"Calculate 4 − (−3).", opts:["1","−1","7","−7"], ans:2, explain:"Subtracting a negative is adding: 4 − (−3) = 4 + 3 = 7." },
  { q:"Calculate −5 − (−2).", opts:["−7","7","−3","3"], ans:2, explain:"−5 − (−2) = −5 + 2 = −3. Subtracting a negative becomes addition." },
  { q:"Calculate −10 + 10.", opts:["20","−20","0","100"], ans:2, explain:"A number plus its opposite always equals zero. −10 + 10 = 0." },
  { q:"Calculate 3 − (−7).", opts:["−4","4","10","−10"], ans:2, explain:"3 − (−7) = 3 + 7 = 10." },
  { q:"Calculate −9 + 4.", opts:["13","−13","5","−5"], ans:3, explain:"−9 + 4: different signs. 9 − 4 = 5. Larger (9) is negative → −5." },
  { q:"Calculate −2 + (−8).", opts:["6","−6","10","−10"], ans:3, explain:"−2 + (−8) = −(2 + 8) = −10. Same signs, add and keep negative." },
  { q:"Calculate 0 − 6.", opts:["6","−6","0","60"], ans:1, explain:"0 − 6 = −6." },
  { q:"Calculate −15 + 8.", opts:["23","−23","7","−7"], ans:3, explain:"−15 + 8: different signs. 15 − 8 = 7. Larger (15) is negative → −7." },
  { q:"Calculate 12 − 20.", opts:["8","−8","32","−32"], ans:1, explain:"12 − 20 = −8. We're 8 short of zero after going 12 up and 20 down." },
  { q:"Calculate −4 − (−9).", opts:["−13","13","5","−5"], ans:2, explain:"−4 − (−9) = −4 + 9 = 5. Subtract negative → add." },
  { q:"Calculate (−3) + (−3) + (−3).", opts:["9","−9","0","−27"], ans:1, explain:"Three lots of −3: −3 + −3 + −3 = −9. Or: 3 × (−3) = −9." },
  { q:"Calculate −1 − 1.", opts:["0","2","−2","1"], ans:2, explain:"−1 − 1 = −1 + (−1) = −2." },
  { q:"Calculate 100 − 150.", opts:["250","−250","50","−50"], ans:3, explain:"100 − 150 = −50." },
  { q:"Calculate −20 − (−8).", opts:["−28","28","−12","12"], ans:2, explain:"−20 − (−8) = −20 + 8 = −12." },
  { q:"The temperature drops from 3°C to −5°C. By how many degrees did it drop?", opts:["2","−2","8","−8"], ans:2, explain:"Change = −5 − 3 = −8. The temperature dropped by 8 degrees." },
  { q:"Calculate −6 + 6 − 3.", opts:["−3","3","9","−9"], ans:0, explain:"−6 + 6 = 0; 0 − 3 = −3." },
  { q:"Calculate 5 − 8 + 3.", opts:["0","−6","6","16"], ans:0, explain:"5 − 8 = −3; −3 + 3 = 0." },
  { q:"Calculate −4 + 10 − 9.", opts:["−3","3","23","−23"], ans:0, explain:"−4 + 10 = 6; 6 − 9 = −3." },
  { q:"Calculate −7 − 3 + 5.", opts:["−5","5","−15","15"], ans:0, explain:"−7 − 3 = −10; −10 + 5 = −5." },
  { q:"Calculate 2 − 5 − 4.", opts:["−7","7","11","−11"], ans:0, explain:"2 − 5 = −3; −3 − 4 = −7." },
  { q:"What must be added to −8 to get 2?", opts:["−6","6","10","−10"], ans:2, explain:"−8 + ? = 2. ? = 2 − (−8) = 2 + 8 = 10." },
  { q:"Calculate −3 + 5 − 2 + 1.", opts:["1","−1","11","−11"], ans:0, explain:"−3 + 5 = 2; 2 − 2 = 0; 0 + 1 = 1." },
  { q:"Calculate −(−5).", opts:["−5","0","5","25"], ans:2, explain:"The negative of a negative is positive. −(−5) = +5 = 5." },
  { q:"On a number line, what is 3 steps left from −2?", opts:["1","5","−5","−1"], ans:2, explain:"−2 − 3 = −5. Moving left (subtracting) from −2 by 3 gives −5." },
  { q:"Calculate −11 + 4 + 7.", opts:["0","−14","14","2"], ans:0, explain:"−11 + 4 = −7; −7 + 7 = 0." },
  { q:"Calculate 8 − (−1) − 3.", opts:["4","6","10","−6"], ans:1, explain:"8 − (−1) = 8 + 1 = 9; 9 − 3 = 6." },
  { q:"What is the difference between −3 and 5?", opts:["2","8","−8","−2"], ans:1, explain:"Difference = 5 − (−3) = 5 + 3 = 8. Or |5 − (−3)| = 8." },
  { q:"Calculate −50 + 30 + 10.", opts:["−10","10","90","−90"], ans:0, explain:"−50 + 30 = −20; −20 + 10 = −10." },
  { q:"A diver is at −30 m. She rises 12 m. What is her new depth?", opts:["−18 m","18 m","−42 m","42 m"], ans:0, explain:"−30 + 12 = −18 m. She is still below sea level." },
  { q:"Calculate −999 + 1000.", opts:["−1","0","1","1999"], ans:2, explain:"−999 + 1000 = 1." },

  // ═══════════════════════════════════════════
  // MULTIPLICATION & DIVISION OF INTEGERS (Q56–90)
  // ═══════════════════════════════════════════
  { q:"Calculate (−3) × 4.", opts:["12","−12","7","−7"], ans:1, explain:"Positive × Negative = Negative. 3 × 4 = 12, so (−3) × 4 = −12." },
  { q:"Calculate (−5) × (−6).", opts:["−30","30","−11","11"], ans:1, explain:"Negative × Negative = Positive. 5 × 6 = 30, so (−5) × (−6) = +30." },
  { q:"Calculate 8 × (−3).", opts:["24","−24","5","−5"], ans:1, explain:"Positive × Negative = Negative. 8 × 3 = 24, so answer is −24." },
  { q:"Calculate (−7) × (−7).", opts:["−49","49","14","−14"], ans:1, explain:"Negative × Negative = Positive. 7 × 7 = 49." },
  { q:"Calculate (−2) × (−3) × (−1).", opts:["6","−6","−5","5"], ans:1, explain:"(−2) × (−3) = +6; then 6 × (−1) = −6. Three negative signs → negative result." },
  { q:"Calculate (−4) × 0.", opts:["−4","4","0","undefined"], ans:2, explain:"Any number multiplied by 0 is 0." },
  { q:"Calculate (−12) ÷ 4.", opts:["3","−3","8","−8"], ans:1, explain:"Negative ÷ Positive = Negative. 12 ÷ 4 = 3, so answer is −3." },
  { q:"Calculate 20 ÷ (−5).", opts:["4","−4","−15","15"], ans:1, explain:"Positive ÷ Negative = Negative. 20 ÷ 5 = 4, so answer is −4." },
  { q:"Calculate (−18) ÷ (−3).", opts:["−6","6","−15","15"], ans:1, explain:"Negative ÷ Negative = Positive. 18 ÷ 3 = 6." },
  { q:"Calculate (−6)².", opts:["−36","36","−12","12"], ans:1, explain:"(−6)² = (−6) × (−6) = +36. Squaring any real number gives a non-negative result." },
  { q:"Calculate −6².", opts:["36","−36","12","−12"], ans:1, explain:"−6² means −(6²) = −36. The square applies only to 6, then the negative is applied." },
  { q:"Which product is positive?", opts:["(−2)(3)","(−2)(−3)","(2)(−3)","All are negative"], ans:1, explain:"(−2)(−3) = +6. Two negatives make a positive." },
  { q:"Calculate (−1)¹⁰⁰.", opts:["−1","1","100","−100"], ans:1, explain:"(−1) raised to an even power is always +1. 100 is even, so (−1)¹⁰⁰ = 1." },
  { q:"Calculate (−1)⁹⁹.", opts:["−1","1","99","−99"], ans:0, explain:"(−1) raised to an odd power is −1. 99 is odd, so (−1)⁹⁹ = −1." },
  { q:"Calculate (−3)³.", opts:["9","−9","27","−27"], ans:3, explain:"(−3)³ = (−3)(−3)(−3) = 9 × (−3) = −27. Odd power keeps the negative." },
  { q:"Calculate 36 ÷ (−9).", opts:["4","−4","27","−27"], ans:1, explain:"Positive ÷ Negative = Negative. 36 ÷ 9 = 4, so answer is −4." },
  { q:"Calculate (−2) × 3 × (−5).", opts:["30","−30","−10","10"], ans:0, explain:"(−2) × 3 = −6; (−6) × (−5) = +30. Two negatives → positive." },
  { q:"Calculate (−4) × (−2) × (−3).", opts:["24","−24","−9","9"], ans:1, explain:"(−4)(−2) = 8; 8 × (−3) = −24. Three negatives → negative." },
  { q:"What is (−45) ÷ (−9)?", opts:["−5","5","−4","4"], ans:1, explain:"Negative ÷ Negative = Positive. 45 ÷ 9 = 5." },
  { q:"Which of the following equals −8?", opts:["(−4) × (−2)","(4) × (2)","(−4) × 2","(4) × (−2)"], ans:2, explain:"(−4) × 2 = −8. Negative × Positive = Negative." },
  { q:"Calculate (−2)⁴.", opts:["−16","16","−8","8"], ans:1, explain:"(−2)⁴ = (−2)(−2)(−2)(−2) = 4 × 4 = 16. Even power → positive." },
  { q:"Calculate (−10) ÷ 2 × (−1).", opts:["5","−5","20","−20"], ans:0, explain:"Working left to right: (−10) ÷ 2 = −5; (−5) × (−1) = +5." },
  { q:"If (−a) × b = 12, and b = −3, find a.", opts:["−4","4","−36","36"], ans:1, explain:"(−a)(−3) = 12 → 3a = 12 → a = 4." },
  { q:"Calculate (−3) × (−4) ÷ (−2).", opts:["6","−6","24","−24"], ans:1, explain:"(−3)(−4) = 12; 12 ÷ (−2) = −6." },
  { q:"What is the sign of a product of 5 negative numbers?", opts:["Positive","Negative","Zero","Cannot tell"], ans:1, explain:"5 is odd. The product of an odd number of negative numbers is negative." },
  { q:"Calculate (−100) ÷ (−10) ÷ (−2).", opts:["5","−5","20","−20"], ans:1, explain:"(−100) ÷ (−10) = 10; 10 ÷ (−2) = −5." },
  { q:"What is (−6) × (−6) × 0?", opts:["36","−36","0","Cannot determine"], ans:2, explain:"Anything multiplied by 0 is 0, regardless of other factors." },
  { q:"Calculate (−3) × 4 − 2.", opts:["−10","−14","10","14"], ans:1, explain:"(−3) × 4 = −12 first (multiplication before subtraction). −12 − 2 = −14." },
  { q:"Which is the correct value of (−2)³?", opts:["6","−6","8","−8"], ans:3, explain:"(−2)³ = (−2)(−2)(−2) = 4 × (−2) = −8." },
  { q:"Calculate (−1) × (−2) × (−3) × (−4).", opts:["24","−24","10","−10"], ans:0, explain:"4 negatives → positive. 1 × 2 × 3 × 4 = 24, so answer is +24." },
  { q:"A submarine descends 5 m each second for 8 seconds. What is its depth change?", opts:["40 m","−40 m","3 m","−3 m"], ans:1, explain:"8 × (−5) = −40 m. The submarine is 40 m deeper (represented as −40 m)." },
  { q:"Calculate (−56) ÷ 7.", opts:["8","−8","63","−63"], ans:1, explain:"Negative ÷ Positive = Negative. 56 ÷ 7 = 8, so (−56) ÷ 7 = −8." },
  { q:"What sign does (−a)² always have when a ≠ 0?", opts:["Always negative","Always positive","Depends on a","Could be zero"], ans:1, explain:"(−a)² = (−a)(−a) = a². Squaring always gives a positive result (for non-zero a)." },
  { q:"Calculate (−2)² − (−2)³.", opts:["4","12","−4","−12"], ans:1, explain:"(−2)² = 4; (−2)³ = −8. 4 − (−8) = 4 + 8 = 12." },
  { q:"If you multiply a negative number by a positive number, the result is:", opts:["Always positive","Always negative","Always zero","Could be positive or negative"], ans:1, explain:"Negative × Positive = Negative. Always." },

  // ═══════════════════════════════════════════
  // ORDER OF OPERATIONS / BODMAS (Q91–120)
  // ═══════════════════════════════════════════
  { q:"Calculate 3 + 4 × 2.", opts:["14","11","10","24"], ans:1, explain:"Multiplication before addition: 4 × 2 = 8, then 3 + 8 = 11." },
  { q:"Calculate (3 + 4) × 2.", opts:["11","14","10","24"], ans:1, explain:"Brackets first: (3 + 4) = 7, then 7 × 2 = 14." },
  { q:"Calculate 20 − 4 × 3.", opts:["48","8","24","16"], ans:1, explain:"Multiplication first: 4 × 3 = 12, then 20 − 12 = 8." },
  { q:"Calculate 2 + 3² × 2.", opts:["50","20","16","11"], ans:1, explain:"Order (power) first: 3² = 9; then multiply: 9 × 2 = 18; then add: 2 + 18 = 20." },
  { q:"Calculate 10 ÷ 2 + 3.", opts:["8","2","10","11"], ans:0, explain:"Division before addition: 10 ÷ 2 = 5, then 5 + 3 = 8." },
  { q:"Calculate 10 ÷ (2 + 3).", opts:["8","2","10","11"], ans:1, explain:"Brackets first: 2 + 3 = 5, then 10 ÷ 5 = 2." },
  { q:"Calculate −3² + 1.", opts:["10","−8","−9","7"], ans:1, explain:"Powers before addition: 3² = 9, so −3² = −9. Then −9 + 1 = −8." },
  { q:"Calculate (−3)² + 1.", opts:["10","−8","−9","7"], ans:0, explain:"(−3)² = 9 first. Then 9 + 1 = 10." },
  { q:"Calculate 4 + 8 ÷ 2 − 1.", opts:["5","7","4","9"], ans:1, explain:"Division first: 8 ÷ 2 = 4. Then left to right: 4 + 4 − 1 = 7." },
  { q:"Calculate 3 × 4 + 2 × 5.", opts:["70","22","17","50"], ans:1, explain:"Multiplications first: 3 × 4 = 12 and 2 × 5 = 10. Then 12 + 10 = 22." },
  { q:"Calculate 5 × (2 + 3) − 4².", opts:["9","−9","11","−11"], ans:0, explain:"Brackets: 2 + 3 = 5. Power: 4² = 16. Then: 5 × 5 − 16 = 25 − 16 = 9." },
  { q:"Calculate (−2)³ + 3².", opts:["1","17","−17","−1"], ans:0, explain:"(−2)³ = −8; 3² = 9. Then −8 + 9 = 1." },
  { q:"Calculate 6 ÷ 2 × 3.", opts:["1","9","12","4"], ans:1, explain:"Division and multiplication have equal priority — work left to right. 6 ÷ 2 = 3, then 3 × 3 = 9." },
  { q:"Calculate 15 − 3 × (4 − 2).", opts:["24","9","27","3"], ans:1, explain:"Brackets: 4 − 2 = 2. Multiply: 3 × 2 = 6. Subtract: 15 − 6 = 9." },
  { q:"Calculate 2³ − 4 ÷ 2.", opts:["2","6","0","10"], ans:1, explain:"Powers: 2³ = 8. Division: 4 ÷ 2 = 2. Then 8 − 2 = 6." },
  { q:"Calculate −(4 − 7).", opts:["−3","3","11","−11"], ans:1, explain:"Brackets: 4 − 7 = −3. Then −(−3) = +3." },
  { q:"Calculate 1 + 2 × 3 − 4 ÷ 2.", opts:["1.5","5","3","10"], ans:1, explain:"Multiply and divide first: 2 × 3 = 6; 4 ÷ 2 = 2. Then: 1 + 6 − 2 = 5." },
  { q:"Calculate 3 × [4 + 2 × (5 − 3)].", opts:["24","36","30","18"], ans:0, explain:"Inner brackets: 5 − 3 = 2. Multiply inside: 2 × 2 = 4. Bracket: 4 + 4 = 8. Outer: 3 × 8 = 24." },
  { q:"Calculate 4² ÷ (8 − 4).", opts:["4","8","16","2"], ans:0, explain:"Power: 4² = 16. Brackets: 8 − 4 = 4. Then 16 ÷ 4 = 4." },
  { q:"Calculate (−4 + 1) × (3 − 5).", opts:["6","−6","14","−14"], ans:0, explain:"(−4 + 1) = −3; (3 − 5) = −2. Then (−3) × (−2) = +6." },
  { q:"Calculate 5 + 3 × 2².", opts:["17","64","27","23"], ans:0, explain:"Power: 2² = 4. Multiply: 3 × 4 = 12. Add: 5 + 12 = 17." },
  { q:"Calculate 12 ÷ 4 × 3 − 2².", opts:["5","17","1","−1"], ans:0, explain:"Division: 12 ÷ 4 = 3. Multiply: 3 × 3 = 9. Power: 2² = 4. Then 9 − 4 = 5." },
  { q:"Calculate (−2 + 5)² − 4.", opts:["5","23","−5","1"], ans:0, explain:"Bracket: −2 + 5 = 3. Power: 3² = 9. Then 9 − 4 = 5." },
  { q:"Which expression equals 14?", opts:["2 + 3 × 4","(2 + 3) × 4","2 × 3 + 4","2 + 3 + 4"], ans:0, explain:"2 + 3 × 4 = 2 + 12 = 14 (multiply first). (2+3)×4 = 20, 2×3+4 = 10, 2+3+4 = 9." },
  { q:"Calculate 3 + (−2)² × 2.", opts:["11","6","10","−5"], ans:0, explain:"(−2)² = 4; 4 × 2 = 8; 3 + 8 = 11." },
  { q:"Calculate 50 ÷ (5 × 2).", opts:["20","5","25","10"], ans:1, explain:"Brackets first: 5 × 2 = 10. Then 50 ÷ 10 = 5." },
  { q:"Calculate −2 × 3 + 4 × (−1).", opts:["2","−2","−10","10"], ans:2, explain:"−2 × 3 = −6; 4 × (−1) = −4; then −6 + (−4) = −10." },
  { q:"Calculate 7 − 2 × (3 + 1).", opts:["−1","20","15","11"], ans:0, explain:"Brackets: 3 + 1 = 4. Multiply: 2 × 4 = 8. Subtract: 7 − 8 = −1." },
  { q:"Calculate (10 − 4) ÷ (3 − 1) × 3.", opts:["3","9","18","15"], ans:1, explain:"Brackets: (10−4) = 6; (3−1) = 2. Then 6 ÷ 2 = 3; 3 × 3 = 9." },
  { q:"Calculate 2 × 3² − (5 − 3)³.", opts:["10","6","26","14"], ans:0, explain:"3² = 9; (5−3)³ = 2³ = 8. Then 2 × 9 − 8 = 18 − 8 = 10." },
  { q:"Calculate (−3 + 7) × (2² − 6).", opts:["8","−8","0","−24"], ans:1, explain:"(−3+7) = 4; (2²−6) = (4−6) = −2. Then 4 × (−2) = −8." },

  // ═══════════════════════════════════════════
  // MIXED / RATIONAL NUMBER PROBLEMS (Q121–150)
  // ═══════════════════════════════════════════
  { q:"Which of these is a terminating decimal?", opts:["1/3","1/6","1/4","1/7"], ans:2, explain:"1/4 = 0.25, which terminates. 1/3 = 0.333…, 1/6 = 0.1666…, 1/7 = 0.142857… all recur." },
  { q:"Express 0.6̄ (0.666…) as a fraction.", opts:["6/10","2/3","3/5","6/9"], ans:1, explain:"Let x = 0.666… Then 10x = 6.666… Subtract: 9x = 6, so x = 6/9 = 2/3." },
  { q:"Which fraction equals a terminating decimal?", opts:["1/3","2/7","3/8","5/6"], ans:2, explain:"3/8 = 0.375. A fraction terminates if its denominator (in lowest terms) has only factors of 2 and 5." },
  { q:"Calculate −½ + ¾.", opts:["¼","−¼","1","−1"], ans:0, explain:"−½ = −2/4; −2/4 + 3/4 = 1/4 = ¼." },
  { q:"Is √2 rational or irrational?", opts:["Rational, since 2 is rational","Rational, since it terminates","Irrational, since its decimal is non-terminating non-recurring","Irrational, since 2 is prime"], ans:2, explain:"√2 = 1.41421356… is non-terminating and non-recurring, so it is irrational." },
  { q:"Calculate −¾ × (−8).", opts:["−6","6","−⁶⁄₃₂","2"], ans:1, explain:"−¾ × (−8) = +(¾ × 8) = 8×3/4 = 24/4 = 6. Negative × Negative = Positive." },
  { q:"The product of two negative integers is always:", opts:["Negative","Positive","Zero","Undefined"], ans:1, explain:"Negative × Negative = Positive. Always." },
  { q:"Which correctly orders these from least to greatest: −½, −2, 0.5, −0.1?", opts:["−2, −½, −0.1, 0.5","−0.1, −½, −2, 0.5","0.5, −0.1, −½, −2","−½, −2, −0.1, 0.5"], ans:0, explain:"Convert to decimals: −2, −0.5, 0.5, −0.1. Ordering: −2 < −0.5 < −0.1 < 0.5." },
  { q:"Which number is closest to 0 on the number line?", opts:["−10","−0.01","0.5","−3"], ans:1, explain:"Distance from 0: |−10| = 10, |−0.01| = 0.01, |0.5| = 0.5, |−3| = 3. Smallest distance is 0.01." },
  { q:"Calculate (−¼) ÷ ½.", opts:["−½","½","−⅛","⅛"], ans:0, explain:"Dividing by ½ is multiplying by 2: (−¼) × 2 = −½." },
  { q:"Which of the following has the greatest value?", opts:["−100","−0.001","−1000","−10"], ans:1, explain:"On the number line, −0.001 is closest to zero and therefore the greatest among these negatives." },
  { q:"Calculate 5 − (−3) × 2.", opts:["4","11","16","−1"], ans:1, explain:"Multiplication first: (−3) × 2 = −6. Then 5 − (−6) = 5 + 6 = 11." },
  { q:"If the temperature at midnight is −8°C and rises by 12°C by noon, what is the noon temperature?", opts:["−20°C","4°C","20°C","−4°C"], ans:1, explain:"−8 + 12 = 4°C." },
  { q:"A company loses $500 per month for 6 months. What is the total change in profit?", opts:["$3000","−$3000","$500","−$500"], ans:1, explain:"6 × (−500) = −3000. The total change is −$3000 (a loss of $3000)." },
  { q:"Which of these is NOT an integer?", opts:["−4","0","√9","0.5"], ans:3, explain:"0.5 = ½ is not a whole number, so not an integer. −4, 0, and √9 = 3 are all integers." },
  { q:"Calculate (−3 + 1)³.", opts:["8","−8","6","−6"], ans:1, explain:"Brackets: −3 + 1 = −2. Then (−2)³ = −8." },
  { q:"What is (−4) ÷ (½)?", opts:["−2","2","−8","8"], ans:2, explain:"Dividing by ½ is multiplying by 2: (−4) × 2 = −8." },
  { q:"Which value of n satisfies −n = 5?", opts:["5","−5","0","−10"], ans:1, explain:"If −n = 5, then n = −5. Check: −(−5) = 5 ✓" },
  { q:"Calculate (−2)² + (−2)² + (−2)².", opts:["−24","−12","12","24"], ans:2, explain:"(−2)² = 4. So 4 + 4 + 4 = 12." },
  { q:"Between which two consecutive integers does √20 lie?", opts:["4 and 5","3 and 4","5 and 6","2 and 3"], ans:0, explain:"4² = 16 and 5² = 25. Since 16 < 20 < 25, we have 4 < √20 < 5." },
  { q:"Calculate −3 × (−2)² ÷ (−1)³.", opts:["12","−12","6","−6"], ans:0, explain:"(−2)² = 4; (−1)³ = −1. Then −3 × 4 = −12; −12 ÷ (−1) = 12." },
  { q:"Is the sum of two irrational numbers always irrational?", opts:["Yes, always","No, it can be rational","No, it is always rational","It is always zero"], ans:1, explain:"Example: √2 + (−√2) = 0, which is rational. The sum of two irrationals can be rational." },
  { q:"Calculate |−3 + (−4)|.", opts:["−7","7","1","−1"], ans:1, explain:"First calculate inside: −3 + (−4) = −7. Then |−7| = 7." },
  { q:"A lift starts at floor −2 (basement 2). It goes up 5 floors, then down 3 floors. What floor is it on?", opts:["0","2","−1","4"], ans:0, explain:"−2 + 5 = 3; 3 − 3 = 0. It is on floor 0 (ground floor)." },
  { q:"Calculate 1 − 2 + 3 − 4 + 5 − 6.", opts:["−3","3","21","−21"], ans:0, explain:"Pair up: (1−2) + (3−4) + (5−6) = −1 + (−1) + (−1) = −3." },
  { q:"If x = −3, evaluate x² − 2x + 1.", opts:["16","4","10","22"], ans:0, explain:"(−3)² − 2(−3) + 1 = 9 + 6 + 1 = 16." },
  { q:"Which is true about the number −√4?", opts:["It is irrational","It equals −2 and is rational","It equals 2","It is undefined"], ans:1, explain:"−√4 = −2. Since −2 is an integer, it is rational." },
  { q:"Calculate −2 + 3 × (−4) − (−5).", opts:["−9","9","−15","15"], ans:0, explain:"Multiply first: 3 × (−4) = −12. Then: −2 + (−12) − (−5) = −2 − 12 + 5 = −9." },
  { q:"What type of number is 0?", opts:["Positive only","Negative only","Neither positive nor negative","Both positive and negative"], ans:2, explain:"0 is neither positive nor negative. It is on the boundary between positives and negatives." },
  { q:"Calculate (−5)² − 5².", opts:["−50","0","50","25"], ans:1, explain:"(−5)² = 25 and 5² = 25. So 25 − 25 = 0." },
]
