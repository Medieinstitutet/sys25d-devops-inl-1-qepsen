import { describe, it, expect } from 'vitest'
import {
  municipalTax,
  stateTax,
  pensionFee,
  jobTaxDeduction,
  netSalary,
  salaryBreakdown,
} from './salary.js'

describe('municipalTax', () => {
  it('calculates 32% of gross salary', () => {
    expect(municipalTax(30000)).toBe(9600)
  })

  it('returns 0 for a zero salary', () => {
    expect(municipalTax(0)).toBe(0)
  })

  it('throws for a negative salary', () => {
    expect(() => municipalTax(-1)).toThrow('Salary cannot be negative')
  })
})

describe('stateTax', () => {
  it('returns 0 when salary is below the threshold (51 158 SEK)', () => {
    expect(stateTax(40000)).toBe(0)
  })

  it('taxes 20% of the amount above the threshold', () => {
    expect(stateTax(60000)).toBeCloseTo(1768.4)
  })

  it('returns 0 exactly at the threshold', () => {
    expect(stateTax(51158)).toBe(0)
  })

  it('throws for a negative salary', () => {
    expect(() => stateTax(-500)).toThrow('Salary cannot be negative')
  })
})

describe('pensionFee', () => {
  it('calculates 7% of gross salary', () => {
    expect(pensionFee(30000)).toBe(2100)
  })

  it('returns 0 for zero salary', () => {
    expect(pensionFee(0)).toBe(0)
  })
})

describe('jobTaxDeduction', () => {
  it('calculates 13% of gross salary', () => {
    expect(jobTaxDeduction(30000)).toBe(3900)
  })

  it('returns 0 for zero salary', () => {
    expect(jobTaxDeduction(0)).toBe(0)
  })
})

describe('netSalary', () => {
  it('returns gross when salary is 0', () => {
    expect(netSalary(0)).toBe(0)
  })

  it('net salary is less than gross for a positive salary', () => {
    expect(netSalary(35000)).toBeLessThan(35000)
  })

  it('net salary is greater than 0 for a normal salary', () => {
    expect(netSalary(35000)).toBeGreaterThan(0)
  })

  it('net salary is higher for 60 000 SEK than for 30 000 SEK', () => {
    expect(netSalary(60000)).toBeGreaterThan(netSalary(30000))
  })

  it('throws for a negative salary', () => {
    expect(() => netSalary(-100)).toThrow('Salary cannot be negative')
  })
})

describe('salaryBreakdown', () => {
  it('returns an object with all expected keys', () => {
    const result = salaryBreakdown(30000)
    expect(result).toHaveProperty('gross')
    expect(result).toHaveProperty('municipalTax')
    expect(result).toHaveProperty('stateTax')
    expect(result).toHaveProperty('pensionFee')
    expect(result).toHaveProperty('jobTaxDeduction')
    expect(result).toHaveProperty('totalTax')
    expect(result).toHaveProperty('net')
    expect(result).toHaveProperty('effectiveRate')
  })

  it('gross equals the input salary', () => {
    expect(salaryBreakdown(45000).gross).toBe(45000)
  })

  it('stateTax is 0 for a salary below the threshold', () => {
    expect(salaryBreakdown(40000).stateTax).toBe(0)
  })

  it('effectiveRate is between 0 and 100', () => {
    const { effectiveRate } = salaryBreakdown(35000)
    expect(effectiveRate).toBeGreaterThanOrEqual(0)
    expect(effectiveRate).toBeLessThanOrEqual(100)
  })

  it('net + totalTax equals gross (within rounding)', () => {
    const b = salaryBreakdown(35000)
    expect(b.net + b.totalTax).toBeCloseTo(b.gross, -1)
  })
})