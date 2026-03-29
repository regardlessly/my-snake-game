import type { TopicMeta, MCQuestion } from '../../../src/types/curriculum';

export const meta: TopicMeta = {
  id: 10, sem: 2,
  title: 'Geometry & Angles',
  desc: 'Points, lines, planes, angle properties, parallel line angles'
};

export const notes: string | null = `
  <h2>Geometry &amp; Angles</h2>
  <p class="topic-desc">Points, lines, planes, angle properties, parallel line angles</p>

  <div class="notes-card">
    <h3>1. Types of Angles</h3>
    <p>Angles are classified by their size:</p>
    <div class="example">
      <strong>Acute angle:</strong> 0° &lt; angle &lt; 90°<br>
      <strong>Right angle:</strong> exactly 90°<br>
      <strong>Obtuse angle:</strong> 90° &lt; angle &lt; 180°<br>
      <strong>Straight angle:</strong> exactly 180°<br>
      <strong>Reflex angle:</strong> 180° &lt; angle &lt; 360°<br>
      <strong>Complete turn:</strong> exactly 360°
    </div>
  </div>

  <div class="notes-card">
    <h3>2. Angles on a Straight Line</h3>
    <p>Angles on a straight line add up to <strong>180°</strong>.</p>
    <div class="example">
      If two angles on a straight line are <em>x</em>° and 130°:<br>
      <em>x</em> + 130 = 180<br>
      <em>x</em> = <span class="highlight">50°</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>3. Angles at a Point</h3>
    <p>Angles at a point add up to <strong>360°</strong>.</p>
    <div class="example">
      If three angles at a point are 120°, 150° and <em>x</em>°:<br>
      120 + 150 + <em>x</em> = 360<br>
      <em>x</em> = <span class="highlight">90°</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>4. Vertically Opposite Angles</h3>
    <p>When two straight lines intersect, <strong>vertically opposite angles are equal</strong>.</p>
    <div class="example">
      Two lines cross. One angle is 65°.<br>
      The vertically opposite angle = <span class="highlight">65°</span><br>
      The adjacent angles = 180° &minus; 65° = <span class="highlight">115°</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>5. Parallel Lines &amp; Transversals</h3>
    <p>When a transversal crosses two parallel lines, special angle pairs are formed:</p>
    <div class="example">
      <strong>Corresponding angles</strong> are equal (F-shape)<br>
      <strong>Alternate angles</strong> are equal (Z-shape)<br>
      <strong>Co-interior (allied) angles</strong> add up to 180° (C-shape or U-shape)<br><br>
      Example: A transversal crosses parallel lines. One angle is 72°.<br>
      Corresponding angle = <span class="highlight">72°</span><br>
      Alternate angle = <span class="highlight">72°</span><br>
      Co-interior angle = 180° &minus; 72° = <span class="highlight">108°</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>6. Complementary &amp; Supplementary Angles</h3>
    <div class="example">
      <strong>Complementary angles:</strong> add up to 90°<br>
      <strong>Supplementary angles:</strong> add up to 180°<br><br>
      The complement of 35° = 90° &minus; 35° = <span class="highlight">55°</span><br>
      The supplement of 110° = 180° &minus; 110° = <span class="highlight">70°</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>Quick Reference</h3>
    <div class="formula">Angles on a straight line = 180°</div>
    <div class="formula">Angles at a point = 360°</div>
    <div class="formula">Vertically opposite angles are equal</div>
    <div class="formula">Corresponding angles are equal (parallel lines)</div>
    <div class="formula">Alternate angles are equal (parallel lines)</div>
    <div class="formula">Co-interior angles sum to 180° (parallel lines)</div>
  </div>
`

export const questions: MCQuestion[] | null = [
  // ═══════════════════════════════════════════
  // ANGLE TYPES (Q1–38)
  // ═══════════════════════════════════════════
  { q:"An angle of 45° is classified as:", opts:["Acute","Right","Obtuse","Reflex"], ans:0, explain:"An acute angle is between 0° and 90°. Since 45° is in this range, it is acute." },
  { q:"An angle of 90° is classified as:", opts:["Acute","Right","Obtuse","Straight"], ans:1, explain:"An angle of exactly 90° is a right angle." },
  { q:"An angle of 135° is classified as:", opts:["Acute","Right","Obtuse","Reflex"], ans:2, explain:"An obtuse angle is between 90° and 180°. Since 135° is in this range, it is obtuse." },
  { q:"An angle of 200° is classified as:", opts:["Obtuse","Straight","Reflex","Complete turn"], ans:2, explain:"A reflex angle is between 180° and 360°. Since 200° is in this range, it is reflex." },
  { q:"An angle of 180° is called a:", opts:["Right angle","Obtuse angle","Straight angle","Reflex angle"], ans:2, explain:"An angle of exactly 180° is a straight angle." },
  { q:"An angle of 360° is called a:", opts:["Straight angle","Reflex angle","Complete turn","Full reflex"], ans:2, explain:"An angle of exactly 360° is a complete turn (or full turn)." },
  { q:"Which of the following is an acute angle?", opts:["88°","90°","91°","180°"], ans:0, explain:"88° is less than 90°, so it is acute." },
  { q:"Which of the following is an obtuse angle?", opts:["45°","89°","90°","120°"], ans:3, explain:"120° is between 90° and 180°, so it is obtuse." },
  { q:"Which of the following is a reflex angle?", opts:["170°","180°","190°","90°"], ans:2, explain:"190° is between 180° and 360°, so it is reflex." },
  { q:"The complement of 30° is:", opts:["30°","60°","150°","330°"], ans:1, explain:"Complementary angles add to 90°. Complement = 90° − 30° = 60°." },
  { q:"The supplement of 70° is:", opts:["20°","70°","110°","290°"], ans:2, explain:"Supplementary angles add to 180°. Supplement = 180° − 70° = 110°." },
  { q:"The complement of 55° is:", opts:["25°","35°","45°","125°"], ans:1, explain:"90° − 55° = 35°." },
  { q:"The supplement of 135° is:", opts:["35°","45°","55°","225°"], ans:1, explain:"180° − 135° = 45°." },
  { q:"Two angles are complementary. One is 38°. Find the other.", opts:["42°","48°","52°","142°"], ans:2, explain:"90° − 38° = 52°." },
  { q:"Two angles are supplementary. One is 63°. Find the other.", opts:["27°","63°","117°","297°"], ans:2, explain:"180° − 63° = 117°." },
  { q:"Which pair of angles are complementary?", opts:["40° and 140°","55° and 35°","60° and 60°","90° and 90°"], ans:1, explain:"55° + 35° = 90°. They are complementary." },
  { q:"Which pair of angles are supplementary?", opts:["45° and 45°","60° and 60°","75° and 105°","80° and 80°"], ans:2, explain:"75° + 105° = 180°. They are supplementary." },
  { q:"An angle is twice its complement. Find the angle.", opts:["30°","45°","60°","90°"], ans:2, explain:"Let angle = x. Complement = 90 − x. x = 2(90 − x). x = 180 − 2x. 3x = 180. x = 60°." },
  { q:"An angle is 4 times its supplement. Find the angle.", opts:["36°","72°","108°","144°"], ans:3, explain:"Let angle = x. Supplement = 180 − x. x = 4(180 − x). x = 720 − 4x. 5x = 720. x = 144°." },
  { q:"What type of angle does a corner of a square have?", opts:["Acute","Right","Obtuse","Reflex"], ans:1, explain:"Each corner of a square is 90°, which is a right angle." },
  { q:"The hands of a clock at 3 o'clock form an angle of:", opts:["60°","90°","120°","180°"], ans:1, explain:"At 3 o'clock, the hands form a 90° angle (right angle)." },
  { q:"The hands of a clock at 6 o'clock form an angle of:", opts:["90°","120°","150°","180°"], ans:3, explain:"At 6 o'clock, the hands form a straight angle of 180°." },
  { q:"The hands of a clock at 4 o'clock form an angle of:", opts:["90°","100°","110°","120°"], ans:3, explain:"Each hour = 30°. At 4 o'clock: 4 × 30° = 120°." },
  { q:"An angle of 0.5° is classified as:", opts:["Zero angle","Acute","Right","Obtuse"], ans:1, explain:"0.5° is between 0° and 90°, so it is acute." },
  { q:"An angle of 179° is classified as:", opts:["Acute","Right","Obtuse","Reflex"], ans:2, explain:"179° is between 90° and 180°, so it is obtuse." },
  { q:"An angle of 181° is classified as:", opts:["Obtuse","Straight","Reflex","Complete turn"], ans:2, explain:"181° is between 180° and 360°, so it is reflex." },
  { q:"An angle of 359° is classified as:", opts:["Obtuse","Straight","Reflex","Complete turn"], ans:2, explain:"359° is between 180° and 360°, so it is reflex." },
  { q:"The reflex angle corresponding to 60° is:", opts:["120°","240°","300°","320°"], ans:2, explain:"Reflex angle = 360° − 60° = 300°." },
  { q:"The reflex angle corresponding to 150° is:", opts:["30°","150°","210°","330°"], ans:2, explain:"Reflex angle = 360° − 150° = 210°." },
  { q:"If two angles are supplementary and equal, each is:", opts:["45°","60°","90°","180°"], ans:2, explain:"2x = 180°, so x = 90°." },
  { q:"If two angles are complementary and equal, each is:", opts:["30°","45°","60°","90°"], ans:1, explain:"2x = 90°, so x = 45°." },
  { q:"An angle is 20° more than its complement. Find the angle.", opts:["35°","45°","55°","65°"], ans:2, explain:"x = (90 − x) + 20. 2x = 110. x = 55°." },
  { q:"An angle is 30° less than its supplement. Find the angle.", opts:["65°","70°","75°","80°"], ans:2, explain:"x = (180 − x) − 30. 2x = 150. x = 75°." },
  { q:"How many degrees does the minute hand of a clock turn in 20 minutes?", opts:["60°","90°","120°","180°"], ans:2, explain:"The minute hand turns 360° in 60 min. In 20 min: 20/60 × 360° = 120°." },
  { q:"How many degrees does the hour hand turn in 2 hours?", opts:["30°","45°","60°","90°"], ans:2, explain:"The hour hand turns 360° in 12 h. In 2 h: 2/12 × 360° = 60°." },
  { q:"What is the angle between North and East on a compass?", opts:["45°","60°","90°","180°"], ans:2, explain:"N to E is a quarter turn = 90°." },
  { q:"What is the angle between North and South-West on a compass?", opts:["135°","180°","225°","270°"], ans:2, explain:"N to SW (clockwise) = 225°." },
  { q:"An angle and its supplement differ by 40°. Find the larger angle.", opts:["70°","100°","110°","120°"], ans:2, explain:"x + (x − 40) = 180. 2x = 220. x = 110°." },

  // ═══════════════════════════════════════════
  // ANGLES ON A LINE & AT A POINT (Q39–76)
  // ═══════════════════════════════════════════
  { q:"Two angles on a straight line are x° and 130°. Find x.", opts:["30","40","50","60"], ans:2, explain:"Angles on a straight line sum to 180°. x = 180 − 130 = 50°." },
  { q:"Two angles on a straight line are 75° and y°. Find y.", opts:["95","100","105","115"], ans:2, explain:"y = 180 − 75 = 105°." },
  { q:"Three angles on a straight line are 40°, 60° and z°. Find z.", opts:["60","70","80","90"], ans:2, explain:"z = 180 − 40 − 60 = 80°." },
  { q:"Angles on a straight line are 2x° and 3x°. Find x.", opts:["30","36","40","45"], ans:1, explain:"2x + 3x = 180. 5x = 180. x = 36." },
  { q:"Angles on a straight line are (x + 10)° and (2x + 20)°. Find x.", opts:["40","45","50","55"], ans:2, explain:"(x + 10) + (2x + 20) = 180. 3x + 30 = 180. 3x = 150. x = 50." },
  { q:"Two angles on a straight line are in the ratio 2 : 3. Find the larger angle.", opts:["72°","90°","108°","120°"], ans:2, explain:"Total = 180°. Larger = 3/5 × 180 = 108°." },
  { q:"Two angles on a straight line are in the ratio 1 : 5. Find the smaller angle.", opts:["25°","30°","36°","45°"], ans:1, explain:"Smaller = 1/6 × 180 = 30°." },
  { q:"Three angles on a straight line are x°, 2x° and 3x°. Find x.", opts:["20","25","30","36"], ans:2, explain:"x + 2x + 3x = 180. 6x = 180. x = 30." },
  { q:"Angles on a straight line are 55°, x° and 65°. Find x.", opts:["50","55","60","65"], ans:2, explain:"x = 180 − 55 − 65 = 60°." },
  { q:"Three angles at a point are 120°, 150° and x°. Find x.", opts:["60","80","90","100"], ans:2, explain:"Angles at a point sum to 360°. x = 360 − 120 − 150 = 90°." },
  { q:"Four angles at a point are 80°, 90°, 100° and x°. Find x.", opts:["70","80","90","100"], ans:2, explain:"x = 360 − 80 − 90 − 100 = 90°." },
  { q:"Angles at a point are 2x°, 3x° and 5x°. Find x.", opts:["30","36","40","45"], ans:1, explain:"2x + 3x + 5x = 360. 10x = 360. x = 36." },
  { q:"Two angles at a point are equal and the third angle is 120°. Find each equal angle.", opts:["100°","110°","120°","130°"], ans:2, explain:"2x + 120 = 360. 2x = 240. x = 120°." },
  { q:"Three angles at a point are in the ratio 2 : 3 : 4. Find the smallest.", opts:["60°","80°","100°","120°"], ans:1, explain:"Total = 9 parts. Smallest = 2/9 × 360 = 80°." },
  { q:"Four angles at a point are in the ratio 1 : 2 : 3 : 3. Find the largest.", opts:["40°","80°","100°","120°"], ans:3, explain:"Total = 9 parts. Largest = 3/9 × 360 = 120°." },
  { q:"Five equal angles meet at a point. Find each angle.", opts:["60°","72°","75°","90°"], ans:1, explain:"360° ÷ 5 = 72°." },
  { q:"Six equal angles meet at a point. Find each angle.", opts:["45°","50°","55°","60°"], ans:3, explain:"360° ÷ 6 = 60°." },
  { q:"Angles at a point are 70°, 2x°, 110° and x°. Find x.", opts:["50","55","60","65"], ans:2, explain:"70 + 2x + 110 + x = 360. 3x + 180 = 360. 3x = 180. x = 60." },
  { q:"Angles at a point are (3x − 10)°, (2x + 20)° and (x + 50)°. Find x.", opts:["40","45","50","55"], ans:2, explain:"(3x − 10) + (2x + 20) + (x + 50) = 360. 6x + 60 = 360. 6x = 300. x = 50." },
  { q:"Two straight lines intersect. If one angle is 40°, the angle adjacent to it is:", opts:["40°","50°","130°","140°"], ans:3, explain:"Adjacent angles on a straight line: 180° − 40° = 140°." },
  { q:"Angles on a straight line are 3x° and (x + 40)°. Find the larger angle.", opts:["105°","108°","110°","120°"], ans:0, explain:"3x + x + 40 = 180. 4x = 140. x = 35. Larger = 3(35) = 105°." },
  { q:"Angles at a point are 5x°, 4x°, 3x° and 2x°. Find the largest angle (in degrees).", opts:["100.7°","108°","120.9°","128.6°"], ans:3, explain:"5x + 4x + 3x + 2x = 360. 14x = 360. x ≈ 25.71. Largest = 5 × 25.71 ≈ 128.6°." },
  { q:"On a straight line, angles are (2x + 15)° and (3x − 5)°. Find x.", opts:["30","32","34","36"], ans:2, explain:"(2x + 15) + (3x − 5) = 180. 5x + 10 = 180. 5x = 170. x = 34." },
  { q:"Three angles on a straight line are equal. What is each?", opts:["45°","50°","55°","60°"], ans:3, explain:"3x = 180. x = 60°." },
  { q:"Angles at a point are 145°, x° and 2x°. Find x.", opts:["65.5°","71.7°","72°","73°"], ans:1, explain:"145 + x + 2x = 360. 3x = 215. x ≈ 71.7°." },
  { q:"Two angles on a straight line differ by 50°. Find the smaller angle.", opts:["55°","60°","65°","70°"], ans:2, explain:"x + (x + 50) = 180. 2x = 130. x = 65°." },
  { q:"Four angles at a point are 2a°, 3a°, 4a° and 90°. Find a.", opts:["25","27","30","35"], ans:2, explain:"2a + 3a + 4a + 90 = 360. 9a = 270. a = 30." },
  { q:"On a straight line, the angles are x°, (x + 20)° and (x + 40)°. Find x.", opts:["35","40","45","50"], ans:1, explain:"x + (x+20) + (x+40) = 180. 3x + 60 = 180. 3x = 120. x = 40." },

  // ═══════════════════════════════════════════
  // VERTICALLY OPPOSITE ANGLES (Q77–108)
  // ═══════════════════════════════════════════
  { q:"Two straight lines intersect. One angle is 72°. The vertically opposite angle is:", opts:["18°","72°","108°","288°"], ans:1, explain:"Vertically opposite angles are equal. The answer is 72°." },
  { q:"Two straight lines intersect. One angle is 115°. The vertically opposite angle is:", opts:["65°","115°","155°","245°"], ans:1, explain:"Vertically opposite angles are equal. The answer is 115°." },
  { q:"Two straight lines intersect. One angle is 50°. Find the adjacent angle.", opts:["50°","100°","130°","140°"], ans:2, explain:"Adjacent angles on a straight line: 180° − 50° = 130°." },
  { q:"Two straight lines intersect. One angle is 35°. Find all four angles.", opts:["35°, 35°, 145°, 145°","35°, 55°, 145°, 125°","35°, 145°, 35°, 145°","35°, 145°, 55°, 125°"], ans:0, explain:"Vertically opposite: 35° and 35°. Adjacent: 180° − 35° = 145° each." },
  { q:"Two straight lines intersect forming angles x° and (3x − 20)°. If these are vertically opposite, find x.", opts:["5","10","15","20"], ans:1, explain:"Vertically opposite angles are equal: x = 3x − 20. 20 = 2x. x = 10." },
  { q:"Two straight lines cross. One angle is (2x + 10)° and the adjacent angle is (3x − 30)°. Find x.", opts:["36","38","40","42"], ans:2, explain:"Adjacent angles: (2x + 10) + (3x − 30) = 180. 5x − 20 = 180. 5x = 200. x = 40." },
  { q:"Two straight lines cross. One angle is 4x° and its vertically opposite angle is (x + 60)°. Find x.", opts:["15","18","20","25"], ans:2, explain:"Vertically opposite: 4x = x + 60. 3x = 60. x = 20." },
  { q:"Two lines intersect. One pair of vertically opposite angles are each 90°. What are the other pair?", opts:["45° each","60° each","90° each","180° each"], ans:2, explain:"If one pair is 90°, adjacent = 180° − 90° = 90°. All four angles are 90°." },
  { q:"Three lines meet at a point. One angle is 40°, the vertically opposite is also 40°. Another angle is 70°. Find the angle adjacent to the 70°.", opts:["70°","100°","110°","140°"], ans:0, explain:"With 3 lines at a point: 6 angles. The vertically opposite angle to 70° is also 70°. Remaining 2 angles = (360 − 80 − 140) ÷ 2 = 70° each." },
  { q:"Two lines cross. Angle A = 55°. Angle B is adjacent to A. Angle C is vertically opposite to B. Find C.", opts:["55°","65°","115°","125°"], ans:3, explain:"B = 180 − 55 = 125°. C is vertically opposite to B, so C = 125°." },
  { q:"Two straight lines intersect. If one angle is x° and the adjacent angle is (2x)°, find x.", opts:["45","50","55","60"], ans:3, explain:"x + 2x = 180. 3x = 180. x = 60." },
  { q:"Two straight lines cross. The angles formed are x°, y°, x° and y°. If x − y = 30°, find x.", opts:["95°","100°","105°","110°"], ans:2, explain:"x + y = 180 and x − y = 30. Adding: 2x = 210. x = 105°." },
  { q:"Two lines intersect. One angle is 3a° and the vertically opposite is (a + 50)°. Find a.", opts:["20","25","30","35"], ans:1, explain:"3a = a + 50. 2a = 50. a = 25." },
  { q:"Two lines cross. An angle is (5x − 20)° and its vertically opposite angle is (3x + 16)°. Find x.", opts:["14","16","18","20"], ans:2, explain:"5x − 20 = 3x + 16. 2x = 36. x = 18." },
  { q:"Two straight lines cross. One angle is 2y° and the adjacent angle is (y + 60)°. Find y.", opts:["35","40","45","50"], ans:1, explain:"2y + y + 60 = 180. 3y = 120. y = 40." },
  { q:"Two lines cross at a point. One angle is 48°. How many of the four angles are acute?", opts:["1","2","3","4"], ans:1, explain:"Angles: 48°, 132°, 48°, 132°. Two are acute (48°)." },
  { q:"Two intersecting lines form an angle of 90°. What can you say about the lines?", opts:["They are parallel","They are perpendicular","They are curved","They are skew"], ans:1, explain:"Lines meeting at 90° are perpendicular." },
  { q:"Two lines intersect. One angle is (x + 35)° and the vertically opposite angle is (2x + 5)°. Find x.", opts:["25","30","35","40"], ans:1, explain:"x + 35 = 2x + 5. 30 = x. x = 30." },
  { q:"At an intersection, the angle between two roads is 65°. What is the obtuse angle at the same intersection?", opts:["105°","110°","115°","125°"], ans:2, explain:"180° − 65° = 115°." },
  { q:"Two straight lines intersect forming angles (4p)° and (p + 45)°. If they are adjacent, find p.", opts:["25","27","30","35"], ans:1, explain:"4p + p + 45 = 180. 5p = 135. p = 27." },
  { q:"Two lines cross. One angle is (3m − 12)° and the adjacent angle is (2m + 7)°. Find the value of the larger angle.", opts:["81°","93°","99°","111°"], ans:2, explain:"(3m − 12) + (2m + 7) = 180. 5m − 5 = 180. 5m = 185. m = 37. Angles: 3(37) − 12 = 99° and 2(37) + 7 = 81°. The larger angle is 99°." },
  { q:"Lines AB and CD intersect at O. Angle AOC = 125°. Find angle BOD.", opts:["55°","65°","125°","235°"], ans:2, explain:"Angle BOD is vertically opposite to angle AOC. So angle BOD = 125°." },
  { q:"Lines PQ and RS intersect at O. Angle POR = 47°. Find angle QOS.", opts:["43°","47°","133°","313°"], ans:1, explain:"Angle QOS is vertically opposite to angle POR. So angle QOS = 47°." },
  { q:"Lines AB and CD cross at O. Angle AOC = (2x + 14)° and angle BOD = (3x − 16)°. Find angle AOC.", opts:["60°","68°","74°","78°"], ans:2, explain:"Vertically opposite: 2x + 14 = 3x − 16. x = 30. Angle AOC = 2(30) + 14 = 74°." },
  { q:"Two lines intersect. If one angle is twice the vertically opposite angle, this is:", opts:["Always true","Only if both are 90°","Impossible","Only for right angles"], ans:2, explain:"Vertically opposite angles are always equal. One cannot be twice the other (unless both are 0°, which isn't a real intersection)." },
  { q:"At a road junction, the acute angle between two roads is 38°. Find the reflex angle at the junction.", opts:["142°","218°","322°","342°"], ans:2, explain:"Reflex angle = 360° − 38° = 322°." },
  { q:"Two lines intersect. Three of the angles are 55°, 125°, and 55°. Find the fourth angle.", opts:["55°","105°","115°","125°"], ans:3, explain:"Total = 360°. Fourth angle = 360 − 55 − 125 − 55 = 125°." },
  { q:"Lines intersect at O forming angles p°, q°, p° and q°. If p = 3q, find p.", opts:["120°","130°","135°","140°"], ans:2, explain:"p + q = 180. 3q + q = 180. 4q = 180. q = 45. p = 135°." },
  { q:"Two straight lines cross. The sum of a pair of adjacent angles is:", opts:["90°","180°","270°","360°"], ans:1, explain:"Adjacent angles on a straight line always sum to 180°." },
  { q:"Two lines intersect. One of the angles is x°. Express the adjacent angle in terms of x.", opts:["x°","(90 − x)°","(180 − x)°","(360 − x)°"], ans:2, explain:"Adjacent angles on a straight line sum to 180°. Adjacent = (180 − x)°." },
  { q:"Two straight lines intersect at right angles. All four angles are:", opts:["45° each","60° each","90° each","180° each"], ans:2, explain:"If lines are perpendicular, all four angles at the intersection are 90°." },
  { q:"Two lines cross. One angle is (6x − 30)° and its vertically opposite angle is (4x + 10)°. Find the angle.", opts:["80°","86°","90°","96°"], ans:2, explain:"6x − 30 = 4x + 10. 2x = 40. x = 20. Angle = 6(20) − 30 = 90°." },

  // ═══════════════════════════════════════════
  // PARALLEL LINE ANGLES (Q109–150)
  // ═══════════════════════════════════════════
  { q:"A transversal crosses two parallel lines. A corresponding angle is 70°. Find the other corresponding angle.", opts:["70°","80°","100°","110°"], ans:0, explain:"Corresponding angles are equal when lines are parallel. The answer is 70°." },
  { q:"A transversal crosses two parallel lines. An alternate angle is 55°. Find the other alternate angle.", opts:["35°","55°","125°","145°"], ans:1, explain:"Alternate angles are equal when lines are parallel. The answer is 55°." },
  { q:"A transversal crosses two parallel lines. One co-interior angle is 65°. Find the other.", opts:["65°","105°","115°","125°"], ans:2, explain:"Co-interior angles sum to 180°. Other = 180° − 65° = 115°." },
  { q:"Parallel lines are cut by a transversal. One angle is 110°. The corresponding angle is:", opts:["70°","80°","100°","110°"], ans:3, explain:"Corresponding angles are equal: 110°." },
  { q:"Parallel lines are cut by a transversal. One angle is 130°. The alternate angle is:", opts:["50°","60°","130°","140°"], ans:2, explain:"Alternate angles are equal: 130°." },
  { q:"Parallel lines cut by a transversal. Angle a = 75° (co-interior with angle b). Find b.", opts:["75°","95°","105°","115°"], ans:2, explain:"Co-interior angles sum to 180°. b = 180° − 75° = 105°." },
  { q:"Lines AB ∥ CD. A transversal makes an angle of 48° with AB. The corresponding angle with CD is:", opts:["42°","48°","132°","138°"], ans:1, explain:"Corresponding angles: 48°." },
  { q:"Lines AB ∥ CD. A transversal makes an angle of 62° with AB. The alternate angle at CD is:", opts:["28°","62°","118°","128°"], ans:1, explain:"Alternate angles: 62°." },
  { q:"AB ∥ CD. A transversal forms a co-interior angle of 110° at AB. Find the co-interior angle at CD.", opts:["60°","70°","80°","110°"], ans:1, explain:"Co-interior angles: 180° − 110° = 70°." },
  { q:"A transversal crosses parallel lines. Angle 1 = 3x° and angle 2 = (x + 40)° are corresponding. Find x.", opts:["15","18","20","25"], ans:2, explain:"Corresponding angles are equal: 3x = x + 40. 2x = 40. x = 20." },
  { q:"A transversal crosses parallel lines. Angle A = (2x + 10)° and angle B = (3x − 20)° are alternate. Find x.", opts:["25","30","35","40"], ans:1, explain:"Alternate angles are equal: 2x + 10 = 3x − 20. 30 = x." },
  { q:"A transversal crosses parallel lines. Co-interior angles are (2x + 30)° and (3x + 10)°. Find x.", opts:["24","26","28","30"], ans:2, explain:"Co-interior sum to 180°: (2x + 30) + (3x + 10) = 180. 5x + 40 = 180. 5x = 140. x = 28." },
  { q:"Lines PQ ∥ RS. A transversal creates angle of 135° at PQ. What is the co-interior angle at RS?", opts:["35°","45°","55°","135°"], ans:1, explain:"Co-interior: 180° − 135° = 45°." },
  { q:"AB ∥ CD. Corresponding angles are (5x − 15)° and (3x + 25)°. Find x.", opts:["15","18","20","25"], ans:2, explain:"5x − 15 = 3x + 25. 2x = 40. x = 20." },
  { q:"In a Z-shape on parallel lines, one angle is 42°. The alternate angle is:", opts:["42°","48°","138°","148°"], ans:0, explain:"Alternate angles (Z-shape) are equal: 42°." },
  { q:"In an F-shape on parallel lines, one angle is 108°. The corresponding angle is:", opts:["72°","82°","98°","108°"], ans:3, explain:"Corresponding angles (F-shape) are equal: 108°." },
  { q:"In a C-shape on parallel lines, one angle is 95°. The co-interior angle is:", opts:["75°","80°","85°","95°"], ans:2, explain:"Co-interior angles (C-shape) sum to 180°: 180° − 95° = 85°." },
  { q:"AB ∥ CD. A transversal meets AB at 53° and CD at x°. If these are alternate angles, x =", opts:["37°","53°","127°","137°"], ans:1, explain:"Alternate angles are equal: x = 53°." },
  { q:"AB ∥ CD. A transversal forms angle 125° at AB. Find all angles at CD.", opts:["55° and 125°","65° and 115°","70° and 110°","75° and 105°"], ans:0, explain:"Corresponding to 125° → 125°. Adjacent → 180° − 125° = 55°. So angles at CD are 55° and 125°." },
  { q:"Two parallel lines are cut by a transversal. Angle p and angle q are co-interior. If p = 2q, find p.", opts:["100°","110°","120°","130°"], ans:2, explain:"p + q = 180. 2q + q = 180. q = 60. p = 120°." },
  { q:"AB ∥ CD. Angle at AB = 68°. Find the alternate interior angle at CD.", opts:["22°","68°","112°","122°"], ans:1, explain:"Alternate interior angles are equal: 68°." },
  { q:"Parallel lines cut by a transversal. One angle is (4x − 8)° and its co-interior angle is (2x + 20)°. Find x.", opts:["26","28","30","32"], ans:1, explain:"(4x − 8) + (2x + 20) = 180. 6x + 12 = 180. 6x = 168. x = 28." },
  { q:"Two parallel lines are cut by a transversal. If one of the 8 angles formed is 65°, how many of the 8 angles are 65°?", opts:["2","3","4","6"], ans:2, explain:"4 angles will be 65° (corresponding and vertically opposite). The other 4 will be 115°." },
  { q:"AB ∥ CD. Angle ABE = 40° and angle BEF = x° where E is on the transversal between the parallel lines. Angle EFD = 30°. Find x (angle BEF is an angle in triangle BEF).", opts:["70°","100°","110°","120°"], ans:2, explain:"Alternate angle at B with CD gives angle at F side. In triangle BEF: angle B = 40°, angle F = 30°, x = 180° − 40° − 30° = 110°." },
  { q:"Lines l₁ ∥ l₂. A transversal makes angle 72° with l₁. What acute angle does it make with l₂?", opts:["18°","72°","108°","118°"], ans:1, explain:"Corresponding angles are equal: 72°." },
  { q:"AB ∥ CD. Angle on one side of the transversal at AB is 55°. The angle on the same side at CD is:", opts:["55°","65°","115°","125°"], ans:3, explain:"Co-interior angles sum to 180°: 180° − 55° = 125°." },
  { q:"Parallel lines are cut by a transversal forming 8 angles. If one angle is 90°, all 8 angles are:", opts:["45°","60°","90°","Cannot tell"], ans:2, explain:"If one angle is 90°, all corresponding, alternate, and co-interior relationships give 90° for all 8 angles." },
  { q:"AB ∥ CD. A transversal creates angle (3x + 5)° at AB and (2x + 15)° at CD as corresponding angles. Find the angle.", opts:["30°","35°","40°","45°"], ans:1, explain:"3x + 5 = 2x + 15. x = 10. Angle = 3(10) + 5 = 35°." },
  { q:"AB ∥ CD. Alternate angles are (7x − 10)° and (5x + 14)°. Find the angle.", opts:["64°","74°","80°","84°"], ans:1, explain:"7x − 10 = 5x + 14. 2x = 24. x = 12. Angle = 7(12) − 10 = 74°. Check: 5(12) + 14 = 74°. The angle is 74°." },
  { q:"AB ∥ CD. Co-interior angles are (3x + 15)° and (5x − 11)°. Find x.", opts:["20","22","24","26"], ans:1, explain:"(3x + 15) + (5x − 11) = 180. 8x + 4 = 180. 8x = 176. x = 22." },
  { q:"Lines l ∥ m. A transversal makes 58° with l. The obtuse angle at m on the same side is:", opts:["112°","118°","122°","132°"], ans:2, explain:"Co-interior angle = 180° − 58° = 122°." },
  { q:"AB ∥ CD. If a corresponding angle pair is 90°, what is the co-interior angle pair sum?", opts:["90°","135°","180°","360°"], ans:2, explain:"Co-interior angles always sum to 180° for parallel lines, regardless of the specific angles." },
  { q:"AB ∥ CD. Angle ABC = 145° (between transversal and AB). Find angle BCD (alternate interior).", opts:["35°","45°","135°","145°"], ans:0, explain:"The alternate interior angle to 145° is actually on the other side. The interior angle at B is 180° − 145° = 35°. The alternate interior angle at C = 35°." },
  { q:"Three parallel lines are cut by a transversal. Angle at the first line is 60°. What are the corresponding angles at the other two lines?", opts:["60° and 60°","60° and 120°","120° and 120°","30° and 30°"], ans:0, explain:"Corresponding angles at each parallel line are equal: 60° and 60°." },
  { q:"AB ∥ CD. A transversal creates angles (x + 50)° and (3x − 10)° as co-interior angles. Find x.", opts:["30","35","40","45"], ans:1, explain:"(x + 50) + (3x − 10) = 180. 4x + 40 = 180. 4x = 140. x = 35." },
  { q:"Lines p ∥ q are cut by transversal t. One interior angle at p is 73°. The alternate interior angle at q is:", opts:["17°","73°","107°","117°"], ans:1, explain:"Alternate interior angles are equal: 73°." },
  { q:"AB ∥ CD. An exterior angle at AB is 140°. The interior angle on the same side at CD is:", opts:["40°","50°","130°","140°"], ans:0, explain:"The exterior angle at AB is 140°, so the interior angle at AB on the same side = 180° − 140° = 40°. The corresponding interior angle at CD on the same side = 40° (corresponding angles are equal)." },
  { q:"AB ∥ CD. Corresponding angles are (2x + 30)° at AB and (4x − 10)° at CD. Find the angles.", opts:["50°","60°","70°","80°"], ans:2, explain:"2x + 30 = 4x − 10. 40 = 2x. x = 20. Angle = 2(20) + 30 = 70°." },
  { q:"AB ∥ CD. The transversal makes equal angles with both parallel lines. Each angle is:", opts:["45°","60°","90°","Cannot tell"], ans:2, explain:"If corresponding angles are equal and the transversal makes equal angles on the same side, both must be 90° (perpendicular)." },
  { q:"AB ∥ CD. Alternate angles are (2x + 5)° and (x + 35)°. Find the angle.", opts:["55°","60°","65°","70°"], ans:2, explain:"2x + 5 = x + 35. x = 30. Angle = 2(30) + 5 = 65°." },
  { q:"Two parallel lines are 5 cm apart. A transversal crosses both. One angle is 50°. What is the co-interior angle?", opts:["40°","50°","130°","140°"], ans:2, explain:"Co-interior angles sum to 180°. 180° − 50° = 130°." },
  { q:"AB ∥ CD. Angle BAC = 35° and angle ACD = x° where AC is the transversal. If these are alternate angles, x =", opts:["35°","55°","145°","155°"], ans:0, explain:"Alternate angles are equal: x = 35°." },
  { q:"What is the sum of all angles formed at the intersection of two straight lines?", opts:["180°","270°","360°","540°"], ans:2, explain:"Angles at a point sum to 360°." },
  { q:"Two angles are both complementary and supplementary. Is this possible?", opts:["Yes, both are 0°","Yes, both are 45°","Yes, both are 90°","No, it is impossible"], ans:3, explain:"Complementary: a + b = 90. Supplementary: a + b = 180. These cannot both be true simultaneously." },
  { q:"The angle of elevation to the top of a building is 60° from a point on the ground. What type of angle is 60°?", opts:["Acute","Right","Obtuse","Reflex"], ans:0, explain:"60° is between 0° and 90°, so it is acute." },
  { q:"AB ∥ CD. Angle on the left of the transversal at AB is 80°. Angle on the right of the transversal at CD is:", opts:["80°","90°","100°","110°"], ans:0, explain:"These are alternate angles (Z-shape). Alternate angles are equal: 80°." },
  { q:"An angle is 3 times its supplement. Find the angle.", opts:["45°","90°","120°","135°"], ans:3, explain:"x = 3(180 − x). x = 540 − 3x. 4x = 540. x = 135°." },
  { q:"Angles at a point are a°, 2a°, 3a° and 4a°. Find the largest angle.", opts:["108°","120°","132°","144°"], ans:3, explain:"a + 2a + 3a + 4a = 360. 10a = 360. a = 36. Largest = 4(36) = 144°." },
  { q:"AB ∥ CD. Co-interior angles are (4x + 5)° and (6x − 15)°. Find the smaller angle.", opts:["71°","76°","81°","99°"], ans:2, explain:"4x + 5 + 6x − 15 = 180. 10x − 10 = 180. 10x = 190. x = 19. Angles: 81° and 99°. Smaller = 81°." },
  { q:"Three straight lines meet at a point forming 6 angles. If one angle is 50°, the vertically opposite angle is:", opts:["50°","130°","180°","310°"], ans:0, explain:"Vertically opposite angles are equal: 50°." },
  { q:"AB ∥ CD. A transversal makes 45° with AB. What angle does it make with CD?", opts:["35°","45°","55°","135°"], ans:1, explain:"Corresponding angles are equal: 45°." },
  { q:"Two adjacent angles on a straight line are (3x + 15)° and (2x)°. Find the obtuse angle.", opts:["66°","99°","105°","114°"], ans:3, explain:"3x + 15 + 2x = 180. 5x + 15 = 180. 5x = 165. x = 33. Angles: 3(33) + 15 = 114° and 2(33) = 66°. The obtuse angle is 114°." },
];
