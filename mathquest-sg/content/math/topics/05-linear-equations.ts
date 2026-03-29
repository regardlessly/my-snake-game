import type { TopicMeta, MCQuestion } from '../../../src/types/curriculum';

export const meta: TopicMeta = {
  id: 5, sem: 1,
  title: 'Linear Equations',
  desc: 'Solving equations, word problems, changing subject'
};

export const notes: string | null = `
  <h2>Linear Equations</h2>
  <p class="topic-desc">Solving equations in one variable, word problems, and changing the subject of a formula</p>

  <div class="notes-card">
    <h3>1. What is a Linear Equation?</h3>
    <p>A <strong>linear equation</strong> is an equation where the highest power of the variable is 1. It contains an equals sign (=).</p>
    <div class="example">
      x + 3 = 7 &nbsp;&nbsp; 2y &minus; 5 = 11 &nbsp;&nbsp; 3(a + 2) = 15<br><br>
      The goal is to find the <strong>value of the variable</strong> that makes the equation true.
    </div>
  </div>

  <div class="notes-card">
    <h3>2. Solving by Balancing</h3>
    <p>Whatever you do to <strong>one side</strong> of the equation, you must do the <strong>same</strong> to the other side.</p>
    <div class="example">
      <strong>Inverse operations:</strong><br>
      Addition &harr; Subtraction<br>
      Multiplication &harr; Division<br><br>
      <strong>One-step:</strong> x + 3 = 7 &rarr; x = 7 &minus; 3 = <span class="highlight">4</span><br>
      <strong>Two-step:</strong> 2x + 3 = 11 &rarr; 2x = 8 &rarr; x = <span class="highlight">4</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>3. Equations with Brackets</h3>
    <p>Expand the brackets first, then solve by collecting like terms.</p>
    <div class="example">
      3(x + 2) = 15<br>
      3x + 6 = 15<br>
      3x = 9<br>
      x = <span class="highlight">3</span><br><br>
      2(x + 4) = 3(x &minus; 1)<br>
      2x + 8 = 3x &minus; 3<br>
      11 = x<br>
      x = <span class="highlight">11</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>4. Forming Equations from Word Problems</h3>
    <p>Read the problem carefully. Let the unknown be a variable, form the equation, then solve.</p>
    <div class="example">
      <strong>Example:</strong> Mei Ling has $50. After buying 3 packets of chicken rice at $x each, she has $35 left.<br>
      Equation: 50 &minus; 3x = 35<br>
      3x = 15<br>
      x = <span class="highlight">$5</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>5. Changing the Subject of a Formula</h3>
    <p>Rearrange the formula so that a different variable is alone on one side. Use inverse operations.</p>
    <div class="example">
      Make x the subject of y = 3x + 5:<br>
      y &minus; 5 = 3x<br>
      x = <span class="highlight">(y &minus; 5)/3</span><br><br>
      Make r the subject of A = &pi;r&sup2;:<br>
      r&sup2; = A/&pi;<br>
      r = <span class="highlight">&radic;(A/&pi;)</span>
    </div>
  </div>
`;

export const questions: MCQuestion[] | null = [
  // ===== SKILL: solve-one-variable (Q1–Q45) =====
  { q: 'Solve: x + 5 = 12', opts: ['x = 5', 'x = 7', 'x = 17', 'x = 12'], ans: 1, explain: 'x = 12 − 5 = 7' },
  { q: 'Solve: x − 3 = 8', opts: ['x = 5', 'x = 3', 'x = 11', 'x = 8'], ans: 2, explain: 'x = 8 + 3 = 11' },
  { q: 'Solve: x + 9 = 15', opts: ['x = 24', 'x = 9', 'x = 6', 'x = 15'], ans: 2, explain: 'x = 15 − 9 = 6' },
  { q: 'Solve: 4x = 20', opts: ['x = 4', 'x = 5', 'x = 16', 'x = 80'], ans: 1, explain: 'x = 20 ÷ 4 = 5' },
  { q: 'Solve: x/3 = 7', opts: ['x = 10', 'x = 4', 'x = 21', 'x = 3'], ans: 2, explain: 'x = 7 × 3 = 21' },
  { q: 'Solve: x − 12 = 0', opts: ['x = 0', 'x = −12', 'x = 12', 'x = 24'], ans: 2, explain: 'x = 0 + 12 = 12' },
  { q: 'Solve: 7x = 49', opts: ['x = 6', 'x = 7', 'x = 42', 'x = 56'], ans: 1, explain: 'x = 49 ÷ 7 = 7' },
  { q: 'Solve: x/5 = 4', opts: ['x = 9', 'x = 1', 'x = 20', 'x = 25'], ans: 2, explain: 'x = 4 × 5 = 20' },
  { q: 'Solve: x + 14 = 30', opts: ['x = 44', 'x = 14', 'x = 16', 'x = 30'], ans: 2, explain: 'x = 30 − 14 = 16' },
  { q: 'Solve: 9x = 63', opts: ['x = 54', 'x = 72', 'x = 9', 'x = 7'], ans: 3, explain: 'x = 63 ÷ 9 = 7' },
  { q: 'Solve: 2x + 3 = 11', opts: ['x = 3', 'x = 4', 'x = 7', 'x = 5.5'], ans: 1, explain: '2x = 8, x = 4' },
  { q: 'Solve: 3x − 5 = 16', opts: ['x = 7', 'x = 3', 'x = 21', 'x = 11'], ans: 0, explain: '3x = 21, x = 7' },
  { q: 'Solve: 5x + 2 = 27', opts: ['x = 5', 'x = 29', 'x = 6', 'x = 4'], ans: 0, explain: '5x = 25, x = 5' },
  { q: 'Solve: 4x − 1 = 19', opts: ['x = 18', 'x = 4', 'x = 5', 'x = 80'], ans: 2, explain: '4x = 20, x = 5' },
  { q: 'Solve: x/2 + 3 = 10', opts: ['x = 7', 'x = 26', 'x = 14', 'x = 20'], ans: 2, explain: 'x/2 = 7, x = 14' },
  { q: 'Solve: x/4 − 2 = 3', opts: ['x = 4', 'x = 20', 'x = 12', 'x = 1'], ans: 1, explain: 'x/4 = 5, x = 20' },
  { q: 'Solve: 6x + 7 = 43', opts: ['x = 7', 'x = 6', 'x = 36', 'x = 8'], ans: 1, explain: '6x = 36, x = 6' },
  { q: 'Solve: 2x − 9 = 1', opts: ['x = 4', 'x = 5', 'x = 10', 'x = −4'], ans: 1, explain: '2x = 10, x = 5' },
  { q: 'Solve: 7x + 4 = 32', opts: ['x = 4', 'x = 28', 'x = 5', 'x = 3'], ans: 0, explain: '7x = 28, x = 4' },
  { q: 'Solve: 3x + 11 = 29', opts: ['x = 18', 'x = 40', 'x = 6', 'x = 9'], ans: 2, explain: '3x = 18, x = 6' },
  { q: 'Solve: 5x = 3x + 10', opts: ['x = 2', 'x = 5', 'x = 10', 'x = 3'], ans: 1, explain: '2x = 10, x = 5' },
  { q: 'Solve: 7x − 4 = 3x + 8', opts: ['x = 3', 'x = 1', 'x = 4', 'x = 12'], ans: 0, explain: '4x = 12, x = 3' },
  { q: 'Solve: 6x + 1 = 4x + 9', opts: ['x = 5', 'x = 4', 'x = 10', 'x = 8'], ans: 1, explain: '2x = 8, x = 4' },
  { q: 'Solve: 8x − 3 = 5x + 12', opts: ['x = 15', 'x = 3', 'x = 9', 'x = 5'], ans: 3, explain: '3x = 15, x = 5' },
  { q: 'Solve: 2x + 15 = 5x', opts: ['x = 3', 'x = 5', 'x = 15', 'x = 7'], ans: 1, explain: '15 = 3x, x = 5' },
  { q: 'Solve: 9x − 2 = 7x + 6', opts: ['x = 4', 'x = 2', 'x = 8', 'x = 1'], ans: 0, explain: '2x = 8, x = 4' },
  { q: 'Solve: 4x + 7 = x + 22', opts: ['x = 5', 'x = 15', 'x = 29', 'x = 3'], ans: 0, explain: '3x = 15, x = 5' },
  { q: 'Solve: 10x − 6 = 6x + 14', opts: ['x = 2', 'x = 20', 'x = 5', 'x = 8'], ans: 2, explain: '4x = 20, x = 5' },
  { q: 'Solve: x/3 + x/6 = 5', opts: ['x = 10', 'x = 15', 'x = 6', 'x = 30'], ans: 0, explain: 'LCD 6: 2x/6 + x/6 = 5, so x/2 = 5, x = 10' },
  { q: 'Solve: 2x/5 = 6', opts: ['x = 12', 'x = 15', 'x = 3', 'x = 30'], ans: 1, explain: '2x = 30, x = 15' },
  { q: 'Solve: −3x = 18', opts: ['x = 6', 'x = −6', 'x = 21', 'x = −21'], ans: 1, explain: 'x = 18 ÷ (−3) = −6' },
  { q: 'Solve: −2x + 7 = 13', opts: ['x = 3', 'x = −3', 'x = 10', 'x = −10'], ans: 1, explain: '−2x = 6, x = −3' },
  { q: 'Solve: x/2 − x/3 = 4', opts: ['x = 12', 'x = 24', 'x = 6', 'x = 8'], ans: 1, explain: 'LCD 6: 3x/6 − 2x/6 = 4, x/6 = 4, x = 24' },
  { q: 'Solve: −x + 5 = 12', opts: ['x = 7', 'x = −7', 'x = 17', 'x = −17'], ans: 1, explain: '−x = 7, x = −7' },
  { q: 'Solve: (x + 3)/4 = 5', opts: ['x = 17', 'x = 20', 'x = 23', 'x = 2'], ans: 0, explain: 'x + 3 = 20, x = 17' },
  { q: 'Solve: 5 − 2x = −1', opts: ['x = 3', 'x = 2', 'x = −3', 'x = 6'], ans: 0, explain: '−2x = −6, x = 3' },
  { q: 'Solve: (2x − 1)/3 = 5', opts: ['x = 7', 'x = 8', 'x = 16', 'x = 7.5'], ans: 1, explain: '2x − 1 = 15, 2x = 16, x = 8' },
  { q: 'Solve: 0.5x + 1.3 = 3.8', opts: ['x = 5', 'x = 2.5', 'x = 10.2', 'x = 7.6'], ans: 0, explain: '0.5x = 2.5, x = 5' },
  { q: 'Solve: 3x/4 − 2x/3 = 1', opts: ['x = 12', 'x = 7', 'x = 4', 'x = 6'], ans: 0, explain: 'LCD 12: 9x/12 − 8x/12 = 1, x/12 = 1, x = 12' },
  { q: 'Solve: 3(x − 1)/2 = 9', opts: ['x = 5', 'x = 7', 'x = 6', 'x = 3'], ans: 1, explain: '3(x−1) = 18, x−1 = 6, x = 7' },
  { q: 'Solve: (x + 1)/2 + (x − 3)/4 = 5', opts: ['x = 23/3', 'x = 7', 'x = 17/3', 'x = 6'], ans: 1, explain: 'Multiply by 4: 2(x+1)+(x−3) = 20, 3x−1 = 20, x = 7' },
  { q: 'Solve: 0.3x − 0.7 = 0.1x + 0.5', opts: ['x = 6', 'x = 0.6', 'x = 4', 'x = 12'], ans: 0, explain: '0.2x = 1.2, x = 6' },
  { q: 'Solve: 2.5x − 1.5 = 1.5x + 3.5', opts: ['x = 5', 'x = 2', 'x = 0.5', 'x = 50'], ans: 0, explain: 'x = 5.0' },
  { q: 'Solve: 11x − 3 = 8x + 9', opts: ['x = 4', 'x = 2', 'x = 12', 'x = 6'], ans: 0, explain: '3x = 12, x = 4' },
  { q: 'Solve: (3x + 2)/5 = (x + 6)/3', opts: ['x = 6', 'x = 4', 'x = 24', 'x = 2'], ans: 0, explain: '3(3x+2) = 5(x+6), 9x+6 = 5x+30, 4x = 24, x = 6' },

  // ===== SKILL: equations-with-brackets (Q46–Q90) =====
  { q: 'Solve: 2(x + 3) = 14', opts: ['x = 4', 'x = 5.5', 'x = 7', 'x = 8'], ans: 0, explain: '2x + 6 = 14, 2x = 8, x = 4' },
  { q: 'Solve: 3(x − 1) = 12', opts: ['x = 3', 'x = 5', 'x = 4', 'x = 13'], ans: 1, explain: '3x − 3 = 12, 3x = 15, x = 5' },
  { q: 'Solve: 5(x + 2) = 30', opts: ['x = 4', 'x = 6', 'x = 8', 'x = 5'], ans: 0, explain: '5x + 10 = 30, 5x = 20, x = 4' },
  { q: 'Solve: 4(x − 5) = 8', opts: ['x = 7', 'x = 2', 'x = 3', 'x = 13'], ans: 0, explain: '4x − 20 = 8, 4x = 28, x = 7' },
  { q: 'Solve: 2(3x + 1) = 20', opts: ['x = 3', 'x = 7', 'x = 10', 'x = 9'], ans: 0, explain: '6x + 2 = 20, 6x = 18, x = 3' },
  { q: 'Solve: 6(x − 2) = 24', opts: ['x = 4', 'x = 6', 'x = 2', 'x = 8'], ans: 1, explain: '6x − 12 = 24, 6x = 36, x = 6' },
  { q: 'Solve: 7(x + 1) = 56', opts: ['x = 7', 'x = 8', 'x = 49', 'x = 9'], ans: 0, explain: '7x + 7 = 56, 7x = 49, x = 7' },
  { q: 'Solve: 3(2x − 4) = 18', opts: ['x = 5', 'x = 3', 'x = 11', 'x = 7'], ans: 0, explain: '6x − 12 = 18, 6x = 30, x = 5' },
  { q: 'Solve: 4(x + 6) = 40', opts: ['x = 4', 'x = 10', 'x = 8.5', 'x = 16'], ans: 0, explain: '4x + 24 = 40, 4x = 16, x = 4' },
  { q: 'Solve: 8(x − 3) = 16', opts: ['x = 5', 'x = 2', 'x = 1', 'x = 19'], ans: 0, explain: '8x − 24 = 16, 8x = 40, x = 5' },
  { q: 'Solve: 2(x + 4) = 3(x − 1)', opts: ['x = 11', 'x = 5', 'x = 7', 'x = 3'], ans: 0, explain: '2x + 8 = 3x − 3, 11 = x' },
  { q: 'Solve: 4(x + 1) = 2(x + 7)', opts: ['x = 5', 'x = 3', 'x = 11', 'x = 7'], ans: 0, explain: '4x + 4 = 2x + 14, 2x = 10, x = 5' },
  { q: 'Solve: 3(x − 2) = 2(x + 3)', opts: ['x = 12', 'x = 0', 'x = 1', 'x = 6'], ans: 0, explain: '3x − 6 = 2x + 6, x = 12' },
  { q: 'Solve: 5(x + 3) = 2(x + 12)', opts: ['x = 3', 'x = 9', 'x = 1', 'x = 5'], ans: 0, explain: '5x + 15 = 2x + 24, 3x = 9, x = 3' },
  { q: 'Solve: 3(2x + 1) = 5(x + 2)', opts: ['x = 7', 'x = 13', 'x = 3', 'x = 1'], ans: 0, explain: '6x + 3 = 5x + 10, x = 7' },
  { q: 'Solve: 2(x + 5) = 4(x − 2)', opts: ['x = 9', 'x = 3', 'x = 18', 'x = 1'], ans: 0, explain: '2x + 10 = 4x − 8, 18 = 2x, x = 9' },
  { q: 'Solve: 6(x − 1) = 3(x + 5)', opts: ['x = 7', 'x = 3', 'x = 11', 'x = 21'], ans: 0, explain: '6x − 6 = 3x + 15, 3x = 21, x = 7' },
  { q: 'Solve: −2(x − 4) = 10', opts: ['x = −1', 'x = 7', 'x = 3', 'x = −3'], ans: 0, explain: '−2x + 8 = 10, −2x = 2, x = −1' },
  { q: 'Solve: −3(x + 2) = −15', opts: ['x = 3', 'x = −3', 'x = 7', 'x = 5'], ans: 0, explain: '−3x − 6 = −15, −3x = −9, x = 3' },
  { q: 'Solve: −(x + 5) = −8', opts: ['x = 3', 'x = −3', 'x = 13', 'x = −13'], ans: 0, explain: '−x − 5 = −8, −x = −3, x = 3' },
  { q: 'Solve: 2(x + 3) − (x − 1) = 10', opts: ['x = 3', 'x = 7', 'x = 4', 'x = 6'], ans: 0, explain: '2x + 6 − x + 1 = 10, x + 7 = 10, x = 3' },
  { q: 'Solve: 3(x + 2) − 2(x − 1) = 12', opts: ['x = 4', 'x = 6', 'x = 8', 'x = 12'], ans: 0, explain: '3x + 6 − 2x + 2 = 12, x + 8 = 12, x = 4' },
  { q: 'Solve: 5(x − 1) − 3(x + 2) = 5', opts: ['x = 8', 'x = 0', 'x = 16', 'x = 4'], ans: 0, explain: '5x − 5 − 3x − 6 = 5, 2x − 11 = 5, 2x = 16, x = 8' },
  { q: 'Solve: 4(2x + 3) − 3(x − 4) = 44', opts: ['x = 4', 'x = 20', 'x = 5', 'x = 8'], ans: 0, explain: '8x + 12 − 3x + 12 = 44, 5x + 24 = 44, 5x = 20, x = 4' },
  { q: 'Solve: −(x + 5) + 3(x − 1) = 8', opts: ['x = 8', 'x = 4', 'x = 16', 'x = 2'], ans: 0, explain: '−x − 5 + 3x − 3 = 8, 2x − 8 = 8, x = 8' },
  { q: 'Solve: 2(x − 3) + 3(x + 1) = 22', opts: ['x = 5', 'x = 25', 'x = 3', 'x = 4'], ans: 0, explain: '2x − 6 + 3x + 3 = 22, 5x − 3 = 22, 5x = 25, x = 5' },
  { q: 'Solve: (x + 2)/3 = (x − 1)/2', opts: ['x = 7', 'x = 4', 'x = 1', 'x = 5'], ans: 0, explain: '2(x+2) = 3(x−1), 2x+4 = 3x−3, x = 7' },
  { q: 'Solve: (x − 3)/5 = (x + 1)/7', opts: ['x = 13', 'x = 7', 'x = 26', 'x = 11'], ans: 0, explain: '7(x−3) = 5(x+1), 7x−21 = 5x+5, 2x = 26, x = 13' },
  { q: 'Solve: 3[2(x − 1) + 4] = 30', opts: ['x = 4', 'x = 5', 'x = 6', 'x = 3'], ans: 0, explain: '3(2x+2) = 30, 6x+6 = 30, x = 4' },
  { q: 'Solve: 2[3(x + 1) − 4] = 16', opts: ['x = 3', 'x = 2', 'x = 4', 'x = 5'], ans: 0, explain: '2(3x−1) = 16, 6x−2 = 16, 6x = 18, x = 3' },
  { q: 'Solve: 5[2 − (x − 3)] = 15', opts: ['x = 2', 'x = 5', 'x = 0', 'x = 8'], ans: 0, explain: '5(5−x) = 15, 25−5x = 15, 5x = 10, x = 2' },
  { q: 'Solve: (x + 2)/3 + (x − 4)/6 = 3', opts: ['x = 6', 'x = 18', 'x = 4', 'x = 10'], ans: 0, explain: 'LCD 6: 2(x+2)+(x−4) = 18, 3x = 18, x = 6' },
  { q: 'Solve: 4(x − 1) = 2(x + 3) + 10', opts: ['x = 10', 'x = 8', 'x = 5', 'x = 12'], ans: 0, explain: '4x−4 = 2x+16, 2x = 20, x = 10' },
  { q: 'Solve: (3x − 5)/4 = (x + 7)/2', opts: ['x = 19', 'x = 9', 'x = 33', 'x = 12'], ans: 0, explain: '3x−5 = 2(x+7), 3x−5 = 2x+14, x = 19' },
  { q: 'Solve: 3(x + 4)/2 − (x − 2) = 10', opts: ['x = 2', 'x = 6', 'x = 4', 'x = 8'], ans: 2, explain: 'Multiply by 2: 3(x+4)−2(x−2) = 20, 3x+12−2x+4 = 20, x+16 = 20, x = 4' },
  { q: 'Solve: 5 − 3(2x − 1) = 2(4 − x)', opts: ['x = 0', 'x = 1', 'x = −1', 'x = 2'], ans: 0, explain: '5−6x+3 = 8−2x, 8−6x = 8−2x, −4x = 0, x = 0' },
  { q: 'Solve: 7(x − 2) − 4(x + 1) = 0', opts: ['x = 6', 'x = 4', 'x = 18', 'x = 2'], ans: 0, explain: '7x−14−4x−4 = 0, 3x−18 = 0, x = 6' },
  { q: 'Solve: 2(5x − 3) = 3(2x + 4)', opts: ['x = 9/2', 'x = 9', 'x = 3', 'x = 18'], ans: 0, explain: '10x−6 = 6x+12, 4x = 18, x = 9/2' },
  { q: 'Solve: (2x + 5)/3 = (x + 4)/2', opts: ['x = 2', 'x = −2', 'x = 7', 'x = 1'], ans: 0, explain: '2(2x+5) = 3(x+4), 4x+10 = 3x+12, x = 2' },
  { q: 'Solve: 3(4x − 1) − 5(2x + 3) = 0', opts: ['x = 9', 'x = 3', 'x = 18', 'x = 6'], ans: 0, explain: '12x−3−10x−15 = 0, 2x−18 = 0, x = 9' },
  { q: 'Solve: 2[x − 3(x − 2)] = 8', opts: ['x = −1', 'x = 1', 'x = 2', 'x = −2'], ans: 1, explain: '2[x−3x+6] = 8, 2(−2x+6) = 8, −4x+12 = 8, −4x = −4, x = 1' },
  { q: 'Solve: (4x − 3)/5 = (2x + 1)/3', opts: ['x = 7', 'x = 14', 'x = 2', 'x = 4'], ans: 0, explain: '3(4x−3) = 5(2x+1), 12x−9 = 10x+5, 2x = 14, x = 7' },
  { q: 'Solve: 5(x − 2) + 3 = 2(x + 4)', opts: ['x = 5', 'x = 3', 'x = 15', 'x = 7'], ans: 0, explain: '5x−10+3 = 2x+8, 5x−7 = 2x+8, 3x = 15, x = 5' },

  // ===== SKILL: word-problems (Q91–Q130) =====
  { q: 'Mei Ling bought 3 pens at $x each and paid $12. Find x.', opts: ['$3', '$4', '$6', '$36'], ans: 1, explain: '3x = 12, x = $4' },
  { q: 'A bowl of laksa costs $x. Ahmad pays $6 for 2 bowls. Find x.', opts: ['$3', '$4', '$12', '$2'], ans: 0, explain: '2x = 6, x = $3' },
  { q: 'Wei Ming is x years old. His father is 30 years older and is 42. Find x.', opts: ['x = 72', 'x = 30', 'x = 12', 'x = 42'], ans: 2, explain: 'x + 30 = 42, x = 12' },
  { q: 'A hawker sold x plates in the morning and 45 in the afternoon, totalling 120. Find x.', opts: ['x = 165', 'x = 75', 'x = 45', 'x = 85'], ans: 1, explain: 'x + 45 = 120, x = 75' },
  { q: 'The MRT fare is $x. Siti rides 5 times and spends $7.50. Find x.', opts: ['$2.50', '$1.50', '$37.50', '$12.50'], ans: 1, explain: '5x = 7.50, x = $1.50' },
  { q: 'A packet of nasi lemak costs $x. Kumar buys 4 for $14. Find x.', opts: ['$3.50', '$4.00', '$10.00', '$56.00'], ans: 0, explain: '4x = 14, x = $3.50' },
  { q: 'Raj bought 4 kaya toasts at $x each and a kopi for $1.80, paying $7.00. Find x.', opts: ['$1.30', '$1.80', '$2.20', '$1.05'], ans: 0, explain: '4x + 1.80 = 7.00, 4x = 5.20, x = $1.30' },
  { q: 'A rectangular garden is (2x + 3) m long and 5 m wide. Perimeter is 36 m. Find x.', opts: ['x = 5', 'x = 4', 'x = 3.5', 'x = 6'], ans: 0, explain: '2(2x+3)+2(5) = 36, 4x+16 = 36, 4x = 20, x = 5' },
  { q: 'Three friends split a $45 meal equally. Each also pays $2 for drinks. Total per person?', opts: ['$17', '$15', '$47', '$45'], ans: 0, explain: '45/3 + 2 = $17' },
  { q: 'An HDB flat has x rooms. The next-door flat has 2 more. Together they have 10 rooms. Find x.', opts: ['x = 4', 'x = 6', 'x = 5', 'x = 8'], ans: 0, explain: 'x+(x+2) = 10, 2x = 8, x = 4' },
  { q: 'Lina scores x marks. Her friend scores twice her marks. Total is 96. Find x.', opts: ['x = 48', 'x = 32', 'x = 64', 'x = 24'], ans: 1, explain: '3x = 96, x = 32' },
  { q: 'A hawker sells nasi lemak at $3.50 and mee siam at $x. He sold 20 nasi lemak and 15 mee siam for $115. Find x.', opts: ['$3.00', '$4.00', '$3.50', '$2.50'], ans: 0, explain: '70+15x = 115, 15x = 45, x = $3.00' },
  { q: 'The sum of three consecutive numbers is 72. Find the smallest.', opts: ['23', '24', '25', '22'], ans: 0, explain: 'x+(x+1)+(x+2) = 72, 3x+3 = 72, x = 23' },
  { q: 'Ah Huat is 3 times as old as his nephew. In 10 years, he will be twice as old. How old is the nephew?', opts: ['10', '15', '5', '20'], ans: 0, explain: '3x+10 = 2(x+10), x = 10' },
  { q: 'A taxi charges $3.90 flag-down plus $0.25 per 400 m. Total fare is $8.90. How many 400 m units?', opts: ['20', '18', '25', '35'], ans: 0, explain: '0.25n = 5.00, n = 20' },
  { q: 'Mrs Tan bought x kg rice at $2.80/kg and 3 kg sugar at $1.50/kg for $18.50. Find x.', opts: ['5', '4', '3', '6'], ans: 0, explain: '2.80x+4.50 = 18.50, 2.80x = 14, x = 5' },
  { q: 'A class has x boys and (x + 5) girls, totalling 35. How many boys?', opts: ['15', '20', '10', '25'], ans: 0, explain: '2x+5 = 35, x = 15' },
  { q: 'A rectangle is (3x − 1) cm by (x + 2) cm with perimeter 42 cm. Find x.', opts: ['x = 5', 'x = 6', 'x = 4', 'x = 7'], ans: 0, explain: '2(3x−1)+2(x+2) = 42, 8x+2 = 42, x = 5' },
  { q: 'Ali has $200 and spends $x/day for 5 days then $2x/day for 3 days. He has $35 left. Find x.', opts: ['$15', '$20', '$12', '$25'], ans: 0, explain: '200−5x−6x = 35, 11x = 165, x = $15' },
  { q: 'Triangle angles are x°, (x + 20)° and (2x − 8)°. Find x.', opts: ['42', '40', '38', '45'], ans: 0, explain: '4x+12 = 180, x = 42' },
  { q: 'Beng Huat buys 2 bubble teas at $(x+1) each and 1 waffle at $4.50. He pays $20 with $5.50 change. Find x.', opts: ['$4', '$5', '$3', '$6'], ans: 0, explain: '2(x+1)+4.50 = 14.50, 2x = 8, x = $4' },
  { q: 'A fruit seller has x durians and sells half, leaving 12. Find x.', opts: ['x = 6', 'x = 24', 'x = 18', 'x = 12'], ans: 1, explain: 'x/2 = 12, x = 24' },
  { q: 'Priya has $x, gives $15 to charity and splits the rest among 4 friends who each get $10. Find x.', opts: ['$55', '$40', '$25', '$65'], ans: 0, explain: '(x−15)/4 = 10, x = $55' },
  { q: 'An isosceles triangle has two sides of (2x+1) cm and base 10 cm. Perimeter is 30 cm. Find x.', opts: ['x = 4.5', 'x = 5', 'x = 4', 'x = 3'], ans: 0, explain: '2(2x+1)+10 = 30, 4x = 18, x = 4.5' },
  { q: 'A bus has x passengers. At the next stop 8 get off, 15 get on — now full at 40. Find x.', opts: ['x = 33', 'x = 47', 'x = 25', 'x = 63'], ans: 0, explain: 'x−8+15 = 40, x = 33' },
  { q: 'A number is doubled, then 7 is subtracted. The result is 23. Find the number.', opts: ['15', '8', '30', '16'], ans: 0, explain: '2x−7 = 23, x = 15' },
  { q: 'Three-quarters of a number is 45. Find the number.', opts: ['60', '33.75', '180', '15'], ans: 0, explain: '(3/4)x = 45, x = 60' },
  { q: 'After spending 2/5 of his money, Jason has $36 left. How much did he start with?', opts: ['$60', '$90', '$14.40', '$50'], ans: 0, explain: '(3/5)x = 36, x = $60' },
  { q: 'A regular pentagon has perimeter (5x + 10) cm and each side is 7 cm. Find x.', opts: ['x = 5', 'x = 3', 'x = 4', 'x = 7'], ans: 0, explain: '35 = 5x+10, x = 5' },
  { q: 'Five apples and 3 oranges cost $5.80. Each apple is $0.50. Find the cost of an orange.', opts: ['$1.10', '$0.80', '$1.00', '$0.60'], ans: 0, explain: '2.50+3y = 5.80, y = $1.10' },
  { q: 'Two MRT stations are x km apart. A train at 60 km/h takes 5 minutes. Find x.', opts: ['5 km', '300 km', '12 km', '10 km'], ans: 0, explain: '5 min = 1/12 hr, distance = 60×(1/12) = 5 km' },
  { q: 'A number increased by 20% gives 60. Find the number.', opts: ['50', '48', '72', '12'], ans: 0, explain: '1.2x = 60, x = 50' },
  { q: 'Samy buys x books at $8 each. He has $5 left from $45. Find x.', opts: ['5', '4', '6', '3'], ans: 0, explain: '8x+5 = 45, 8x = 40, x = 5' },
  { q: 'Two brothers have a combined age of 28. The older is 4 years older. Find the younger brother\'s age.', opts: ['12', '16', '14', '10'], ans: 0, explain: 'x+(x+4) = 28, 2x = 24, x = 12' },
  { q: 'At a kopitiam, 3 teh tariks and 2 kopi-o cost $9.20. Each kopi-o is $1.60. Find the price of teh tarik.', opts: ['$2.00', '$2.20', '$1.80', '$2.50'], ans: 0, explain: '3x+3.20 = 9.20, 3x = 6.00, x = $2.00' },
  { q: 'A rectangle\'s length is 3 times its width w. Perimeter is 48 cm. Find w.', opts: ['6 cm', '12 cm', '16 cm', '8 cm'], ans: 0, explain: '2(3w)+2w = 48, 8w = 48, w = 6' },
  { q: 'In a school of 720 students, the ratio of boys to girls is 5 : 4. How many boys are there?', opts: ['400', '320', '360', '450'], ans: 0, explain: 'Boys = (5/9)×720 = 400' },
  { q: 'The average of 4 numbers is 15. Three numbers are 12, 18 and 14. Find the fourth.', opts: ['16', '15', '20', '60'], ans: 0, explain: 'Sum = 60, fourth = 60−44 = 16' },
  { q: 'A shop gives 20% discount. The sale price is $64. Find the original price.', opts: ['$80', '$76.80', '$51.20', '$84'], ans: 0, explain: '0.8x = 64, x = $80' },
  { q: 'Cheng Wei cycles at x km/h for 3 hours, covering 36 km. Find x.', opts: ['12', '108', '33', '9'], ans: 0, explain: '3x = 36, x = 12' },

  // ===== SKILL: change-subject (Q131–Q150) =====
  { q: 'Make x the subject: y = x + 5', opts: ['x = y − 5', 'x = y + 5', 'x = 5 − y', 'x = 5y'], ans: 0, explain: 'x = y − 5' },
  { q: 'Make x the subject: y = x − 3', opts: ['x = y − 3', 'x = 3 − y', 'x = y + 3', 'x = 3y'], ans: 2, explain: 'x = y + 3' },
  { q: 'Make x the subject: y = 4x', opts: ['x = 4y', 'x = y/4', 'x = y − 4', 'x = y + 4'], ans: 1, explain: 'x = y/4' },
  { q: 'Make x the subject: y = x/6', opts: ['x = y/6', 'x = 6/y', 'x = 6y', 'x = y + 6'], ans: 2, explain: 'x = 6y' },
  { q: 'Make b the subject: a = b + c', opts: ['b = a + c', 'b = a − c', 'b = c − a', 'b = ac'], ans: 1, explain: 'b = a − c' },
  { q: 'Make x the subject: y = 2x + 7', opts: ['x = (y − 7)/2', 'x = (y + 7)/2', 'x = 2y − 7', 'x = y/2 + 7'], ans: 0, explain: '2x = y − 7, x = (y − 7)/2' },
  { q: 'Make x the subject: y = 3x − 4', opts: ['x = (y − 4)/3', 'x = (y + 4)/3', 'x = 3y + 4', 'x = (4 − y)/3'], ans: 1, explain: '3x = y + 4, x = (y + 4)/3' },
  { q: 'Make r the subject: C = 2πr', opts: ['r = C − 2π', 'r = 2πC', 'r = C/(2π)', 'r = 2C/π'], ans: 2, explain: 'r = C/(2π)' },
  { q: 'Make t the subject: d = st', opts: ['t = d − s', 't = ds', 't = d/s', 't = s/d'], ans: 2, explain: 't = d/s' },
  { q: 'Make h the subject: A = bh/2', opts: ['h = A/(2b)', 'h = 2A/b', 'h = Ab/2', 'h = 2b/A'], ans: 1, explain: '2A = bh, h = 2A/b' },
  { q: 'Make a the subject: v = u + at', opts: ['a = (v + u)/t', 'a = (v − u)/t', 'a = v − ut', 'a = t(v − u)'], ans: 1, explain: 'at = v − u, a = (v − u)/t' },
  { q: 'Make l the subject: P = 2(l + w)', opts: ['l = P/2 + w', 'l = (P − w)/2', 'l = P/2 − w', 'l = 2P − w'], ans: 2, explain: 'l + w = P/2, l = P/2 − w' },
  { q: 'Make b the subject: A = (a + b)h/2', opts: ['b = 2A/h + a', 'b = 2A/h − a', 'b = A/(2h) − a', 'b = 2Ah − a'], ans: 1, explain: 'a + b = 2A/h, b = 2A/h − a' },
  { q: 'Make x the subject: y = (3x + 1)/5', opts: ['x = (5y − 1)/3', 'x = 5y/3 − 1', 'x = (5y + 1)/3', 'x = 5(y − 1)/3'], ans: 0, explain: '5y = 3x + 1, x = (5y − 1)/3' },
  { q: 'Make x the subject: y = 5 − 2x', opts: ['x = (5 + y)/2', 'x = (y − 5)/2', 'x = (5 − y)/2', 'x = 5 − y/2'], ans: 2, explain: '2x = 5 − y, x = (5 − y)/2' },
  { q: 'Make R the subject: V = IR', opts: ['R = V − I', 'R = VI', 'R = I/V', 'R = V/I'], ans: 3, explain: 'R = V/I' },
  { q: 'Make h the subject: V = πr²h', opts: ['h = V/(πr²)', 'h = Vπr²', 'h = πr²/V', 'h = V − πr²'], ans: 0, explain: 'h = V/(πr²)' },
  { q: 'Make u the subject: v² = u² + 2as', opts: ['u = v² − 2as', 'u² = v² + 2as', 'u = √(v² − 2as)', 'u = (v² − 2as)/2'], ans: 2, explain: 'u² = v² − 2as, u = √(v² − 2as)' },
  { q: 'Make n the subject: S = n(a + l)/2', opts: ['n = S(a + l)/2', 'n = 2S/(a + l)', 'n = S/(2(a + l))', 'n = 2S(a + l)'], ans: 1, explain: '2S = n(a+l), n = 2S/(a+l)' },
  { q: 'Make c the subject: E = mc²', opts: ['c = E/m', 'c = √(E/m)', 'c = E/m²', 'c = Em²'], ans: 1, explain: 'c² = E/m, c = √(E/m)' },
  { q: 'Make y the subject: x = 3y − 7', opts: ['y = (x + 7)/3', 'y = (x − 7)/3', 'y = 3x + 7', 'y = x/3 + 7'], ans: 0, explain: 'x + 7 = 3y, y = (x + 7)/3' },
  { q: 'Make a the subject: s = ut + at²/2', opts: ['a = (s − ut)/t²', 'a = 2(s − ut)/t²', 'a = (2s − ut)/t²', 'a = 2s/t² − u'], ans: 1, explain: 's − ut = at²/2, 2(s − ut) = at², a = 2(s − ut)/t²' },
];
