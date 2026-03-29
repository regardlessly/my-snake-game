import type { TopicMeta, MCQuestion } from '../../../src/types/curriculum';

export const meta: TopicMeta = {
  id: 3, sem: 1,
  title: 'Approximation & Estimation',
  desc: 'Rounding, significant figures, estimation'
}

export const notes: string | null = `
  <h2>Approximation &amp; Estimation</h2>
  <p class="topic-desc">Rounding, significant figures, and estimating calculations</p>

  <div class="notes-card">
    <h3>1. What Are Significant Figures?</h3>
    <p>Significant figures (s.f.) are the meaningful digits in a number that tell us how precise it is. They include all non-zero digits and specific zeros.</p>
    <div class="example">
      2450 has <span class="highlight">3 s.f.</span> (2, 4, 5)<br>
      0.00380 has <span class="highlight">3 s.f.</span> (3, 8, 0)
    </div>
  </div>

  <div class="notes-card">
    <h3>2. Rules for Counting Significant Figures</h3>
    <ul>
      <li><strong>All non-zero digits</strong> are significant: 1, 2, 3 ... 9</li>
      <li><strong>Zeros between</strong> non-zero digits are significant: 3<span class="highlight">0</span>5 = 3 s.f.</li>
      <li><strong>Leading zeros</strong> (before the first non-zero digit) are <strong>NOT</strong> significant: 0.0042 = 2 s.f.</li>
      <li><strong>Trailing zeros after a decimal point</strong> ARE significant: 2.50 = 3 s.f.</li>
      <li><strong>Trailing zeros in a whole number</strong> are NOT significant (unless stated): 4500 = 2 s.f.</li>
    </ul>
    <div class="example">
      <strong>Examples:</strong><br>
      70.08 &rarr; 4 s.f. (7, 0, 0, 8 - zeros between are significant)<br>
      0.00506 &rarr; 3 s.f. (5, 0, 6 - leading zeros don't count)<br>
      12.0 &rarr; 3 s.f. (trailing zero after decimal counts)<br>
      8000 &rarr; 1 s.f. (trailing zeros in whole number)
    </div>
  </div>

  <div class="notes-card">
    <h3>3. Rounding to Significant Figures</h3>
    <p>To round a number to <em>n</em> significant figures:</p>
    <ul>
      <li>Find the n-th significant figure</li>
      <li>Look at the <strong>next digit</strong> (the deciding digit)</li>
      <li>If it's <strong>5 or more</strong>, round up. If it's <strong>less than 5</strong>, round down.</li>
      <li>Replace remaining digits with zeros (or drop them after the decimal point)</li>
    </ul>
    <div class="example">
      <strong>Round 3.7284 to 3 s.f.:</strong><br>
      3 s.f. = 3, 7, 2 &rarr; next digit is 8 (round up) &rarr; <span class="highlight">3.73</span><br><br>
      <strong>Round 0.04562 to 2 s.f.:</strong><br>
      2 s.f. = 4, 5 &rarr; next digit is 6 (round up) &rarr; <span class="highlight">0.046</span><br><br>
      <strong>Round 7849 to 2 s.f.:</strong><br>
      2 s.f. = 7, 8 &rarr; next digit is 4 (round down) &rarr; <span class="highlight">7800</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>4. Rounding to Decimal Places</h3>
    <p>To round to <em>n</em> decimal places (d.p.), count <em>n</em> digits <strong>after</strong> the decimal point, then decide using the next digit.</p>
    <div class="example">
      <strong>Round 3.14159 to 2 d.p.:</strong><br>
      2 d.p. = 3.14 &rarr; next digit is 1 (round down) &rarr; <span class="highlight">3.14</span><br><br>
      <strong>Round 6.2781 to 1 d.p.:</strong><br>
      1 d.p. = 6.2 &rarr; next digit is 7 (round up) &rarr; <span class="highlight">6.3</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>5. Estimation</h3>
    <p>Estimation helps you quickly check if your answer is reasonable. Round each number to <strong>1 s.f.</strong> first, then calculate.</p>
    <div class="example">
      <strong>Estimate 387 &times; 0.0214:</strong><br>
      387 &approx; 400 (1 s.f.), 0.0214 &approx; 0.02 (1 s.f.)<br>
      400 &times; 0.02 = <span class="highlight">8</span><br>
      (Exact answer: 8.28 &mdash; our estimate is close!)
    </div>
  </div>

  <div class="notes-card">
    <h3>Quick Reference</h3>
    <div class="formula">s.f. = all non-zero digits + trapped zeros + trailing zeros after decimal</div>
    <div class="formula">Leading zeros are NEVER significant</div>
  </div>
`

export const questions: MCQuestion[] | null = [
  // --- COUNTING SIGNIFICANT FIGURES ---
  { q:"How many significant figures are in 0.00350?", opts:["2","3","4","5"], ans:1, explain:"Leading zeros aren't significant. Digits: 3, 5, and trailing 0 after decimal = 3 s.f." },
  { q:"How many significant figures does 50.040 have?", opts:["3","4","5","2"], ans:2, explain:"5, 0 (trapped), 0 (trapped), 4, 0 (trailing after decimal) = 5 s.f." },
  { q:"How many significant figures are in 3,600?", opts:["2","3","4","1"], ans:0, explain:"Trailing zeros in a whole number are not significant. Only 3 and 6 count = 2 s.f." },
  { q:"How many significant figures does 10.00 have?", opts:["1","2","3","4"], ans:3, explain:"1, 0 (trapped), 0 (trailing after decimal), 0 (trailing after decimal) = 4 s.f." },
  { q:"How many significant figures does 0.0600 have?", opts:["1","2","3","4"], ans:2, explain:"Leading zeros not significant. 6, 0 (trailing), 0 (trailing) = 3 s.f." },
  { q:"How many significant figures does 400.0 have?", opts:["1","2","3","4"], ans:3, explain:"4, 0 (trapped), 0 (trapped), 0 (trailing after decimal) = 4 s.f." },
  { q:"How many significant figures are in 0.10200?", opts:["3","4","5","6"], ans:2, explain:"Leading 0 not counted. 1, 0 (trapped), 2, 0 (trailing), 0 (trailing) = 5 s.f." },
  { q:"A student records 3.450 m. How many significant figures?", opts:["3","4","2","5"], ans:1, explain:"3, 4, 5, and trailing 0 after decimal = 4 s.f." },
  { q:"How many significant figures does 1,000,000 have?", opts:["1","4","6","7"], ans:0, explain:"Trailing zeros in a whole number aren't significant. Only the 1 counts = 1 s.f." },
  { q:"How many significant figures does 0.007 have?", opts:["1","2","3","4"], ans:0, explain:"Leading zeros are never significant. Only the 7 is significant = 1 s.f." },
  { q:"How many significant figures are in 305?", opts:["1","2","3","4"], ans:2, explain:"3 (non-zero), 0 (trapped between 3 and 5), 5 (non-zero) = 3 s.f." },
  { q:"How many significant figures does 7.00 have?", opts:["1","2","3","4"], ans:2, explain:"7 (non-zero), 0 (trailing after decimal), 0 (trailing after decimal) = 3 s.f." },
  { q:"How many significant figures are in 90,500?", opts:["2","3","4","5"], ans:1, explain:"9, 0 (trapped), 5 are significant. The trailing two zeros are not = 3 s.f." },
  { q:"How many significant figures does 0.00100 have?", opts:["1","2","3","4"], ans:2, explain:"Leading zeros not counted. 1, 0 (trailing), 0 (trailing) = 3 s.f." },
  { q:"How many significant figures are in 1050?", opts:["2","3","4","5"], ans:1, explain:"1 (non-zero), 0 (trapped), 5 (non-zero) = 3 s.f. The trailing zero is not significant." },
  { q:"How many significant figures does 250.0 have?", opts:["2","3","4","5"], ans:2, explain:"2, 5, 0 (the decimal point makes the trailing zero significant), 0 (trailing after decimal) = 4 s.f." },
  { q:"How many significant figures are in 6.022 × 10³?", opts:["1","2","3","4"], ans:3, explain:"In scientific notation, all digits in the coefficient are significant: 6, 0, 2, 2 = 4 s.f." },
  { q:"How many significant figures does 0.230 have?", opts:["1","2","3","4"], ans:2, explain:"Leading 0 not counted. 2, 3, 0 (trailing after decimal) = 3 s.f." },
  { q:"How many significant figures are in 45,000?", opts:["1","2","3","5"], ans:1, explain:"4 and 5 are significant. Trailing zeros in a whole number are not = 2 s.f." },
  { q:"How many significant figures does 0.0505 have?", opts:["2","3","4","5"], ans:1, explain:"Leading zeros not significant. 5, 0 (trapped), 5 = 3 s.f." },
  { q:"How many significant figures are in 8.060?", opts:["2","3","4","5"], ans:2, explain:"8, 0 (trapped), 6, 0 (trailing after decimal) = 4 s.f." },
  { q:"How many significant figures does 1200.0 have?", opts:["2","3","4","5"], ans:3, explain:"1, 2, 0 (trapped), 0 (trapped), 0 (trailing after decimal) = 5 s.f." },
  { q:"How many significant figures are in 0.000902?", opts:["1","2","3","6"], ans:2, explain:"Leading zeros not significant. 9, 0 (trapped), 2 = 3 s.f." },
  { q:"How many significant figures does 30.00 have?", opts:["1","2","3","4"], ans:3, explain:"3, 0 (trapped by decimal), 0 (trailing), 0 (trailing) = 4 s.f." },
  { q:"How many significant figures are in 500.?", opts:["1","2","3","4"], ans:2, explain:"The decimal point after 500 means all three digits are significant: 5, 0, 0 = 3 s.f." },
  { q:"How many significant figures does 0.01010 have?", opts:["2","3","4","5"], ans:2, explain:"Leading zeros not counted. 1, 0 (trapped), 1, 0 (trailing) = 4 s.f." },
  { q:"How many significant figures are in 7200?", opts:["1","2","3","4"], ans:1, explain:"7 and 2 are significant; trailing zeros in a whole number are not = 2 s.f." },
  { q:"How many significant figures does 9.0900 have?", opts:["3","4","5","6"], ans:2, explain:"9, 0 (trapped), 9, 0 (trailing), 0 (trailing) = 5 s.f." },
  { q:"How many significant figures are in 0.2050?", opts:["2","3","4","5"], ans:2, explain:"Leading 0 not counted. 2, 0 (trapped), 5, 0 (trailing) = 4 s.f." },
  { q:"How many significant figures does 6000.0 have?", opts:["2","3","4","5"], ans:3, explain:"6, 0 (trapped), 0 (trapped), 0 (trapped), 0 (trailing after decimal) = 5 s.f." },
  // --- ROUNDING TO SIGNIFICANT FIGURES ---
  { q:"Round 4.6729 to 3 s.f.", opts:["4.67","4.68","4.673","4.70"], ans:0, explain:"3rd s.f. is 7. Next digit 2 < 5, round down → 4.67." },
  { q:"Round 0.08547 to 2 s.f.", opts:["0.085","0.086","0.09","0.0855"], ans:0, explain:"2 s.f.: 8, 5. Next digit 4 < 5, round down → 0.085." },
  { q:"Round 12,465 to 3 s.f.", opts:["12,400","12,500","12,465","12,000"], ans:1, explain:"3rd s.f. is 4. Next digit 6 ≥ 5, round up → 12,500." },
  { q:"Round 0.009962 to 3 s.f.", opts:["0.009","0.00996","0.010","0.0100"], ans:1, explain:"3 s.f.: 9, 9, 6. Next digit 2 < 5, round down → 0.00996." },
  { q:"Round 99.96 to 3 s.f.", opts:["99.9","100","99.96","100.0"], ans:1, explain:"3rd s.f. is second 9. Next digit 6 ≥ 5 → 99.9 rounds up to 100." },
  { q:"Round 0.003456 to 2 s.f.", opts:["0.0035","0.0034","0.003","0.00346"], ans:0, explain:"2 s.f.: 3, 4. Next digit 5 ≥ 5, round up → 0.0035." },
  { q:"Round 0.06049 to 2 s.f.", opts:["0.060","0.061","0.06","0.062"], ans:0, explain:"2 s.f.: 6, 0. Next digit 4 < 5, round down → 0.060." },
  { q:"Round 874.6 to 2 s.f.", opts:["870","880","874","900"], ans:0, explain:"2 s.f.: 8, 7. Next digit 4 < 5, round down → 870." },
  { q:"Round 0.5555 to 3 s.f.", opts:["0.555","0.556","0.55","0.560"], ans:1, explain:"3 s.f.: 5, 5, 5. Next digit 5 ≥ 5, round up → 0.556." },
  { q:"Round 3.0049 to 3 s.f.", opts:["3.00","3.005","3.01","3.0"], ans:0, explain:"3 s.f.: 3, 0, 0. Next digit 4 < 5, round down → 3.00." },
  { q:"Round 29,851 to 2 s.f.", opts:["29,000","30,000","29,900","28,000"], ans:1, explain:"2 s.f.: 2, 9. Next digit 8 ≥ 5, round up → 30,000." },
  { q:"Round 0.004082 to 2 s.f.", opts:["0.0040","0.0041","0.004","0.00408"], ans:1, explain:"2 s.f.: 4, 0. Next digit 8 ≥ 5, round up → 0.0041." },
  { q:"Round 1.0045 to 4 s.f.", opts:["1.004","1.005","1.00","1.0045"], ans:1, explain:"4 s.f.: 1, 0, 0, 4. Next digit 5 ≥ 5, round up → 1.005." },
  { q:"Round 60,450 to 2 s.f.", opts:["60,000","61,000","60,500","60,400"], ans:0, explain:"2 s.f.: 6, 0. Next digit 4 < 5, round down → 60,000." },
  { q:"Round 0.19950 to 3 s.f.", opts:["0.199","0.200","0.20","0.1995"], ans:1, explain:"3 s.f.: 1, 9, 9. Next digit 5 ≥ 5, round up → 0.200." },
  { q:"Round 7,849 to 2 s.f.", opts:["7,800","7,900","7,850","8,000"], ans:0, explain:"2 s.f.: 7, 8. Next digit 4 < 5, round down → 7,800." },
  { q:"Round 0.002350 to 2 s.f.", opts:["0.0023","0.0024","0.002","0.00235"], ans:1, explain:"2 s.f.: 2, 3. Next digit 5 ≥ 5, round up → 0.0024." },
  { q:"Round 3.7284 to 3 s.f.", opts:["3.72","3.73","3.7","3.728"], ans:1, explain:"3 s.f.: 3, 7, 2. Next digit 8 ≥ 5, round up → 3.73." },
  { q:"Round 18,350 to 3 s.f.", opts:["18,300","18,400","18,350","18,000"], ans:1, explain:"3 s.f.: 1, 8, 3. Next digit 5 ≥ 5, round up → 18,400." },
  { q:"Round 0.07651 to 1 s.f.", opts:["0.07","0.08","0.1","0.076"], ans:1, explain:"1 s.f. is 7. Next digit 6 ≥ 5, round up → 0.08." },
  { q:"Round 456.7 to 2 s.f.", opts:["450","460","456","500"], ans:1, explain:"2 s.f.: 4, 5. Next digit 6 ≥ 5, round up → 460." },
  { q:"Round 0.0009995 to 3 s.f.", opts:["0.000999","0.00100","0.001","0.0010"], ans:1, explain:"3 s.f.: 9, 9, 9. Next digit 5 ≥ 5 → 0.00100." },
  { q:"Round 23.449 to 3 s.f.", opts:["23.4","23.5","23.449","23.44"], ans:0, explain:"3 s.f.: 2, 3, 4. Next digit 4 < 5, round down → 23.4." },
  { q:"Round 1,055 to 2 s.f.", opts:["1,000","1,100","1,050","1,060"], ans:1, explain:"2 s.f.: 1, 0. Next digit 5 ≥ 5, round up → 1,100." },
  { q:"Round 0.040601 to 3 s.f.", opts:["0.0406","0.0407","0.041","0.040"], ans:0, explain:"3 s.f.: 4, 0, 6. Next digit 0 < 5, round down → 0.0406." },
  { q:"Round 8,500 to 1 s.f.", opts:["8,000","9,000","8,500","10,000"], ans:1, explain:"1 s.f. is 8. Next digit 5 ≥ 5, round up → 9,000." },
  { q:"Round 0.3049 to 2 s.f.", opts:["0.30","0.31","0.3","0.304"], ans:0, explain:"2 s.f.: 3, 0. Next digit 4 < 5, round down → 0.30." },
  { q:"Round 199.5 to 3 s.f.", opts:["199","200","199.5","200."], ans:1, explain:"3 s.f.: 1, 9, 9. Next digit 5 ≥ 5, round up → 200." },
  { q:"Round 6.0050 to 3 s.f.", opts:["6.00","6.01","6.005","6.0"], ans:1, explain:"3 s.f.: 6, 0, 0. Next digit 5 ≥ 5, round up → 6.01." },
  { q:"Round 4,444 to 1 s.f.", opts:["4,000","5,000","4,400","4,440"], ans:0, explain:"1 s.f. is 4. Next digit 4 < 5, round down → 4,000." },
  // --- ROUNDING TO DECIMAL PLACES ---
  { q:"Round 3.14159 to 2 d.p.", opts:["3.14","3.15","3.1","3.142"], ans:0, explain:"2 d.p.: 3.14. Next digit 1 < 5, round down → 3.14." },
  { q:"Round 6.2781 to 1 d.p.", opts:["6.2","6.3","6.28","6.27"], ans:1, explain:"1 d.p.: 6.2. Next digit 7 ≥ 5, round up → 6.3." },
  { q:"Round 0.04562 to 3 d.p.", opts:["0.045","0.046","0.0456","0.04562"], ans:1, explain:"3 d.p.: 0.045. Next digit 6 ≥ 5, round up → 0.046." },
  { q:"Round 12.3456 to 2 d.p.", opts:["12.34","12.35","12.3","12.346"], ans:1, explain:"2 d.p.: 12.34. Next digit 5 ≥ 5, round up → 12.35." },
  { q:"Round 7.9950 to 2 d.p.", opts:["7.99","8.00","7.99","7.9"], ans:1, explain:"2 d.p.: 7.99. Next digit 5 ≥ 5, round up → 8.00." },
  { q:"Round 0.6666 to 3 d.p.", opts:["0.666","0.667","0.66","0.6666"], ans:1, explain:"3 d.p.: 0.666. Next digit 6 ≥ 5, round up → 0.667." },
  { q:"Round 100.005 to 2 d.p.", opts:["100.00","100.01","100.0","100.005"], ans:1, explain:"2 d.p.: 100.00. Next digit 5 ≥ 5, round up → 100.01." },
  { q:"Round 4.4449 to 1 d.p.", opts:["4.4","4.5","4.44","4.445"], ans:0, explain:"1 d.p.: 4.4. Next digit 4 < 5, round down → 4.4." },
  { q:"Round 88.895 to 2 d.p.", opts:["88.89","88.90","88.9","88.895"], ans:1, explain:"2 d.p.: 88.89. Next digit 5 ≥ 5, round up → 88.90." },
  { q:"Round 0.00199 to 4 d.p.", opts:["0.0019","0.0020","0.002","0.00199"], ans:1, explain:"4 d.p.: 0.0019. Next digit 9 ≥ 5, round up → 0.0020." },
  { q:"Round 5.5555 to 2 d.p.", opts:["5.55","5.56","5.5","5.555"], ans:1, explain:"2 d.p.: 5.55. Next digit 5 ≥ 5, round up → 5.56." },
  { q:"Round 21.345 to 1 d.p.", opts:["21.3","21.4","21.34","21.35"], ans:0, explain:"1 d.p.: look at 21.3|45 — the next digit is 4 (< 5), round down → 21.3." },
  { q:"Round 0.30050 to 3 d.p.", opts:["0.300","0.301","0.30","0.3005"], ans:1, explain:"3 d.p.: 0.300. Next digit 5 ≥ 5, round up → 0.301." },
  { q:"Round 9.9996 to 3 d.p.", opts:["9.999","10.000","9.9996","10.0"], ans:1, explain:"3 d.p.: 9.999. Next digit 6 ≥ 5, round up → 10.000." },
  { q:"Round 1.2349 to 2 d.p.", opts:["1.23","1.24","1.2","1.235"], ans:0, explain:"2 d.p.: 1.23. Next digit 4 < 5, round down → 1.23." },
  { q:"Round 0.07777 to 2 d.p.", opts:["0.07","0.08","0.077","0.078"], ans:1, explain:"2 d.p.: 0.07. Next digit 7 ≥ 5, round up → 0.08." },
  { q:"Round 14.0050 to 2 d.p.", opts:["14.00","14.01","14.0","14.005"], ans:1, explain:"2 d.p.: 14.00. Next digit 5 ≥ 5, round up → 14.01." },
  { q:"Round 3.9951 to 1 d.p.", opts:["3.9","4.0","3.99","4.00"], ans:1, explain:"1 d.p.: 3.9. Next digit 9 ≥ 5, round up → 4.0." },
  { q:"Round 0.00450 to 3 d.p.", opts:["0.004","0.005","0.0045","0.00450"], ans:1, explain:"3 d.p.: 0.004. Next digit 5 ≥ 5, round up → 0.005." },
  { q:"Round 267.449 to 1 d.p.", opts:["267.4","267.5","267.44","267.45"], ans:0, explain:"1 d.p.: 267.4. Next digit 4 < 5, round down → 267.4." },
  { q:"Round 0.09951 to 2 d.p.", opts:["0.09","0.10","0.099","0.100"], ans:1, explain:"2 d.p.: 0.09. Next digit 9 ≥ 5, round up → 0.10." },
  // --- ESTIMATION (1 S.F.) ---
  { q:"Estimate 589 × 0.032 using 1 s.f.", opts:["18","15","20","12"], ans:0, explain:"600 × 0.03 = 18." },
  { q:"Estimate (78.3 + 21.9) ÷ 0.48 using 1 s.f.", opts:["100","200","250","150"], ans:1, explain:"80 + 20 = 100; 100 ÷ 0.5 = 200." },
  { q:"Estimate 0.00712 × 4800 using 1 s.f.", opts:["24","35","40","30"], ans:1, explain:"0.007 × 5000 = 35." },
  { q:"Estimate 312 ÷ 0.0049 using 1 s.f.", opts:["60,000","6,000","600","600,000"], ans:0, explain:"300 ÷ 0.005 = 60,000." },
  { q:"Estimate 387 × 0.0214 using 1 s.f.", opts:["4","8","16","2"], ans:1, explain:"400 × 0.02 = 8." },
  { q:"Estimate 725 ÷ 8.3 using 1 s.f.", opts:["70","80","90","100"], ans:2, explain:"700 ÷ 8 ≈ 87.5 ≈ 90." },
  { q:"Estimate 0.0049 × 1,960 using 1 s.f.", opts:["8","10","12","5"], ans:1, explain:"0.005 × 2000 = 10." },
  { q:"Estimate 641 × 0.0051 using 1 s.f.", opts:["3","3.5","4","6"], ans:0, explain:"600 × 0.005 = 3." },
  { q:"Estimate (499 + 312) ÷ 0.097 using 1 s.f.", opts:["4,000","8,000","10,000","5,000"], ans:1, explain:"500 + 300 = 800; 800 ÷ 0.1 = 8,000." },
  { q:"Estimate 0.00183 × 5,200 using 1 s.f.", opts:["5","10","15","1"], ans:1, explain:"0.002 × 5000 = 10." },
  { q:"Estimate 8,920 ÷ 0.044 using 1 s.f.", opts:["20,000","200,000","2,000","2,000,000"], ans:1, explain:"9000 ÷ 0.04 = 9000 × 25 = 225,000 ≈ 200,000." },
  { q:"Estimate 0.62 × 0.038 using 1 s.f.", opts:["0.024","0.24","2.4","0.0024"], ans:0, explain:"0.6 × 0.04 = 0.024." },
  { q:"Estimate 19.8 × 3.07 using 1 s.f.", opts:["60","30","90","600"], ans:0, explain:"20 × 3 = 60." },
  { q:"Estimate 4,780 ÷ 0.52 using 1 s.f.", opts:["1,000","10,000","5,000","50,000"], ans:1, explain:"5000 ÷ 0.5 = 10,000." },
  { q:"Estimate (0.031 + 0.069) × 49 using 1 s.f.", opts:["3","5","8","10"], ans:1, explain:"(0.03 + 0.07) = 0.1; 0.1 × 50 = 5." },
  { q:"Estimate 82.4 × 0.48 using 1 s.f.", opts:["40","4","400","0.4"], ans:0, explain:"80 × 0.5 = 40." },
  { q:"Estimate 0.0195 ÷ 0.0041 using 1 s.f.", opts:["4","5","10","2"], ans:1, explain:"0.02 ÷ 0.004 = 5." },
  { q:"Estimate 3,140 × 0.00078 using 1 s.f.", opts:["2.4","24","0.24","240"], ans:0, explain:"3000 × 0.0008 = 2.4." },
  { q:"Estimate 0.00031 × 64,000 using 1 s.f.", opts:["18","20","16","2"], ans:1, explain:"0.0003 × 60,000 = 18 ≈ 20." },
  { q:"Estimate 9,870 ÷ 0.197 using 1 s.f.", opts:["5,000","50,000","500","500,000"], ans:1, explain:"10,000 ÷ 0.2 = 50,000." },
  { q:"Estimate 0.472 × 0.0059 using 1 s.f.", opts:["0.003","0.03","0.3","0.0003"], ans:0, explain:"0.5 × 0.006 = 0.003." },
  { q:"Estimate (3.87²) using 1 s.f.", opts:["9","12","16","20"], ans:2, explain:"4² = 16." },
  { q:"Estimate 4,850 × 0.021 using 1 s.f.", opts:["100","10","1,000","50"], ans:0, explain:"5,000 × 0.02 = 100." },
  { q:"Estimate 0.00829 ÷ 0.00041 using 1 s.f.", opts:["2","20","200","0.2"], ans:1, explain:"0.008 ÷ 0.0004 = 20." },
  { q:"Estimate 678 × 0.0000052 using 1 s.f.", opts:["0.0035","0.035","0.35","3.5"], ans:0, explain:"700 × 0.000005 = 0.0035." },
  { q:"Estimate 52.3 ÷ 0.0046 using 1 s.f.", opts:["10,000","1,000","100,000","100"], ans:0, explain:"50 ÷ 0.005 = 10,000." },
  // --- MIXED APPLICATION ---
  { q:"Which of these has 4 significant figures?", opts:["3,700","0.0370","37.00","370"], ans:2, explain:"37.00 has 4 s.f.: 3, 7, 0 (trailing after decimal), 0 (trailing). The others each have 2 or 3." },
  { q:"Which number is rounded to 3 s.f.?", opts:["0.04560","0.0456","0.04","0.046"], ans:1, explain:"0.0456 has exactly 3 s.f. (4, 5, 6). Leading zeros don't count." },
  { q:"A bag weighs 1.275 kg. What is this to 3 s.f.?", opts:["1.27 kg","1.28 kg","1.3 kg","1.275 kg"], ans:1, explain:"3 s.f.: 1, 2, 7. Next digit 5 ≥ 5 → round up → 1.28 kg." },
  { q:"A race is 100.48 m. Round to 4 s.f.", opts:["100.4 m","100.5 m","100.48 m","100.0 m"], ans:1, explain:"4 s.f.: 1, 0, 0, 4. Next digit 8 ≥ 5 → 100.5 m." },
  { q:"Which of these equals 0.003050 rounded to 2 s.f.?", opts:["0.0031","0.0030","0.003","0.00305"], ans:0, explain:"2 s.f.: 3, 0. Next digit is 5 ≥ 5, round up → 0.0031." },
  { q:"A scientist writes 2.40 × 10⁻³. How many s.f.?", opts:["1","2","3","4"], ans:2, explain:"In scientific notation all digits in 2.40 are significant: 2, 4, 0 = 3 s.f." },
  { q:"Round 0.004550 to 2 s.f.", opts:["0.0045","0.0046","0.005","0.00455"], ans:1, explain:"2 s.f.: 4, 5. Next digit 5 ≥ 5, round up → 0.0046." },
  { q:"A plank is 2.745 m. Round to 3 s.f.", opts:["2.74 m","2.75 m","2.7 m","2.745 m"], ans:1, explain:"3 s.f.: 2, 7, 4. Next digit 5 ≥ 5 → 2.75 m." },
  { q:"How many s.f. in 0.00040050?", opts:["3","4","5","7"], ans:2, explain:"Leading zeros not significant. 4, 0 (trapped), 0 (trapped), 5, 0 (trailing) = 5 s.f." },
  { q:"Round 0.9999 to 2 s.f.", opts:["0.99","1.0","1.00","0.999"], ans:1, explain:"2 s.f.: 9, 9. Next digit 9 ≥ 5 → 0.99 rounds up → 1.0." },
  { q:"Estimate (4.98²) using 1 s.f.", opts:["20","25","30","15"], ans:1, explain:"5² = 25." },
  { q:"Round 0.1005 to 3 s.f.", opts:["0.100","0.101","0.10","0.1005"], ans:1, explain:"3 s.f.: 1, 0, 0. Next digit is 5 ≥ 5, round up → 0.101." },
  { q:"A bottle holds 0.4750 L. How many s.f.?", opts:["2","3","4","5"], ans:2, explain:"4, 7, 5, 0 (trailing after decimal) = 4 s.f." },
  { q:"Round 0.6050 to 2 s.f.", opts:["0.60","0.61","0.6","0.605"], ans:1, explain:"2 s.f.: 6, 0. Next digit 5 ≥ 5 → round up → 0.61." },
  { q:"Which answer shows 56,789 rounded to 3 s.f.?", opts:["56,700","56,800","56,790","57,000"], ans:1, explain:"3 s.f.: 5, 6, 7. Next digit 8 ≥ 5 → 56,800." },
  { q:"How many s.f. in 10,010?", opts:["2","3","4","5"], ans:2, explain:"1, 0 (trapped), 0 (trapped), 1, 0... The trailing zero is not significant = 4 s.f." },
  { q:"Estimate √(0.0396) using 1 s.f.", opts:["0.06","0.2","0.02","2"], ans:1, explain:"0.04 ≈ 4/100; √(4/100) = 2/10 = 0.2." },
  { q:"Round 0.009090 to 2 s.f.", opts:["0.0090","0.0091","0.009","0.00909"], ans:1, explain:"2 s.f.: 9, 0. Next digit is 9 ≥ 5, round up → 0.0091." },
  { q:"Which shows 2,350 rounded to 2 s.f.?", opts:["2,300","2,400","2,350","2,000"], ans:1, explain:"2 s.f.: 2, 3. Next digit 5 ≥ 5 → 2,400." },
  { q:"How many s.f. does 3.0 × 10⁴ have?", opts:["1","2","3","4"], ans:1, explain:"3.0 in the coefficient has 2 s.f. (3 and the trailing zero after the decimal)." },
  { q:"A runner clocks 9.580 s. How many s.f.?", opts:["2","3","4","5"], ans:2, explain:"9, 5, 8, 0 (trailing after decimal) = 4 s.f." },
  { q:"Round 0.0002049 to 2 s.f.", opts:["0.00020","0.00021","0.0002","0.000205"], ans:0, explain:"2 s.f.: 2, 0. Next digit 4 < 5 → 0.00020." },
  { q:"Estimate 0.00489 ÷ 0.00102 using 1 s.f.", opts:["4","5","6","0.5"], ans:1, explain:"0.005 ÷ 0.001 = 5." },
  { q:"Round 7.0050 to 4 s.f.", opts:["7.005","7.004","7.006","7.00"], ans:0, explain:"4 s.f.: 7, 0, 0, 5. Next digit 0 < 5 → 7.005." },
  { q:"Which has exactly 2 s.f.?", opts:["30.0","0.030","3,000","30"], ans:1, explain:"0.030: leading 0 not significant; 3, 0 (trailing) = 2 s.f. ✓" },
  { q:"Estimate 0.00052 × 38,000 using 1 s.f.", opts:["20","2","200","0.2"], ans:0, explain:"0.0005 × 40,000 = 20." },
  { q:"Round 1.0995 to 3 s.f.", opts:["1.09","1.10","1.099","1.1"], ans:1, explain:"3 s.f.: 1, 0, 9. Next digit 9 ≥ 5 → round up: 1.10." },
  { q:"How many s.f. in 4.000 × 10²?", opts:["1","2","3","4"], ans:3, explain:"4.000 has 4 s.f. (4, and three trailing zeros after the decimal)." },
  { q:"Round 0.050505 to 3 s.f.", opts:["0.0505","0.0506","0.051","0.05050"], ans:0, explain:"3 s.f.: 5, 0, 5. Next digit 0 < 5 → 0.0505." },
  { q:"A wire measures 24.65 cm. Round to 3 s.f.", opts:["24.6 cm","24.7 cm","24.65 cm","25.0 cm"], ans:1, explain:"3 s.f.: 2, 4, 6. Next digit 5 ≥ 5 → 24.7 cm." },
  { q:"Which of these numbers has exactly 3 s.f.?", opts:["0.0030","4,500","8.010","0.310"], ans:3, explain:"0.310: 3, 1, 0 (trailing after decimal) = 3 s.f. ✓" },
  { q:"Round 0.001505 to 3 s.f.", opts:["0.00150","0.00151","0.0015","0.001505"], ans:1, explain:"3 s.f.: 1, 5, 0. Next digit 5 ≥ 5, round up → 0.00151." },
  { q:"A thermometer reads 36.850°C. Round to 4 s.f.", opts:["36.85°C","36.9°C","36.86°C","37.0°C"], ans:0, explain:"4 s.f.: 3, 6, 8, 5. Next digit 0 < 5, round down → 36.85°C." },
  { q:"How many s.f. in 0.090090?", opts:["3","4","5","6"], ans:2, explain:"Leading zeros not significant. 9, 0 (trapped), 0 (trapped), 9, 0 (trailing) = 5 s.f." },
  { q:"Round 49,950 to 3 s.f.", opts:["49,900","50,000","49,950","49,000"], ans:1, explain:"3 s.f.: 4, 9, 9. Next digit 5 ≥ 5, round up → 50,000." },
  { q:"Estimate (0.0512)² using 1 s.f.", opts:["0.002","0.003","0.025","0.0025"], ans:3, explain:"(0.05)² = 0.0025." },
  { q:"A brick is 0.2405 m long. Round to 2 s.f.", opts:["0.24 m","0.241 m","0.25 m","0.2 m"], ans:0, explain:"2 s.f.: 2, 4. Next digit 0 < 5, round down → 0.24 m." },
  { q:"How many s.f. does 80,080 have?", opts:["2","3","4","5"], ans:2, explain:"8, 0 (trapped), 0 (trapped), 8 = 4 s.f. The final zero is trailing in a whole number and not significant." },
  { q:"Round 0.050950 to 3 s.f.", opts:["0.0509","0.0510","0.051","0.05095"], ans:1, explain:"3 s.f.: 5, 0, 9. Next digit 5 ≥ 5, round up → 0.0510." },
  { q:"Which value is 0.006241 rounded to 2 s.f.?", opts:["0.0062","0.0063","0.006","0.00624"], ans:0, explain:"2 s.f.: 6, 2. Next digit 4 < 5, round down → 0.0062." },
]
