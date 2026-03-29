import type { TopicMeta, MCQuestion } from '../../../src/types/curriculum';

export const meta: TopicMeta = {
  id: 6, sem: 1,
  title: 'Linear Functions',
  desc: 'Cartesian coordinates, gradient, y = mx + c, graphing'
};

export const notes: string | null = `
  <h2>Linear Functions &amp; Graphs</h2>
  <p class="topic-desc">Cartesian coordinates, gradient, equation of a straight line (y = mx + c), and graphing</p>

  <div class="notes-card">
    <h3>1. The Cartesian Plane</h3>
    <p>The Cartesian plane has a horizontal <strong>x-axis</strong> and a vertical <strong>y-axis</strong>, meeting at the <strong>origin O(0, 0)</strong>.</p>
    <div class="example">
      A point is written as <strong>(x, y)</strong>.<br>
      x-coordinate &rarr; horizontal distance from origin<br>
      y-coordinate &rarr; vertical distance from origin<br><br>
      <strong>Quadrants:</strong><br>
      I &rarr; (+, +) &nbsp;&nbsp; II &rarr; (&minus;, +)<br>
      III &rarr; (&minus;, &minus;) &nbsp;&nbsp; IV &rarr; (+, &minus;)
    </div>
  </div>

  <div class="notes-card">
    <h3>2. Gradient (Slope)</h3>
    <p>The <strong>gradient</strong> measures how steep a line is.</p>
    <div class="example">
      Gradient = <strong>(y&sub2; &minus; y&sub1;) / (x&sub2; &minus; x&sub1;)</strong><br><br>
      For points (1, 2) and (3, 8):<br>
      m = (8 &minus; 2) / (3 &minus; 1) = 6/2 = <span class="highlight">3</span><br><br>
      <strong>Positive gradient</strong> &rarr; line goes up from left to right<br>
      <strong>Negative gradient</strong> &rarr; line goes down from left to right<br>
      <strong>Zero gradient</strong> &rarr; horizontal line<br>
      <strong>Undefined gradient</strong> &rarr; vertical line
    </div>
  </div>

  <div class="notes-card">
    <h3>3. Equation of a Straight Line: y = mx + c</h3>
    <p><strong>m</strong> is the gradient and <strong>c</strong> is the y-intercept (where the line crosses the y-axis).</p>
    <div class="example">
      y = 2x + 3 &rarr; gradient = <span class="highlight">2</span>, y-intercept = <span class="highlight">3</span><br>
      y = &minus;x + 5 &rarr; gradient = <span class="highlight">&minus;1</span>, y-intercept = <span class="highlight">5</span><br>
      y = 4 &rarr; gradient = <span class="highlight">0</span>, y-intercept = <span class="highlight">4</span> (horizontal line)
    </div>
  </div>

  <div class="notes-card">
    <h3>4. Parallel Lines</h3>
    <p>Parallel lines have the <strong>same gradient</strong> but different y-intercepts.</p>
    <div class="example">
      y = 3x + 1 and y = 3x &minus; 4 are parallel (both have m = 3).
    </div>
  </div>

  <div class="notes-card">
    <h3>5. Sketching a Straight Line</h3>
    <p>To sketch y = mx + c:</p>
    <div class="example">
      1. Plot the y-intercept (0, c).<br>
      2. Use the gradient to find a second point:<br>
      &nbsp;&nbsp; m = rise/run &rarr; from (0, c), go right 1 unit and up m units.<br>
      3. Draw the line through both points.<br><br>
      <strong>Or:</strong> find two easy points (e.g. x = 0 and y = 0) and connect them.
    </div>
  </div>
`;

export const questions: MCQuestion[] | null = [
  // ===== SKILL: cartesian-coordinates (Q1–Q40) =====
  { q: 'What are the coordinates of the origin?', opts: ['(1, 1)', '(0, 1)', '(0, 0)', '(1, 0)'], ans: 2, explain: 'The origin is the point where the x-axis and y-axis meet, at (0, 0).' },
  { q: 'The point (3, 5) lies in which quadrant?', opts: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], ans: 0, explain: 'Both coordinates are positive, so it is in Quadrant I.' },
  { q: 'The point (−2, 4) lies in which quadrant?', opts: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], ans: 1, explain: 'x is negative, y is positive → Quadrant II.' },
  { q: 'The point (−3, −7) lies in which quadrant?', opts: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], ans: 2, explain: 'Both coordinates are negative → Quadrant III.' },
  { q: 'The point (5, −2) lies in which quadrant?', opts: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], ans: 3, explain: 'x is positive, y is negative → Quadrant IV.' },
  { q: 'Which point lies on the x-axis?', opts: ['(0, 3)', '(3, 0)', '(3, 3)', '(−3, −3)'], ans: 1, explain: 'Points on the x-axis have y = 0.' },
  { q: 'Which point lies on the y-axis?', opts: ['(5, 0)', '(0, −4)', '(−4, 5)', '(5, −4)'], ans: 1, explain: 'Points on the y-axis have x = 0.' },
  { q: 'What is the x-coordinate of the point (7, −3)?', opts: ['−3', '7', '3', '−7'], ans: 1, explain: 'The x-coordinate is the first number: 7.' },
  { q: 'What is the y-coordinate of the point (−1, 6)?', opts: ['−1', '1', '6', '−6'], ans: 2, explain: 'The y-coordinate is the second number: 6.' },
  { q: 'Point A is 4 units right and 3 units up from the origin. What are its coordinates?', opts: ['(3, 4)', '(4, 3)', '(−4, 3)', '(4, −3)'], ans: 1, explain: '4 right → x = 4, 3 up → y = 3, so A = (4, 3).' },
  { q: 'Point B is at (2, 5). If it moves 3 units left, what are the new coordinates?', opts: ['(5, 5)', '(−1, 5)', '(2, 2)', '(2, 8)'], ans: 1, explain: 'Moving left decreases x: (2−3, 5) = (−1, 5).' },
  { q: 'Point C is at (−1, 3). If it moves 4 units down, what are the new coordinates?', opts: ['(−1, 7)', '(3, 3)', '(−1, −1)', '(−5, 3)'], ans: 2, explain: 'Moving down decreases y: (−1, 3−4) = (−1, −1).' },
  { q: 'Which of these points has the same x-coordinate as (4, −2)?', opts: ['(4, 7)', '(−2, 4)', '(7, −2)', '(−4, 2)'], ans: 0, explain: '(4, 7) has x = 4, same as (4, −2).' },
  { q: 'The midpoint of (2, 4) and (6, 8) is:', opts: ['(3, 5)', '(4, 6)', '(8, 12)', '(2, 2)'], ans: 1, explain: 'Midpoint = ((2+6)/2, (4+8)/2) = (4, 6).' },
  { q: 'The midpoint of (−2, 3) and (4, 7) is:', opts: ['(1, 5)', '(2, 10)', '(−6, −4)', '(3, 2)'], ans: 0, explain: 'Midpoint = ((−2+4)/2, (3+7)/2) = (1, 5).' },
  { q: 'Which point is a reflection of (3, 2) in the x-axis?', opts: ['(−3, 2)', '(3, −2)', '(−3, −2)', '(2, 3)'], ans: 1, explain: 'Reflection in x-axis changes sign of y: (3, −2).' },
  { q: 'Which point is a reflection of (3, 2) in the y-axis?', opts: ['(−3, 2)', '(3, −2)', '(−3, −2)', '(2, 3)'], ans: 0, explain: 'Reflection in y-axis changes sign of x: (−3, 2).' },
  { q: 'The distance from (0, 0) to (3, 4) is:', opts: ['7', '5', '1', '25'], ans: 1, explain: 'Distance = √(3² + 4²) = √(9+16) = √25 = 5.' },
  { q: 'The distance from (1, 2) to (4, 6) is:', opts: ['5', '7', '3', '25'], ans: 0, explain: 'Distance = √(3² + 4²) = √25 = 5.' },
  { q: 'Point P(a, 3) lies on the y-axis. What is a?', opts: ['3', '0', '−3', '1'], ans: 1, explain: 'Points on the y-axis have x = 0, so a = 0.' },
  { q: 'Point Q(5, b) lies on the x-axis. What is b?', opts: ['5', '−5', '0', '1'], ans: 2, explain: 'Points on the x-axis have y = 0, so b = 0.' },
  { q: 'Which of these points lies in Quadrant IV?', opts: ['(−2, 3)', '(2, 3)', '(−2, −3)', '(2, −3)'], ans: 3, explain: 'Quadrant IV has positive x and negative y: (2, −3).' },
  { q: 'The point (0, −5) lies on which axis?', opts: ['x-axis', 'y-axis', 'Both axes', 'Neither axis'], ans: 1, explain: 'x = 0 means it lies on the y-axis.' },
  { q: 'Which pair of points lie on the same horizontal line?', opts: ['(1, 3) and (1, 7)', '(2, 5) and (6, 5)', '(3, 1) and (1, 3)', '(0, 0) and (1, 1)'], ans: 1, explain: 'Same horizontal line means same y-coordinate. Both have y = 5.' },
  { q: 'Which pair of points lie on the same vertical line?', opts: ['(3, 1) and (3, 8)', '(1, 3) and (8, 3)', '(2, 2) and (5, 5)', '(0, 1) and (1, 0)'], ans: 0, explain: 'Same vertical line means same x-coordinate. Both have x = 3.' },
  { q: 'If point A(2, k) and point B(2, 7) are the same point, what is k?', opts: ['2', '7', '9', '0'], ans: 1, explain: 'Same point means same coordinates, so k = 7.' },
  { q: 'The midpoint of (0, 0) and (8, 6) is:', opts: ['(8, 6)', '(4, 3)', '(16, 12)', '(2, 1.5)'], ans: 1, explain: 'Midpoint = (8/2, 6/2) = (4, 3).' },
  { q: 'Point (−4, 0) is how many units from the origin?', opts: ['4', '−4', '0', '8'], ans: 0, explain: 'Distance along x-axis = |−4| = 4 units.' },
  { q: 'A point moves from (1, 2) right 5 and up 3. New position?', opts: ['(6, 5)', '(4, 7)', '(−4, −1)', '(6, −1)'], ans: 0, explain: '(1+5, 2+3) = (6, 5).' },
  { q: 'What is the midpoint of (−3, 4) and (5, −2)?', opts: ['(1, 1)', '(2, 2)', '(−8, 6)', '(4, −3)'], ans: 0, explain: '((-3+5)/2, (4+(−2))/2) = (1, 1).' },
  { q: 'Point (a, −a) always lies in which quadrant(s) when a > 0?', opts: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], ans: 3, explain: 'When a > 0: x = a > 0, y = −a < 0 → Quadrant IV.' },
  { q: 'The points (1, 3), (2, 3), (5, 3) all lie on which line?', opts: ['x = 3', 'y = 3', 'y = x', 'x + y = 3'], ans: 1, explain: 'All have y = 3, so they lie on the horizontal line y = 3.' },
  { q: 'The distance between (−1, 3) and (5, 3) is:', opts: ['6', '4', '8', '2'], ans: 0, explain: 'Same y-coordinate, so distance = |5−(−1)| = 6.' },
  { q: 'The distance between (4, 1) and (4, 9) is:', opts: ['5', '4', '8', '13'], ans: 2, explain: 'Same x-coordinate, so distance = |9−1| = 8.' },
  { q: 'Point A(2, 5) is translated 3 units left and 4 units down. New position?', opts: ['(−1, 1)', '(5, 9)', '(5, 1)', '(−1, 9)'], ans: 0, explain: '(2−3, 5−4) = (−1, 1).' },
  { q: 'Which point is closest to the origin?', opts: ['(3, 4)', '(1, 1)', '(5, 0)', '(0, 4)'], ans: 1, explain: 'Distances: √25=5, √2≈1.4, 5, 4. (1,1) is closest.' },
  { q: 'The point (6, −2) is reflected in the origin. What is the image?', opts: ['(−6, 2)', '(6, 2)', '(−6, −2)', '(2, −6)'], ans: 0, explain: 'Reflection in origin changes both signs: (−6, 2).' },
  { q: 'If M(3, k) is the midpoint of A(1, 2) and B(5, 8), find k.', opts: ['5', '4', '6', '3'], ans: 0, explain: 'k = (2+8)/2 = 5.' },
  { q: 'Point P is at (−2, −5). How far is P from the x-axis?', opts: ['2', '5', '7', '√29'], ans: 1, explain: 'Distance from x-axis = |y-coordinate| = |−5| = 5.' },
  { q: 'Point Q is at (−2, −5). How far is Q from the y-axis?', opts: ['2', '5', '7', '√29'], ans: 0, explain: 'Distance from y-axis = |x-coordinate| = |−2| = 2.' },

  // ===== SKILL: gradient (Q41–Q80) =====
  { q: 'Find the gradient of the line through (1, 2) and (3, 8).', opts: ['2', '3', '6', '1/3'], ans: 1, explain: 'm = (8−2)/(3−1) = 6/2 = 3' },
  { q: 'Find the gradient of the line through (0, 0) and (4, 8).', opts: ['4', '8', '2', '1/2'], ans: 2, explain: 'm = (8−0)/(4−0) = 8/4 = 2' },
  { q: 'Find the gradient of the line through (2, 5) and (6, 5).', opts: ['0', '1', 'Undefined', '4'], ans: 0, explain: 'm = (5−5)/(6−2) = 0/4 = 0 (horizontal line)' },
  { q: 'Find the gradient of the line through (3, 1) and (3, 7).', opts: ['0', '6', '1', 'Undefined'], ans: 3, explain: 'm = (7−1)/(3−3) = 6/0 → undefined (vertical line)' },
  { q: 'Find the gradient of the line through (0, 4) and (2, 0).', opts: ['2', '−2', '1/2', '−1/2'], ans: 1, explain: 'm = (0−4)/(2−0) = −4/2 = −2' },
  { q: 'Find the gradient of the line through (1, 3) and (5, 11).', opts: ['2', '4', '8', '1/2'], ans: 0, explain: 'm = (11−3)/(5−1) = 8/4 = 2' },
  { q: 'Find the gradient of the line through (−2, 1) and (4, 7).', opts: ['1', '6', '−1', '3'], ans: 0, explain: 'm = (7−1)/(4−(−2)) = 6/6 = 1' },
  { q: 'Find the gradient of the line through (−1, −3) and (2, 6).', opts: ['3', '−3', '1/3', '9'], ans: 0, explain: 'm = (6−(−3))/(2−(−1)) = 9/3 = 3' },
  { q: 'A line has gradient 2. If it passes through (1, 5), what is y when x = 3?', opts: ['7', '9', '11', '8'], ans: 1, explain: 'Rise = 2 × (3−1) = 4. y = 5 + 4 = 9.' },
  { q: 'A line has gradient −1. If it passes through (2, 7), what is y when x = 5?', opts: ['4', '10', '2', '5'], ans: 0, explain: 'Rise = −1 × (5−2) = −3. y = 7 − 3 = 4.' },
  { q: 'A line rises 6 units for every 2 units it runs to the right. What is its gradient?', opts: ['6', '2', '3', '1/3'], ans: 2, explain: 'Gradient = rise/run = 6/2 = 3' },
  { q: 'A line drops 4 units for every 2 units it runs to the right. What is its gradient?', opts: ['2', '−2', '4', '−4'], ans: 1, explain: 'Gradient = −4/2 = −2 (negative because it drops)' },
  { q: 'Which line is steeper: gradient 3 or gradient −5?', opts: ['Gradient 3', 'Gradient −5', 'Both the same', 'Cannot tell'], ans: 1, explain: 'Steepness is |gradient|. |−5| = 5 > |3| = 3, so gradient −5 is steeper.' },
  { q: 'The gradient of a horizontal line is:', opts: ['1', '0', 'Undefined', '−1'], ans: 1, explain: 'Horizontal lines have zero rise, so gradient = 0.' },
  { q: 'The gradient of a vertical line is:', opts: ['1', '0', 'Undefined', '∞'], ans: 2, explain: 'Vertical lines have zero run, so gradient is undefined.' },
  { q: 'Find the gradient of the line through (0, −2) and (3, 7).', opts: ['3', '−3', '5/3', '3/5'], ans: 0, explain: 'm = (7−(−2))/(3−0) = 9/3 = 3' },
  { q: 'Find the gradient of the line through (−4, 2) and (2, −1).', opts: ['1/2', '−1/2', '2', '−2'], ans: 1, explain: 'm = (−1−2)/(2−(−4)) = −3/6 = −1/2' },
  { q: 'Find the gradient of the line through (0, 5) and (10, 0).', opts: ['2', '−2', '1/2', '−1/2'], ans: 3, explain: 'm = (0−5)/(10−0) = −5/10 = −1/2' },
  { q: 'A line passes through (2, 1) and (8, 4). What is its gradient?', opts: ['1/2', '2', '3/6', '6/3'], ans: 0, explain: 'm = (4−1)/(8−2) = 3/6 = 1/2' },
  { q: 'A line passes through (−3, −1) and (1, 7). What is its gradient?', opts: ['2', '−2', '4', '1/2'], ans: 0, explain: 'm = (7−(−1))/(1−(−3)) = 8/4 = 2' },
  { q: 'Two points on a line are (0, 3) and (6, 3). The gradient is:', opts: ['0', '1', '3', '6'], ans: 0, explain: 'm = (3−3)/(6−0) = 0' },
  { q: 'If the gradient is 4/3 and the line passes through (0, 0), what is y when x = 6?', opts: ['8', '4.5', '2', '18'], ans: 0, explain: 'y = (4/3)(6) = 8' },
  { q: 'The gradient between (a, 3) and (5, 11) is 2. Find a.', opts: ['1', '−3', '3', '9'], ans: 0, explain: '(11−3)/(5−a) = 2, 8/(5−a) = 2, 5−a = 4, a = 1' },
  { q: 'The gradient between (2, b) and (6, 10) is 3. Find b.', opts: ['−2', '22', '−4', '1'], ans: 0, explain: '(10−b)/(6−2) = 3, 10−b = 12, b = −2' },
  { q: 'Line AB has gradient 2/5. If A = (0, 1) and B = (10, k), find k.', opts: ['5', '3', '4', '21'], ans: 0, explain: '(k−1)/10 = 2/5, k−1 = 4, k = 5' },
  { q: 'A road rises 50 m over a horizontal distance of 200 m. What is the gradient?', opts: ['1/4', '4', '50', '150'], ans: 0, explain: 'Gradient = 50/200 = 1/4' },
  { q: 'An MRT escalator rises 6 m over a horizontal distance of 10 m. What is the gradient?', opts: ['3/5', '5/3', '6/10', '10/6'], ans: 0, explain: 'Gradient = 6/10 = 3/5' },
  { q: 'Which line is parallel to a line with gradient 3?', opts: ['A line with gradient −3', 'A line with gradient 1/3', 'A line with gradient 3', 'A line with gradient −1/3'], ans: 2, explain: 'Parallel lines have the same gradient.' },
  { q: 'If two lines are parallel, their gradients are:', opts: ['Negative reciprocals', 'Equal', 'Both zero', 'Opposite signs'], ans: 1, explain: 'Parallel lines have equal gradients.' },
  { q: 'The gradient of the line through (−5, 2) and (−5, 10) is:', opts: ['0', '8', 'Undefined', '−8'], ans: 2, explain: 'Same x-coordinates → vertical line → undefined gradient.' },
  { q: 'The gradient of the line from (1, 1) to (4, 1) is:', opts: ['0', '1', '3', 'Undefined'], ans: 0, explain: 'Same y-coordinates → horizontal line → gradient = 0.' },
  { q: 'Find the gradient: (−2, −3) to (4, 9).', opts: ['2', '−2', '1/2', '6'], ans: 0, explain: 'm = (9−(−3))/(4−(−2)) = 12/6 = 2' },
  { q: 'Find the gradient: (3, 8) to (7, 2).', opts: ['3/2', '−3/2', '2/3', '−2/3'], ans: 1, explain: 'm = (2−8)/(7−3) = −6/4 = −3/2' },
  { q: 'A line with gradient −1 passes through (0, 6). Where does it cross the x-axis?', opts: ['(6, 0)', '(−6, 0)', '(0, 6)', '(3, 0)'], ans: 0, explain: 'y = −x + 6. At y=0: x=6, so (6,0).' },
  { q: 'A line with gradient 2 passes through (1, 3). Find y when x = 4.', opts: ['6', '9', '11', '8'], ans: 1, explain: 'Rise = 2×(4−1) = 6. y = 3+6 = 9.' },
  { q: 'The gradient of y = 7 is:', opts: ['7', '0', '1', 'Undefined'], ans: 1, explain: 'y = 7 is a horizontal line with gradient 0.' },
  { q: 'The gradient of x = −3 is:', opts: ['−3', '0', '3', 'Undefined'], ans: 3, explain: 'x = −3 is a vertical line with undefined gradient.' },
  { q: 'Points A(0, 1), B(2, 5), C(4, 9) are collinear if:', opts: ['AB gradient = BC gradient', 'AB gradient ≠ BC gradient', 'All x-values are equal', 'All y-values are equal'], ans: 0, explain: 'Collinear points lie on the same line, so the gradient between any pair must be equal.' },
  { q: 'Gradient of AB = (5−1)/(2−0) = 2. Gradient of BC = (9−5)/(4−2) = 2. Are A, B, C collinear?', opts: ['Yes', 'No', 'Cannot tell', 'Only if c = 1'], ans: 0, explain: 'Both gradients are 2 (equal), so the points are collinear.' },

  // ===== SKILL: y-intercept-form (Q81–Q120) =====
  { q: 'What is the gradient of y = 3x + 2?', opts: ['2', '3', '5', '3/2'], ans: 1, explain: 'In y = mx + c, m = 3.' },
  { q: 'What is the y-intercept of y = 3x + 2?', opts: ['3', '2', '0', '5'], ans: 1, explain: 'In y = mx + c, c = 2.' },
  { q: 'What is the gradient of y = −2x + 5?', opts: ['5', '2', '−2', '−5'], ans: 2, explain: 'm = −2' },
  { q: 'What is the y-intercept of y = −2x + 5?', opts: ['−2', '5', '−5', '2'], ans: 1, explain: 'c = 5' },
  { q: 'What is the gradient of y = x − 4?', opts: ['−4', '0', '4', '1'], ans: 3, explain: 'y = 1·x − 4, so m = 1.' },
  { q: 'What is the y-intercept of y = x − 4?', opts: ['1', '−4', '4', '0'], ans: 1, explain: 'c = −4' },
  { q: 'Write the equation of a line with gradient 2 and y-intercept 3.', opts: ['y = 3x + 2', 'y = 2x + 3', 'y = 2x − 3', 'y = 3x − 2'], ans: 1, explain: 'y = mx + c = 2x + 3' },
  { q: 'Write the equation of a line with gradient −1 and y-intercept 6.', opts: ['y = 6x − 1', 'y = −x − 6', 'y = −x + 6', 'y = x + 6'], ans: 2, explain: 'y = −1·x + 6 = −x + 6' },
  { q: 'The line y = 4x − 1 passes through (0, ?).', opts: ['4', '−1', '1', '0'], ans: 1, explain: 'At x = 0: y = −1. The y-intercept is −1.' },
  { q: 'The line y = 4x − 1 passes through (1, ?).', opts: ['3', '4', '5', '−1'], ans: 0, explain: 'y = 4(1) − 1 = 3' },
  { q: 'Which line passes through the origin?', opts: ['y = 2x + 1', 'y = 2x', 'y = x + 2', 'y = 2'], ans: 1, explain: 'y = 2x has c = 0, so it passes through (0, 0).' },
  { q: 'Which equation represents a horizontal line?', opts: ['x = 5', 'y = 5', 'y = x', 'y = 5x'], ans: 1, explain: 'y = 5 is horizontal (gradient = 0).' },
  { q: 'Which equation represents a vertical line?', opts: ['y = 3', 'x = 3', 'y = 3x', 'y = x + 3'], ans: 1, explain: 'x = 3 is a vertical line.' },
  { q: 'The line y = 2x + 3 and y = 2x − 1 are:', opts: ['Perpendicular', 'The same line', 'Parallel', 'Intersecting'], ans: 2, explain: 'Same gradient (m = 2) but different y-intercepts → parallel.' },
  { q: 'Which line is parallel to y = 5x − 3?', opts: ['y = −5x + 3', 'y = 5x + 7', 'y = 3x − 5', 'y = x/5 + 3'], ans: 1, explain: 'Parallel means same gradient. y = 5x + 7 has m = 5.' },
  { q: 'A line has gradient 3 and passes through (0, −2). Its equation is:', opts: ['y = −2x + 3', 'y = 3x + 2', 'y = 3x − 2', 'y = −2x − 3'], ans: 2, explain: 'y = 3x + (−2) = 3x − 2' },
  { q: 'A line has gradient −2 and passes through (0, 4). Its equation is:', opts: ['y = 4x − 2', 'y = −2x − 4', 'y = −2x + 4', 'y = 2x + 4'], ans: 2, explain: 'y = −2x + 4' },
  { q: 'Convert to y = mx + c form: 2y = 6x + 4', opts: ['y = 6x + 4', 'y = 3x + 2', 'y = 3x + 4', 'y = 2x + 6'], ans: 1, explain: 'Divide by 2: y = 3x + 2' },
  { q: 'Convert to y = mx + c form: 3y − 9x = 6', opts: ['y = 9x + 6', 'y = 3x + 6', 'y = 3x + 2', 'y = −3x + 2'], ans: 2, explain: '3y = 9x + 6, y = 3x + 2' },
  { q: 'Convert to y = mx + c form: x + y = 10', opts: ['y = x + 10', 'y = −x + 10', 'y = 10x + 1', 'y = 10 − 10x'], ans: 1, explain: 'y = −x + 10' },
  { q: 'The equation 2x + y = 8 in the form y = mx + c is:', opts: ['y = 2x + 8', 'y = −2x + 8', 'y = 2x − 8', 'y = −2x − 8'], ans: 1, explain: 'y = −2x + 8' },
  { q: 'Find the equation of a line with gradient 1/2 passing through (0, 1).', opts: ['y = x/2 + 1', 'y = x + 1/2', 'y = 2x + 1', 'y = x/2 − 1'], ans: 0, explain: 'y = (1/2)x + 1' },
  { q: 'A line passes through (0, 0) with gradient −3. Its equation is:', opts: ['y = 3x', 'y = −3x', 'y = −3', 'x = −3'], ans: 1, explain: 'y = −3x + 0 = −3x' },
  { q: 'The gradient and y-intercept of y = −x/2 + 3 are:', opts: ['m = −1/2, c = 3', 'm = 1/2, c = 3', 'm = −2, c = 3', 'm = 3, c = −1/2'], ans: 0, explain: 'y = (−1/2)x + 3, so m = −1/2, c = 3.' },
  { q: 'The gradient and y-intercept of y = 7 are:', opts: ['m = 7, c = 0', 'm = 0, c = 7', 'm = 1, c = 7', 'm = 7, c = 7'], ans: 1, explain: 'y = 0·x + 7, so m = 0, c = 7.' },
  { q: 'If y = mx + c passes through (2, 7) and (0, 3), find m and c.', opts: ['m = 2, c = 3', 'm = 3, c = 2', 'm = 2, c = 7', 'm = 7, c = 3'], ans: 0, explain: 'c = 3 (y-intercept). m = (7−3)/(2−0) = 2.' },
  { q: 'If y = mx + c passes through (0, −1) and (3, 5), find the equation.', opts: ['y = 2x − 1', 'y = −2x + 5', 'y = 2x + 1', 'y = 3x − 1'], ans: 0, explain: 'c = −1. m = (5−(−1))/(3−0) = 6/3 = 2. y = 2x − 1.' },
  { q: 'A line passes through (1, 5) and (3, 9). Find the equation.', opts: ['y = 2x + 3', 'y = 4x + 1', 'y = 2x + 5', 'y = x + 4'], ans: 0, explain: 'm = (9−5)/(3−1) = 2. Using (1,5): 5 = 2(1)+c, c = 3. y = 2x + 3.' },
  { q: 'A line passes through (2, 1) and (4, 7). Find the equation.', opts: ['y = 3x − 5', 'y = 3x + 1', 'y = 2x − 3', 'y = 3x − 7'], ans: 0, explain: 'm = (7−1)/(4−2) = 3. Using (2,1): 1 = 3(2)+c, c = −5. y = 3x − 5.' },
  { q: 'The line y = 2x + k passes through (3, 11). Find k.', opts: ['5', '6', '17', '3'], ans: 0, explain: '11 = 2(3) + k, 11 = 6 + k, k = 5' },
  { q: 'The line y = −x + k passes through (4, 1). Find k.', opts: ['5', '−3', '3', '−5'], ans: 0, explain: '1 = −4 + k, k = 5' },
  { q: 'Where does y = 3x − 6 cross the x-axis?', opts: ['(2, 0)', '(−2, 0)', '(0, −6)', '(−6, 0)'], ans: 0, explain: 'At y = 0: 0 = 3x − 6, x = 2. So (2, 0).' },
  { q: 'Where does y = −2x + 8 cross the x-axis?', opts: ['(−4, 0)', '(4, 0)', '(0, 8)', '(8, 0)'], ans: 1, explain: 'At y = 0: 0 = −2x + 8, x = 4. So (4, 0).' },
  { q: 'Where does y = x/2 + 3 cross the y-axis?', opts: ['(0, 3)', '(0, 1/2)', '(3, 0)', '(−6, 0)'], ans: 0, explain: 'y-intercept at x = 0: y = 3. So (0, 3).' },
  { q: 'Which line has the steepest positive gradient?', opts: ['y = x + 1', 'y = 3x − 2', 'y = 2x + 5', 'y = 0.5x + 4'], ans: 1, explain: 'Gradients: 1, 3, 2, 0.5. The steepest positive is 3.' },
  { q: 'Which line slopes downward from left to right?', opts: ['y = 2x + 1', 'y = x', 'y = −3x + 4', 'y = 5'], ans: 2, explain: 'Negative gradient (m = −3) means downward slope.' },
  { q: 'The x-intercept of y = 4x − 8 is:', opts: ['(2, 0)', '(0, −8)', '(−2, 0)', '(8, 0)'], ans: 0, explain: 'Set y=0: 4x = 8, x = 2. x-intercept is (2, 0).' },
  { q: 'The y-intercept of y = 4x − 8 is:', opts: ['(2, 0)', '(0, −8)', '(−2, 0)', '(0, 4)'], ans: 1, explain: 'Set x=0: y = −8. y-intercept is (0, −8).' },
  { q: 'For the line 3x + 2y = 12, find the y-intercept.', opts: ['(0, 6)', '(0, 4)', '(0, 12)', '(4, 0)'], ans: 0, explain: 'Set x=0: 2y = 12, y = 6. y-intercept is (0, 6).' },
  { q: 'A line is parallel to y = 4x + 1 and passes through (0, −3). Its equation is:', opts: ['y = 4x − 3', 'y = −4x − 3', 'y = 4x + 3', 'y = −3x + 4'], ans: 0, explain: 'Same gradient m = 4, y-intercept = −3. y = 4x − 3.' },

  // ===== SKILL: graph-linear (Q121–Q150) =====
  { q: 'To sketch y = 2x + 1, which two points could you plot?', opts: ['(0, 1) and (1, 3)', '(0, 2) and (1, 1)', '(1, 1) and (2, 2)', '(0, 0) and (1, 2)'], ans: 0, explain: 'At x=0: y=1. At x=1: y=3. So (0,1) and (1,3).' },
  { q: 'The graph of y = −x + 4 passes through (0, 4) and (4, 0). What shape is it?', opts: ['Curve', 'Straight line', 'Parabola', 'Circle'], ans: 1, explain: 'y = mx + c is always a straight line.' },
  { q: 'A straight line graph passes through (0, 2) and (3, 8). Its equation is:', opts: ['y = 2x + 2', 'y = 3x + 2', 'y = 2x + 8', 'y = 8x + 2'], ans: 0, explain: 'm = (8−2)/3 = 2. c = 2. y = 2x + 2.' },
  { q: 'The graph of y = 3 is:', opts: ['A line through the origin', 'A horizontal line at y = 3', 'A vertical line at x = 3', 'A line with gradient 3'], ans: 1, explain: 'y = 3 is a horizontal line.' },
  { q: 'The graph of x = −2 is:', opts: ['A horizontal line', 'A line through the origin', 'A vertical line at x = −2', 'A line with gradient −2'], ans: 2, explain: 'x = −2 is a vertical line.' },
  { q: 'Which of these lines passes through the origin?', opts: ['y = 3x + 1', 'y = x − 2', 'y = −5x', 'y = 2'], ans: 2, explain: 'y = −5x has c = 0, so it passes through (0, 0).' },
  { q: 'If a line crosses the y-axis at (0, −3) and the x-axis at (6, 0), the gradient is:', opts: ['1/2', '−1/2', '2', '−2'], ans: 0, explain: 'm = (0−(−3))/(6−0) = 3/6 = 1/2' },
  { q: 'The line y = −2x + 6 crosses the x-axis at:', opts: ['(3, 0)', '(−3, 0)', '(6, 0)', '(0, 6)'], ans: 0, explain: 'Set y=0: 2x = 6, x = 3.' },
  { q: 'The line y = x/3 − 2 crosses the y-axis at:', opts: ['(0, −2)', '(0, 1/3)', '(6, 0)', '(−2, 0)'], ans: 0, explain: 'At x=0: y = −2.' },
  { q: 'From the graph, a line passes through (−1, 0) and (0, 2). Its equation is:', opts: ['y = 2x + 2', 'y = −2x + 2', 'y = x + 2', 'y = 2x − 2'], ans: 0, explain: 'm = (2−0)/(0−(−1)) = 2. c = 2. y = 2x + 2.' },
  { q: 'Two lines y = 3x + 1 and y = 3x − 4 are graphed. They will:', opts: ['Cross at one point', 'Be identical', 'Never meet (parallel)', 'Cross at two points'], ans: 2, explain: 'Same gradient (3) but different y-intercepts → parallel, never meet.' },
  { q: 'The line y = x and the line y = −x intersect at:', opts: ['(1, −1)', '(0, 0)', '(1, 1)', 'They do not intersect'], ans: 1, explain: 'x = −x gives 2x = 0, x = 0. Both pass through (0, 0).' },
  { q: 'How many points do the lines y = 2x + 1 and y = 3x − 2 share?', opts: ['0', '1', '2', 'Infinite'], ans: 1, explain: 'Two non-parallel lines intersect at exactly one point.' },
  { q: 'At which point do y = x + 3 and y = 2x + 1 intersect?', opts: ['(2, 5)', '(1, 3)', '(3, 7)', '(−2, 1)'], ans: 0, explain: 'x + 3 = 2x + 1, x = 2. y = 2 + 3 = 5. Intersection at (2, 5).' },
  { q: 'At which point do y = −x + 7 and y = x + 1 intersect?', opts: ['(3, 4)', '(4, 3)', '(2, 5)', '(6, 1)'], ans: 0, explain: '−x + 7 = x + 1, 6 = 2x, x = 3. y = 4. Intersection at (3, 4).' },
  { q: 'The line y = 2x − 4 has a positive x-intercept. True or false?', opts: ['True', 'False', 'Cannot determine', 'Only if c > 0'], ans: 0, explain: 'At y=0: x = 2, which is positive.' },
  { q: 'Which table of values matches y = 2x − 1?', opts: ['x: 0,1,2 → y: −1,1,3', 'x: 0,1,2 → y: 1,3,5', 'x: 0,1,2 → y: −1,0,1', 'x: 0,1,2 → y: 2,3,4'], ans: 0, explain: 'y(0) = −1, y(1) = 1, y(2) = 3.' },
  { q: 'Which table of values matches y = −x + 5?', opts: ['x: 0,1,2 → y: 5,6,7', 'x: 0,1,2 → y: 5,4,3', 'x: 0,1,2 → y: −5,−4,−3', 'x: 0,1,2 → y: 5,3,1'], ans: 1, explain: 'y(0) = 5, y(1) = 4, y(2) = 3.' },
  { q: 'A line on a graph goes through (0, 4) and slopes downward to the right. Which could be its equation?', opts: ['y = 2x + 4', 'y = −3x + 4', 'y = x − 4', 'y = 4x'], ans: 1, explain: 'y-intercept 4 and negative gradient → y = −3x + 4.' },
  { q: 'A line on a graph goes through the origin and slopes upward. Which could be its equation?', opts: ['y = −2x', 'y = 3', 'y = 4x', 'y = x − 1'], ans: 2, explain: 'Through origin (c = 0) and positive gradient → y = 4x.' },
  { q: 'The graph of y = 2x + 3 is shifted up by 2 units. The new equation is:', opts: ['y = 2x + 5', 'y = 4x + 3', 'y = 2x + 1', 'y = 2x − 2'], ans: 0, explain: 'Shifting up 2 units adds 2 to c: y = 2x + 5.' },
  { q: 'The graph of y = 3x − 1 is shifted down by 4 units. The new equation is:', opts: ['y = 3x + 3', 'y = 3x − 5', 'y = −x − 1', 'y = 3x − 4'], ans: 1, explain: 'Shifting down 4: c = −1 − 4 = −5. y = 3x − 5.' },
  { q: 'A linear graph has x-intercept (5, 0) and y-intercept (0, 10). Find its equation.', opts: ['y = 2x + 10', 'y = −2x + 10', 'y = 2x − 10', 'y = −2x − 10'], ans: 1, explain: 'm = (10−0)/(0−5) = −2. c = 10. y = −2x + 10.' },
  { q: 'The graph of y = mx + c has a negative gradient and positive y-intercept. Which quadrant does it NOT pass through?', opts: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], ans: 2, explain: 'With negative gradient and positive c, the line goes through Q I, II, and IV but not Q III (for typical values).' },
  { q: 'A straight line passes through (−2, −5) and (2, 3). Find the equation.', opts: ['y = 2x − 1', 'y = 2x + 1', 'y = −2x − 1', 'y = x − 3'], ans: 0, explain: 'm = (3−(−5))/(2−(−2)) = 8/4 = 2. Using (2,3): 3 = 4+c, c = −1. y = 2x − 1.' },
  { q: 'The line y = 5x − 10 passes through (2, 0). What is the significance of this point?', opts: ['It is the y-intercept', 'It is the x-intercept', 'It is the origin', 'It is the midpoint'], ans: 1, explain: 'At (2, 0), y = 0, so this is the x-intercept.' },
  { q: 'Which of these lines has a y-intercept of 0?', opts: ['y = 2x + 3', 'y = 3x', 'y = x − 1', 'y = 5'], ans: 1, explain: 'y = 3x has c = 0.' },
  { q: 'A student plots (1, 4), (2, 6), (3, 8). What is the equation of this line?', opts: ['y = 2x + 2', 'y = 4x', 'y = x + 3', 'y = 2x + 4'], ans: 0, explain: 'm = (6−4)/(2−1) = 2. Using (1,4): 4 = 2+c, c = 2. y = 2x + 2.' },
  { q: 'The graph of y = −x + 3 forms a triangle with the axes. What is its area?', opts: ['4.5', '9', '3', '6'], ans: 0, explain: 'x-intercept: (3,0). y-intercept: (0,3). Area = (1/2)(3)(3) = 4.5.' },
  { q: 'The graph of y = 2x − 6 forms a triangle with the axes. What is its area?', opts: ['9', '6', '12', '18'], ans: 0, explain: 'x-intercept: (3,0). y-intercept: (0,−6). Area = (1/2)(3)(6) = 9.' },
  { q: 'Lines y = 2x + 1 and y = −x + 7 intersect at (2, 5). Which line has the steeper slope?', opts: ['y = 2x + 1', 'y = −x + 7', 'Both equal', 'Cannot tell'], ans: 0, explain: '|2| = 2 > |−1| = 1, so y = 2x + 1 is steeper.' },
];
