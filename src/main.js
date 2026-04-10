import { salaryBreakdown } from './salary.js'

const app = document.getElementById('app')

app.innerHTML = `
  <header>
    <h1>💰 Löneräknare</h1>
    <p class="subtitle">Beräkna din lön efter skatt (Sverige 2024)</p>
  </header>

  <main>
    <section class="card input-card">
      <label for="gross">Bruttolön (kr/månad)</label>
      <div class="input-row">
        <input
          id="gross"
          type="number"
          min="0"
          step="500"
          placeholder="t.ex. 35 000"
          aria-label="Bruttolön"
        />
        <button id="calc-btn">Beräkna</button>
      </div>
    </section>

    <section class="card result-card hidden" id="result">
      <h2>Resultat</h2>
      <div class="net-highlight">
        <span class="label">Nettolön</span>
        <span class="amount" id="net-amount">—</span>
      </div>
      <table class="breakdown">
        <tbody>
          <tr><td>Bruttolön</td>         <td id="r-gross">—</td></tr>
          <tr class="deduction"><td>− Kommunalskatt (32 %)</td><td id="r-municipal">—</td></tr>
          <tr class="deduction"><td>− Statlig inkomstskatt (20 %)</td><td id="r-state">—</td></tr>
          <tr class="deduction"><td>− Allmän pensionsavgift (7 %)</td><td id="r-pension">—</td></tr>
          <tr class="addition"><td>+ Jobbskatteavdrag (13 %)</td><td id="r-job">—</td></tr>
          <tr class="total"><td>= Total skatt</td>           <td id="r-total-tax">—</td></tr>
          <tr class="rate"><td>Effektiv skattesats</td>      <td id="r-rate">—</td></tr>
        </tbody>
      </table>
    </section>
  </main>

  <footer>
    <p>Förenklade schablonvärden · Exakta siffror beror på din hemkommun och situation</p>
  </footer>
`

const fmt = (n) =>
  n.toLocaleString('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 })

function calculate() {
  const raw = document.getElementById('gross').value.trim()
  const gross = parseFloat(raw)
  if (isNaN(gross) || gross < 0) {
    alert('Ange en giltig bruttolön (0 kr eller mer).')
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