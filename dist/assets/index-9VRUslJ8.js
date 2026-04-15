(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();function l(t){if(t<0)throw new Error("Salary cannot be negative");return t*.32}function u(t){if(t<0)throw new Error("Salary cannot be negative");const o=51158;return t<=o?0:(t-o)*.2}function m(t){if(t<0)throw new Error("Salary cannot be negative");return t*.07}function f(t){if(t<0)throw new Error("Salary cannot be negative");return t*.13}function p(t){if(t<0)throw new Error("Salary cannot be negative");const o=l(t),r=u(t),a=m(t),e=f(t),n=o+r+a-e,d=Math.round(t-n),s=t>0?n/t*100:0;return{gross:t,municipalTax:Math.round(o),stateTax:Math.round(r),pensionFee:Math.round(a),jobTaxDeduction:Math.round(e),totalTax:Math.round(n),net:d,effectiveRate:Math.round(s*10)/10}}const b=document.getElementById("app");b.innerHTML=`
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
`;const i=t=>t.toLocaleString("sv-SE",{style:"currency",currency:"SEK",maximumFractionDigits:0});function c(){const t=document.getElementById("gross").value.trim(),o=parseFloat(t);if(isNaN(o)||o<0){alert("Ange en giltig bruttolön (0 kr eller mer).");return}const r=p(o);document.getElementById("net-amount").textContent=i(r.net),document.getElementById("r-gross").textContent=i(r.gross),document.getElementById("r-municipal").textContent=i(r.municipalTax),document.getElementById("r-state").textContent=i(r.stateTax),document.getElementById("r-pension").textContent=i(r.pensionFee),document.getElementById("r-job").textContent=i(r.jobTaxDeduction),document.getElementById("r-total-tax").textContent=i(r.totalTax),document.getElementById("r-rate").textContent=r.effectiveRate+" %",document.getElementById("result").classList.remove("hidden")}document.getElementById("calc-btn").addEventListener("click",c);document.getElementById("gross").addEventListener("keydown",t=>{t.key==="Enter"&&c()});
