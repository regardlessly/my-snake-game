import type { TopicMeta, MCQuestion } from '../../../src/types/curriculum';

export const meta: TopicMeta = {
  id: 8, sem: 2,
  title: 'Percentage',
  desc: 'Percentage of a quantity, increase/decrease, reverse percentage'
};

export const notes: string | null = `
  <h2>Percentage</h2>
  <p class="topic-desc">Percentage of a quantity, increase/decrease, reverse percentage, GST &amp; discounts</p>

  <div class="notes-card">
    <h3>1. Percentage Basics</h3>
    <p><strong>Percent</strong> means "per hundred". To convert:</p>
    <div class="example">
      <strong>Fraction &rarr; Percentage:</strong> multiply by 100%<br>
      3/5 = 3/5 &times; 100% = <span class="highlight">60%</span><br><br>
      <strong>Decimal &rarr; Percentage:</strong> multiply by 100%<br>
      0.45 = 0.45 &times; 100% = <span class="highlight">45%</span><br><br>
      <strong>Percentage &rarr; Fraction/Decimal:</strong> divide by 100<br>
      35% = 35/100 = 7/20 = <span class="highlight">0.35</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>2. Percentage of a Quantity</h3>
    <p>To find a percentage of an amount, convert the percentage to a decimal (or fraction) and multiply.</p>
    <div class="example">
      Find 20% of $150:<br>
      20% &times; $150 = 0.20 &times; $150 = <span class="highlight">$30</span><br><br>
      Express $45 as a percentage of $180:<br>
      45/180 &times; 100% = <span class="highlight">25%</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>3. Percentage Increase &amp; Decrease</h3>
    <p>Use the formula: <strong>Percentage change = (Change &divide; Original) &times; 100%</strong></p>
    <div class="example">
      <strong>Increase:</strong> A price rises from $40 to $50.<br>
      Change = $50 &minus; $40 = $10<br>
      % increase = 10/40 &times; 100% = <span class="highlight">25%</span><br><br>
      <strong>Decrease:</strong> A price falls from $80 to $60.<br>
      Change = $80 &minus; $60 = $20<br>
      % decrease = 20/80 &times; 100% = <span class="highlight">25%</span><br><br>
      <strong>Shortcut:</strong> New amount after x% increase = Original &times; (1 + x/100)<br>
      New amount after x% decrease = Original &times; (1 &minus; x/100)
    </div>
  </div>

  <div class="notes-card">
    <h3>4. GST (Goods &amp; Services Tax)</h3>
    <p>Singapore GST is <strong>9%</strong>. Price with GST = Price &times; 1.09</p>
    <div class="example">
      A meal costs $12 before GST.<br>
      GST = 9% &times; $12 = $1.08<br>
      Total = $12 + $1.08 = <span class="highlight">$13.08</span><br>
      Or directly: $12 &times; 1.09 = $13.08
    </div>
  </div>

  <div class="notes-card">
    <h3>5. Reverse Percentage</h3>
    <p>When the <strong>final amount</strong> is given after a percentage change, find the <strong>original</strong>.</p>
    <div class="example">
      After a 20% discount, a bag costs $80. Find the original price.<br>
      80% of original = $80 (since 100% &minus; 20% = 80%)<br>
      Original = $80 &divide; 0.80 = <span class="highlight">$100</span><br><br>
      Price including 9% GST is $109. Find price before GST.<br>
      109% of original = $109<br>
      Original = $109 &divide; 1.09 = <span class="highlight">$100</span>
    </div>
  </div>

  <div class="notes-card">
    <h3>Quick Reference</h3>
    <div class="formula">x% of A = (x/100) &times; A</div>
    <div class="formula">A as % of B = (A/B) &times; 100%</div>
    <div class="formula">% change = (change &divide; original) &times; 100%</div>
    <div class="formula">Reverse: if result = original &times; multiplier, then original = result &divide; multiplier</div>
  </div>
`

export const questions: MCQuestion[] | null = [
  // ═══════════════════════════════════════════
  // PERCENTAGE OF A QUANTITY (Q1–38)
  // ═══════════════════════════════════════════
  { q:"Find 10% of $50.", opts:["$5","$10","$15","$50"], ans:0, explain:"10% of $50 = 0.10 × $50 = $5." },
  { q:"Find 25% of 80.", opts:["15","20","25","40"], ans:1, explain:"25% of 80 = 0.25 × 80 = 20." },
  { q:"Find 50% of 120.", opts:["24","50","60","100"], ans:2, explain:"50% of 120 = 0.50 × 120 = 60." },
  { q:"Find 75% of 200.", opts:["100","125","150","175"], ans:2, explain:"75% of 200 = 0.75 × 200 = 150." },
  { q:"Find 20% of $35.", opts:["$5","$7","$8","$10"], ans:1, explain:"20% of $35 = 0.20 × $35 = $7." },
  { q:"Find 15% of 60.", opts:["6","9","12","15"], ans:1, explain:"15% of 60 = 0.15 × 60 = 9." },
  { q:"Find 30% of $250.", opts:["$25","$50","$75","$100"], ans:2, explain:"30% of $250 = 0.30 × $250 = $75." },
  { q:"Find 5% of 400.", opts:["5","10","20","40"], ans:2, explain:"5% of 400 = 0.05 × 400 = 20." },
  { q:"Find 12.5% of 80.", opts:["8","10","12","16"], ans:1, explain:"12.5% of 80 = 0.125 × 80 = 10." },
  { q:"Find 40% of $150.", opts:["$40","$50","$60","$70"], ans:2, explain:"40% of $150 = 0.40 × $150 = $60." },
  { q:"Express 15 as a percentage of 60.", opts:["15%","20%","25%","30%"], ans:2, explain:"15/60 × 100% = 25%." },
  { q:"Express 9 as a percentage of 36.", opts:["20%","25%","30%","36%"], ans:1, explain:"9/36 × 100% = 25%." },
  { q:"Express $12 as a percentage of $80.", opts:["12%","15%","18%","20%"], ans:1, explain:"12/80 × 100% = 15%." },
  { q:"Express 45 as a percentage of 180.", opts:["20%","25%","30%","45%"], ans:1, explain:"45/180 × 100% = 25%." },
  { q:"Express 7 as a percentage of 20.", opts:["25%","30%","35%","40%"], ans:2, explain:"7/20 × 100% = 35%." },
  { q:"Convert 3/8 to a percentage.", opts:["35%","37.5%","38%","40%"], ans:1, explain:"3/8 × 100% = 37.5%." },
  { q:"Convert 0.65 to a percentage.", opts:["6.5%","60%","65%","650%"], ans:2, explain:"0.65 × 100% = 65%." },
  { q:"Convert 45% to a decimal.", opts:["0.045","0.45","4.5","45"], ans:1, explain:"45% = 45 ÷ 100 = 0.45." },
  { q:"Convert 7/25 to a percentage.", opts:["25%","28%","30%","35%"], ans:1, explain:"7/25 × 100% = 28%." },
  { q:"What percentage of 2 kg is 500 g?", opts:["5%","20%","25%","50%"], ans:2, explain:"500 g out of 2000 g = 500/2000 × 100% = 25%." },
  { q:"A hawker stall sells 120 bowls of laksa in a day. 30 are sold before noon. What percentage is sold before noon?", opts:["20%","25%","30%","35%"], ans:1, explain:"30/120 × 100% = 25%." },
  { q:"An NTUC FairPrice basket of groceries costs $80. Fruits make up $20. What percentage is spent on fruits?", opts:["20%","25%","30%","40%"], ans:1, explain:"20/80 × 100% = 25%." },
  { q:"Find 35% of $240.", opts:["$72","$78","$84","$90"], ans:2, explain:"35% of $240 = 0.35 × $240 = $84." },
  { q:"Find 2% of $1500.", opts:["$15","$30","$50","$150"], ans:1, explain:"2% of $1500 = 0.02 × $1500 = $30." },
  { q:"In a class of 40 students, 60% are girls. How many are girls?", opts:["16","20","24","30"], ans:2, explain:"60% of 40 = 0.60 × 40 = 24 girls." },
  { q:"A student scored 72 out of 90 on a math test. What is the percentage score?", opts:["72%","75%","78%","80%"], ans:3, explain:"72/90 × 100% = 80%." },
  { q:"A durian costs $18. GST is 9%. What is the GST amount?", opts:["$0.90","$1.08","$1.62","$1.80"], ans:2, explain:"9% of $18 = 0.09 × $18 = $1.62." },
  { q:"Express 0.008 as a percentage.", opts:["0.008%","0.08%","0.8%","8%"], ans:2, explain:"0.008 × 100% = 0.8%." },
  { q:"What is 150% of 60?", opts:["60","75","90","120"], ans:2, explain:"150% of 60 = 1.50 × 60 = 90." },
  { q:"Convert 5/6 to a percentage (to 1 d.p.).", opts:["80.0%","83.3%","85.0%","86.7%"], ans:1, explain:"5/6 × 100% = 83.333...% ≈ 83.3%." },
  { q:"A box contains 250 apples. 8% are rotten. How many apples are rotten?", opts:["8","16","20","25"], ans:2, explain:"8% of 250 = 0.08 × 250 = 20 apples." },
  { q:"Find 66⅔% of 210.", opts:["105","120","130","140"], ans:3, explain:"66⅔% = 2/3. 2/3 × 210 = 140." },
  { q:"What percentage of 1 hour is 45 minutes?", opts:["45%","55%","65%","75%"], ans:3, explain:"45/60 × 100% = 75%." },
  { q:"What percentage of 1 km is 350 m?", opts:["3.5%","30%","35%","350%"], ans:2, explain:"350/1000 × 100% = 35%." },
  { q:"An MRT station has 800 commuters in the morning. 480 tap in before 8 am. What percentage is this?", opts:["48%","52%","58%","60%"], ans:3, explain:"480/800 × 100% = 60%." },
  { q:"Find 0.5% of $2000.", opts:["$1","$5","$10","$100"], ans:2, explain:"0.5% of $2000 = 0.005 × $2000 = $10." },
  { q:"A bubble tea costs $5.80. If 9% GST is added, what is the GST amount (to nearest cent)?", opts:["$0.29","$0.52","$0.58","$5.80"], ans:1, explain:"9% of $5.80 = 0.09 × $5.80 = $0.522 ≈ $0.52." },
  { q:"Express 3 out of 8 as a percentage.", opts:["30%","33.3%","37.5%","38%"], ans:2, explain:"3/8 × 100% = 37.5%." },

  // ═══════════════════════════════════════════
  // PERCENTAGE CHANGE (Q39–80)
  // ═══════════════════════════════════════════
  { q:"A shirt's price increases from $40 to $50. What is the percentage increase?", opts:["10%","20%","25%","50%"], ans:2, explain:"Increase = $10. % increase = 10/40 × 100% = 25%." },
  { q:"A bag's price decreases from $60 to $45. What is the percentage decrease?", opts:["15%","20%","25%","30%"], ans:2, explain:"Decrease = $15. % decrease = 15/60 × 100% = 25%." },
  { q:"A population grows from 200 to 250. What is the percentage increase?", opts:["20%","25%","30%","50%"], ans:1, explain:"Increase = 50. % increase = 50/200 × 100% = 25%." },
  { q:"A laptop's price drops from $1200 to $900. What is the percentage decrease?", opts:["20%","25%","30%","33.3%"], ans:1, explain:"Decrease = $300. % decrease = 300/1200 × 100% = 25%." },
  { q:"Increase $80 by 15%.", opts:["$90","$92","$95","$96"], ans:1, explain:"$80 × 1.15 = $92." },
  { q:"Decrease $120 by 30%.", opts:["$36","$72","$84","$90"], ans:2, explain:"$120 × 0.70 = $84." },
  { q:"A hawker increases the price of chicken rice from $3.50 to $4.20. What is the percentage increase?", opts:["15%","18%","20%","25%"], ans:2, explain:"Increase = $0.70. % increase = 0.70/3.50 × 100% = 20%." },
  { q:"The price of a HDB flat increases from $300,000 to $360,000. What is the percentage increase?", opts:["15%","18%","20%","25%"], ans:2, explain:"Increase = $60,000. % increase = 60,000/300,000 × 100% = 20%." },
  { q:"An MRT fare increases from $1.50 to $1.65. What is the percentage increase?", opts:["5%","8%","10%","15%"], ans:2, explain:"Increase = $0.15. % increase = 0.15/1.50 × 100% = 10%." },
  { q:"Increase 250 by 12%.", opts:["262","270","280","290"], ans:2, explain:"250 × 1.12 = 280." },
  { q:"Decrease 400 by 5%.", opts:["360","370","380","395"], ans:2, explain:"400 × 0.95 = 380." },
  { q:"A school's enrolment drops from 1000 to 850. What is the percentage decrease?", opts:["10%","12%","15%","18%"], ans:2, explain:"Decrease = 150. % decrease = 150/1000 × 100% = 15%." },
  { q:"After a 10% increase, the new value is 110. What was the original?", opts:["90","99","100","105"], ans:2, explain:"Original × 1.10 = 110. Original = 110 ÷ 1.10 = 100." },
  { q:"A coat originally costs $200. It is first increased by 10%, then decreased by 10%. What is the final price?", opts:["$196","$198","$200","$202"], ans:1, explain:"After 10% increase: $200 × 1.10 = $220. After 10% decrease: $220 × 0.90 = $198." },
  { q:"Increase $350 by 20%.", opts:["$370","$390","$410","$420"], ans:3, explain:"$350 × 1.20 = $420." },
  { q:"Decrease 600 by 35%.", opts:["210","300","360","390"], ans:3, explain:"600 × 0.65 = 390." },
  { q:"A taxi fare goes from $12 to $14.40. What is the percentage increase?", opts:["15%","18%","20%","24%"], ans:2, explain:"Increase = $2.40. % increase = 2.40/12 × 100% = 20%." },
  { q:"A discount of 40% is applied to a $90 dress. What is the sale price?", opts:["$36","$45","$50","$54"], ans:3, explain:"$90 × 0.60 = $54." },
  { q:"NTUC offers a 15% discount on a $6.00 packet of rice. What is the discounted price?", opts:["$4.80","$5.10","$5.25","$5.50"], ans:1, explain:"$6.00 × 0.85 = $5.10." },
  { q:"The number of MRT breakdowns decreased from 40 to 30 in a year. What is the percentage decrease?", opts:["10%","20%","25%","30%"], ans:2, explain:"Decrease = 10. % decrease = 10/40 × 100% = 25%." },
  { q:"A worker's salary increases from $2400 to $2640. What is the percentage increase?", opts:["8%","10%","12%","15%"], ans:1, explain:"Increase = $240. % increase = 240/2400 × 100% = 10%." },
  { q:"The temperature drops from 32°C to 28°C. What is the percentage decrease (to 1 d.p.)?", opts:["8.5%","10.0%","12.5%","15.0%"], ans:2, explain:"Decrease = 4. % decrease = 4/32 × 100% = 12.5%." },
  { q:"A shopkeeper bought a toy for $25 and sold it for $35. What is the percentage profit?", opts:["28%","35%","40%","45%"], ans:2, explain:"Profit = $10. % profit = 10/25 × 100% = 40%." },
  { q:"A phone bought for $800 is sold for $600. What is the percentage loss?", opts:["20%","25%","30%","35%"], ans:1, explain:"Loss = $200. % loss = 200/800 × 100% = 25%." },
  { q:"A bowl of fishball noodles costs $4.00. After a price increase of 25%, what is the new price?", opts:["$4.25","$4.50","$4.75","$5.00"], ans:3, explain:"$4.00 × 1.25 = $5.00." },
  { q:"After a 20% discount, you save $16. What was the original price?", opts:["$64","$72","$80","$96"], ans:2, explain:"20% of original = $16. Original = $16 ÷ 0.20 = $80." },
  { q:"A value increases from 80 to 120. What is the percentage increase?", opts:["30%","40%","45%","50%"], ans:3, explain:"Increase = 40. % increase = 40/80 × 100% = 50%." },
  { q:"Decrease $450 by 8%.", opts:["$396","$405","$414","$420"], ans:2, explain:"$450 × 0.92 = $414." },
  { q:"A item's price is first increased by 20% then decreased by 20%. The final price compared to the original is:", opts:["Same","4% less","4% more","2% less"], ans:1, explain:"Original × 1.20 × 0.80 = Original × 0.96. This is 4% less." },
  { q:"A hawker sells 200 plates of nasi lemak on Monday and 260 on Tuesday. What is the percentage increase?", opts:["20%","25%","30%","35%"], ans:2, explain:"Increase = 60. % increase = 60/200 × 100% = 30%." },
  { q:"A company made a profit of $15,000 on a cost of $60,000. What is the percentage profit?", opts:["15%","20%","25%","30%"], ans:2, explain:"% profit = 15,000/60,000 × 100% = 25%." },
  { q:"During a sale, a $240 bag is marked down by $72. What is the percentage discount?", opts:["25%","28%","30%","33%"], ans:2, explain:"% discount = 72/240 × 100% = 30%." },
  { q:"A BTO flat increased in value from $250,000 to $325,000. What is the percentage increase?", opts:["25%","28%","30%","35%"], ans:2, explain:"Increase = $75,000. % increase = 75,000/250,000 × 100% = 30%." },
  { q:"The number of tourists rose from 1.2 million to 1.5 million. What is the percentage increase?", opts:["20%","25%","30%","35%"], ans:1, explain:"Increase = 0.3 million. % increase = 0.3/1.2 × 100% = 25%." },
  { q:"A $500 bicycle is sold at a 12% loss. What is the selling price?", opts:["$420","$430","$440","$460"], ans:2, explain:"$500 × 0.88 = $440." },
  { q:"After an 8% increase, the new salary is $5400. What was the original salary?", opts:["$4968","$5000","$5100","$5200"], ans:1, explain:"Original × 1.08 = $5400. Original = $5400 ÷ 1.08 = $5000." },

  // ═══════════════════════════════════════════
  // REVERSE PERCENTAGE (Q81–115)
  // ═══════════════════════════════════════════
  { q:"After a 20% discount, a pair of shoes costs $80. Find the original price.", opts:["$96","$100","$104","$120"], ans:1, explain:"80% of original = $80. Original = $80 ÷ 0.80 = $100." },
  { q:"After a 25% increase, a value is 150. Find the original value.", opts:["100","112.5","120","125"], ans:2, explain:"125% of original = 150. Original = 150 ÷ 1.25 = 120." },
  { q:"A price including 9% GST is $54.50. What is the price before GST?", opts:["$49.54","$50.00","$50.46","$51.00"], ans:1, explain:"109% of original = $54.50. Original = $54.50 ÷ 1.09 = $50.00." },
  { q:"After a 10% discount, a bag costs $63. Find the original price.", opts:["$56.70","$65","$69.30","$70"], ans:3, explain:"90% of original = $63. Original = $63 ÷ 0.90 = $70." },
  { q:"After a 30% increase, a population is 5200. Find the original population.", opts:["3640","3800","4000","4200"], ans:2, explain:"130% of original = 5200. Original = 5200 ÷ 1.30 = 4000." },
  { q:"A phone costs $872 after 9% GST. What is the price before GST?", opts:["$790","$800","$810","$820"], ans:1, explain:"109% of original = $872. Original = $872 ÷ 1.09 = $800." },
  { q:"After a 15% discount, a jacket costs $170. Find the original price.", opts:["$190","$195","$196","$200"], ans:3, explain:"85% of original = $170. Original = $170 ÷ 0.85 = $200." },
  { q:"A shop sells an item at 40% profit. The selling price is $84. Find the cost price.", opts:["$50","$55","$60","$65"], ans:2, explain:"140% of cost = $84. Cost = $84 ÷ 1.40 = $60." },
  { q:"After a 5% decrease, a tank holds 475 litres. Find the original capacity.", opts:["490","495","500","505"], ans:2, explain:"95% of original = 475. Original = 475 ÷ 0.95 = 500." },
  { q:"A hawker meal costs $5.45 including 9% GST. What is the price before GST?", opts:["$4.95","$5.00","$5.05","$5.10"], ans:1, explain:"109% of original = $5.45. Original = $5.45 ÷ 1.09 = $5.00." },
  { q:"After a 20% increase, a flat costs $360,000. Find the original price.", opts:["$280,000","$288,000","$300,000","$320,000"], ans:2, explain:"120% of original = $360,000. Original = $360,000 ÷ 1.20 = $300,000." },
  { q:"After a 35% discount, a television costs $650. Find the original price.", opts:["$900","$950","$1000","$1050"], ans:2, explain:"65% of original = $650. Original = $650 ÷ 0.65 = $1000." },
  { q:"A car depreciates by 12%. Its current value is $44,000. Find the value before depreciation.", opts:["$48,000","$49,000","$50,000","$52,000"], ans:2, explain:"88% of original = $44,000. Original = $44,000 ÷ 0.88 = $50,000." },
  { q:"After adding 9% GST, a restaurant bill is $163.50. What is the bill before GST?", opts:["$145","$148.50","$150","$155"], ans:2, explain:"109% of original = $163.50. Original = $163.50 ÷ 1.09 = $150." },
  { q:"After a 25% discount, a watch costs $375. Find the original price.", opts:["$450","$468.75","$475","$500"], ans:3, explain:"75% of original = $375. Original = $375 ÷ 0.75 = $500." },
  { q:"A bookshop makes a 20% profit selling a book for $18. Find the cost price.", opts:["$14","$14.40","$15","$16"], ans:2, explain:"120% of cost = $18. Cost = $18 ÷ 1.20 = $15." },
  { q:"After an 8% pay rise, a worker earns $3240. What was the original pay?", opts:["$2900","$2980","$3000","$3050"], ans:2, explain:"108% of original = $3240. Original = $3240 ÷ 1.08 = $3000." },
  { q:"After a 50% increase, the number of volunteers is 180. How many were there originally?", opts:["90","100","110","120"], ans:3, explain:"150% of original = 180. Original = 180 ÷ 1.50 = 120." },
  { q:"A laptop costs $1635 after 9% GST. Find the price before GST.", opts:["$1450","$1480","$1500","$1520"], ans:2, explain:"109% of original = $1635. Original = $1635 ÷ 1.09 = $1500." },
  { q:"After a 40% discount, a sofa costs $780. Find the original price.", opts:["$1100","$1200","$1250","$1300"], ans:3, explain:"60% of original = $780. Original = $780 ÷ 0.60 = $1300." },
  { q:"After a 15% increase, a bus fare is $1.38. What was the original fare?", opts:["$1.10","$1.15","$1.17","$1.20"], ans:3, explain:"115% of original = $1.38. Original = $1.38 ÷ 1.15 = $1.20." },
  { q:"A shirt is sold at a 25% loss for $45. Find the cost price.", opts:["$55","$56.25","$58","$60"], ans:3, explain:"75% of cost = $45. Cost = $45 ÷ 0.75 = $60." },
  { q:"After a 6% increase, electricity consumption is 530 kWh. Find the original consumption.", opts:["$490","495","498","500"], ans:3, explain:"106% of original = 530. Original = 530 ÷ 1.06 = 500." },
  { q:"A dinner costs $87.20 including 9% GST. What is the price before GST?", opts:["$78","$79","$80","$82"], ans:2, explain:"109% of original = $87.20. Original = $87.20 ÷ 1.09 = $80." },
  { q:"After losing 18% of its weight, a bag of rice weighs 8.2 kg. Find the original weight.", opts:["9.5 kg","9.8 kg","10 kg","10.2 kg"], ans:2, explain:"82% of original = 8.2. Original = 8.2 ÷ 0.82 = 10 kg." },
  { q:"A taxi fare including a 10% surcharge is $16.50. What is the base fare?", opts:["$14","$14.50","$15","$15.50"], ans:2, explain:"110% of base = $16.50. Base = $16.50 ÷ 1.10 = $15." },
  { q:"After a 45% discount, a pair of sneakers costs $110. Find the original price.", opts:["$180","$190","$195","$200"], ans:3, explain:"55% of original = $110. Original = $110 ÷ 0.55 = $200." },
  { q:"A property increased by 25% to $625,000. Find the original value.", opts:["$468,750","$480,000","$500,000","$520,000"], ans:2, explain:"125% of original = $625,000. Original = $625,000 ÷ 1.25 = $500,000." },
  { q:"After a 2% decrease, a population is 49,000. Find the original population.", opts:["48,000","49,500","50,000","50,500"], ans:2, explain:"98% of original = 49,000. Original = 49,000 ÷ 0.98 = 50,000." },
  { q:"A bike sold at a 30% profit for $520. Find the cost price.", opts:["$364","$380","$390","$400"], ans:3, explain:"130% of cost = $520. Cost = $520 ÷ 1.30 = $400." },
  { q:"A hotel room costs $327 after 9% GST. Find the price before GST.", opts:["$295","$298","$300","$305"], ans:2, explain:"109% of original = $327. Original = $327 ÷ 1.09 = $300." },
  { q:"After a 16% increase, rent is $1740. Find the original rent.", opts:["$1400","$1450","$1500","$1550"], ans:2, explain:"116% of original = $1740. Original = $1740 ÷ 1.16 = $1500." },
  { q:"The price of a washing machine after a 22% discount is $3120. Find the original price.", opts:["$3800","$3900","$4000","$4200"], ans:2, explain:"78% of original = $3120. Original = $3120 ÷ 0.78 = $4000." },
  { q:"After a 60% increase, a share price is $4.80. What was the original price?", opts:["$2.80","$3.00","$3.20","$3.50"], ans:1, explain:"160% of original = $4.80. Original = $4.80 ÷ 1.60 = $3.00." },
  { q:"A spa treatment costs $218 including 9% GST. Find the price before GST.", opts:["$195","$198","$200","$205"], ans:2, explain:"109% of original = $218. Original = $218 ÷ 1.09 = $200." },

  // ═══════════════════════════════════════════
  // PERCENTAGE WORD PROBLEMS (Q116–150)
  // ═══════════════════════════════════════════
  { q:"A dress costs $120 before GST. After adding 9% GST and then a 20% discount on the GST-inclusive price, what is the final price?", opts:["$96.00","$100.80","$104.64","$108.00"], ans:2, explain:"With GST: $120 × 1.09 = $130.80. After 20% discount: $130.80 × 0.80 = $104.64." },
  { q:"Ali saves 15% of his monthly salary. If he saves $525, what is his salary?", opts:["$3000","$3200","$3500","$4000"], ans:2, explain:"15% of salary = $525. Salary = $525 ÷ 0.15 = $3,500." },
  { q:"A school has 1200 students. 55% are boys. How many girls are there?", opts:["480","540","600","660"], ans:1, explain:"Girls = 45% of 1200 = 0.45 × 1200 = 540." },
  { q:"A hawker buys chicken for $4 per kg and sells it at $5 per kg. What is the percentage profit?", opts:["15%","20%","25%","30%"], ans:2, explain:"Profit = $1. % profit = 1/4 × 100% = 25%." },
  { q:"A $1500 laptop depreciates by 20% each year. What is its value after 2 years?", opts:["$900","$960","$1000","$1080"], ans:1, explain:"After 1 year: $1500 × 0.80 = $1200. After 2 years: $1200 × 0.80 = $960." },
  { q:"Mei buys 3 items at NTUC: $4.50, $7.20, $8.30. She has a 10% member discount on the total. What does she pay?", opts:["$16.00","$18.00","$18.90","$20.00"], ans:1, explain:"Total = $4.50 + $7.20 + $8.30 = $20.00. After 10% discount: $20.00 × 0.90 = $18.00." },
  { q:"A class of 40 students took a test. 85% passed. How many failed?", opts:["4","5","6","8"], ans:2, explain:"Failed = 15% of 40 = 0.15 × 40 = 6." },
  { q:"A car costs $80,000. A down payment of 30% is required. How much is the down payment?", opts:["$20,000","$24,000","$28,000","$30,000"], ans:1, explain:"30% of $80,000 = 0.30 × $80,000 = $24,000." },
  { q:"A recipe needs 400 g of flour. Siti wants to increase it by 75%. How much flour does she need?", opts:["475 g","600 g","675 g","700 g"], ans:3, explain:"400 g × 1.75 = 700 g." },
  { q:"An employee earns $3600. After a 5% pay cut and then a 5% pay rise, what is the new salary?", opts:["$3591","$3596","$3600","$3609"], ans:0, explain:"After cut: $3600 × 0.95 = $3420. After rise: $3420 × 1.05 = $3591." },
  { q:"Ahmad scored 45 out of 60 on Paper 1 and 56 out of 80 on Paper 2. Which paper had a higher percentage score?", opts:["Paper 1 (75%)","Paper 2 (70%)","Both the same","Cannot tell"], ans:0, explain:"Paper 1: 45/60 × 100% = 75%. Paper 2: 56/80 × 100% = 70%. Paper 1 is higher." },
  { q:"A shop buys 50 shirts at $20 each. 80% sell at $26 and the rest at $24. Find the overall percentage profit.", opts:["25%","27%","28%","30%"], ans:2, explain:"Cost = 50 × $20 = $1000. Revenue = 40 × $26 + 10 × $24 = $1040 + $240 = $1280. Profit = $280. % profit = 280/1000 × 100% = 28%." },
  { q:"Water makes up 60% of a person's body weight. If a student weighs 50 kg, how much water is in their body?", opts:["20 kg","25 kg","30 kg","35 kg"], ans:2, explain:"60% of 50 kg = 0.60 × 50 = 30 kg." },
  { q:"A tank is 40% full and contains 200 litres. What is the full capacity?", opts:["300 litres","400 litres","500 litres","600 litres"], ans:2, explain:"40% of capacity = 200. Capacity = 200 ÷ 0.40 = 500 litres." },
  { q:"In a sale, successive discounts of 10% and 20% are applied. What single discount is equivalent?", opts:["28%","29%","30%","32%"], ans:0, explain:"Combined multiplier: 0.90 × 0.80 = 0.72. Equivalent discount = 1 − 0.72 = 0.28 = 28%." },
  { q:"A $50 meal is subject to 10% service charge, then 9% GST on the total. What is the final bill?", opts:["$57.50","$59.95","$60.50","$62.00"], ans:1, explain:"After service charge: $50 × 1.10 = $55. After GST: $55 × 1.09 = $59.95." },
  { q:"The price of petrol increased by 8% to $2.70 per litre. What was the original price?", opts:["$2.40","$2.48","$2.50","$2.55"], ans:2, explain:"108% of original = $2.70. Original = $2.70 ÷ 1.08 = $2.50." },
  { q:"A student answered 90% of 40 questions correctly. How many did they get wrong?", opts:["2","3","4","6"], ans:2, explain:"Correct = 90% of 40 = 36. Wrong = 40 − 36 = 4." },
  { q:"A shopkeeper marks up an item by 50% then offers a 20% discount. What is the overall percentage profit?", opts:["20%","25%","30%","35%"], ans:0, explain:"Markup: × 1.50. Discount: × 0.80. Overall: 1.50 × 0.80 = 1.20. Profit = 20%." },
  { q:"Lina spent 25% of her allowance on food, 40% on transport, and saved the rest. If she saved $21, what was her allowance?", opts:["$50","$55","$60","$70"], ans:2, explain:"Saved = 100% − 25% − 40% = 35%. 35% of allowance = $21. Allowance = $21 ÷ 0.35 = $60." },
  { q:"A shop bought 100 pens for $0.80 each and sold them at $1.20 each. 15 pens were damaged and thrown away. Find the percentage profit.", opts:["20%","25%","27.5%","30%"], ans:2, explain:"Cost = 100 × $0.80 = $80. Revenue = 85 × $1.20 = $102. Profit = $22. % profit = 22/80 × 100% = 27.5%." },
  { q:"The value of a car decreased from $60,000 to $48,000 over 2 years. What is the average percentage decrease per year if the decrease is the same each year?", opts:["8%","10%","12%","15%"], ans:1, explain:"Total decrease = $12,000 over 2 years = $6,000 per year. % decrease = 6,000/60,000 × 100% = 10%. (Note: this is simple, not compound, depreciation.)" },
  { q:"A fruit seller bought 200 oranges at $0.50 each. 10% were rotten. He sold the good ones at $0.80 each. Find his percentage profit.", opts:["32%","40%","44%","48%"], ans:2, explain:"Cost = 200 × $0.50 = $100. Good oranges = 180. Revenue = 180 × $0.80 = $144. Profit = $44. % profit = 44/100 × 100% = 44%." },
  { q:"A concert venue with 2000 seats is 85% full. If 5% of ticket holders don't show up, how many people attend?", opts:["1600","1615","1620","1700"], ans:1, explain:"Tickets sold = 85% of 2000 = 1700. Attend = 95% of 1700 = 1615." },
  { q:"GST in Singapore is raised from 8% to 9%. A meal costs $25 before GST. How much more do you pay under the new GST rate?", opts:["$0.15","$0.25","$0.50","$1.00"], ans:1, explain:"Old GST: 8% of $25 = $2.00. New GST: 9% of $25 = $2.25. Difference = $0.25." },
  { q:"A compound increases by 10% in the first year and 20% in the second year. What is the overall percentage increase?", opts:["30%","31%","32%","33%"], ans:2, explain:"Overall multiplier = 1.10 × 1.20 = 1.32. Overall increase = 32%." },
  { q:"After spending 30% of his money on a bag and 25% of the remainder on shoes, Ravi has $315 left. How much did he start with?", opts:["$500","$550","$600","$650"], ans:2, explain:"After bag: 70% left. After shoes: 75% of 70% = 52.5% left. 52.5% of original = $315. Original = $315 ÷ 0.525 = $600." },
  { q:"An item's price is increased by 25%. What percentage decrease is needed to return to the original price?", opts:["15%","20%","25%","30%"], ans:1, explain:"New = 1.25 × original. To return: need to multiply by 1/1.25 = 0.80. Decrease = 20%." },
  { q:"A shop offers 'Buy 2 Get 1 Free' on $12 items. What is the effective percentage discount per item?", opts:["25%","30%","33⅓%","50%"], ans:2, explain:"Pay for 2, get 3. Average cost = $24/3 = $8. Discount per item = $4/$12 × 100% = 33⅓%." },
  { q:"The population of a town increased by 10% in 2023 and decreased by 10% in 2024. If the population at the end of 2024 was 19,800, what was it at the start of 2023?", opts:["18,000","19,000","20,000","21,000"], ans:2, explain:"Let original = x. After +10%: 1.1x. After −10%: 1.1x × 0.9 = 0.99x. 0.99x = 19,800. x = 20,000." },
  { q:"A retailer buys goods at $400 and wants a 30% profit after allowing a 20% discount on the marked price. What should the marked price be?", opts:["$520","$600","$650","$700"], ans:2, explain:"Selling price needed = $400 × 1.30 = $520. Marked price × 0.80 = $520. Marked price = $520 ÷ 0.80 = $650." },
  { q:"Samy invested $10,000. He gained 15% in Year 1 and lost 10% in Year 2. How much does he have at the end of Year 2?", opts:["$10,250","$10,350","$10,450","$10,500"], ans:1, explain:"After Year 1: $10,000 × 1.15 = $11,500. After Year 2: $11,500 × 0.90 = $10,350." },
  { q:"A meal at a restaurant has a list price of $40. A 10% service charge is added first, then 9% GST on the total. Find the final amount.", opts:["$47.60","$47.96","$48.00","$48.40"], ans:1, explain:"After service charge: $40 × 1.10 = $44. After GST: $44 × 1.09 = $47.96." },
  { q:"Three friends split a restaurant bill. The food costs $90 before 10% service charge and 9% GST (applied on the total including service charge). How much does each person pay?", opts:["$35.64","$35.97","$36.30","$37.00"], ans:1, explain:"After service charge: $90 × 1.10 = $99. After GST: $99 × 1.09 = $107.91. Per person: $107.91 ÷ 3 = $35.97." },
  { q:"A property worth $500,000 appreciates by 4% per year (compound). What is its value after 2 years?", opts:["$540,000","$540,800","$541,200","$542,000"], ans:1, explain:"After 1 year: $500,000 × 1.04 = $520,000. After 2 years: $520,000 × 1.04 = $540,800." },
  { q:"A school canteen raises the price of a set meal from $2.50 to $3.00. What is the percentage increase?", opts:["15%","18%","20%","25%"], ans:2, explain:"Increase = $0.50. % increase = 0.50/2.50 × 100% = 20%." },
  { q:"Xiao Ming scored 68% on his first test and 85% on his second test. By how many percentage points did his score improve?", opts:["15","17","20","25"], ans:1, explain:"Improvement = 85% − 68% = 17 percentage points." },
  { q:"A shop gives a 10% loyalty discount and then a further 5% off. What is the overall percentage discount?", opts:["14.5%","15%","15.5%","16%"], ans:0, explain:"Combined: 0.90 × 0.95 = 0.855. Discount = 1 − 0.855 = 14.5%." },
  { q:"A worker earns $2800 per month. CPF contribution is 20% of salary. How much goes to CPF?", opts:["$420","$480","$540","$560"], ans:3, explain:"20% of $2800 = 0.20 × $2800 = $560." },
  { q:"A carpark has 500 lots. On Monday 72% are occupied and on Tuesday 85% are occupied. How many more cars on Tuesday?", opts:["55","60","65","70"], ans:2, explain:"Monday: 360 cars. Tuesday: 425 cars. Difference = 65." },
  { q:"After a 12% discount, you pay $264 for a tablet. What was the original price?", opts:["$280","$290","$295","$300"], ans:3, explain:"88% of original = $264. Original = $264 ÷ 0.88 = $300." },
];
