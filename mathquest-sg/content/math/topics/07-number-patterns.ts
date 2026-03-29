import type { TopicMeta, MCQuestion } from '../../../src/types/curriculum';

export const meta: TopicMeta = {
  id: 7, sem: 1,
  title: 'Number Patterns',
  desc: 'Sequences, nth term, general term, special patterns'
};

export const notes: string | null = `
  <h2>Number Patterns</h2>
  <p class="topic-desc">Sequences, nth term formula, and special number patterns</p>

  <div class="notes-card">
    <h3>1. Sequences</h3>
    <p>A <strong>sequence</strong> is an ordered list of numbers following a rule. Each number is called a <strong>term</strong>.</p>
    <div class="example">
      2, 5, 8, 11, 14, &hellip; &rarr; add 3 each time<br>
      T(1) = 2, T(2) = 5, T(3) = 8, &hellip;<br><br>
      <strong>Common difference (d):</strong> the constant added each time in an arithmetic sequence.<br>
      Here d = 3.
    </div>
  </div>

  <div class="notes-card">
    <h3>2. Arithmetic Sequences</h3>
    <p>An <strong>arithmetic sequence</strong> has a constant common difference between consecutive terms.</p>
    <div class="example">
      First term = a, common difference = d<br>
      T(1) = a<br>
      T(2) = a + d<br>
      T(3) = a + 2d<br>
      <strong>T(n) = a + (n &minus; 1)d</strong><br><br>
      Example: 5, 9, 13, 17, &hellip;<br>
      a = 5, d = 4<br>
      T(n) = 5 + (n &minus; 1)(4) = 5 + 4n &minus; 4 = <span class="highlight">4n + 1</span><br>
      Check: T(1) = 5 &#10004;, T(2) = 9 &#10004;
    </div>
  </div>

  <div class="notes-card">
    <h3>3. Finding the nth Term</h3>
    <p>For a linear pattern, the nth term has the form <strong>T(n) = an + b</strong>.</p>
    <div class="example">
      <strong>Method:</strong><br>
      1. Find the common difference d &rarr; this is the coefficient of n.<br>
      2. Work out b by substituting n = 1.<br><br>
      Sequence: 3, 7, 11, 15, &hellip;<br>
      d = 4, so T(n) = 4n + b.<br>
      T(1) = 4(1) + b = 3 &rarr; b = &minus;1.<br>
      T(n) = <span class="highlight">4n &minus; 1</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>4. Special Number Patterns</h3>
    <div class="example">
      <strong>Square numbers:</strong> 1, 4, 9, 16, 25, &hellip; &rarr; T(n) = n&sup2;<br>
      <strong>Triangular numbers:</strong> 1, 3, 6, 10, 15, &hellip; &rarr; T(n) = n(n+1)/2<br>
      <strong>Cube numbers:</strong> 1, 8, 27, 64, 125, &hellip; &rarr; T(n) = n&sup3;<br>
      <strong>Powers of 2:</strong> 2, 4, 8, 16, 32, &hellip; &rarr; T(n) = 2&#8319;<br>
      <strong>Fibonacci-type:</strong> 1, 1, 2, 3, 5, 8, &hellip; &rarr; each term = sum of previous two
    </div>
  </div>

  <div class="notes-card">
    <h3>5. Patterns from Tables and Diagrams</h3>
    <p>Look for the relationship between the figure number (n) and the number of objects.</p>
    <div class="example">
      <strong>Example (matchstick pattern):</strong><br>
      Figure 1: 4 matchsticks<br>
      Figure 2: 7 matchsticks<br>
      Figure 3: 10 matchsticks<br>
      Common difference = 3, so T(n) = 3n + b.<br>
      T(1) = 3 + b = 4 &rarr; b = 1.<br>
      T(n) = <span class="highlight">3n + 1</span>
    </div>
  </div>
`;

export const questions: MCQuestion[] | null = [
  // ===== SKILL: identify-patterns (Q1–Q50) =====
  { q: 'What is the next number in the sequence: 2, 5, 8, 11, ...?', opts: ['12', '13', '14', '15'], ans: 2, explain: 'Common difference = 3. Next term = 11 + 3 = 14.' },
  { q: 'What is the next number in the sequence: 3, 7, 11, 15, ...?', opts: ['17', '18', '19', '20'], ans: 2, explain: 'Common difference = 4. Next term = 15 + 4 = 19.' },
  { q: 'What is the next number in the sequence: 10, 8, 6, 4, ...?', opts: ['3', '2', '0', '1'], ans: 1, explain: 'Common difference = −2. Next term = 4 − 2 = 2.' },
  { q: 'What is the next number in the sequence: 1, 4, 9, 16, ...?', opts: ['20', '21', '24', '25'], ans: 3, explain: 'These are square numbers: 1², 2², 3², 4². Next = 5² = 25.' },
  { q: 'What is the next number in the sequence: 2, 4, 8, 16, ...?', opts: ['24', '32', '18', '20'], ans: 1, explain: 'Each term is doubled. Next = 16 × 2 = 32.' },
  { q: 'What is the next number in the sequence: 1, 3, 6, 10, ...?', opts: ['13', '14', '15', '16'], ans: 2, explain: 'Triangular numbers. Differences: +2, +3, +4, so next +5: 10 + 5 = 15.' },
  { q: 'What is the next number in the sequence: 100, 95, 90, 85, ...?', opts: ['75', '80', '70', '82'], ans: 1, explain: 'Common difference = −5. Next = 85 − 5 = 80.' },
  { q: 'What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ...?', opts: ['11', '12', '13', '10'], ans: 2, explain: 'Fibonacci: each term = sum of previous two. 5 + 8 = 13.' },
  { q: 'What is the common difference of: 4, 9, 14, 19, 24?', opts: ['4', '5', '6', '9'], ans: 1, explain: '9 − 4 = 5' },
  { q: 'What is the common difference of: 20, 17, 14, 11, 8?', opts: ['−3', '3', '−2', '2'], ans: 0, explain: '17 − 20 = −3' },
  { q: 'What is the common difference of: 1, 5, 9, 13, 17?', opts: ['3', '4', '5', '6'], ans: 1, explain: '5 − 1 = 4' },
  { q: 'Which sequence is arithmetic?', opts: ['1, 2, 4, 8, 16', '3, 6, 9, 12, 15', '1, 1, 2, 3, 5', '1, 4, 9, 16, 25'], ans: 1, explain: 'An arithmetic sequence has constant common difference. 3, 6, 9, 12, 15 has d = 3.' },
  { q: 'Which sequence is NOT arithmetic?', opts: ['5, 10, 15, 20', '2, 5, 8, 11', '1, 2, 4, 7', '−3, 0, 3, 6'], ans: 2, explain: '1, 2, 4, 7 has differences 1, 2, 3 — not constant.' },
  { q: 'What is the 5th term of: 6, 10, 14, 18, ...?', opts: ['20', '22', '24', '26'], ans: 1, explain: 'd = 4. T(5) = 18 + 4 = 22.' },
  { q: 'What is the 6th term of: 3, 8, 13, 18, 23, ...?', opts: ['27', '28', '30', '33'], ans: 1, explain: 'd = 5. T(6) = 23 + 5 = 28.' },
  { q: 'Find the missing term: 7, ?, 15, 19, 23', opts: ['9', '10', '11', '12'], ans: 2, explain: 'd = 4. Second term = 7 + 4 = 11.' },
  { q: 'Find the missing term: 2, 6, ?, 14, 18', opts: ['8', '9', '10', '12'], ans: 2, explain: 'd = 4. Third term = 6 + 4 = 10.' },
  { q: 'The first term is 5 and the common difference is 3. What is the 4th term?', opts: ['14', '17', '11', '20'], ans: 0, explain: 'T(4) = 5 + 3(3) = 5 + 9 = 14.' },
  { q: 'The first term is 100 and the common difference is −7. What is the 5th term?', opts: ['72', '79', '65', '86'], ans: 0, explain: 'T(5) = 100 + 4(−7) = 100 − 28 = 72.' },
  { q: 'In the pattern 2, 6, 18, 54, ..., each term is multiplied by:', opts: ['2', '3', '4', '6'], ans: 1, explain: '6/2 = 3, 18/6 = 3, 54/18 = 3. Common ratio = 3.' },
  { q: 'What is the next term: 2, 6, 18, 54, ...?', opts: ['108', '162', '72', '216'], ans: 1, explain: '54 × 3 = 162' },
  { q: 'What is the next term: 81, 27, 9, 3, ...?', opts: ['0', '1', '−3', '1/3'], ans: 1, explain: 'Each term ÷ 3. Next = 3 ÷ 3 = 1.' },
  { q: 'What is the next term: 5, 10, 20, 40, ...?', opts: ['50', '60', '80', '100'], ans: 2, explain: 'Each term × 2. Next = 40 × 2 = 80.' },
  { q: 'In the pattern 1, 4, 9, 16, 25, what type of numbers are these?', opts: ['Prime numbers', 'Triangular numbers', 'Square numbers', 'Cube numbers'], ans: 2, explain: '1 = 1², 4 = 2², 9 = 3², 16 = 4², 25 = 5². Square numbers.' },
  { q: 'In the pattern 1, 3, 6, 10, 15, what type of numbers are these?', opts: ['Square numbers', 'Prime numbers', 'Triangular numbers', 'Cube numbers'], ans: 2, explain: 'These are triangular numbers: T(n) = n(n+1)/2.' },
  { q: 'What is the 6th triangular number?', opts: ['18', '21', '15', '28'], ans: 1, explain: 'T(6) = 6(7)/2 = 21' },
  { q: 'What is the 7th square number?', opts: ['36', '42', '49', '56'], ans: 2, explain: '7² = 49' },
  { q: 'What are the first 5 cube numbers?', opts: ['1, 4, 9, 16, 25', '1, 8, 27, 64, 125', '1, 3, 9, 27, 81', '2, 4, 8, 16, 32'], ans: 1, explain: '1³=1, 2³=8, 3³=27, 4³=64, 5³=125' },
  { q: 'What is the next number: 1, 8, 27, 64, ...?', opts: ['100', '81', '125', '216'], ans: 2, explain: 'Cube numbers. Next = 5³ = 125.' },
  { q: 'The sequence 2, 4, 8, 16, 32 are powers of:', opts: ['3', '4', '2', '8'], ans: 2, explain: '2¹, 2², 2³, 2⁴, 2⁵ — powers of 2.' },
  { q: 'What is the 8th term of: 1, 2, 4, 8, 16, ...?', opts: ['64', '128', '256', '32'], ans: 1, explain: 'T(n) = 2^(n−1). T(8) = 2⁷ = 128.' },
  { q: 'Find the pattern rule: 5, 11, 17, 23, 29, ...', opts: ['Add 5', 'Add 6', 'Add 7', 'Multiply by 2'], ans: 1, explain: '11 − 5 = 6. Common difference = 6.' },
  { q: 'Find the pattern rule: 50, 43, 36, 29, 22, ...', opts: ['Subtract 6', 'Subtract 7', 'Subtract 8', 'Divide by 2'], ans: 1, explain: '43 − 50 = −7. Common difference = −7.' },
  { q: 'Which number comes next: 3, 5, 9, 15, 23, ...?', opts: ['29', '31', '33', '35'], ans: 2, explain: 'Differences: 2, 4, 6, 8 → next difference = 10. 23 + 10 = 33.' },
  { q: 'Which number comes next: 1, 2, 5, 10, 17, ...?', opts: ['24', '25', '26', '28'], ans: 2, explain: 'Differences: 1, 3, 5, 7 → next difference = 9. 17 + 9 = 26.' },
  { q: 'A student counts chairs arranged in rows: Row 1 has 5, Row 2 has 8, Row 3 has 11. How many in Row 5?', opts: ['14', '17', '20', '23'], ans: 1, explain: 'd = 3. Row 4 = 14, Row 5 = 17.' },
  { q: 'At a kopitiam, Table 1 seats 4 people, Table 2 seats 6, Table 3 seats 8. How many does Table 7 seat?', opts: ['14', '16', '18', '20'], ans: 1, explain: 'd = 2. T(7) = 4 + 6(2) = 16.' },
  { q: 'HDB Block 1 has 10 floors, Block 2 has 14 floors, Block 3 has 18 floors. Block 6 has:', opts: ['26', '28', '30', '32'], ans: 2, explain: 'd = 4. T(6) = 10 + 5(4) = 30.' },
  { q: 'MRT Station 1 is 2 km from home, Station 2 is 5 km, Station 3 is 8 km. Station 10 is:', opts: ['29 km', '32 km', '27 km', '30 km'], ans: 0, explain: 'd = 3. T(10) = 2 + 9(3) = 29 km.' },
  { q: 'A pattern of dots: Row 1 = 1, Row 2 = 3, Row 3 = 5, Row 4 = 7. What kind of numbers are these?', opts: ['Even', 'Odd', 'Prime', 'Square'], ans: 1, explain: '1, 3, 5, 7 — these are odd numbers (also an arithmetic sequence with d = 2).' },
  { q: 'The sequence 2, 6, 12, 20, 30 has differences 4, 6, 8, 10. What is the next term?', opts: ['40', '42', '36', '38'], ans: 1, explain: 'Next difference = 12. 30 + 12 = 42.' },
  { q: 'Identify the pattern: 0, 3, 8, 15, 24, ...', opts: ['n² − 1', 'n² + 1', '2n + 1', 'n(n+1)'], ans: 0, explain: 'When n=1: 0, n=2: 3, n=3: 8, n=4: 15, n=5: 24. These are n² − 1.' },
  { q: 'A sequence starts 10, 7, 4, 1, −2. The common difference is:', opts: ['3', '−3', '7', '−7'], ans: 1, explain: '7 − 10 = −3' },
  { q: 'Fill in the blank: 4, 11, 18, __, 32', opts: ['24', '25', '26', '27'], ans: 1, explain: 'd = 7. Fourth term = 18 + 7 = 25.' },
  { q: 'The pattern 1, 2, 4, 7, 11, 16 has second differences of:', opts: ['1', '2', '3', 'Not constant'], ans: 0, explain: 'First differences: 1, 2, 3, 4, 5. Second differences: 1, 1, 1, 1 — constant at 1.' },
  { q: 'What are the next two terms: 1, 4, 10, 20, 35, ...?', opts: ['56, 84', '50, 70', '55, 80', '42, 56'], ans: 0, explain: 'Differences: 3, 6, 10, 15 → next: 21, 28. So 35+21=56, 56+28=84.' },
  { q: 'In a stack of oranges, Layer 1 has 1, Layer 2 has 4, Layer 3 has 9, Layer 4 has 16. Layer 8 has:', opts: ['36', '49', '64', '81'], ans: 2, explain: 'Square numbers. Layer n = n². Layer 8 = 64.' },
  { q: 'A tiling pattern needs 3 tiles for Figure 1, 5 tiles for Figure 2, 7 tiles for Figure 3. Figure 10 needs:', opts: ['19', '21', '23', '25'], ans: 1, explain: 'd = 2. T(10) = 3 + 9(2) = 21.' },
  { q: 'Mei Ling saves $5 in Week 1, $8 in Week 2, $11 in Week 3. How much in Week 10?', opts: ['$30', '$32', '$35', '$38'], ans: 1, explain: 'd = 3. T(10) = 5 + 9(3) = $32.' },
  { q: 'The number of handshakes between n people is n(n−1)/2. For 6 people:', opts: ['12', '15', '18', '30'], ans: 1, explain: '6(5)/2 = 15 handshakes.' },

  // ===== SKILL: nth-term (Q51–Q110) =====
  { q: 'Find the nth term: 3, 5, 7, 9, ...', opts: ['2n + 1', '2n − 1', 'n + 2', '3n'], ans: 0, explain: 'd = 2. T(n) = 2n + b. T(1) = 2+b = 3, b = 1. T(n) = 2n + 1.' },
  { q: 'Find the nth term: 5, 8, 11, 14, ...', opts: ['3n + 5', '3n + 2', '5n + 3', '3n − 1'], ans: 1, explain: 'd = 3. T(n) = 3n + b. T(1) = 3+b = 5, b = 2. T(n) = 3n + 2.' },
  { q: 'Find the nth term: 2, 7, 12, 17, ...', opts: ['5n − 3', '5n + 2', '2n + 5', '5n − 2'], ans: 0, explain: 'd = 5. T(n) = 5n + b. T(1) = 5+b = 2, b = −3. T(n) = 5n − 3.' },
  { q: 'Find the nth term: 4, 7, 10, 13, ...', opts: ['3n + 4', '3n + 1', '4n + 3', '3n − 1'], ans: 1, explain: 'd = 3. T(1) = 3+b = 4, b = 1. T(n) = 3n + 1.' },
  { q: 'Find the nth term: 1, 6, 11, 16, ...', opts: ['5n − 4', '5n + 1', '6n − 5', '5n − 1'], ans: 0, explain: 'd = 5. T(1) = 5+b = 1, b = −4. T(n) = 5n − 4.' },
  { q: 'Find the nth term: 10, 13, 16, 19, ...', opts: ['3n + 10', '3n + 7', '10n + 3', 'n + 9'], ans: 1, explain: 'd = 3. T(1) = 3+b = 10, b = 7. T(n) = 3n + 7.' },
  { q: 'Find the nth term: 6, 10, 14, 18, ...', opts: ['4n + 6', '4n + 2', '6n + 4', '2n + 4'], ans: 1, explain: 'd = 4. T(1) = 4+b = 6, b = 2. T(n) = 4n + 2.' },
  { q: 'Find the nth term: 20, 17, 14, 11, ...', opts: ['−3n + 23', '−3n + 20', '3n + 17', '20 − n'], ans: 0, explain: 'd = −3. T(1) = −3+b = 20, b = 23. T(n) = −3n + 23.' },
  { q: 'Find the nth term: 50, 45, 40, 35, ...', opts: ['−5n + 55', '−5n + 50', '5n − 45', '50 − n'], ans: 0, explain: 'd = −5. T(1) = −5+b = 50, b = 55. T(n) = −5n + 55.' },
  { q: 'Find the nth term: 0, 3, 6, 9, ...', opts: ['3n', '3n − 3', 'n + 3', '3n + 3'], ans: 1, explain: 'd = 3. T(1) = 3+b = 0, b = −3. T(n) = 3n − 3.' },
  { q: 'The nth term of a sequence is 4n − 1. What is T(5)?', opts: ['19', '20', '15', '21'], ans: 0, explain: 'T(5) = 4(5) − 1 = 19' },
  { q: 'The nth term of a sequence is 4n − 1. What is T(10)?', opts: ['39', '40', '41', '36'], ans: 0, explain: 'T(10) = 4(10) − 1 = 39' },
  { q: 'The nth term is 2n + 5. What is T(1)?', opts: ['5', '7', '2', '3'], ans: 1, explain: 'T(1) = 2(1) + 5 = 7' },
  { q: 'The nth term is 2n + 5. What is T(20)?', opts: ['45', '25', '40', '50'], ans: 0, explain: 'T(20) = 2(20) + 5 = 45' },
  { q: 'The nth term is 7n − 2. Find T(8).', opts: ['54', '56', '58', '50'], ans: 0, explain: 'T(8) = 7(8) − 2 = 54' },
  { q: 'The nth term is −2n + 30. Find T(10).', opts: ['10', '50', '20', '8'], ans: 0, explain: 'T(10) = −2(10) + 30 = 10' },
  { q: 'If T(n) = 3n + 4, which term equals 25?', opts: ['n = 6', 'n = 7', 'n = 8', 'n = 9'], ans: 1, explain: '3n + 4 = 25, 3n = 21, n = 7' },
  { q: 'If T(n) = 5n − 2, which term equals 48?', opts: ['n = 10', 'n = 8', 'n = 9', 'n = 46'], ans: 0, explain: '5n − 2 = 48, 5n = 50, n = 10' },
  { q: 'If T(n) = 2n + 1, which term equals 41?', opts: ['n = 20', 'n = 21', 'n = 19', 'n = 42'], ans: 0, explain: '2n + 1 = 41, 2n = 40, n = 20' },
  { q: 'If T(n) = 4n + 3, is 50 a term in this sequence?', opts: ['Yes, n = 12', 'No', 'Yes, n = 47/4', 'Yes, n = 13'], ans: 1, explain: '4n + 3 = 50, 4n = 47, n = 47/4. Not a whole number, so 50 is not a term.' },
  { q: 'If T(n) = 6n − 1, is 35 a term in this sequence?', opts: ['Yes, n = 6', 'Yes, n = 5', 'No', 'Yes, n = 7'], ans: 0, explain: '6n − 1 = 35, 6n = 36, n = 6. Yes, 35 is the 6th term.' },
  { q: 'The sequence has T(n) = n + 5. The first 4 terms are:', opts: ['6, 7, 8, 9', '5, 6, 7, 8', '1, 2, 3, 4', '6, 8, 10, 12'], ans: 0, explain: 'T(1)=6, T(2)=7, T(3)=8, T(4)=9.' },
  { q: 'The sequence has T(n) = 10 − n. The first 4 terms are:', opts: ['10, 9, 8, 7', '9, 8, 7, 6', '11, 12, 13, 14', '10, 20, 30, 40'], ans: 1, explain: 'T(1)=9, T(2)=8, T(3)=7, T(4)=6.' },
  { q: 'Find the nth term: 8, 11, 14, 17, ...', opts: ['3n + 8', '3n + 5', '8n + 3', 'n + 7'], ans: 1, explain: 'd = 3. T(1) = 3+b = 8, b = 5. T(n) = 3n + 5.' },
  { q: 'Find the nth term: 7, 13, 19, 25, ...', opts: ['6n − 1', '6n + 1', '7n − 6', '6n + 7'], ans: 1, explain: 'd = 6. T(1) = 6+b = 7, b = 1. T(n) = 6n + 1.' },
  { q: 'Find the nth term: 1, 3, 5, 7, ...', opts: ['2n − 1', '2n + 1', 'n + 1', 'n − 1'], ans: 0, explain: 'd = 2. T(1) = 2+b = 1, b = −1. T(n) = 2n − 1. (Odd numbers!)' },
  { q: 'Find the nth term: 2, 4, 6, 8, ...', opts: ['n + 2', '2n', '2n + 2', 'n²'], ans: 1, explain: 'd = 2. T(1) = 2+b = 2, b = 0. T(n) = 2n. (Even numbers!)' },
  { q: 'The 10th term of the sequence with T(n) = 3n − 2 is:', opts: ['28', '30', '32', '27'], ans: 0, explain: 'T(10) = 3(10) − 2 = 28' },
  { q: 'The 50th term of the sequence with T(n) = 2n + 3 is:', opts: ['100', '103', '53', '105'], ans: 1, explain: 'T(50) = 2(50) + 3 = 103' },
  { q: 'The 100th term of the sequence with T(n) = n + 99 is:', opts: ['199', '200', '100', '198'], ans: 0, explain: 'T(100) = 100 + 99 = 199' },
  { q: 'A matchstick pattern: Fig 1 = 4, Fig 2 = 7, Fig 3 = 10. Find T(n).', opts: ['3n + 1', '4n + 3', '3n + 4', 'n + 3'], ans: 0, explain: 'd = 3. T(1) = 3+b = 4, b = 1. T(n) = 3n + 1.' },
  { q: 'A matchstick pattern: Fig 1 = 5, Fig 2 = 9, Fig 3 = 13. Find T(n).', opts: ['4n + 5', '5n + 4', '4n + 1', '5n − 1'], ans: 2, explain: 'd = 4. T(1) = 4+b = 5, b = 1. T(n) = 4n + 1.' },
  { q: 'A tile pattern: Fig 1 = 3, Fig 2 = 5, Fig 3 = 7. Find T(20).', opts: ['41', '43', '40', '39'], ans: 0, explain: 'T(n) = 2n + 1. T(20) = 41.' },
  { q: 'A dot pattern: Fig 1 = 6, Fig 2 = 11, Fig 3 = 16. Find T(n).', opts: ['5n + 1', '6n + 5', '5n − 1', '5n + 6'], ans: 0, explain: 'd = 5. T(1) = 5+b = 6, b = 1. T(n) = 5n + 1.' },
  { q: 'Using T(n) = 5n + 1, how many dots in Figure 12?', opts: ['60', '61', '62', '65'], ans: 1, explain: 'T(12) = 5(12) + 1 = 61' },
  { q: 'The first term of a sequence is 8 and the common difference is 5. What is T(n)?', opts: ['5n + 8', '5n + 3', '8n + 5', '5n − 3'], ans: 1, explain: 'T(n) = a + (n−1)d = 8 + 5(n−1) = 8 + 5n − 5 = 5n + 3.' },
  { q: 'The first term is 100 and the common difference is −4. What is T(n)?', opts: ['−4n + 104', '−4n + 100', '4n + 96', '100 − n'], ans: 0, explain: 'T(n) = 100 + (n−1)(−4) = 100 − 4n + 4 = −4n + 104.' },
  { q: 'T(n) = −4n + 104. What is T(25)?', opts: ['4', '0', '−4', '8'], ans: 0, explain: 'T(25) = −100 + 104 = 4' },
  { q: 'A sequence has T(3) = 14 and T(7) = 30. Find the common difference.', opts: ['4', '8', '16', '2'], ans: 0, explain: 'd = (30 − 14)/(7 − 3) = 16/4 = 4' },
  { q: 'A sequence has T(2) = 9 and T(5) = 21. Find the common difference.', opts: ['3', '4', '6', '12'], ans: 1, explain: 'd = (21 − 9)/(5 − 2) = 12/3 = 4' },
  { q: 'A sequence has a = 3 and d = 6. Which term equals 57?', opts: ['n = 10', 'n = 9', 'n = 8', 'n = 11'], ans: 0, explain: '3 + (n−1)(6) = 57, 6n − 3 = 57, 6n = 60, n = 10.' },
  { q: 'A sequence has a = 7 and d = 4. Which term first exceeds 100?', opts: ['n = 24', 'n = 25', 'n = 23', 'n = 26'], ans: 1, explain: 'T(n) = 4n + 3 > 100, 4n > 97, n > 24.25. So n = 25 is the first integer. T(25) = 103.' },
  { q: 'Find the nth term: 100, 93, 86, 79, ...', opts: ['−7n + 107', '−7n + 100', '7n − 93', '100 − 7n'], ans: 0, explain: 'd = −7. T(1) = −7+b = 100, b = 107. T(n) = −7n + 107.' },
  { q: 'Find the nth term: 1/2, 1, 3/2, 2, ...', opts: ['n/2', '(n+1)/2', '(n−1)/2', '2n'], ans: 0, explain: 'd = 1/2. T(n) = (1/2)n + b. T(1) = 1/2+b = 1/2, b = 0. T(n) = n/2.' },
  { q: 'The first term of a sequence is 12 and T(n) = 4n + 8. Is this correct?', opts: ['Yes', 'No, should be 4n + 12', 'No, should be 4n − 8', 'No, should be 12n + 4'], ans: 0, explain: 'T(1) = 4(1) + 8 = 12. Yes, this matches.' },
  { q: 'Ahmad writes: T(n) = 3n + 2. He claims T(5) = 18. Is he correct?', opts: ['Yes', 'No, T(5) = 17', 'No, T(5) = 13', 'No, T(5) = 15'], ans: 1, explain: 'T(5) = 3(5) + 2 = 17, not 18.' },
  { q: 'How many terms of the sequence T(n) = 2n − 1 are less than 30?', opts: ['14', '15', '16', '13'], ans: 1, explain: '2n − 1 < 30, 2n < 31, n < 15.5. So n can be 1 to 15 — that is 15 terms.' },
  { q: 'In the sequence T(n) = 5n + 2, find the sum of the first 3 terms.', opts: ['30', '36', '33', '27'], ans: 1, explain: 'T(1)=7, T(2)=12, T(3)=17. Sum = 7+12+17 = 36.' },

  // ===== SKILL: special-sequences (Q111–Q150) =====
  { q: 'What is the 10th square number?', opts: ['81', '100', '121', '90'], ans: 1, explain: '10² = 100' },
  { q: 'What is the 8th triangular number?', opts: ['28', '36', '45', '21'], ans: 1, explain: 'T(8) = 8(9)/2 = 36' },
  { q: 'What is the 5th triangular number?', opts: ['10', '15', '20', '25'], ans: 1, explain: 'T(5) = 5(6)/2 = 15' },
  { q: 'The sum of the first n natural numbers is:', opts: ['n²', 'n(n+1)/2', 'n(n−1)/2', '2n'], ans: 1, explain: '1+2+3+...+n = n(n+1)/2 (triangular number formula).' },
  { q: 'What is 1 + 2 + 3 + ... + 20?', opts: ['190', '200', '210', '220'], ans: 2, explain: '20(21)/2 = 210' },
  { q: 'What is 1 + 2 + 3 + ... + 50?', opts: ['1225', '1250', '1275', '1300'], ans: 2, explain: '50(51)/2 = 1275' },
  { q: 'The 4th cube number is:', opts: ['12', '27', '64', '81'], ans: 2, explain: '4³ = 64' },
  { q: 'Which of these is both a square and a triangular number?', opts: ['4', '9', '36', '25'], ans: 2, explain: '36 = 6² and 36 = 8(9)/2 = 36. It is both.' },
  { q: 'The sequence 1, 3, 6, 10, 15 ... The 10th term is:', opts: ['45', '50', '55', '60'], ans: 2, explain: 'T(10) = 10(11)/2 = 55' },
  { q: 'How many dots form the 6th triangular number?', opts: ['15', '18', '21', '24'], ans: 2, explain: 'T(6) = 6(7)/2 = 21' },
  { q: 'The pattern of square numbers: 1, 4, 9, 16, 25. The differences between consecutive terms are:', opts: ['1, 2, 3, 4', '3, 5, 7, 9', '2, 4, 6, 8', '1, 3, 5, 7'], ans: 1, explain: '4−1=3, 9−4=5, 16−9=7, 25−16=9. The differences are consecutive odd numbers.' },
  { q: 'The sum of the first n odd numbers equals:', opts: ['n(n+1)/2', 'n²', '2n', 'n(n+1)'], ans: 1, explain: '1+3+5+...+(2n−1) = n². For example: 1+3+5+7 = 16 = 4².' },
  { q: '1 + 3 + 5 + 7 + 9 = ?', opts: ['20', '25', '16', '36'], ans: 1, explain: 'Sum of first 5 odd numbers = 5² = 25.' },
  { q: '2 + 4 + 6 + 8 + 10 = ?', opts: ['20', '25', '30', '35'], ans: 2, explain: 'Sum = 5 × 6 = 30. (Or: n(n+1) where n = 5.)' },
  { q: 'The Fibonacci sequence starts 1, 1, 2, 3, 5, 8. What is the 8th term?', opts: ['13', '21', '34', '55'], ans: 1, explain: 'Continuing: 13, 21. The 8th term is 21.' },
  { q: 'In the Fibonacci sequence, T(10) = 55. What is T(11)?', opts: ['89', '76', '110', '66'], ans: 0, explain: 'T(9) = 34, T(10) = 55. T(11) = 34 + 55 = 89.' },
  { q: 'Which number is a perfect square?', opts: ['50', '64', '72', '80'], ans: 1, explain: '64 = 8² is a perfect square.' },
  { q: 'Which number is a perfect cube?', opts: ['16', '25', '27', '36'], ans: 2, explain: '27 = 3³ is a perfect cube.' },
  { q: 'Which number is both a perfect square and a perfect cube?', opts: ['8', '27', '36', '64'], ans: 3, explain: '64 = 8² = 4³ — both a perfect square and cube.' },
  { q: 'The sequence 1, 8, 27, 64, 125 — the differences are 7, 19, 37, 61. Are these constant?', opts: ['Yes', 'No', 'Almost constant', 'Only the first two'], ans: 1, explain: '7, 19, 37, 61 are not constant. Cube numbers are not arithmetic.' },
  { q: 'A square number can be expressed as the sum of consecutive odd numbers. 16 = ?', opts: ['1+3+5+7', '2+4+6+4', '4+4+4+4', '8+8'], ans: 0, explain: '16 = 1+3+5+7 (sum of first 4 odd numbers = 4²).' },
  { q: 'The pattern of pentagonal numbers starts: 1, 5, 12, 22, 35. The common second difference is:', opts: ['2', '3', '4', '5'], ans: 1, explain: 'First differences: 4, 7, 10, 13. Second differences: 3, 3, 3. Constant at 3.' },
  { q: 'A tower of cubes: Level 1 uses 1 cube, Level 2 uses 4, Level 3 uses 9. Total cubes for 4 levels?', opts: ['16', '20', '25', '30'], ans: 3, explain: '1 + 4 + 9 + 16 = 30' },
  { q: 'A staircase has 1 block on top, 2 on the next step, 3 on the next, etc. Total blocks for 8 steps?', opts: ['28', '36', '45', '64'], ans: 1, explain: '1+2+...+8 = 8(9)/2 = 36' },
  { q: 'The nth term of square numbers is:', opts: ['n(n+1)', 'n²', '2n', 'n(n+1)/2'], ans: 1, explain: 'Square numbers: T(n) = n².' },
  { q: 'The nth term of triangular numbers is:', opts: ['n²', 'n(n+1)', 'n(n+1)/2', '(n+1)/2'], ans: 2, explain: 'Triangular numbers: T(n) = n(n+1)/2.' },
  { q: 'The sequence 0, 1, 4, 9, 16, 25 has nth term:', opts: ['(n−1)²', 'n² − 1', 'n²', '(n+1)²'], ans: 0, explain: 'T(1)=0=0², T(2)=1=1², T(3)=4=2². So T(n) = (n−1)².' },
  { q: 'The sequence 2, 5, 10, 17, 26 has nth term:', opts: ['n² + 1', 'n² − 1', '2n + 1', 'n² + n'], ans: 0, explain: '2=1²+1, 5=2²+1, 10=3²+1, 17=4²+1. T(n) = n² + 1.' },
  { q: 'The sequence 0, 3, 8, 15, 24 has nth term:', opts: ['n² − 1', 'n(n+1)', 'n² + 1', '(n+1)² − 2'], ans: 0, explain: '0=1²−1, 3=2²−1, 8=3²−1, 15=4²−1. T(n) = n² − 1.' },
  { q: 'The sequence 3, 6, 11, 18, 27 has nth term:', opts: ['n² + 2', 'n² + 3', '3n²', 'n² − 2'], ans: 0, explain: '3=1²+2, 6=2²+2, 11=3²+2, 18=4²+2. T(n) = n² + 2.' },
  { q: 'The sequence 4, 7, 12, 19, 28 has nth term:', opts: ['n² + 3', 'n² + 4', '4n + 3', '(n+1)²'], ans: 0, explain: '4=1²+3, 7=2²+3, 12=3²+3, 19=4²+3. T(n) = n² + 3.' },
  { q: 'The sequence 1, 4, 9, 16, 25 is produced by T(n) = n². What is T(15)?', opts: ['225', '210', '240', '150'], ans: 0, explain: '15² = 225' },
  { q: 'Using T(n) = n(n+1)/2, find T(12).', opts: ['66', '72', '78', '84'], ans: 2, explain: '12(13)/2 = 78' },
  { q: 'A student builds L-shaped figures. Fig 1 has 3 squares, Fig 2 has 5, Fig 3 has 7. Find the nth term.', opts: ['2n + 1', '2n − 1', '3n', 'n + 2'], ans: 0, explain: 'd = 2. T(1) = 2+b = 3, b = 1. T(n) = 2n + 1.' },
  { q: 'A growing pattern: Fig 1 = 1 circle, Fig 2 = 4, Fig 3 = 9, Fig 4 = 16. What kind of pattern?', opts: ['Arithmetic', 'Square numbers', 'Triangular numbers', 'Fibonacci'], ans: 1, explain: '1, 4, 9, 16 = 1², 2², 3², 4². Square numbers.' },
  { q: 'In the sequence 2, 6, 12, 20, 30, the nth term is:', opts: ['n(n+1)', 'n²+n', 'Both A and B', 'n²+1'], ans: 2, explain: 'n(n+1) = n²+n. T(1)=2, T(2)=6, T(3)=12. Both A and B are the same expression.' },
  { q: 'The number of diagonals in a polygon with n sides is n(n−3)/2. A hexagon has:', opts: ['6', '9', '12', '15'], ans: 1, explain: '6(6−3)/2 = 6(3)/2 = 9 diagonals.' },
  { q: 'The number of diagonals in an octagon (8 sides) is:', opts: ['16', '20', '24', '28'], ans: 1, explain: '8(8−3)/2 = 8(5)/2 = 20 diagonals.' },
  { q: 'A pattern gives: n=1→2, n=2→6, n=3→12, n=4→20. The formula is:', opts: ['2n', 'n(n+1)', 'n²+n', 'Both B and C'], ans: 3, explain: '1(2)=2, 2(3)=6, 3(4)=12, 4(5)=20. T(n) = n(n+1) = n²+n.' },
  { q: 'The sum of first n even numbers is n(n+1). What is 2+4+6+...+20?', opts: ['100', '110', '90', '120'], ans: 1, explain: 'There are 10 even numbers from 2 to 20. Sum = 10(11) = 110.' },
  { q: 'How many square numbers are between 1 and 100 (inclusive)?', opts: ['9', '10', '11', '8'], ans: 1, explain: '1², 2², ..., 10² = 100. There are 10 square numbers.' },
  { q: 'What is the next triangular number after 15?', opts: ['18', '20', '21', '24'], ans: 2, explain: '15 is T(5). T(6) = 6(7)/2 = 21.' },
  { q: 'The sum 1² + 2² + 3² + 4² = ?', opts: ['20', '25', '30', '16'], ans: 2, explain: '1 + 4 + 9 + 16 = 30' },
  { q: 'In a pattern, each figure adds a border of dots. Fig 1 = 1, Fig 2 = 4, Fig 3 = 9. These are:', opts: ['Triangular numbers', 'Square numbers', 'Cube numbers', 'Even numbers'], ans: 1, explain: '1, 4, 9 are 1², 2², 3².' },
  { q: 'The nth even number is:', opts: ['n + 2', '2n', '2n − 1', 'n²'], ans: 1, explain: '1st even = 2, 2nd = 4, 3rd = 6. T(n) = 2n.' },
  { q: 'The nth odd number is:', opts: ['2n + 1', '2n − 1', 'n + 1', 'n²'], ans: 1, explain: '1st odd = 1, 2nd = 3, 3rd = 5. T(n) = 2n − 1.' },
  { q: 'A pattern: 2, 8, 18, 32, 50. The nth term is:', opts: ['2n²', 'n² + 1', '4n − 2', 'n(n+1)'], ans: 0, explain: '2(1)²=2, 2(2)²=8, 2(3)²=18, 2(4)²=32, 2(5)²=50. T(n) = 2n².' },
  { q: 'The sequence 5, 20, 45, 80, 125 has nth term:', opts: ['5n²', '5n + 15', 'n² + 4', '5n(n+1)'], ans: 0, explain: '5(1)²=5, 5(2)²=20, 5(3)²=45, 5(4)²=80, 5(5)²=125. T(n) = 5n².' },
  { q: 'A pattern of triangles: Fig 1 = 1, Fig 2 = 3, Fig 3 = 6, Fig 4 = 10. What type of numbers?', opts: ['Square', 'Cube', 'Triangular', 'Fibonacci'], ans: 2, explain: '1, 3, 6, 10 are triangular numbers.' },
  { q: 'The 20th term of the sequence T(n) = n² + 1 is:', opts: ['400', '401', '441', '421'], ans: 1, explain: 'T(20) = 20² + 1 = 401' },
  { q: 'The sequence 0, 2, 6, 12, 20 has nth term:', opts: ['n² − n', 'n(n−1)', 'Both A and B', 'n² + n'], ans: 2, explain: 'n(n−1) = n²−n. T(1)=0, T(2)=2, T(3)=6, T(4)=12, T(5)=20. Both A and B are the same expression.' },
  { q: 'Siti notices that 1³ = 1, 1³+2³ = 9, 1³+2³+3³ = 36. Each sum is a perfect square. What is 1³+2³+3³+4³?', opts: ['64', '100', '81', '144'], ans: 1, explain: '1+8+27+64 = 100 = 10². The sum of the first n cubes equals [n(n+1)/2]². Here: [4(5)/2]² = 10² = 100.' },
];
