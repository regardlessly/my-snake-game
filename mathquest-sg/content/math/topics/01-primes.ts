import type { TopicMeta, MCQuestion } from '../../../src/types/curriculum';

export const meta: TopicMeta = {
  id: 1, sem: 1,
  title: 'Primes, HCF & LCM',
  desc: 'Prime factorisation, square/cube roots, HCF and LCM'
}

export const notes: string | null = `
  <h2>Primes, HCF &amp; LCM</h2>
  <p class="topic-desc">Prime factorisation, square/cube roots, HCF and LCM</p>

  <div class="notes-card">
    <h3>1. Prime Numbers</h3>
    <p>A <strong>prime number</strong> has exactly two factors: 1 and itself. 1 is <em>not</em> prime.</p>
    <div class="example">
      Primes up to 30: <span class="highlight">2, 3, 5, 7, 11, 13, 17, 19, 23, 29</span><br><br>
      <strong>Composite number:</strong> has more than two factors (e.g. 12 = 1 × 2 × 3 × 4 × 6 × 12)<br>
      <strong>Note:</strong> 2 is the only even prime number.
    </div>
  </div>

  <div class="notes-card">
    <h3>2. Prime Factorisation</h3>
    <p>Write a number as a product of prime factors using a <strong>factor tree</strong> or <strong>repeated division</strong>.</p>
    <div class="example">
      Find prime factors of 60:<br>
      60 ÷ 2 = 30 &rarr; 30 ÷ 2 = 15 &rarr; 15 ÷ 3 = 5 &rarr; 5 is prime<br>
      60 = 2 &times; 2 &times; 3 &times; 5 = <span class="highlight">2² &times; 3 &times; 5</span><br><br>
      Always write in <strong>index notation</strong> from smallest prime to largest.
    </div>
  </div>

  <div class="notes-card">
    <h3>3. Square Roots &amp; Cube Roots</h3>
    <p>Use prime factorisation to find exact roots.</p>
    <div class="example">
      <strong>Square root:</strong> halve each index<br>
      √144 = √(2⁴ × 3²) = 2² × 3 = <span class="highlight">12</span><br><br>
      <strong>Cube root:</strong> divide each index by 3<br>
      ∛216 = ∛(2³ × 3³) = 2 × 3 = <span class="highlight">6</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>4. HCF — Highest Common Factor</h3>
    <p>The <strong>HCF</strong> is the largest number that divides into all the given numbers exactly.</p>
    <div class="example">
      Find HCF(36, 60):<br>
      36 = 2² × 3²<br>
      60 = 2² × 3 × 5<br>
      HCF = 2² × 3 = <span class="highlight">12</span><br><br>
      <strong>Rule:</strong> Take each common prime factor to its <em>lowest</em> power.
    </div>
  </div>

  <div class="notes-card">
    <h3>5. LCM — Lowest Common Multiple</h3>
    <p>The <strong>LCM</strong> is the smallest number that is a multiple of all the given numbers.</p>
    <div class="example">
      Find LCM(12, 18):<br>
      12 = 2² × 3<br>
      18 = 2 × 3²<br>
      LCM = 2² × 3² = 4 × 9 = <span class="highlight">36</span><br><br>
      <strong>Rule:</strong> Take each prime factor to its <em>highest</em> power.
    </div>
  </div>

  <div class="notes-card">
    <h3>Quick Reference</h3>
    <div class="formula">HCF: common primes to lowest power</div>
    <div class="formula">LCM: all primes to highest power</div>
    <div class="formula">HCF × LCM = product of the two numbers</div>
    <div class="formula">√: halve each index &nbsp; ∛: divide each index by 3</div>
  </div>
`

export const questions: MCQuestion[] | null = [
  // ═══════════════════════════════════════════
  // PRIME NUMBERS (Q1–25)
  // ═══════════════════════════════════════════
  { q:"Which of the following is a prime number?", opts:["9","15","17","21"], ans:2, explain:"17 has exactly two factors: 1 and 17. It is prime. 9 = 3×3, 15 = 3×5, 21 = 3×7 are all composite." },
  { q:"Which of the following is NOT a prime number?", opts:["2","3","9","11"], ans:2, explain:"9 = 3 × 3, so it has factors other than 1 and itself. It is not prime." },
  { q:"How many prime numbers are there between 1 and 10?", opts:["3","4","5","6"], ans:1, explain:"Primes between 1 and 10: 2, 3, 5, 7 — that's 4 primes." },
  { q:"Which is the only even prime number?", opts:["1","2","4","6"], ans:1, explain:"2 is the only even prime. All other even numbers are divisible by 2 and hence composite." },
  { q:"Is 1 a prime number?", opts:["Yes, it has one factor","No, primes need exactly two factors","Yes, because it is odd","No, it is even"], ans:1, explain:"1 has only one factor (itself). A prime must have exactly two distinct factors: 1 and itself. So 1 is not prime." },
  { q:"Which of the following is prime?", opts:["27","33","37","39"], ans:2, explain:"37 is prime — not divisible by 2, 3, or any prime up to √37 ≈ 6.1. The others: 27 = 3³, 33 = 3×11, 39 = 3×13." },
  { q:"How many prime numbers are between 20 and 30?", opts:["1","2","3","4"], ans:1, explain:"Primes between 20 and 30: 23 and 29 — that's 2." },
  { q:"Which list contains only prime numbers?", opts:["2, 4, 6","3, 9, 15","2, 3, 5, 7","5, 10, 15"], ans:2, explain:"2, 3, 5, 7 are all prime. The others contain composites (4, 6, 9, 10, etc.)." },
  { q:"Is 51 prime?", opts:["Yes","No, 51 = 3 × 17","No, 51 = 7 × 7","No, 51 = 3 × 13"], ans:1, explain:"51 = 3 × 17. Since it has factors other than 1 and 51, it is composite." },
  { q:"What is the largest prime number less than 20?", opts:["17","18","19","16"], ans:2, explain:"19 is prime (not divisible by 2, 3, or any prime ≤ √19 ≈ 4.4). 18 = 2×9, 17 is also prime but smaller." },
  { q:"Which of the following is a prime number?", opts:["49","51","53","55"], ans:2, explain:"53 is prime. 49 = 7², 51 = 3×17, 55 = 5×11." },
  { q:"How many factors does a prime number have?", opts:["1","2","3","More than 3"], ans:1, explain:"By definition, a prime number has exactly 2 factors: 1 and itself." },
  { q:"Which of these is NOT prime?", opts:["13","17","19","21"], ans:3, explain:"21 = 3 × 7. It has 4 factors, so it is composite." },
  { q:"Is 2 prime?", opts:["No, it is even so composite","Yes, it has exactly two factors","No, it has three factors","Yes, all even numbers are prime"], ans:1, explain:"2 is prime. It has exactly two factors: 1 and 2. It's the only even prime." },
  { q:"What is the smallest prime number greater than 10?", opts:["11","12","13","15"], ans:0, explain:"11 is prime (only factors are 1 and 11). 12 = 2²×3, 13 is also prime but larger than 11." },
  { q:"Which set of numbers are all prime?", opts:["11, 13, 15, 17","11, 13, 17, 19","13, 15, 17, 19","11, 14, 17, 19"], ans:1, explain:"11, 13, 17, 19 are all prime. 15 = 3×5 and 14 = 2×7 are composite." },
  { q:"How many prime numbers are between 10 and 20?", opts:["3","4","5","6"], ans:1, explain:"Primes between 10 and 20: 11, 13, 17, 19 — that's 4." },
  { q:"Which of the following is composite?", opts:["7","11","23","25"], ans:3, explain:"25 = 5 × 5. It has factors 1, 5, 25 so it is composite." },
  { q:"Is 97 prime?", opts:["Yes","No, 97 = 7 × 13","No, 97 = 9 × 11","No, 97 = 3 × 31"], ans:0, explain:"97 is prime. It is not divisible by 2, 3, 5, 7 (primes up to √97 ≈ 9.8)." },
  { q:"What is the sum of the first three prime numbers?", opts:["6","8","10","12"], ans:2, explain:"First three primes are 2, 3, 5. Their sum is 2 + 3 + 5 = 10." },
  { q:"Which prime is between 40 and 50?", opts:["41 and 43","41 and 47","43 and 47","41, 43 and 47"], ans:3, explain:"Primes between 40 and 50: 41, 43, 47. (45 = 3²×5, 49 = 7²)" },
  { q:"Is 91 prime?", opts:["Yes","No, 91 = 7 × 13","No, 91 = 9 × 10","No, 91 = 11 × 8"], ans:1, explain:"91 = 7 × 13. It is composite. A common trick question!" },
  { q:"Which of these has exactly 2 factors?", opts:["6","8","11","15"], ans:2, explain:"11 has exactly 2 factors: 1 and 11. It is prime. 6, 8, 15 each have more than 2 factors." },
  { q:"The number 1 is:", opts:["Prime","Composite","Neither prime nor composite","Both prime and composite"], ans:2, explain:"1 is neither prime (needs exactly 2 factors) nor composite (composites have more than 2 factors). 1 is in its own category." },
  { q:"How many prime numbers are between 50 and 60?", opts:["0","1","2","3"], ans:2, explain:"Primes between 50 and 60: 53 and 59. That's 2." },

  // ═══════════════════════════════════════════
  // PRIME FACTORISATION (Q26–60)
  // ═══════════════════════════════════════════
  { q:"Express 12 as a product of prime factors.", opts:["2 × 6","2² × 3","3 × 4","2 × 3²"], ans:1, explain:"12 = 2 × 2 × 3 = 2² × 3." },
  { q:"Express 18 as a product of prime factors.", opts:["2 × 9","2 × 3²","3 × 6","2² × 3"], ans:1, explain:"18 = 2 × 9 = 2 × 3 × 3 = 2 × 3²." },
  { q:"Express 36 as a product of prime factors.", opts:["2² × 9","4 × 9","2² × 3²","6²"], ans:2, explain:"36 = 4 × 9 = 2² × 3²." },
  { q:"Express 24 as a product of prime factors.", opts:["2³ × 3","2² × 6","4 × 6","2 × 12"], ans:0, explain:"24 = 2 × 12 = 2 × 4 × 3 = 2³ × 3." },
  { q:"Express 30 as a product of prime factors.", opts:["2 × 15","5 × 6","2 × 3 × 5","2² × 5"], ans:2, explain:"30 = 2 × 15 = 2 × 3 × 5. All three factors are prime." },
  { q:"Express 45 as a product of prime factors.", opts:["5 × 9","3² × 5","3 × 15","5² × 3"], ans:1, explain:"45 = 9 × 5 = 3² × 5." },
  { q:"Express 60 as a product of prime factors.", opts:["2² × 3 × 5","4 × 15","2 × 3 × 10","2³ × 5"], ans:0, explain:"60 = 4 × 15 = 2² × 3 × 5." },
  { q:"Express 72 as a product of prime factors.", opts:["8 × 9","2³ × 3²","2² × 18","2 × 36"], ans:1, explain:"72 = 8 × 9 = 2³ × 3²." },
  { q:"Express 48 as a product of prime factors.", opts:["2⁴ × 3","2³ × 6","4 × 12","2² × 12"], ans:0, explain:"48 = 16 × 3 = 2⁴ × 3." },
  { q:"Express 100 as a product of prime factors.", opts:["4 × 25","10²","2² × 5²","2 × 50"], ans:2, explain:"100 = 4 × 25 = 2² × 5²." },
  { q:"Express 84 as a product of prime factors.", opts:["2² × 3 × 7","4 × 21","2 × 42","2³ × 7"], ans:0, explain:"84 = 4 × 21 = 2² × 3 × 7." },
  { q:"Express 90 as a product of prime factors.", opts:["2 × 3² × 5","2 × 45","9 × 10","2² × 3 × 5"], ans:0, explain:"90 = 2 × 45 = 2 × 9 × 5 = 2 × 3² × 5." },
  { q:"Express 120 as a product of prime factors.", opts:["2³ × 3 × 5","2² × 30","4 × 30","2⁴ × 5"], ans:0, explain:"120 = 8 × 15 = 2³ × 3 × 5." },
  { q:"Express 50 as a product of prime factors.", opts:["2 × 25","5 × 10","2 × 5²","2² × 5"], ans:2, explain:"50 = 2 × 25 = 2 × 5²." },
  { q:"Express 150 as a product of prime factors.", opts:["2 × 3 × 5²","3 × 50","2 × 75","2² × 3 × 5"], ans:0, explain:"150 = 2 × 75 = 2 × 3 × 25 = 2 × 3 × 5²." },
  { q:"Express 40 as a product of prime factors.", opts:["2³ × 5","4 × 10","2² × 10","8 × 5"], ans:0, explain:"40 = 8 × 5 = 2³ × 5." },
  { q:"Which is the correct prime factorisation of 56?", opts:["2³ × 7","2² × 14","2 × 28","4 × 14"], ans:0, explain:"56 = 8 × 7 = 2³ × 7." },
  { q:"Express 144 as a product of prime factors.", opts:["2⁴ × 3²","2³ × 18","12²","4 × 36"], ans:0, explain:"144 = 16 × 9 = 2⁴ × 3²." },
  { q:"Express 200 as a product of prime factors.", opts:["2³ × 5²","2² × 50","4 × 50","8 × 25"], ans:0, explain:"200 = 8 × 25 = 2³ × 5²." },
  { q:"Express 63 as a product of prime factors.", opts:["3² × 7","9 × 7","3 × 21","7 × 9"], ans:0, explain:"63 = 9 × 7 = 3² × 7. All three forms equal 63, but 3² × 7 uses prime factors in index notation." },
  { q:"Which prime factorisation is written in correct index notation?", opts:["2 × 2 × 3","4 × 3","2² × 3","12"], ans:2, explain:"Index notation groups repeated prime factors using powers. 2 × 2 × 3 = 2² × 3 is the correct form." },
  { q:"How many prime factors does 12 have (counting multiplicity)?", opts:["2","3","4","6"], ans:1, explain:"12 = 2 × 2 × 3. That's three prime factors (2, 2, 3) counting with repetition." },
  { q:"Express 98 as a product of prime factors.", opts:["2 × 7²","2 × 49","7² × 2","2² × 7"], ans:0, explain:"98 = 2 × 49 = 2 × 7². Options A and C are equivalent; A is the standard form." },
  { q:"Express 75 as a product of prime factors.", opts:["3 × 5²","5 × 15","3 × 25","5² × 3"], ans:0, explain:"75 = 3 × 25 = 3 × 5². Options A and D are the same; A is listed first." },
  { q:"Express 108 as a product of prime factors.", opts:["2² × 3³","4 × 27","2 × 54","2³ × 3²"], ans:0, explain:"108 = 4 × 27 = 2² × 3³." },
  { q:"Express 252 as a product of prime factors.", opts:["2² × 3² × 7","4 × 63","2 × 126","2² × 63"], ans:0, explain:"252 = 4 × 63 = 4 × 9 × 7 = 2² × 3² × 7." },
  { q:"How many distinct prime factors does 60 have?", opts:["2","3","4","5"], ans:1, explain:"60 = 2² × 3 × 5. The distinct prime factors are 2, 3, and 5 — that's 3." },
  { q:"Which number has the prime factorisation 2 × 3 × 5?", opts:["15","30","60","45"], ans:1, explain:"2 × 3 × 5 = 30." },
  { q:"Which number has the prime factorisation 2² × 7?", opts:["14","21","28","56"], ans:2, explain:"2² × 7 = 4 × 7 = 28." },
  { q:"Express 180 as a product of prime factors.", opts:["2² × 3² × 5","4 × 45","2 × 90","2 × 3 × 30"], ans:0, explain:"180 = 4 × 45 = 4 × 9 × 5 = 2² × 3² × 5." },
  { q:"What is the sum of all prime factors (with repetition) of 12?", opts:["5","7","8","6"], ans:1, explain:"12 = 2 × 2 × 3. Sum = 2 + 2 + 3 = 7." },
  { q:"Which number has the prime factorisation 3² × 5²?", opts:["45","75","225","135"], ans:2, explain:"3² × 5² = 9 × 25 = 225." },
  { q:"Express 126 as a product of prime factors.", opts:["2 × 3² × 7","2 × 63","2 × 3 × 21","2² × 3 × 7"], ans:0, explain:"126 = 2 × 63 = 2 × 9 × 7 = 2 × 3² × 7." },
  { q:"Which number has 2⁴ as part of its prime factorisation?", opts:["24","36","48","54"], ans:2, explain:"48 = 2⁴ × 3. 24 = 2³ × 3, 36 = 2² × 3², 54 = 2 × 3³." },
  { q:"Express 280 as a product of prime factors.", opts:["2³ × 5 × 7","4 × 70","2² × 5 × 7","2⁴ × 7"], ans:0, explain:"280 = 8 × 35 = 8 × 5 × 7 = 2³ × 5 × 7." },

  // ═══════════════════════════════════════════
  // SQUARE ROOTS & CUBE ROOTS (Q61–80)
  // ═══════════════════════════════════════════
  { q:"Find √144.", opts:["11","12","13","14"], ans:1, explain:"12² = 144, so √144 = 12. Using prime factors: 144 = 2⁴ × 3² → √144 = 2² × 3 = 12." },
  { q:"Find √225.", opts:["13","14","15","16"], ans:2, explain:"15² = 225, so √225 = 15. 225 = 3² × 5² → √225 = 3 × 5 = 15." },
  { q:"Find ∛27.", opts:["3","9","27","4"], ans:0, explain:"3³ = 27, so ∛27 = 3. Or: 27 = 3³ → ∛27 = 3." },
  { q:"Find ∛64.", opts:["4","6","8","16"], ans:0, explain:"4³ = 64, so ∛64 = 4. Or: 64 = 2⁶ → ∛64 = 2² = 4." },
  { q:"Find √196.", opts:["12","13","14","15"], ans:2, explain:"14² = 196. Or: 196 = 2² × 7² → √196 = 2 × 7 = 14." },
  { q:"Find ∛125.", opts:["3","4","5","6"], ans:2, explain:"5³ = 125, so ∛125 = 5. Or: 125 = 5³ → ∛125 = 5." },
  { q:"Find √400.", opts:["16","18","20","25"], ans:2, explain:"20² = 400. Or: 400 = 2⁴ × 5² → √400 = 2² × 5 = 20." },
  { q:"Find ∛216.", opts:["4","5","6","7"], ans:2, explain:"6³ = 216. Or: 216 = 2³ × 3³ → ∛216 = 2 × 3 = 6." },
  { q:"Find √324.", opts:["16","17","18","19"], ans:2, explain:"18² = 324. Or: 324 = 2² × 3⁴ → √324 = 2 × 3² = 18." },
  { q:"Find ∛1000.", opts:["8","10","12","15"], ans:1, explain:"10³ = 1000, so ∛1000 = 10. Or: 1000 = 2³ × 5³ → ∛1000 = 2 × 5 = 10." },
  { q:"Which of the following is a perfect square?", opts:["50","72","81","90"], ans:2, explain:"81 = 9² = 3⁴. Its square root is 9, an integer. The others are not perfect squares." },
  { q:"Which of the following is a perfect cube?", opts:["16","36","54","125"], ans:3, explain:"125 = 5³. Its cube root is 5. The others are not perfect cubes." },
  { q:"Find √(2⁴ × 3²).", opts:["6","12","18","36"], ans:1, explain:"√(2⁴ × 3²) = 2² × 3 = 4 × 3 = 12. Halve each index." },
  { q:"Find ∛(2³ × 5³).", opts:["10","25","30","50"], ans:0, explain:"∛(2³ × 5³) = 2 × 5 = 10. Divide each index by 3." },
  { q:"Find √169.", opts:["11","12","13","14"], ans:2, explain:"13² = 169, so √169 = 13." },
  { q:"Find ∛512.", opts:["6","7","8","9"], ans:2, explain:"8³ = 512, so ∛512 = 8. Or: 512 = 2⁹ → ∛512 = 2³ = 8." },
  { q:"Which is NOT a perfect square?", opts:["36","49","64","72"], ans:3, explain:"72 = 2³ × 3². For a perfect square, all indices must be even. 72 has an odd index (3 for factor 2)." },
  { q:"Find √(5² × 4²).", opts:["10","20","40","100"], ans:1, explain:"√(5² × 4²) = 5 × 4 = 20. Or: 5² × 4² = 400, and √400 = 20." },
  { q:"Which is NOT a perfect cube?", opts:["8","27","54","64"], ans:2, explain:"54 = 2 × 3³. For a perfect cube, all indices must be divisible by 3. The index of 2 is 1." },
  { q:"If 3² × 5² × 7² = n², what is n?", opts:["3 × 5 × 7","3 + 5 + 7","(3 × 5 × 7)²","15 × 7"], ans:0, explain:"n² = 3² × 5² × 7² = (3 × 5 × 7)², so n = 3 × 5 × 7 = 105." },

  // ═══════════════════════════════════════════
  // HCF (Q81–110)
  // ═══════════════════════════════════════════
  { q:"Find the HCF of 12 and 18.", opts:["3","6","9","12"], ans:1, explain:"12 = 2² × 3; 18 = 2 × 3². HCF = 2¹ × 3¹ = 6 (take lowest powers of common primes)." },
  { q:"Find the HCF of 24 and 36.", opts:["4","6","12","24"], ans:2, explain:"24 = 2³ × 3; 36 = 2² × 3². HCF = 2² × 3 = 12." },
  { q:"Find the HCF of 15 and 25.", opts:["3","5","15","25"], ans:1, explain:"15 = 3 × 5; 25 = 5². HCF = 5 (only common prime)." },
  { q:"Find the HCF of 8 and 12.", opts:["2","3","4","6"], ans:2, explain:"8 = 2³; 12 = 2² × 3. HCF = 2² = 4." },
  { q:"Find the HCF of 30 and 45.", opts:["5","10","15","30"], ans:2, explain:"30 = 2 × 3 × 5; 45 = 3² × 5. HCF = 3 × 5 = 15." },
  { q:"Find the HCF of 16 and 24.", opts:["4","6","8","12"], ans:2, explain:"16 = 2⁴; 24 = 2³ × 3. HCF = 2³ = 8." },
  { q:"Find the HCF of 20 and 50.", opts:["5","10","20","50"], ans:1, explain:"20 = 2² × 5; 50 = 2 × 5². HCF = 2 × 5 = 10." },
  { q:"Find the HCF of 36 and 48.", opts:["6","8","12","18"], ans:2, explain:"36 = 2² × 3²; 48 = 2⁴ × 3. HCF = 2² × 3 = 12." },
  { q:"Find the HCF of 14 and 21.", opts:["3","7","14","21"], ans:1, explain:"14 = 2 × 7; 21 = 3 × 7. HCF = 7." },
  { q:"Find the HCF of 60 and 90.", opts:["15","20","30","45"], ans:2, explain:"60 = 2² × 3 × 5; 90 = 2 × 3² × 5. HCF = 2 × 3 × 5 = 30." },
  { q:"Find the HCF of 100 and 150.", opts:["10","25","50","75"], ans:2, explain:"100 = 2² × 5²; 150 = 2 × 3 × 5². HCF = 2 × 5² = 50." },
  { q:"Find the HCF of 12 and 7.", opts:["1","3","4","7"], ans:0, explain:"12 = 2² × 3; 7 is prime. They share no common prime factors, so HCF = 1." },
  { q:"Find the HCF of 18 and 27.", opts:["3","6","9","18"], ans:2, explain:"18 = 2 × 3²; 27 = 3³. HCF = 3² = 9." },
  { q:"Find the HCF of 42 and 56.", opts:["6","7","14","21"], ans:2, explain:"42 = 2 × 3 × 7; 56 = 2³ × 7. HCF = 2 × 7 = 14." },
  { q:"Find the HCF of 25 and 35.", opts:["5","7","25","35"], ans:0, explain:"25 = 5²; 35 = 5 × 7. HCF = 5." },
  { q:"Find the HCF of 72 and 108.", opts:["12","18","24","36"], ans:3, explain:"72 = 2³ × 3²; 108 = 2² × 3³. HCF = 2² × 3² = 4 × 9 = 36." },
  { q:"What is the HCF of two prime numbers p and q (where p ≠ q)?", opts:["p","q","pq","1"], ans:3, explain:"Two different primes share no common factors other than 1, so HCF = 1. They are coprime." },
  { q:"Find the HCF of 48 and 80.", opts:["8","12","16","24"], ans:2, explain:"48 = 2⁴ × 3; 80 = 2⁴ × 5. HCF = 2⁴ = 16." },
  { q:"Find the HCF of 6, 12, and 18.", opts:["2","3","6","12"], ans:2, explain:"6 = 2 × 3; 12 = 2² × 3; 18 = 2 × 3². HCF = 2 × 3 = 6 (lowest power of each common prime)." },
  { q:"Find the HCF of 4, 8, and 20.", opts:["1","2","4","8"], ans:2, explain:"4 = 2²; 8 = 2³; 20 = 2² × 5. HCF = 2² = 4." },
  { q:"If HCF(a, b) = 6, which could be a pair (a, b)?", opts:["6 and 9","12 and 18","6 and 7","4 and 6"], ans:1, explain:"HCF(12, 18) = 6. Check: 12 = 2² × 3; 18 = 2 × 3². HCF = 2 × 3 = 6. ✓" },
  { q:"Find the HCF of 90 and 120.", opts:["10","15","30","60"], ans:2, explain:"90 = 2 × 3² × 5; 120 = 2³ × 3 × 5. HCF = 2 × 3 × 5 = 30." },
  { q:"Find the HCF of 84 and 126.", opts:["14","21","42","63"], ans:2, explain:"84 = 2² × 3 × 7; 126 = 2 × 3² × 7. HCF = 2 × 3 × 7 = 42." },
  { q:"Two numbers have HCF 4 and LCM 48. One number is 12. Find the other.", opts:["4","16","24","48"], ans:1, explain:"Use HCF × LCM = product: 4 × 48 = 192. Other number = 192 ÷ 12 = 16." },
  { q:"Find the HCF of 120 and 180.", opts:["20","30","40","60"], ans:3, explain:"120 = 2³ × 3 × 5; 180 = 2² × 3² × 5. HCF = 2² × 3 × 5 = 60." },
  { q:"The HCF of 15 and 20 is:", opts:["3","4","5","10"], ans:2, explain:"15 = 3 × 5; 20 = 2² × 5. HCF = 5." },
  { q:"Find the HCF of 45 and 75.", opts:["5","10","15","25"], ans:2, explain:"45 = 3² × 5; 75 = 3 × 5². HCF = 3 × 5 = 15." },
  { q:"What is the HCF of 13 and 26?", opts:["1","2","13","26"], ans:2, explain:"26 = 2 × 13. So 13 divides both 13 and 26. HCF = 13." },
  { q:"Find the HCF of 3, 9, and 15.", opts:["1","2","3","9"], ans:2, explain:"3 = 3; 9 = 3²; 15 = 3 × 5. Common factor is 3¹. HCF = 3." },
  { q:"Find the HCF of 24 and 60.", opts:["6","8","12","24"], ans:2, explain:"24 = 2³ × 3; 60 = 2² × 3 × 5. HCF = 2² × 3 = 12." },

  // ═══════════════════════════════════════════
  // LCM (Q111–140)
  // ═══════════════════════════════════════════
  { q:"Find the LCM of 4 and 6.", opts:["6","10","12","24"], ans:2, explain:"4 = 2²; 6 = 2 × 3. LCM = 2² × 3 = 12 (highest power of each prime)." },
  { q:"Find the LCM of 6 and 9.", opts:["3","9","18","54"], ans:2, explain:"6 = 2 × 3; 9 = 3². LCM = 2 × 3² = 18." },
  { q:"Find the LCM of 12 and 18.", opts:["6","18","36","54"], ans:2, explain:"12 = 2² × 3; 18 = 2 × 3². LCM = 2² × 3² = 36." },
  { q:"Find the LCM of 5 and 7.", opts:["12","15","35","70"], ans:2, explain:"5 and 7 are both prime and different. LCM = 5 × 7 = 35." },
  { q:"Find the LCM of 8 and 12.", opts:["4","12","24","96"], ans:2, explain:"8 = 2³; 12 = 2² × 3. LCM = 2³ × 3 = 24." },
  { q:"Find the LCM of 15 and 20.", opts:["5","30","60","300"], ans:2, explain:"15 = 3 × 5; 20 = 2² × 5. LCM = 2² × 3 × 5 = 60." },
  { q:"Find the LCM of 3 and 5.", opts:["3","5","8","15"], ans:3, explain:"3 and 5 share no common factors. LCM = 3 × 5 = 15." },
  { q:"Find the LCM of 10 and 15.", opts:["5","25","30","150"], ans:2, explain:"10 = 2 × 5; 15 = 3 × 5. LCM = 2 × 3 × 5 = 30." },
  { q:"Find the LCM of 6 and 8.", opts:["2","14","24","48"], ans:2, explain:"6 = 2 × 3; 8 = 2³. LCM = 2³ × 3 = 24." },
  { q:"Find the LCM of 4 and 9.", opts:["1","13","36","72"], ans:2, explain:"4 = 2²; 9 = 3². No common factors. LCM = 2² × 3² = 36." },
  { q:"Find the LCM of 12 and 16.", opts:["4","24","48","192"], ans:2, explain:"12 = 2² × 3; 16 = 2⁴. LCM = 2⁴ × 3 = 48." },
  { q:"Find the LCM of 20 and 30.", opts:["10","30","60","600"], ans:2, explain:"20 = 2² × 5; 30 = 2 × 3 × 5. LCM = 2² × 3 × 5 = 60." },
  { q:"Find the LCM of 9 and 15.", opts:["3","15","45","135"], ans:2, explain:"9 = 3²; 15 = 3 × 5. LCM = 3² × 5 = 45." },
  { q:"Find the LCM of 14 and 21.", opts:["7","21","42","294"], ans:2, explain:"14 = 2 × 7; 21 = 3 × 7. LCM = 2 × 3 × 7 = 42." },
  { q:"Find the LCM of 2, 3, and 5.", opts:["10","15","30","60"], ans:2, explain:"2, 3, 5 are all prime and distinct. LCM = 2 × 3 × 5 = 30." },
  { q:"Find the LCM of 4, 6, and 10.", opts:["30","60","120","240"], ans:1, explain:"4 = 2²; 6 = 2 × 3; 10 = 2 × 5. LCM = 2² × 3 × 5 = 60." },
  { q:"Find the LCM of 25 and 40.", opts:["5","100","200","1000"], ans:2, explain:"25 = 5²; 40 = 2³ × 5. LCM = 2³ × 5² = 200." },
  { q:"If LCM(a, b) = 36, which could be a pair (a, b)?", opts:["4 and 8","9 and 12","6 and 8","4 and 10"], ans:1, explain:"LCM(9, 12) = LCM(3², 2² × 3) = 2² × 3² = 36. ✓" },
  { q:"Find the LCM of 18 and 24.", opts:["6","36","72","432"], ans:2, explain:"18 = 2 × 3²; 24 = 2³ × 3. LCM = 2³ × 3² = 72." },
  { q:"Find the LCM of 6, 8, and 9.", opts:["18","24","36","72"], ans:3, explain:"6 = 2 × 3; 8 = 2³; 9 = 3². LCM = 2³ × 3² = 72." },
  { q:"Two buses depart at the same time. Bus A comes every 12 min, Bus B every 18 min. When do they next depart together?", opts:["6 min","24 min","36 min","72 min"], ans:2, explain:"Next joint departure = LCM(12, 18) = 36 minutes." },
  { q:"Find the LCM of 30 and 45.", opts:["15","45","90","135"], ans:2, explain:"30 = 2 × 3 × 5; 45 = 3² × 5. LCM = 2 × 3² × 5 = 90." },
  { q:"Find the LCM of 16 and 20.", opts:["4","40","80","320"], ans:2, explain:"16 = 2⁴; 20 = 2² × 5. LCM = 2⁴ × 5 = 80." },
  { q:"HCF(12, 18) = 6 and LCM(12, 18) = 36. Verify: HCF × LCM = ?", opts:["54","72","108","216"], ans:3, explain:"6 × 36 = 216. Also 12 × 18 = 216. The relationship HCF × LCM = product of the two numbers holds." },
  { q:"Find the LCM of 5, 6, and 10.", opts:["10","20","30","60"], ans:2, explain:"5 = 5; 6 = 2 × 3; 10 = 2 × 5. LCM = 2 × 3 × 5 = 30." },
  { q:"Find the LCM of 3, 4, and 6.", opts:["12","18","24","36"], ans:0, explain:"3 = 3; 4 = 2²; 6 = 2 × 3. LCM = 2² × 3 = 12." },
  { q:"Which is larger, LCM(4, 6) or LCM(3, 8)?", opts:["LCM(4,6) = 12","LCM(3,8) = 24","They are equal","Cannot tell"], ans:1, explain:"LCM(4,6) = 12; LCM(3,8) = 24. LCM(3, 8) is larger." },
  { q:"Find the LCM of 2, 4, and 8.", opts:["2","4","8","16"], ans:2, explain:"2 = 2; 4 = 2²; 8 = 2³. LCM = 2³ = 8." },
  { q:"Lights flash together at 0 seconds. Light A flashes every 6 s, Light B every 10 s. When do they next flash together?", opts:["16 s","20 s","30 s","60 s"], ans:2, explain:"LCM(6, 10) = 30 seconds." },
  { q:"Find the LCM of 8 and 20.", opts:["4","20","40","160"], ans:2, explain:"8 = 2³; 20 = 2² × 5. LCM = 2³ × 5 = 40." },

  // ═══════════════════════════════════════════
  // MIXED / APPLIED (Q141–150)
  // ═══════════════════════════════════════════
  { q:"The HCF of 24 and 36 is 12. Their LCM is:", opts:["48","72","108","144"], ans:1, explain:"HCF × LCM = 24 × 36 = 864. LCM = 864 ÷ 12 = 72." },
  { q:"Find the smallest number divisible by both 12 and 15.", opts:["3","30","60","180"], ans:2, explain:"Smallest number divisible by both = LCM(12, 15). 12 = 2² × 3; 15 = 3 × 5. LCM = 2² × 3 × 5 = 60." },
  { q:"What is the largest number that divides both 48 and 60?", opts:["6","8","12","24"], ans:2, explain:"Largest number that divides both = HCF(48, 60). 48 = 2⁴ × 3; 60 = 2² × 3 × 5. HCF = 2² × 3 = 12." },
  { q:"A rope 72 cm long is cut into equal pieces with no waste. Which is the greatest length from the options that gives more than one piece?", opts:["6","8","9","12"], ans:3, explain:"72 = 2³ × 3². All four options divide 72 evenly. The greatest is 12, giving 72 ÷ 12 = 6 equal pieces." },
  { q:"Which of the following is a common multiple of 4 and 6?", opts:["10","14","24","26"], ans:2, explain:"24 = 4 × 6. Multiples of 4: 4, 8, 12, 16, 20, 24… Multiples of 6: 6, 12, 18, 24… 24 appears in both." },
  { q:"Express 360 as a product of prime factors.", opts:["2³ × 3² × 5","2² × 3² × 10","2⁴ × 3 × 5","2³ × 3 × 5²"], ans:0, explain:"360 = 8 × 45 = 8 × 9 × 5 = 2³ × 3² × 5." },
  { q:"Find the HCF and LCM of 12 and 20. What is HCF + LCM?", opts:["62","64","66","68"], ans:1, explain:"12 = 2² × 3; 20 = 2² × 5. HCF = 2² = 4; LCM = 2² × 3 × 5 = 60. HCF + LCM = 4 + 60 = 64." },
  { q:"Two numbers are 2² × 3 and 2 × 3². Their HCF is:", opts:["6","12","18","36"], ans:0, explain:"2² × 3 = 12; 2 × 3² = 18. HCF = 2¹ × 3¹ = 6 (lowest power of each common prime)." },
  { q:"Two numbers are 2² × 3 and 2 × 3². Their LCM is:", opts:["12","18","36","72"], ans:2, explain:"2² × 3 = 12; 2 × 3² = 18. LCM = 2² × 3² = 4 × 9 = 36 (highest power of each prime)." },
  { q:"√(4 × 9 × 25) equals:", opts:["15","25","30","38"], ans:2, explain:"√(4 × 9 × 25) = √4 × √9 × √25 = 2 × 3 × 5 = 30." },
]
