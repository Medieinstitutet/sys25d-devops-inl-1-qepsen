export function municipalTax(grossSalary) {
  if (grossSalary < 0) throw new Error('Salary cannot be negative')
  return grossSalary * 0.32
}

export function stateTax(grossSalary) {
  if (grossSalary < 0) throw new Error('Salary cannot be negative')
  const THRESHOLD = 51158
  if (grossSalary <= THRESHOLD) return 0
  return (grossSalary - THRESHOLD) * 0.20
}

export function pensionFee(grossSalary) {
  if (grossSalary < 0) throw new Error('Salary cannot be negative')
  return grossSalary * 0.07
}

export function jobTaxDeduction(grossSalary) {
  if (grossSalary < 0) throw new Error('Salary cannot be negative')
  return grossSalary * 0.13
}

export function netSalary(grossSalary) {
  if (grossSalary < 0) throw new Error('Salary cannot be negative')
  const tax =
    municipalTax(grossSalary) +
    stateTax(grossSalary) +
    pensionFee(grossSalary) -
    jobTaxDeduction(grossSalary)
  return Math.round(grossSalary - tax)
}

export function salaryBreakdown(grossSalary) {
  if (grossSalary < 0) throw new Error('Salary cannot be negative')
  const municipal = municipalTax(grossSalary)
  const state = stateTax(grossSalary)
  const pension = pensionFee(grossSalary)
  const jobDeduction = jobTaxDeduction(grossSalary)
  const totalTax = municipal + state + pension - jobDeduction
  const net = Math.round(grossSalary - totalTax)
  const effectiveRate = grossSalary > 0 ? (totalTax / grossSalary) * 100 : 0

  return {
    gross: grossSalary,
    municipalTax: Math.round(municipal),
    stateTax: Math.round(state),
    pensionFee: Math.round(pension),
    jobTaxDeduction: Math.round(jobDeduction),
    totalTax: Math.round(totalTax),
    net,
    effectiveRate: Math.round(effectiveRate * 10) / 10,
  }
}