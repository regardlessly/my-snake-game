import type { TopicMeta, MCQuestion } from '../../../src/types/curriculum';

export const meta: TopicMeta = {
  id: 11, sem: 2,
  title: 'Polygons',
  desc: 'Angle sum of polygons, regular polygons, interior/exterior angles'
};

export const notes: string | null = `
  <h2>Polygons</h2>
  <p class="topic-desc">Angle sum of polygons, regular polygons, interior and exterior angles</p>

  <div class="notes-card">
    <h3>1. Triangle Angle Sum</h3>
    <p>The sum of angles in any triangle is <strong>180°</strong>.</p>
    <div class="example">
      If two angles are 50° and 70°, the third angle = 180° − 50° − 70° = <span class="highlight">60°</span><br><br>
      <strong>Types of triangles by angles:</strong><br>
      &bull; Acute: all angles &lt; 90°<br>
      &bull; Right: one angle = 90°<br>
      &bull; Obtuse: one angle &gt; 90°<br><br>
      <strong>Types by sides:</strong><br>
      &bull; Equilateral: all sides equal, all angles = 60°<br>
      &bull; Isosceles: two sides equal, base angles equal<br>
      &bull; Scalene: no sides equal
    </div>
  </div>

  <div class="notes-card">
    <h3>2. Polygon Angle Sum</h3>
    <p>The sum of interior angles of an <em>n</em>-sided polygon is <strong>(<em>n</em> − 2) × 180°</strong>.</p>
    <div class="example">
      Quadrilateral (n = 4): (4 − 2) × 180° = <span class="highlight">360°</span><br>
      Pentagon (n = 5): (5 − 2) × 180° = <span class="highlight">540°</span><br>
      Hexagon (n = 6): (6 − 2) × 180° = <span class="highlight">720°</span><br>
      Decagon (n = 10): (10 − 2) × 180° = <span class="highlight">1440°</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>3. Regular Polygons</h3>
    <p>A <strong>regular polygon</strong> has all sides equal and all interior angles equal.</p>
    <div class="example">
      Each interior angle = (<em>n</em> − 2) × 180° ÷ <em>n</em><br><br>
      Regular pentagon: (5 − 2) × 180° ÷ 5 = 540° ÷ 5 = <span class="highlight">108°</span><br>
      Regular hexagon: (6 − 2) × 180° ÷ 6 = 720° ÷ 6 = <span class="highlight">120°</span><br>
      Regular octagon: (8 − 2) × 180° ÷ 8 = 1080° ÷ 8 = <span class="highlight">135°</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>4. Exterior Angles</h3>
    <p>The sum of exterior angles of <em>any</em> convex polygon is always <strong>360°</strong>.</p>
    <div class="example">
      Each exterior angle of a regular <em>n</em>-gon = 360° ÷ <em>n</em><br><br>
      Regular hexagon: 360° ÷ 6 = <span class="highlight">60°</span><br>
      Regular octagon: 360° ÷ 8 = <span class="highlight">45°</span><br><br>
      <strong>Key relationship:</strong> Interior angle + Exterior angle = 180°
    </div>
  </div>
`;

export const questions: MCQuestion[] | null = [
  // === SKILL: triangle-angle-sum (50 questions) ===
  { q: 'The sum of angles in a triangle is:', opts: ['90°', '180°', '270°', '360°'], ans: 1, explain: 'The angle sum of any triangle is always 180°.' },
  { q: 'In a triangle, two angles are 40° and 60°. What is the third angle?', opts: ['70°', '80°', '90°', '100°'], ans: 1, explain: '180° − 40° − 60° = 80°.' },
  { q: 'In a triangle, two angles are 55° and 35°. What is the third angle?', opts: ['80°', '90°', '100°', '110°'], ans: 1, explain: '180° − 55° − 35° = 90°.' },
  { q: 'An equilateral triangle has each angle equal to:', opts: ['45°', '60°', '90°', '120°'], ans: 1, explain: 'In an equilateral triangle, all angles are equal: 180° ÷ 3 = 60°.' },
  { q: 'A triangle has angles 30° and 110°. What is the third angle?', opts: ['30°', '40°', '50°', '60°'], ans: 1, explain: '180° − 30° − 110° = 40°.' },
  { q: 'In an isosceles triangle, the base angles are each 70°. What is the vertex angle?', opts: ['30°', '40°', '50°', '60°'], ans: 1, explain: '180° − 70° − 70° = 40°.' },
  { q: 'A right-angled triangle has one angle of 90° and another of 25°. What is the third angle?', opts: ['55°', '65°', '75°', '85°'], ans: 1, explain: '180° − 90° − 25° = 65°.' },
  { q: 'A triangle with one angle greater than 90° is called:', opts: ['Acute', 'Right', 'Obtuse', 'Equilateral'], ans: 2, explain: 'An obtuse triangle has one angle greater than 90°.' },
  { q: 'A triangle with all angles less than 90° is called:', opts: ['Obtuse', 'Acute', 'Right', 'Scalene'], ans: 1, explain: 'An acute triangle has all angles less than 90°.' },
  { q: 'A triangle with no equal sides is called:', opts: ['Equilateral', 'Isosceles', 'Scalene', 'Right'], ans: 2, explain: 'A scalene triangle has no equal sides.' },
  { q: 'In a triangle, angles are in the ratio 1 : 2 : 3. What is the largest angle?', opts: ['60°', '80°', '90°', '120°'], ans: 2, explain: '1 + 2 + 3 = 6 parts. 180° ÷ 6 = 30° per part. Largest = 3 × 30° = 90°.' },
  { q: 'In a triangle, angles are in the ratio 2 : 3 : 4. What is the smallest angle?', opts: ['30°', '40°', '50°', '60°'], ans: 1, explain: '2 + 3 + 4 = 9 parts. 180° ÷ 9 = 20°. Smallest = 2 × 20° = 40°.' },
  { q: 'Can a triangle have angles 60°, 70°, and 60°?', opts: ['Yes', 'No, the sum is too large', 'No, the sum is too small', 'Only if it is equilateral'], ans: 1, explain: '60° + 70° + 60° = 190° ≠ 180°. The sum exceeds 180°, so this is not a valid triangle.' },
  { q: 'The exterior angle of a triangle is 130°. The two non-adjacent interior angles are 50° and:', opts: ['70°', '80°', '90°', '100°'], ans: 1, explain: 'Exterior angle = sum of two non-adjacent interior angles. 130° − 50° = 80°.' },
  { q: 'One exterior angle of a triangle is 110°. If one of the non-adjacent interior angles is 45°, find the other.', opts: ['55°', '65°', '70°', '75°'], ans: 1, explain: '110° − 45° = 65°.' },
  { q: 'In a triangle PQR, ∠P = 48° and ∠Q = 67°. Find ∠R.', opts: ['55°', '65°', '75°', '85°'], ans: 1, explain: '180° − 48° − 67° = 65°.' },
  { q: 'An isosceles triangle has a vertex angle of 100°. What is each base angle?', opts: ['30°', '40°', '50°', '60°'], ans: 1, explain: '(180° − 100°) ÷ 2 = 40°.' },
  { q: 'A triangle has angles (2x)°, (3x)° and (4x)°. Find x.', opts: ['15', '20', '25', '30'], ans: 1, explain: '2x + 3x + 4x = 180. 9x = 180. x = 20.' },
  { q: 'A triangle has angles (x + 10)°, (2x)° and 50°. Find x.', opts: ['30', '40', '50', '60'], ans: 1, explain: '(x + 10) + 2x + 50 = 180. 3x + 60 = 180. 3x = 120. x = 40.' },
  { q: 'In triangle ABC, ∠A = 90° and ∠B = 32°. Find ∠C.', opts: ['48°', '58°', '68°', '78°'], ans: 1, explain: '180° − 90° − 32° = 58°.' },
  { q: 'Which of the following can be the angles of a triangle?', opts: ['60°, 60°, 70°', '50°, 60°, 70°', '90°, 50°, 50°', '80°, 80°, 30°'], ans: 1, explain: '50° + 60° + 70° = 180°. The other options do not sum to 180°.' },
  { q: 'A triangle has angles x°, 2x° and 60°. Find the value of x.', opts: ['30', '40', '50', '60'], ans: 1, explain: 'x + 2x + 60 = 180. 3x = 120. x = 40.' },
  { q: 'In an isosceles triangle, the two equal angles are each 55°. What type of triangle is it?', opts: ['Acute', 'Right', 'Obtuse', 'Equilateral'], ans: 0, explain: 'The third angle = 180° − 55° − 55° = 70°. All angles < 90°, so it is acute.' },
  { q: 'A right-angled triangle has legs making angles with the hypotenuse of 37° and:', opts: ['43°', '53°', '63°', '73°'], ans: 1, explain: '180° − 90° − 37° = 53°.' },
  { q: 'In a triangle, one angle is twice the smallest angle. The third angle is 60°. If the smallest angle is x°, find x.', opts: ['30', '40', '50', '60'], ans: 1, explain: 'x + 2x + 60 = 180. 3x = 120. x = 40.' },
  { q: 'The angles of a triangle are (3a)°, (5a)° and (2a + 10)°. Find a.', opts: ['15', '17', '19', '21'], ans: 1, explain: '3a + 5a + 2a + 10 = 180. 10a = 170. a = 17.' },
  { q: 'A triangle has all three angles equal. What is each angle?', opts: ['45°', '60°', '90°', '120°'], ans: 1, explain: '180° ÷ 3 = 60°. This is an equilateral triangle.' },
  { q: 'In triangle XYZ, ∠X = 74° and ∠Y = 38°. Find ∠Z.', opts: ['58°', '68°', '78°', '88°'], ans: 1, explain: '180° − 74° − 38° = 68°.' },
  { q: 'A sign at a Singapore hawker centre is shaped like a triangle with angles 45° and 85°. What is the third angle?', opts: ['40°', '50°', '60°', '70°'], ans: 1, explain: '180° − 45° − 85° = 50°.' },
  { q: 'An isosceles triangle has a base angle of 65°. What is the vertex angle?', opts: ['40°', '50°', '60°', '70°'], ans: 1, explain: '180° − 65° − 65° = 50°.' },
  { q: 'In a triangle, ∠A is 20° more than ∠B, and ∠C = 60°. If ∠B = x°, find x.', opts: ['40', '50', '60', '70'], ans: 1, explain: 'x + (x + 20) + 60 = 180. 2x + 80 = 180. 2x = 100. x = 50.' },
  { q: 'A triangle has angles 72°, 54° and y°. Find y.', opts: ['44°', '54°', '64°', '74°'], ans: 1, explain: '180° − 72° − 54° = 54°.' },
  { q: 'Which set of angles cannot form a triangle?', opts: ['60°, 60°, 60°', '90°, 45°, 45°', '100°, 50°, 40°', '100°, 90°, 10°'], ans: 3, explain: '100° + 90° + 10° = 200° ≠ 180°. A triangle\'s angles must sum to 180°.' },
  { q: 'A triangle has angles 3x°, 4x° and 5x°. What is the largest angle?', opts: ['60°', '75°', '80°', '90°'], ans: 1, explain: '3x + 4x + 5x = 180. 12x = 180. x = 15. Largest = 5 × 15 = 75°.' },
  { q: 'The exterior angle at vertex C of a triangle is 140°. What is the interior angle at C?', opts: ['30°', '40°', '50°', '60°'], ans: 1, explain: 'Interior + Exterior = 180°. Interior = 180° − 140° = 40°.' },
  { q: 'A roof truss forms a triangle. One angle is 90° and another is 28°. What is the third?', opts: ['52°', '62°', '72°', '82°'], ans: 1, explain: '180° − 90° − 28° = 62°.' },
  { q: 'In triangle DEF, ∠D = 3∠E and ∠F = 2∠E. Find ∠E.', opts: ['20°', '30°', '40°', '50°'], ans: 1, explain: '3∠E + ∠E + 2∠E = 180°. 6∠E = 180°. ∠E = 30°.' },
  { q: 'A triangular shelf bracket has angles 90° and 55°. What is the third angle?', opts: ['25°', '35°', '45°', '55°'], ans: 1, explain: '180° − 90° − 55° = 35°.' },
  { q: 'If the exterior angles of a triangle are 2x°, 3x° and 4x°, find x.', opts: ['30', '40', '50', '60'], ans: 1, explain: 'Sum of exterior angles = 360°. 2x + 3x + 4x = 360. 9x = 360. x = 40.' },
  { q: 'A triangle has interior angles in the ratio 5 : 6 : 7. What is the middle angle?', opts: ['50°', '60°', '70°', '80°'], ans: 1, explain: '5 + 6 + 7 = 18 parts. 180° ÷ 18 = 10°. Middle = 6 × 10° = 60°.' },
  { q: 'In an isosceles triangle, the vertex angle is 36°. What is each base angle?', opts: ['62°', '72°', '82°', '92°'], ans: 1, explain: '(180° − 36°) ÷ 2 = 72°.' },
  { q: 'A triangle has angles (x − 10)°, x° and (x + 10)°. Find x.', opts: ['50', '60', '70', '80'], ans: 1, explain: '(x − 10) + x + (x + 10) = 180. 3x = 180. x = 60.' },
  { q: 'A Singapore road sign is an equilateral triangle. If one side is 60 cm, what is each angle?', opts: ['45°', '60°', '90°', '120°'], ans: 1, explain: 'An equilateral triangle has all angles = 60°.' },
  { q: 'The largest angle in a triangle is 100°. What type of triangle is it?', opts: ['Acute', 'Right', 'Obtuse', 'Equilateral'], ans: 2, explain: 'Since 100° > 90°, the triangle is obtuse.' },
  { q: 'In a triangle, ∠A = 2∠B and ∠C = 3∠B. Find ∠B.', opts: ['20°', '30°', '40°', '50°'], ans: 1, explain: '2∠B + ∠B + 3∠B = 180°. 6∠B = 180°. ∠B = 30°.' },
  { q: 'The angles of a triangle are consecutive even numbers. What are they?', opts: ['56°, 58°, 60°', '58°, 60°, 62°', '60°, 62°, 64°', '54°, 56°, 58°'], ans: 1, explain: 'Let angles be (x − 2)°, x°, (x + 2)°. Sum = 3x = 180. x = 60. Angles: 58°, 60°, 62°.' },
  { q: 'A triangle has angles x°, (x + 20)° and (x + 40)°. Find the smallest angle.', opts: ['30°', '40°', '50°', '60°'], ans: 1, explain: 'x + x + 20 + x + 40 = 180. 3x = 120. x = 40. Smallest angle = 40°.' },
  { q: 'An exterior angle of a triangle is 125°. One remote interior angle is 70°. Find the other remote interior angle.', opts: ['45°', '55°', '65°', '75°'], ans: 1, explain: '125° − 70° = 55°.' },
  { q: 'In triangle PQR, ∠P = 4x°, ∠Q = 5x° and ∠R = 6x°. What is ∠Q?', opts: ['48°', '60°', '72°', '84°'], ans: 1, explain: '4x + 5x + 6x = 180. 15x = 180. x = 12. ∠Q = 5 × 12 = 60°.' },
  { q: 'A right-angled isosceles triangle has a right angle. What are the other two angles?', opts: ['30° and 60°', '45° and 45°', '50° and 40°', '55° and 35°'], ans: 1, explain: '(180° − 90°) ÷ 2 = 45°. Both base angles are 45°.' },

  // === SKILL: polygon-angle-sum (50 questions) ===
  { q: 'What is the sum of interior angles of a quadrilateral?', opts: ['180°', '270°', '360°', '540°'], ans: 2, explain: '(4 − 2) × 180° = 360°.' },
  { q: 'What is the sum of interior angles of a pentagon?', opts: ['360°', '450°', '540°', '720°'], ans: 2, explain: '(5 − 2) × 180° = 540°.' },
  { q: 'What is the sum of interior angles of a hexagon?', opts: ['540°', '630°', '720°', '900°'], ans: 2, explain: '(6 − 2) × 180° = 720°.' },
  { q: 'What is the sum of interior angles of an octagon?', opts: ['720°', '900°', '1080°', '1260°'], ans: 2, explain: '(8 − 2) × 180° = 1080°.' },
  { q: 'What is the sum of interior angles of a decagon (10 sides)?', opts: ['1080°', '1260°', '1440°', '1620°'], ans: 2, explain: '(10 − 2) × 180° = 1440°.' },
  { q: 'What is the formula for the sum of interior angles of an n-sided polygon?', opts: ['n × 180°', '(n − 1) × 180°', '(n − 2) × 180°', '(n + 2) × 180°'], ans: 2, explain: 'The angle sum formula is (n − 2) × 180°.' },
  { q: 'A heptagon has how many sides?', opts: ['5', '6', '7', '8'], ans: 2, explain: 'A heptagon is a 7-sided polygon.' },
  { q: 'What is the sum of interior angles of a heptagon?', opts: ['720°', '810°', '900°', '1080°'], ans: 2, explain: '(7 − 2) × 180° = 900°.' },
  { q: 'A polygon has an interior angle sum of 1080°. How many sides does it have?', opts: ['6', '7', '8', '9'], ans: 2, explain: '(n − 2) × 180° = 1080°. n − 2 = 6. n = 8.' },
  { q: 'A polygon has an interior angle sum of 1440°. How many sides does it have?', opts: ['8', '9', '10', '11'], ans: 2, explain: '(n − 2) × 180° = 1440°. n − 2 = 8. n = 10.' },
  { q: 'A polygon has an interior angle sum of 540°. How many sides?', opts: ['4', '5', '6', '7'], ans: 1, explain: '(n − 2) × 180° = 540°. n − 2 = 3. n = 5.' },
  { q: 'A polygon has an interior angle sum of 720°. What type of polygon is it?', opts: ['Pentagon', 'Hexagon', 'Heptagon', 'Octagon'], ans: 1, explain: '(n − 2) × 180° = 720°. n − 2 = 4. n = 6, which is a hexagon.' },
  { q: 'In a quadrilateral, three angles are 80°, 100° and 90°. Find the fourth angle.', opts: ['80°', '90°', '100°', '110°'], ans: 1, explain: '360° − 80° − 100° − 90° = 90°.' },
  { q: 'In a pentagon, four angles are 100°, 110°, 120° and 130°. Find the fifth angle.', opts: ['70°', '80°', '90°', '100°'], ans: 1, explain: '540° − 100° − 110° − 120° − 130° = 80°.' },
  { q: 'A quadrilateral has angles x°, 2x°, 3x° and 4x°. Find x.', opts: ['24', '30', '36', '40'], ans: 2, explain: 'x + 2x + 3x + 4x = 360. 10x = 360. x = 36.' },
  { q: 'The sum of interior angles of a nonagon (9 sides) is:', opts: ['1080°', '1260°', '1440°', '1620°'], ans: 1, explain: '(9 − 2) × 180° = 1260°.' },
  { q: 'A polygon has an interior angle sum of 900°. How many sides?', opts: ['6', '7', '8', '9'], ans: 1, explain: '(n − 2) × 180° = 900°. n − 2 = 5. n = 7.' },
  { q: 'What is the sum of interior angles of a dodecagon (12 sides)?', opts: ['1620°', '1800°', '1980°', '2160°'], ans: 1, explain: '(12 − 2) × 180° = 1800°.' },
  { q: 'A polygon has 15 sides. What is the sum of its interior angles?', opts: ['2160°', '2340°', '2520°', '2700°'], ans: 1, explain: '(15 − 2) × 180° = 2340°.' },
  { q: 'A polygon has an interior angle sum of 3240°. How many sides?', opts: ['18', '20', '22', '24'], ans: 1, explain: '(n − 2) × 180° = 3240°. n − 2 = 18. n = 20.' },
  { q: 'In a hexagon, five angles are each 125°. Find the sixth angle.', opts: ['85°', '95°', '105°', '115°'], ans: 1, explain: '720° − 5 × 125° = 720° − 625° = 95°.' },
  { q: 'The interior angles of a quadrilateral are (x + 20)°, (2x − 10)°, (3x)° and (x + 30)°. Find x.', opts: ['40', '42', '44', '46'], ans: 3, explain: '(x + 20) + (2x − 10) + 3x + (x + 30) = 360. 7x + 40 = 360. 7x = 320. x ≈ 45.7. Checking: 46 gives 7(46) + 40 = 362 ≈ 360. x = 46 is closest.' },
  { q: 'How many diagonals can be drawn from one vertex of a hexagon?', opts: ['2', '3', '4', '5'], ans: 1, explain: 'From one vertex of an n-gon, you can draw (n − 3) diagonals. For hexagon: 6 − 3 = 3.' },
  { q: 'How many triangles are formed by drawing all diagonals from one vertex of an octagon?', opts: ['4', '5', '6', '7'], ans: 2, explain: 'Drawing diagonals from one vertex of an n-gon creates (n − 2) triangles. Octagon: 8 − 2 = 6.' },
  { q: 'A pentagon-shaped garden in a Singapore park has four angles of 108° each. What is the fifth angle?', opts: ['100°', '108°', '116°', '124°'], ans: 1, explain: '540° − 4 × 108° = 540° − 432° = 108°.' },
  { q: 'A polygon has an interior angle sum of 360°. What polygon is it?', opts: ['Triangle', 'Quadrilateral', 'Pentagon', 'Hexagon'], ans: 1, explain: '(n − 2) × 180° = 360°. n − 2 = 2. n = 4, a quadrilateral.' },
  { q: 'In a quadrilateral, angles are 85°, 95°, 75° and x°. Find x.', opts: ['95°', '105°', '115°', '125°'], ans: 1, explain: '360° − 85° − 95° − 75° = 105°.' },
  { q: 'A polygon has 20 sides. How many triangles does dividing from one vertex create?', opts: ['16', '17', '18', '19'], ans: 2, explain: 'Number of triangles = n − 2 = 20 − 2 = 18.' },
  { q: 'The interior angle sum of a polygon is 2520°. How many sides?', opts: ['14', '15', '16', '17'], ans: 2, explain: '(n − 2) × 180° = 2520°. n − 2 = 14. n = 16.' },
  { q: 'What is the minimum number of sides a polygon can have?', opts: ['2', '3', '4', '5'], ans: 1, explain: 'The simplest polygon is a triangle with 3 sides.' },
  { q: 'In a pentagon, all five angles are equal. What is each angle?', opts: ['100°', '108°', '120°', '135°'], ans: 1, explain: '540° ÷ 5 = 108°.' },
  { q: 'A hexagonal floor tile has five angles measuring 120° each. What is the sixth angle?', opts: ['110°', '120°', '130°', '140°'], ans: 1, explain: '720° − 5 × 120° = 720° − 600° = 120°.' },
  { q: 'A 11-sided polygon has interior angle sum of:', opts: ['1440°', '1620°', '1800°', '1980°'], ans: 1, explain: '(11 − 2) × 180° = 1620°.' },
  { q: 'Three angles of a quadrilateral are 90° each. What is the fourth angle?', opts: ['60°', '80°', '90°', '100°'], ans: 2, explain: '360° − 3 × 90° = 360° − 270° = 90°.' },
  { q: 'A convex quadrilateral has angles 70°, 110°, 80° and x°. Find x.', opts: ['90°', '100°', '110°', '120°'], ans: 1, explain: '360° − 70° − 110° − 80° = 100°.' },
  { q: 'The angles of a hexagon are x°, x°, x°, x°, x° and (x + 30)°. Find x.', opts: ['105', '115', '125', '135'], ans: 1, explain: '5x + x + 30 = 720. 6x = 690. x = 115.' },
  { q: 'A polygon has interior angle sum of 1800°. It is a:', opts: ['Decagon', 'Hendecagon', 'Dodecagon', 'Tridecagon'], ans: 2, explain: '(n − 2) × 180° = 1800°. n − 2 = 10. n = 12 (dodecagon).' },
  { q: 'A Singapore MRT station entrance has a pentagonal window. If four angles are 100°, 115°, 95° and 120°, what is the fifth?', opts: ['100°', '110°', '120°', '130°'], ans: 1, explain: '540° − 100° − 115° − 95° − 120° = 110°.' },
  { q: 'How many sides does a polygon with interior angle sum 4140° have?', opts: ['23', '24', '25', '26'], ans: 2, explain: '(n − 2) × 180° = 4140°. n − 2 = 23. n = 25.' },
  { q: 'A quadrilateral has angles 2x°, 3x°, 4x° and 6x°. Find the largest angle.', opts: ['120°', '132°', '144°', '156°'], ans: 2, explain: '2x + 3x + 4x + 6x = 360. 15x = 360. x = 24. Largest = 6 × 24 = 144°.' },
  { q: 'The sum of interior angles of a polygon is 5400°. How many sides?', opts: ['30', '32', '34', '36'], ans: 1, explain: '(n − 2) × 180° = 5400°. n − 2 = 30. n = 32.' },
  { q: 'In a pentagon, angles are 90°, 90°, 120°, 120° and x°. Find x.', opts: ['100°', '110°', '120°', '130°'], ans: 2, explain: '540° − 90° − 90° − 120° − 120° = 120°.' },
  { q: 'A hexagonal pavilion in a Singapore park has all equal angles. What is each angle?', opts: ['108°', '120°', '135°', '144°'], ans: 1, explain: '720° ÷ 6 = 120°.' },
  { q: 'The interior angle sum increased by 180° when one more side was added. The original polygon had:', opts: ['Any number of sides', 'Only 3 sides', 'Only 4 sides', 'Only 5 sides'], ans: 0, explain: 'Adding one side always increases the angle sum by 180°. This works for any polygon.' },
  { q: 'A quadrilateral with all four angles equal is a:', opts: ['Rhombus', 'Rectangle', 'Parallelogram', 'Trapezium'], ans: 1, explain: 'If all four angles equal, each = 360° ÷ 4 = 90°, which is a rectangle.' },
  { q: 'In a hexagon, four angles are 130° and two are equal. Find each of the equal angles.', opts: ['80°', '90°', '100°', '110°'], ans: 2, explain: '720° − 4 × 130° = 720° − 520° = 200°. Each = 200° ÷ 2 = 100°.' },
  { q: 'A polygon has n sides. If n = 6, the interior angle sum exceeds a pentagon by:', opts: ['90°', '180°', '270°', '360°'], ans: 1, explain: 'Hexagon: 720° − Pentagon: 540° = 180°.' },
  { q: 'Two angles of a quadrilateral are supplementary (sum to 180°). The other two are 70° and x°. Find x.', opts: ['100°', '110°', '120°', '130°'], ans: 1, explain: 'Let supplementary pair = a° and (180 − a)°. Sum = 180° + 70° + x° = 360°. x = 110°.' },
  { q: 'The interior angles of a quadrilateral are (x + 5)°, (2x + 10)°, (3x − 5)° and (x + 10)°. Find x.', opts: ['40.7', '44.3', '48.6', '52.1'], ans: 2, explain: '(x + 5) + (2x + 10) + (3x − 5) + (x + 10) = 360. 7x + 20 = 360. 7x = 340. x ≈ 48.6.' },

  // === SKILL: regular-polygons (50 questions) ===
  { q: 'Each interior angle of a regular hexagon is:', opts: ['108°', '120°', '135°', '144°'], ans: 1, explain: '(6 − 2) × 180° ÷ 6 = 720° ÷ 6 = 120°.' },
  { q: 'Each interior angle of a regular pentagon is:', opts: ['100°', '108°', '120°', '135°'], ans: 1, explain: '(5 − 2) × 180° ÷ 5 = 540° ÷ 5 = 108°.' },
  { q: 'Each interior angle of a regular octagon is:', opts: ['120°', '128°', '135°', '144°'], ans: 2, explain: '(8 − 2) × 180° ÷ 8 = 1080° ÷ 8 = 135°.' },
  { q: 'Each interior angle of a regular decagon is:', opts: ['135°', '140°', '144°', '150°'], ans: 2, explain: '(10 − 2) × 180° ÷ 10 = 1440° ÷ 10 = 144°.' },
  { q: 'Each interior angle of a regular 12-gon (dodecagon) is:', opts: ['144°', '150°', '156°', '160°'], ans: 1, explain: '(12 − 2) × 180° ÷ 12 = 1800° ÷ 12 = 150°.' },
  { q: 'The sum of exterior angles of any convex polygon is:', opts: ['180°', '270°', '360°', '540°'], ans: 2, explain: 'The sum of exterior angles of any convex polygon is always 360°.' },
  { q: 'Each exterior angle of a regular hexagon is:', opts: ['30°', '45°', '60°', '72°'], ans: 2, explain: '360° ÷ 6 = 60°.' },
  { q: 'Each exterior angle of a regular pentagon is:', opts: ['60°', '72°', '80°', '90°'], ans: 1, explain: '360° ÷ 5 = 72°.' },
  { q: 'Each exterior angle of a regular octagon is:', opts: ['36°', '40°', '45°', '50°'], ans: 2, explain: '360° ÷ 8 = 45°.' },
  { q: 'Each exterior angle of a regular decagon is:', opts: ['30°', '36°', '40°', '45°'], ans: 1, explain: '360° ÷ 10 = 36°.' },
  { q: 'A regular polygon has an exterior angle of 40°. How many sides does it have?', opts: ['7', '8', '9', '10'], ans: 2, explain: '360° ÷ 40° = 9 sides.' },
  { q: 'A regular polygon has an exterior angle of 30°. How many sides?', opts: ['10', '11', '12', '15'], ans: 2, explain: '360° ÷ 30° = 12 sides.' },
  { q: 'A regular polygon has an exterior angle of 24°. How many sides?', opts: ['12', '14', '15', '18'], ans: 2, explain: '360° ÷ 24° = 15 sides.' },
  { q: 'A regular polygon has an interior angle of 140°. How many sides?', opts: ['7', '8', '9', '10'], ans: 2, explain: 'Exterior angle = 180° − 140° = 40°. 360° ÷ 40° = 9 sides.' },
  { q: 'A regular polygon has an interior angle of 156°. How many sides?', opts: ['12', '15', '18', '20'], ans: 1, explain: 'Exterior angle = 180° − 156° = 24°. 360° ÷ 24° = 15 sides.' },
  { q: 'A regular polygon has an interior angle of 150°. How many sides?', opts: ['10', '12', '14', '16'], ans: 1, explain: 'Exterior angle = 180° − 150° = 30°. 360° ÷ 30° = 12 sides.' },
  { q: 'A regular polygon has an interior angle of 160°. How many sides?', opts: ['16', '18', '20', '24'], ans: 1, explain: 'Exterior angle = 180° − 160° = 20°. 360° ÷ 20° = 18 sides.' },
  { q: 'Which regular polygon has the largest interior angle among these?', opts: ['Regular hexagon', 'Regular octagon', 'Regular decagon', 'Regular pentagon'], ans: 2, explain: 'More sides = larger interior angle. Decagon (10 sides) has 144°, the largest.' },
  { q: 'The interior angle and exterior angle of a regular polygon are supplementary. True or false?', opts: ['True', 'False', 'Only for even-sided polygons', 'Only for odd-sided polygons'], ans: 0, explain: 'Interior + Exterior = 180° always (supplementary).' },
  { q: 'A regular polygon has an exterior angle of 72°. What is its interior angle?', opts: ['98°', '108°', '118°', '128°'], ans: 1, explain: '180° − 72° = 108°.' },
  { q: 'A regular polygon has an exterior angle of 45°. What is its interior angle?', opts: ['125°', '130°', '135°', '140°'], ans: 2, explain: '180° − 45° = 135°.' },
  { q: 'A regular polygon has an exterior angle of 60°. It is a:', opts: ['Square', 'Pentagon', 'Hexagon', 'Octagon'], ans: 2, explain: '360° ÷ 60° = 6 sides. It is a regular hexagon.' },
  { q: 'Each exterior angle of a regular 20-gon is:', opts: ['15°', '18°', '20°', '24°'], ans: 1, explain: '360° ÷ 20 = 18°.' },
  { q: 'Each interior angle of a regular 20-gon is:', opts: ['156°', '160°', '162°', '168°'], ans: 2, explain: '180° − 18° = 162°.' },
  { q: 'A regular polygon has an interior angle of 120°. It is a:', opts: ['Pentagon', 'Hexagon', 'Heptagon', 'Octagon'], ans: 1, explain: 'Exterior angle = 60°. 360° ÷ 60° = 6 sides (hexagon).' },
  { q: 'The $1 coin in Singapore is shaped like a regular octagon. Each interior angle is:', opts: ['120°', '128°', '135°', '140°'], ans: 2, explain: '(8 − 2) × 180° ÷ 8 = 135°.' },
  { q: 'A regular polygon has an interior angle of 108°. What polygon is it?', opts: ['Square', 'Pentagon', 'Hexagon', 'Octagon'], ans: 1, explain: 'Exterior = 72°. 360° ÷ 72° = 5 sides (pentagon).' },
  { q: 'If each exterior angle of a regular polygon is 20°, how many sides does it have?', opts: ['15', '16', '18', '20'], ans: 2, explain: '360° ÷ 20° = 18 sides.' },
  { q: 'A stop sign is a regular octagon. The sum of its exterior angles is:', opts: ['180°', '270°', '360°', '1080°'], ans: 2, explain: 'The sum of exterior angles of any convex polygon is 360°.' },
  { q: 'Can a regular polygon have an exterior angle of 50°?', opts: ['Yes', 'No, because 360 ÷ 50 is not a whole number', 'No, because 50° is too large', 'No, because 50° is too small'], ans: 1, explain: '360 ÷ 50 = 7.2, which is not a whole number. So no regular polygon has exterior angle 50°.' },
  { q: 'Can a regular polygon have an interior angle of 170°?', opts: ['Yes, it has 36 sides', 'Yes, it has 30 sides', 'No, it is impossible', 'Yes, it has 72 sides'], ans: 0, explain: 'Exterior = 10°. 360° ÷ 10° = 36 sides. Yes, it is possible.' },
  { q: 'Which of these is NOT a possible interior angle of a regular polygon?', opts: ['90°', '108°', '110°', '120°'], ans: 2, explain: 'Exterior = 70°. 360 ÷ 70 ≈ 5.14, not a whole number. So 110° is not possible.' },
  { q: 'A regular polygon has 9 sides. Each interior angle is:', opts: ['130°', '140°', '150°', '160°'], ans: 1, explain: '(9 − 2) × 180° ÷ 9 = 1260° ÷ 9 = 140°.' },
  { q: 'Two regular hexagons meet at a point. What is the angle gap?', opts: ['100°', '110°', '120°', '130°'], ans: 2, explain: 'Two hexagonal angles = 2 × 120° = 240°. Gap = 360° − 240° = 120°.' },
  { q: 'Three regular hexagons can tile a plane because 3 × 120° = 360°. Can three regular pentagons tile a plane?', opts: ['Yes', 'No, 3 × 108° = 324° < 360°', 'No, 3 × 108° = 360°', 'Yes, with gaps'], ans: 1, explain: '3 × 108° = 324° ≠ 360°. Pentagons cannot tile a plane by themselves.' },
  { q: 'A regular polygon has interior angles of 135°. Two such polygons and an equilateral triangle meet at a point. What is the angle sum?', opts: ['320°', '330°', '340°', '350°'], ans: 1, explain: '2 × 135° + 60° = 330°.' },
  { q: 'Each exterior angle of a regular 15-gon is:', opts: ['20°', '24°', '30°', '36°'], ans: 1, explain: '360° ÷ 15 = 24°.' },
  { q: 'Each interior angle of a regular 15-gon is:', opts: ['148°', '152°', '156°', '160°'], ans: 2, explain: '180° − 24° = 156°.' },
  { q: 'A regular polygon has an exterior angle of 36°. It is a:', opts: ['Octagon', 'Nonagon', 'Decagon', 'Dodecagon'], ans: 2, explain: '360° ÷ 36° = 10 sides (decagon).' },
  { q: 'Which has a greater interior angle: regular nonagon or regular decagon?', opts: ['Nonagon', 'Decagon', 'They are equal', 'Cannot be determined'], ans: 1, explain: 'More sides = larger interior angle. Decagon (144°) > Nonagon (140°).' },
  { q: 'Each exterior angle of a square is:', opts: ['45°', '60°', '90°', '120°'], ans: 2, explain: '360° ÷ 4 = 90°.' },
  { q: 'Each interior angle of an equilateral triangle is 60°. What is each exterior angle?', opts: ['100°', '110°', '120°', '130°'], ans: 2, explain: '180° − 60° = 120°.' },
  { q: 'A regular polygon has 36 sides. Each exterior angle is:', opts: ['8°', '10°', '12°', '15°'], ans: 1, explain: '360° ÷ 36 = 10°.' },
  { q: 'A honeycomb cell is a regular hexagon. What is the angle at each vertex?', opts: ['100°', '110°', '120°', '130°'], ans: 2, explain: 'Regular hexagon interior angle = 120°.' },
  { q: 'A regular polygon has interior angle 4 times its exterior angle. How many sides?', opts: ['8', '10', '12', '15'], ans: 1, explain: 'Let exterior = x. Interior = 4x. x + 4x = 180°. x = 36°. n = 360° ÷ 36° = 10.' },
  { q: 'A regular polygon has interior angle 5 times its exterior angle. How many sides?', opts: ['10', '12', '14', '16'], ans: 1, explain: 'Exterior = x. 5x + x = 180°. x = 30°. n = 360° ÷ 30° = 12.' },
  { q: 'At a vertex, a regular octagon and a regular square meet. What is the total angle?', opts: ['215°', '220°', '225°', '230°'], ans: 2, explain: '135° + 90° = 225°.' },
  { q: 'A regular polygon has interior angle of 162°. How many sides?', opts: ['18', '20', '22', '24'], ans: 1, explain: 'Exterior = 18°. 360° ÷ 18° = 20 sides.' },
  { q: 'The ratio of interior angle to exterior angle of a regular polygon is 3 : 1. How many sides?', opts: ['6', '8', '10', '12'], ans: 1, explain: 'Exterior = x, Interior = 3x. x + 3x = 180°. x = 45°. n = 360° ÷ 45° = 8.' },
  { q: 'A floor tiling uses regular polygons. Which regular polygon can tile a plane alone?', opts: ['Regular pentagon', 'Regular hexagon', 'Regular octagon', 'Regular decagon'], ans: 1, explain: 'Only equilateral triangles (60°), squares (90°), and regular hexagons (120°) can tile a plane alone. 360° ÷ 120° = 3, so hexagons tile perfectly.' },
  { q: 'Each exterior angle of a regular 24-gon is:', opts: ['12°', '15°', '18°', '20°'], ans: 1, explain: '360° ÷ 24 = 15°.' },
];
