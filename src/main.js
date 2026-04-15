import { salaryBreakdown } from './salary.js'

const app = document.getElementById('app')

app.innerHTML = `
  <header>
    <h1>Salary Calculator</h1>
    <p class="subtitle">Calculate your take-home pay after tax</p>
  </header>

  <main>
    <section class="card input-card">
      <label for="gross">Gross salary (SEK/month)</label>
      <div class="input-row">
        <input
          id="gross"
          type="number"
          min="0"
          step="500"
          placeholder="e.g. 35000"
          aria-label="Gross salary"
        />
        <button id="calc-btn">Calculate</button>
      </div>
    </section>

    <section class="card result-card hidden" id="result">
      <h2>Result</h2>
      <div class="net-highlight">
        <span class="label">Net salary</span>
        <span class="amount" id="net-amount">—</span>
      </div>
      <table class="breakdown">
        <tbody>
          <tr><td>Gross salary</td>                    <td id="r-gross">—</td></tr>
          <tr class="deduction"><td>− Municipal tax (32 %)</td>      <td id="r-municipal">—</td></tr>
          <tr class="deduction"><td>− State income tax (20 %)</td>   <td id="r-state">—</td></tr>
          <tr class="deduction"><td>− Pension fee (7 %)</td>         <td id="r-pension">—</td></tr>
          <tr class="addition"><td>+ Job tax deduction (13 %)</td>   <td id="r-job">—</td></tr>
          <tr class="total"><td>= Total tax</td>                     <td id="r-total-tax">—</td></tr>
          <tr class="rate"><td>Effective tax rate</td>               <td id="r-rate">—</td></tr>
        </tbody>
      </table>
    </section>
  </main>

`

const fmt = (n) =>
  n.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 })

function calculate() {
  const raw = document.getElementById('gross').value.trim()
  const gross = parseFloat(raw)
  if (isNaN(gross) || gross < 0) {
    alert('Please enter a valid gross salary (0 or more).')
    return
  }

  const b = salaryBreakdown(gross)

  document.getElementById('net-amount').textContent = fmt(b.net)
  document.getElementById('r-gross').textContent = fmt(b.gross)
  document.getElementById('r-municipal').textContent = fmt(b.municipalTax)
  document.getElementById('r-state').textContent = fmt(b.stateTax)
  document.getElementById('r-pension').textContent = fmt(b.pensionFee)
  document.getElementById('r-job').textContent = fmt(b.jobTaxDeduction)
  document.getElementById('r-total-tax').textContent = fmt(b.totalTax)
  document.getElementById('r-rate').textContent = b.effectiveRate + ' %'

  document.getElementById('result').classList.remove('hidden')
}

document.getElementById('calc-btn').addEventListener('click', calculate)
document.getElementById('gross').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') calculate()
})