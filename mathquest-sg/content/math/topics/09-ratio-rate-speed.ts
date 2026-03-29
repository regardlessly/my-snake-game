import type { TopicMeta, MCQuestion } from '../../../src/types/curriculum';

export const meta: TopicMeta = {
  id: 9, sem: 2,
  title: 'Ratio, Rate & Speed',
  desc: 'Ratio, proportion, rate, speed-distance-time'
};

export const notes: string | null = `
  <h2>Ratio, Rate &amp; Speed</h2>
  <p class="topic-desc">Ratio, proportion, rate, speed-distance-time</p>

  <div class="notes-card">
    <h3>1. Ratio</h3>
    <p>A <strong>ratio</strong> compares two or more quantities of the <em>same kind</em> in a definite order.</p>
    <div class="example">
      <strong>Notation:</strong> a : b (read "a to b")<br><br>
      <strong>Simplifying:</strong> Divide all parts by the HCF.<br>
      12 : 18 = 2 : 3 (HCF = 6)<br><br>
      <strong>Equivalent ratios:</strong> Multiply or divide all parts by the same number.<br>
      2 : 5 = 4 : 10 = 6 : 15
    </div>
  </div>

  <div class="notes-card">
    <h3>2. Dividing in a Given Ratio</h3>
    <p>To divide a quantity in the ratio a : b, find the total parts and share accordingly.</p>
    <div class="example">
      Divide $120 in the ratio 3 : 5.<br>
      Total parts = 3 + 5 = 8<br>
      First share = 3/8 &times; $120 = <span class="highlight">$45</span><br>
      Second share = 5/8 &times; $120 = <span class="highlight">$75</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>3. Direct Proportion</h3>
    <p>Two quantities are in <strong>direct proportion</strong> if when one increases, the other increases at the same rate.</p>
    <div class="example">
      If 5 pens cost $8, find the cost of 12 pens.<br>
      Cost of 1 pen = $8 &divide; 5 = $1.60<br>
      Cost of 12 pens = 12 &times; $1.60 = <span class="highlight">$19.20</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>4. Rate</h3>
    <p>A <strong>rate</strong> compares two quantities of <em>different kinds</em>.</p>
    <div class="example">
      <strong>Examples:</strong><br>
      Speed: 60 km/h (kilometres per hour)<br>
      Typing: 45 words/min (words per minute)<br>
      Price: $2.50/kg (dollars per kilogram)<br><br>
      <strong>Unit rate:</strong> the rate for one unit of the second quantity.
    </div>
  </div>

  <div class="notes-card">
    <h3>5. Speed, Distance &amp; Time</h3>
    <p>The three key formulae (the "speed triangle"):</p>
    <div class="example">
      <div class="formula">Speed = Distance &divide; Time</div>
      <div class="formula">Distance = Speed &times; Time</div>
      <div class="formula">Time = Distance &divide; Speed</div><br>
      <strong>Unit conversions:</strong><br>
      km/h &rarr; m/s: &divide; 3.6 (or &times; 1000 &divide; 3600)<br>
      m/s &rarr; km/h: &times; 3.6<br><br>
      <strong>Average speed</strong> = Total distance &divide; Total time
    </div>
  </div>

  <div class="notes-card">
    <h3>Quick Reference</h3>
    <div class="formula">Simplify ratio: divide all parts by HCF</div>
    <div class="formula">Share = (part &divide; total parts) &times; quantity</div>
    <div class="formula">Speed = Distance &divide; Time</div>
    <div class="formula">1 km/h = 1/3.6 m/s &nbsp;&nbsp; 1 m/s = 3.6 km/h</div>
  </div>
`

export const questions: MCQuestion[] | null = [
  // ═══════════════════════════════════════════
  // SIMPLIFY RATIO (Q1–38)
  // ═══════════════════════════════════════════
  { q:"Simplify the ratio 12 : 18.", opts:["2 : 3","3 : 4","4 : 6","6 : 9"], ans:0, explain:"HCF of 12 and 18 is 6. 12 ÷ 6 : 18 ÷ 6 = 2 : 3." },
  { q:"Simplify the ratio 15 : 25.", opts:["1 : 2","3 : 5","5 : 8","5 : 10"], ans:1, explain:"HCF of 15 and 25 is 5. 15 ÷ 5 : 25 ÷ 5 = 3 : 5." },
  { q:"Simplify the ratio 24 : 36.", opts:["2 : 3","3 : 4","4 : 6","6 : 9"], ans:0, explain:"HCF of 24 and 36 is 12. 24 ÷ 12 : 36 ÷ 12 = 2 : 3." },
  { q:"Simplify the ratio 8 : 12 : 20.", opts:["2 : 3 : 4","2 : 3 : 5","4 : 6 : 10","1 : 2 : 3"], ans:1, explain:"HCF of 8, 12, 20 is 4. 8 ÷ 4 : 12 ÷ 4 : 20 ÷ 4 = 2 : 3 : 5." },
  { q:"Simplify the ratio 45 : 60.", opts:["3 : 4","4 : 5","5 : 6","9 : 12"], ans:0, explain:"HCF of 45 and 60 is 15. 45 ÷ 15 : 60 ÷ 15 = 3 : 4." },
  { q:"Express the ratio 1.5 : 2.5 in its simplest form.", opts:["3 : 4","3 : 5","15 : 25","1 : 2"], ans:1, explain:"Multiply by 2: 3 : 5. Already in simplest form." },
  { q:"Express the ratio ½ : ¾ in its simplest form.", opts:["1 : 2","2 : 3","3 : 4","4 : 6"], ans:1, explain:"Multiply both by 4: 2 : 3." },
  { q:"Simplify the ratio 100 : 250.", opts:["1 : 2","2 : 5","4 : 10","10 : 25"], ans:1, explain:"HCF of 100 and 250 is 50. 100 ÷ 50 : 250 ÷ 50 = 2 : 5." },
  { q:"Simplify the ratio 0.6 : 0.9.", opts:["2 : 3","3 : 4","6 : 9","1 : 2"], ans:0, explain:"Multiply by 10: 6 : 9. HCF = 3. 6 ÷ 3 : 9 ÷ 3 = 2 : 3." },
  { q:"Express 20 cm : 1 m as a ratio in simplest form.", opts:["1 : 5","2 : 10","20 : 1","1 : 50"], ans:0, explain:"Convert to same units: 20 cm : 100 cm = 20 : 100 = 1 : 5." },
  { q:"Express 500 g : 2 kg in simplest form.", opts:["1 : 2","1 : 4","5 : 2","5 : 20"], ans:1, explain:"Convert: 500 g : 2000 g = 500 : 2000 = 1 : 4." },
  { q:"Simplify 18 : 27 : 45.", opts:["2 : 3 : 5","6 : 9 : 15","3 : 4 : 5","1 : 2 : 3"], ans:0, explain:"HCF of 18, 27, 45 is 9. 18 ÷ 9 : 27 ÷ 9 : 45 ÷ 9 = 2 : 3 : 5." },
  { q:"Express the ratio ⅓ : ½ in simplest form.", opts:["1 : 2","2 : 3","3 : 2","1 : 3"], ans:1, explain:"Multiply both by 6: 2 : 3." },
  { q:"Express 30 minutes : 2 hours as a ratio.", opts:["1 : 2","1 : 4","3 : 20","15 : 1"], ans:1, explain:"Convert: 30 min : 120 min = 30 : 120 = 1 : 4." },
  { q:"If a : b = 3 : 4, find a : b when a = 15.", opts:["15 : 16","15 : 18","15 : 20","15 : 24"], ans:2, explain:"3 : 4 = 15 : ? → multiply by 5 → 15 : 20." },
  { q:"The ratio of boys to girls is 5 : 7. If there are 35 boys, how many girls are there?", opts:["42","45","47","49"], ans:3, explain:"5 parts = 35, so 1 part = 7. Girls = 7 × 7 = 49." },
  { q:"Simplify 2.4 : 3.6 : 6.", opts:["2 : 3 : 5","4 : 6 : 10","1 : 2 : 3","2 : 3 : 5"], ans:0, explain:"Multiply by 5: 12 : 18 : 30. HCF = 6. 2 : 3 : 5." },
  { q:"Express 250 ml : 1 litre in simplest form.", opts:["1 : 2","1 : 4","25 : 1","5 : 2"], ans:1, explain:"250 ml : 1000 ml = 1 : 4." },
  { q:"Divide $180 in the ratio 2 : 3.", opts:["$60 and $120","$72 and $108","$80 and $100","$90 and $90"], ans:1, explain:"Total parts = 5. First = 2/5 × $180 = $72. Second = 3/5 × $180 = $108." },
  { q:"Divide 200 sweets in the ratio 3 : 5.", opts:["60 and 140","75 and 125","80 and 120","100 and 100"], ans:1, explain:"Total parts = 8. First = 3/8 × 200 = 75. Second = 5/8 × 200 = 125." },
  { q:"Divide $450 among A, B, C in the ratio 2 : 3 : 4.", opts:["$100, $150, $200","$90, $150, $210","$120, $150, $180","$80, $170, $200"], ans:0, explain:"Total parts = 9. A = 2/9 × $450 = $100. B = 3/9 × $450 = $150. C = 4/9 × $450 = $200." },
  { q:"The ratio of red to blue beads is 3 : 7. If there are 50 beads in total, how many are red?", opts:["10","12","15","20"], ans:2, explain:"Red = 3/10 × 50 = 15." },
  { q:"A recipe for pineapple tarts uses flour and butter in the ratio 5 : 2. If 350 g of flour is used, how much butter is needed?", opts:["100 g","120 g","130 g","140 g"], ans:3, explain:"5 parts = 350 g, 1 part = 70 g. Butter = 2 × 70 = 140 g." },
  { q:"Ali and Bala share ang baos in the ratio 4 : 5. If Bala gets $15 more than Ali, how much does Ali get?", opts:["$40","$50","$60","$75"], ans:2, explain:"Difference = 1 part = $15. Ali = 4 × $15 = $60." },
  { q:"In a CNY reunion dinner, the ratio of adults to children is 5 : 3. If there are 40 people, how many children are there?", opts:["12","15","18","20"], ans:1, explain:"Total parts = 8. Children = 3/8 × 40 = 15." },
  { q:"A rope of length 1.8 m is cut in the ratio 2 : 7. Find the length of the shorter piece.", opts:["0.2 m","0.36 m","0.4 m","0.9 m"], ans:2, explain:"Total parts = 9. Shorter = 2/9 × 1.8 = 0.4 m." },
  { q:"The ratio of Malay to Chinese students in a class is 2 : 5. If there are 35 students, how many are Malay?", opts:["5","8","10","14"], ans:2, explain:"Total parts = 7. Malay = 2/7 × 35 = 10." },
  { q:"Simplify 1¼ : 2½.", opts:["1 : 2","1 : 3","5 : 10","3 : 5"], ans:0, explain:"1¼ = 5/4 and 2½ = 10/4. Ratio = 5 : 10 = 1 : 2." },
  { q:"If x : 12 = 5 : 6, find x.", opts:["8","10","12","15"], ans:1, explain:"x/12 = 5/6. x = 12 × 5/6 = 10." },
  { q:"Divide 720 g of rice in the ratio 5 : 3 : 1.", opts:["400, 240, 80","350, 250, 120","380, 240, 100","360, 240, 120"], ans:0, explain:"Total = 9 parts. 5/9 × 720 = 400. 3/9 × 720 = 240. 1/9 × 720 = 80." },
  { q:"The ages of two siblings are in the ratio 3 : 5. If the older is 15, how old is the younger?", opts:["7","8","9","10"], ans:2, explain:"5 parts = 15, 1 part = 3. Younger = 3 × 3 = 9." },
  { q:"Map scale is 1 : 50,000. A distance on the map is 4 cm. Find the actual distance in km.", opts:["0.5 km","1 km","2 km","4 km"], ans:2, explain:"Actual = 4 × 50,000 = 200,000 cm = 2000 m = 2 km." },
  { q:"If a : b = 2 : 3 and b : c = 3 : 4, find a : b : c.", opts:["2 : 3 : 4","4 : 6 : 8","2 : 3 : 6","4 : 3 : 2"], ans:0, explain:"b is common. a : b = 2 : 3 and b : c = 3 : 4. So a : b : c = 2 : 3 : 4." },
  { q:"Express 45 seconds : 2 minutes in simplest form.", opts:["3 : 8","9 : 24","45 : 2","1 : 3"], ans:0, explain:"Convert: 45 s : 120 s. HCF = 15. 3 : 8." },
  { q:"If a : b = 4 : 7 and a + b = 55, find a.", opts:["15","20","25","30"], ans:1, explain:"Total = 11 parts. a = 4/11 × 55 = 20." },
  { q:"Three siblings share $240 in the ratio of their ages: 4, 6, and 10. The youngest gets:", opts:["$48","$60","$72","$120"], ans:0, explain:"Total parts = 20. Youngest = 4/20 × $240 = $48." },
  { q:"A drink is made by mixing syrup and water in the ratio 1 : 4. How much water is needed for 300 ml of syrup?", opts:["600 ml","900 ml","1200 ml","1500 ml"], ans:2, explain:"1 part = 300 ml. Water = 4 × 300 = 1200 ml." },
  { q:"The ratio of savings to spending is 2 : 8. Express savings as a fraction of total income.", opts:["1/4","1/5","2/8","2/10"], ans:1, explain:"Total = 10 parts. Savings = 2/10 = 1/5." },

  // ═══════════════════════════════════════════
  // PROPORTION (Q39–72)
  // ═══════════════════════════════════════════
  { q:"If 3 pens cost $4.50, how much do 7 pens cost?", opts:["$9.00","$9.50","$10.50","$12.00"], ans:2, explain:"1 pen = $4.50 ÷ 3 = $1.50. 7 pens = 7 × $1.50 = $10.50." },
  { q:"If 5 kg of rice costs $8, how much does 12 kg cost?", opts:["$16.00","$17.60","$19.20","$20.00"], ans:2, explain:"1 kg = $8 ÷ 5 = $1.60. 12 kg = 12 × $1.60 = $19.20." },
  { q:"8 workers can build a wall in 6 days. How many days will 12 workers take?", opts:["3","4","5","9"], ans:1, explain:"More workers, less time (inverse proportion). 8 × 6 = 48 worker-days. 48 ÷ 12 = 4 days." },
  { q:"A recipe for 4 servings needs 300 g of chicken. How much for 10 servings?", opts:["600 g","700 g","750 g","800 g"], ans:2, explain:"1 serving = 300 ÷ 4 = 75 g. 10 servings = 75 × 10 = 750 g." },
  { q:"If 6 apples cost $2.40, how much do 15 apples cost?", opts:["$4.50","$5.00","$6.00","$7.50"], ans:2, explain:"1 apple = $2.40 ÷ 6 = $0.40. 15 apples = 15 × $0.40 = $6.00." },
  { q:"A car travels 240 km on 20 litres of petrol. How far can it travel on 35 litres?", opts:["360 km","400 km","420 km","450 km"], ans:2, explain:"1 litre = 240 ÷ 20 = 12 km. 35 litres = 35 × 12 = 420 km." },
  { q:"If 4 tins of paint cover 60 m², how many tins are needed to cover 105 m²?", opts:["5","6","7","8"], ans:2, explain:"1 tin covers 15 m². 105 ÷ 15 = 7 tins." },
  { q:"A tap fills a tank in 8 hours. What fraction is filled in 3 hours?", opts:["1/3","3/8","1/2","5/8"], ans:1, explain:"In 3 hours, 3/8 of the tank is filled." },
  { q:"12 packets of chips cost $18. How much do 20 packets cost?", opts:["$24","$27","$30","$36"], ans:2, explain:"1 packet = $18 ÷ 12 = $1.50. 20 packets = 20 × $1.50 = $30." },
  { q:"A printer prints 120 pages in 8 minutes. How many pages in 15 minutes?", opts:["180","200","210","225"], ans:3, explain:"Rate = 120 ÷ 8 = 15 pages/min. In 15 min: 15 × 15 = 225 pages." },
  { q:"If the exchange rate is S$1 = RM 3.40, how many RM for S$50?", opts:["RM 150","RM 160","RM 170","RM 180"], ans:2, explain:"S$50 × 3.40 = RM 170." },
  { q:"5 identical books weigh 1.25 kg. What do 8 books weigh?", opts:["1.60 kg","1.80 kg","2.00 kg","2.25 kg"], ans:2, explain:"1 book = 1.25 ÷ 5 = 0.25 kg. 8 books = 8 × 0.25 = 2.00 kg." },
  { q:"A map has a scale of 1 : 25,000. Two towns are 8 cm apart on the map. What is the actual distance?", opts:["1 km","2 km","2.5 km","4 km"], ans:1, explain:"8 × 25,000 = 200,000 cm = 2000 m = 2 km." },
  { q:"If 3 workers take 10 days to complete a job, how many days will 5 workers take?", opts:["4","5","6","8"], ans:2, explain:"Inverse proportion. 3 × 10 = 30 worker-days. 30 ÷ 5 = 6 days." },
  { q:"A recipe for kueh lapis uses 200 g sugar for 12 slices. How much sugar for 30 slices?", opts:["400 g","450 g","500 g","600 g"], ans:2, explain:"1 slice = 200/12 g. 30 slices = 30 × 200/12 = 500 g." },
  { q:"At NTUC, 3 cans of sardines cost $5.85. How much for 5 cans?", opts:["$8.75","$9.50","$9.75","$10.25"], ans:2, explain:"1 can = $5.85 ÷ 3 = $1.95. 5 cans = 5 × $1.95 = $9.75." },
  { q:"A photocopier makes 60 copies in 4 minutes. How long to make 210 copies?", opts:["12 min","14 min","16 min","18 min"], ans:1, explain:"Rate = 15 copies/min. 210 ÷ 15 = 14 min." },
  { q:"6 identical tiles cover an area of 1800 cm². How many tiles cover 4500 cm²?", opts:["12","15","18","20"], ans:1, explain:"1 tile = 300 cm². 4500 ÷ 300 = 15 tiles." },
  { q:"If S$1 = US$0.74, convert S$200 to US$.", opts:["US$120","US$135","US$148","US$170"], ans:2, explain:"S$200 × 0.74 = US$148." },
  { q:"A train takes 2 hours to travel 150 km. At the same speed, how far in 3.5 hours?", opts:["225 km","250 km","262.5 km","275 km"], ans:2, explain:"Speed = 75 km/h. Distance = 75 × 3.5 = 262.5 km." },
  { q:"A factory produces 840 toys in 7 hours. How many toys in 5 hours?", opts:["500","550","580","600"], ans:3, explain:"Rate = 120 toys/hour. In 5 hours: 120 × 5 = 600." },
  { q:"If 4 painters can paint a fence in 9 hours, how long will 6 painters take?", opts:["4 h","5 h","6 h","7 h"], ans:2, explain:"Inverse proportion. 4 × 9 = 36. 36 ÷ 6 = 6 hours." },
  { q:"A baker uses 2.5 kg of flour for 50 buns. How much for 80 buns?", opts:["3.5 kg","4 kg","4.5 kg","5 kg"], ans:1, explain:"1 bun = 0.05 kg. 80 buns = 80 × 0.05 = 4 kg." },
  { q:"If y is directly proportional to x, and y = 12 when x = 4, find y when x = 7.", opts:["18","20","21","24"], ans:2, explain:"y = kx. k = 12/4 = 3. When x = 7: y = 3 × 7 = 21." },
  { q:"The cost of 250 g of premium tea is $18. What is the cost of 400 g?", opts:["$24.00","$26.80","$28.80","$30.00"], ans:2, explain:"1 g costs $18/250 = $0.072. 400 g = 400 × $0.072 = $28.80." },
  { q:"A school trip costs $540 shared equally among 18 students. If 24 students go instead, how much does each pay?", opts:["$20.50","$22.50","$25.00","$27.00"], ans:1, explain:"Total cost stays $540. Per student = $540 ÷ 24 = $22.50." },

  // ═══════════════════════════════════════════
  // RATE (Q73–108)
  // ═══════════════════════════════════════════
  { q:"A typist types 240 words in 6 minutes. What is her typing speed?", opts:["30 wpm","35 wpm","40 wpm","45 wpm"], ans:2, explain:"240 ÷ 6 = 40 words per minute." },
  { q:"Water flows at 15 litres per minute. How many litres in 20 minutes?", opts:["200","250","300","350"], ans:2, explain:"15 × 20 = 300 litres." },
  { q:"A phone plan costs $28 for 7 GB. What is the cost per GB?", opts:["$3","$3.50","$4","$4.50"], ans:2, explain:"$28 ÷ 7 = $4 per GB." },
  { q:"Apples cost $3.60 per kg. How much for 2.5 kg?", opts:["$7.20","$8.00","$9.00","$10.00"], ans:2, explain:"$3.60 × 2.5 = $9.00." },
  { q:"A factory makes 480 widgets in 8 hours. What is the production rate?", opts:["40/h","50/h","55/h","60/h"], ans:3, explain:"480 ÷ 8 = 60 widgets per hour." },
  { q:"Electricity costs $0.28 per kWh. Find the cost for 350 kWh.", opts:["$84","$90","$98","$105"], ans:2, explain:"$0.28 × 350 = $98." },
  { q:"A runner covers 5 km in 25 minutes. What is her speed in km/h?", opts:["10 km/h","12 km/h","15 km/h","20 km/h"], ans:1, explain:"25 min = 5/12 h. Speed = 5 ÷ (5/12) = 12 km/h." },
  { q:"Which is a better buy: 500 g for $4.50 or 750 g for $6.00?", opts:["500 g pack","750 g pack","Both same","Cannot tell"], ans:1, explain:"500 g: $9.00/kg. 750 g: $8.00/kg. The 750 g pack is cheaper per kg." },
  { q:"A heart beats 72 times per minute. How many beats in 5 minutes?", opts:["320","340","360","380"], ans:2, explain:"72 × 5 = 360 beats." },
  { q:"A taxi charges $3.90 flag-down and $0.25 per 400 m. For a 4 km ride, what is the fare?", opts:["$5.40","$6.40","$6.90","$7.40"], ans:1, explain:"4 km = 4000 m. Units of 400 m = 10. Metered charge = 10 × $0.25 = $2.50. Total = $3.90 + $2.50 = $6.40." },
  { q:"A leaking tap drips at 2 ml per second. How many litres leak in 1 hour?", opts:["3.6 L","7.2 L","12 L","72 L"], ans:1, explain:"1 hour = 3600 s. 2 × 3600 = 7200 ml = 7.2 L." },
  { q:"Rice costs $2.80 per kg. How many kg can you buy with $14?", opts:["4 kg","4.5 kg","5 kg","5.5 kg"], ans:2, explain:"$14 ÷ $2.80 = 5 kg." },
  { q:"A car uses petrol at 8 litres per 100 km. How much petrol for 350 km?", opts:["24 L","26 L","28 L","30 L"], ans:2, explain:"8/100 × 350 = 28 litres." },
  { q:"Printing costs $0.15 per page. How many pages for $6?", opts:["30","35","40","45"], ans:2, explain:"$6 ÷ $0.15 = 40 pages." },
  { q:"A pipe fills a 600-litre tank in 40 minutes. What is the flow rate?", opts:["12 L/min","15 L/min","18 L/min","20 L/min"], ans:1, explain:"600 ÷ 40 = 15 litres per minute." },
  { q:"Internet speed is 100 Mbps. How many seconds to download a 500 MB file? (1 byte = 8 bits)", opts:["5 s","10 s","40 s","50 s"], ans:2, explain:"500 MB = 4000 Mb. Time = 4000 ÷ 100 = 40 seconds." },
  { q:"A hawker sells chicken rice at $3.50 per plate. He sells 120 plates. What is his revenue?", opts:["$360","$380","$400","$420"], ans:3, explain:"120 × $3.50 = $420." },
  { q:"Postage costs $0.37 for the first 20 g and $0.25 for each additional 10 g. What is the cost for a 60 g letter?", opts:["$1.12","$1.37","$1.47","$1.62"], ans:1, explain:"First 20 g: $0.37. Additional 40 g = 4 units of 10 g: 4 × $0.25 = $1.00. Total = $1.37." },
  { q:"A machine fills 200 bottles in 5 minutes. How long to fill 720 bottles?", opts:["14 min","16 min","18 min","20 min"], ans:2, explain:"Rate = 40 bottles/min. 720 ÷ 40 = 18 min." },
  { q:"A cleaner is paid $12.50 per hour. How much for a 6-hour shift?", opts:["$65","$70","$75","$80"], ans:2, explain:"$12.50 × 6 = $75." },
  { q:"Fuel costs $2.80 per litre. A car uses 45 litres per week. What is the weekly fuel cost?", opts:["$112","$120","$126","$135"], ans:2, explain:"$2.80 × 45 = $126." },
  { q:"An escalator moves at 0.5 m/s. How long to travel 30 m?", opts:["30 s","45 s","60 s","90 s"], ans:2, explain:"30 ÷ 0.5 = 60 seconds." },
  { q:"Water costs $2.74 per cubic metre. A household uses 18 m³. What is the water bill?", opts:["$45.32","$47.92","$49.32","$51.72"], ans:2, explain:"$2.74 × 18 = $49.32." },
  { q:"A bus picks up passengers at a rate of 30 per stop. After 8 stops, how many passengers?", opts:["200","220","240","280"], ans:2, explain:"30 × 8 = 240 passengers." },
  { q:"Brand A: 1.5 L for $2.10. Brand B: 2 L for $3.00. Which is cheaper per litre?", opts:["Brand A","Brand B","Same price","Cannot tell"], ans:0, explain:"A: $2.10/1.5 = $1.40/L. B: $3.00/2 = $1.50/L. Brand A is cheaper." },
  { q:"A parking lot charges $1.20 per half hour. How much for 3 hours?", opts:["$3.60","$6.00","$7.20","$8.40"], ans:2, explain:"3 hours = 6 half-hours. 6 × $1.20 = $7.20." },
  { q:"A student reads 45 pages per hour. How long to read a 270-page book?", opts:["4 h","5 h","6 h","7 h"], ans:2, explain:"270 ÷ 45 = 6 hours." },
  { q:"A call costs $0.18 per minute. If you have $5, what is the maximum whole minutes you can talk?", opts:["25","27","28","30"], ans:1, explain:"$5 ÷ $0.18 = 27.78. Maximum whole minutes = 27." },

  // ═══════════════════════════════════════════
  // SPEED, DISTANCE & TIME (Q109–150)
  // ═══════════════════════════════════════════
  { q:"A car travels 180 km in 3 hours. What is its speed?", opts:["45 km/h","50 km/h","55 km/h","60 km/h"], ans:3, explain:"Speed = 180 ÷ 3 = 60 km/h." },
  { q:"A cyclist rides at 15 km/h for 2 hours. How far does she travel?", opts:["20 km","25 km","30 km","35 km"], ans:2, explain:"Distance = 15 × 2 = 30 km." },
  { q:"A jogger runs at 8 km/h. How long to run 6 km?", opts:["30 min","40 min","45 min","50 min"], ans:2, explain:"Time = 6 ÷ 8 = 0.75 h = 45 min." },
  { q:"Convert 72 km/h to m/s.", opts:["12 m/s","15 m/s","18 m/s","20 m/s"], ans:3, explain:"72 ÷ 3.6 = 20 m/s." },
  { q:"Convert 15 m/s to km/h.", opts:["45 km/h","50 km/h","54 km/h","60 km/h"], ans:2, explain:"15 × 3.6 = 54 km/h." },
  { q:"A train travels at 90 km/h. How far does it go in 40 minutes?", opts:["45 km","50 km","55 km","60 km"], ans:3, explain:"40 min = 2/3 h. Distance = 90 × 2/3 = 60 km." },
  { q:"An MRT travels 12 km in 15 minutes. What is its speed in km/h?", opts:["36 km/h","42 km/h","48 km/h","54 km/h"], ans:2, explain:"15 min = 0.25 h. Speed = 12 ÷ 0.25 = 48 km/h." },
  { q:"A bus takes 45 minutes to travel 30 km. What is the speed?", opts:["30 km/h","36 km/h","40 km/h","45 km/h"], ans:2, explain:"45 min = 0.75 h. Speed = 30 ÷ 0.75 = 40 km/h." },
  { q:"A plane flies at 600 km/h. How long to fly 2400 km?", opts:["3 h","3.5 h","4 h","4.5 h"], ans:2, explain:"Time = 2400 ÷ 600 = 4 hours." },
  { q:"A boy walks at 5 km/h for 1.5 hours then rests. How far did he walk?", opts:["5 km","6.5 km","7 km","7.5 km"], ans:3, explain:"Distance = 5 × 1.5 = 7.5 km." },
  { q:"Convert 36 km/h to m/s.", opts:["6 m/s","8 m/s","10 m/s","12 m/s"], ans:2, explain:"36 ÷ 3.6 = 10 m/s." },
  { q:"A car drives 60 km at 40 km/h, then 60 km at 60 km/h. What is the average speed for the whole journey?", opts:["45 km/h","48 km/h","50 km/h","52 km/h"], ans:1, explain:"Time 1 = 60/40 = 1.5 h. Time 2 = 60/60 = 1 h. Total = 120 km in 2.5 h. Avg speed = 120/2.5 = 48 km/h." },
  { q:"An athlete runs 100 m in 12.5 s. What is his speed in m/s?", opts:["6 m/s","7 m/s","8 m/s","10 m/s"], ans:2, explain:"100 ÷ 12.5 = 8 m/s." },
  { q:"A taxi from Changi Airport to Orchard Road (20 km) takes 25 minutes. What is the average speed?", opts:["40 km/h","42 km/h","45 km/h","48 km/h"], ans:3, explain:"25 min = 5/12 h. Speed = 20 ÷ (5/12) = 48 km/h." },
  { q:"A ship sails at 18 km/h. How long to cover 63 km?", opts:["2.5 h","3 h","3.5 h","4 h"], ans:2, explain:"Time = 63 ÷ 18 = 3.5 hours." },
  { q:"Two towns are 270 km apart. A car starts at 9:00 am at 90 km/h. What time does it arrive?", opts:["11:00 am","11:30 am","12:00 pm","12:30 pm"], ans:2, explain:"Time = 270 ÷ 90 = 3 hours. Arrives at 12:00 pm." },
  { q:"Convert 25 m/s to km/h.", opts:["72 km/h","80 km/h","85 km/h","90 km/h"], ans:3, explain:"25 × 3.6 = 90 km/h." },
  { q:"A snail moves at 0.03 km/h. How far in 2 hours (in metres)?", opts:["30 m","45 m","60 m","90 m"], ans:2, explain:"0.03 × 2 = 0.06 km = 60 m." },
  { q:"Ali cycles from home to school (4.5 km) in 15 minutes. What is his speed?", opts:["12 km/h","15 km/h","18 km/h","20 km/h"], ans:2, explain:"15 min = 0.25 h. Speed = 4.5 ÷ 0.25 = 18 km/h." },
  { q:"A bus travels 45 km at 60 km/h. How many minutes does the journey take?", opts:["30 min","35 min","40 min","45 min"], ans:3, explain:"Time = 45 ÷ 60 = 0.75 h = 45 min." },
  { q:"A car and a bus start from the same point. The car travels at 80 km/h and the bus at 60 km/h. After 2 hours, how far apart are they?", opts:["20 km","30 km","40 km","50 km"], ans:2, explain:"Car: 160 km. Bus: 120 km. Difference = 40 km." },
  { q:"A man walks at 4 km/h for 30 min then jogs at 8 km/h for 30 min. Find the total distance.", opts:["4 km","5 km","6 km","8 km"], ans:2, explain:"Walk: 4 × 0.5 = 2 km. Jog: 8 × 0.5 = 4 km. Total = 6 km." },
  { q:"A man walks 2 km at 4 km/h then jogs 4 km at 8 km/h. Find his average speed.", opts:["5 km/h","6 km/h","6.5 km/h","7 km/h"], ans:1, explain:"Time walk = 0.5 h. Time jog = 0.5 h. Total = 6 km in 1 h. Avg = 6 km/h." },
  { q:"How long does it take to walk 3.6 km at a speed of 1.2 m/s?", opts:["30 min","40 min","50 min","60 min"], ans:2, explain:"3.6 km = 3600 m. Time = 3600 ÷ 1.2 = 3000 s = 50 min." },
  { q:"The distance from Woodlands to Jurong is 30 km. If an MRT averages 40 km/h, how long is the journey?", opts:["30 min","40 min","45 min","50 min"], ans:2, explain:"Time = 30 ÷ 40 = 0.75 h = 45 min." },
  { q:"A 200 m long train passes a pole in 10 seconds. What is the speed of the train in km/h?", opts:["60 km/h","68 km/h","72 km/h","80 km/h"], ans:2, explain:"Speed = 200/10 = 20 m/s = 20 × 3.6 = 72 km/h." },
  { q:"Two cars travel towards each other from towns 300 km apart. Car A goes 70 km/h and Car B goes 80 km/h. When do they meet?", opts:["1 h","1.5 h","2 h","2.5 h"], ans:2, explain:"Combined speed = 150 km/h. Time = 300 ÷ 150 = 2 hours." },
  { q:"A student leaves home at 7:15 am and arrives at school 3.6 km away at 7:45 am. What was his average speed?", opts:["5.4 km/h","6 km/h","7.2 km/h","8 km/h"], ans:2, explain:"Time = 30 min = 0.5 h. Speed = 3.6 ÷ 0.5 = 7.2 km/h." },
  { q:"A bus travels the first half of a 120 km journey at 40 km/h and the second half at 60 km/h. Find the average speed.", opts:["45 km/h","48 km/h","50 km/h","52 km/h"], ans:1, explain:"Time 1 = 60/40 = 1.5 h. Time 2 = 60/60 = 1 h. Total = 120 km in 2.5 h. Avg = 48 km/h." },
  { q:"Convert 108 km/h to m/s.", opts:["25 m/s","28 m/s","30 m/s","36 m/s"], ans:2, explain:"108 ÷ 3.6 = 30 m/s." },
  { q:"A boat travels 24 km upstream at 6 km/h and returns at 12 km/h. What is the average speed for the round trip?", opts:["8 km/h","9 km/h","10 km/h","12 km/h"], ans:0, explain:"Time up = 24/6 = 4 h. Time down = 24/12 = 2 h. Total = 48 km in 6 h. Avg = 8 km/h." },
  { q:"A delivery rider travels 15 km in 20 minutes. What is his speed in km/h?", opts:["40 km/h","42 km/h","45 km/h","50 km/h"], ans:2, explain:"20 min = 1/3 h. Speed = 15 ÷ (1/3) = 45 km/h." },
  { q:"Two MRT stations are 2.5 km apart. A train takes 3 minutes between them. What is the speed in km/h?", opts:["40 km/h","45 km/h","48 km/h","50 km/h"], ans:3, explain:"3 min = 1/20 h. Speed = 2.5 ÷ (1/20) = 50 km/h." },
  { q:"A car leaves Town A at 8 am travelling at 60 km/h. Another car leaves Town A at 9 am at 80 km/h. At what time does the second car catch up?", opts:["11 am","11:30 am","12 pm","12:30 pm"], ans:2, explain:"At 9 am, first car is 60 km ahead. Closing speed = 80 − 60 = 20 km/h. Time = 60/20 = 3 h. Catches up at 12 pm." },
  { q:"A runner completes a 2.4 km NAPFA run in 12 minutes. What is her speed in km/h?", opts:["10 km/h","12 km/h","14 km/h","16 km/h"], ans:1, explain:"12 min = 0.2 h. Speed = 2.4 ÷ 0.2 = 12 km/h." },
  { q:"Express 54 km/h in m/s.", opts:["10 m/s","12 m/s","15 m/s","18 m/s"], ans:2, explain:"54 ÷ 3.6 = 15 m/s." },
  { q:"A car travels 100 km at 50 km/h and then 100 km at 100 km/h. What is the average speed?", opts:["62.5 km/h","66.7 km/h","70 km/h","75 km/h"], ans:1, explain:"Time 1 = 2 h. Time 2 = 1 h. Total = 200 km in 3 h. Avg = 66.7 km/h." },
  { q:"Simplify 36 : 48 : 60.", opts:["3 : 4 : 5","6 : 8 : 10","9 : 12 : 15","12 : 16 : 20"], ans:0, explain:"HCF of 36, 48, 60 is 12. 36/12 : 48/12 : 60/12 = 3 : 4 : 5." },
  { q:"A mixture uses milk and water in the ratio 3 : 2. How much milk is in 500 ml of mixture?", opts:["200 ml","250 ml","300 ml","350 ml"], ans:2, explain:"Milk = 3/5 × 500 = 300 ml." },
  { q:"If a : b = 3 : 4 and b : c = 2 : 5, find a : b : c.", opts:["3 : 4 : 5","3 : 4 : 10","6 : 8 : 10","6 : 8 : 20"], ans:1, explain:"Make b same: a : b = 3 : 4 and b : c = 4 : 10 (multiply second by 2). So a : b : c = 3 : 4 : 10." },
  { q:"Divide $600 in the ratio 1 : 2 : 3.", opts:["$100, $200, $300","$120, $180, $300","$150, $200, $250","$200, $200, $200"], ans:0, explain:"Total = 6 parts. $100, $200, $300." },
  { q:"A cyclist takes 45 minutes to travel from Punggol to Tampines (15 km). What is the average speed?", opts:["15 km/h","18 km/h","20 km/h","25 km/h"], ans:2, explain:"45 min = 0.75 h. Speed = 15 ÷ 0.75 = 20 km/h." },
  { q:"If 12 workers finish a project in 15 days, how many workers are needed to finish in 10 days?", opts:["14","16","18","20"], ans:2, explain:"Inverse proportion. 12 × 15 = 180. 180 ÷ 10 = 18 workers." },
  { q:"An express bus travels at 80 km/h. A normal bus travels at 50 km/h. Both leave at the same time. After 2 hours, how far apart are they?", opts:["40 km","50 km","60 km","70 km"], ans:2, explain:"Difference in speed = 30 km/h. In 2 h: 30 × 2 = 60 km apart." },
  { q:"A recipe for 6 people needs 450 g of flour. How much flour for 10 people?", opts:["650 g","700 g","750 g","800 g"], ans:2, explain:"Per person = 75 g. For 10: 75 × 10 = 750 g." },
  { q:"A car uses 6.5 litres per 100 km. How much petrol for a 260 km trip?", opts:["14.5 L","15.6 L","16.9 L","18.2 L"], ans:2, explain:"6.5/100 × 260 = 16.9 litres." },
  { q:"Convert 5 m/s to km/h.", opts:["15 km/h","16 km/h","17 km/h","18 km/h"], ans:3, explain:"5 × 3.6 = 18 km/h." },
  { q:"Simplify ⅔ : ⅘.", opts:["5 : 6","6 : 5","10 : 12","3 : 4"], ans:0, explain:"Multiply by 15: 10 : 12. Simplify by 2: 5 : 6." },
  { q:"A map scale is 1 : 100,000. Two places are 3.5 cm apart on the map. Find the actual distance.", opts:["3.5 km","5 km","7 km","35 km"], ans:0, explain:"3.5 × 100,000 = 350,000 cm = 3500 m = 3.5 km." },
  { q:"It costs $2.40 to send 3 parcels. How much for 10 parcels?", opts:["$6.00","$7.00","$8.00","$9.00"], ans:2, explain:"1 parcel = $0.80. 10 parcels = $8.00." },
  { q:"If 8 litres of paint covers 40 m², how many litres for 65 m²?", opts:["10 L","12 L","13 L","15 L"], ans:2, explain:"1 L covers 5 m². 65 ÷ 5 = 13 L." },
  { q:"A cheetah runs at 30 m/s. Express this in km/h.", opts:["90 km/h","100 km/h","108 km/h","120 km/h"], ans:2, explain:"30 × 3.6 = 108 km/h." },
  { q:"Two places are 450 km apart. A train leaves at 10 am at 120 km/h and another leaves the opposite end at 10 am at 80 km/h. When do they meet?", opts:["12:00 pm","12:15 pm","12:30 pm","12:45 pm"], ans:1, explain:"Combined speed = 200 km/h. Time = 450/200 = 2.25 h = 2 h 15 min. Meet at 12:15 pm." },
  { q:"The ratio of boys to girls in a school is 7 : 8. There are 120 more girls than boys. How many students are there?", opts:["1680","1780","1800","1920"], ans:2, explain:"Difference = 1 part = 120. Total = 15 parts = 15 × 120 = 1800." },
  { q:"Water flows into a pool at 12 L/min and drains out at 8 L/min. How long to fill a 600 L pool?", opts:["50 min","100 min","120 min","150 min"], ans:3, explain:"Net rate = 4 L/min. Time = 600 ÷ 4 = 150 min." },
  { q:"A train 150 m long passes a 350 m platform in 25 seconds. What is the speed in km/h?", opts:["60 km/h","68 km/h","72 km/h","80 km/h"], ans:2, explain:"Total distance = 150 + 350 = 500 m. Speed = 500/25 = 20 m/s = 72 km/h." },
  { q:"Divide 150 cm of ribbon in the ratio 2 : 3 : 5. Find the longest piece.", opts:["30 cm","45 cm","50 cm","75 cm"], ans:3, explain:"Total = 10 parts. Longest = 5/10 × 150 = 75 cm." },
  { q:"A 400 m race is completed in 50 seconds. What is the average speed in m/s?", opts:["6 m/s","7 m/s","8 m/s","9 m/s"], ans:2, explain:"400 ÷ 50 = 8 m/s." },
];
