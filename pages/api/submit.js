
const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

const getWorkingDaysDetails = (date) => {
  const workingDays = diffDays(new Date(date.split('-')[0]), new Date(date.split('-')[1])) +1
  return ({ workingDays })
}

const calculateGrossIncome = (annualSalary) => {
  const grossIncomePerMonth = (annualSalary / 12);
  return Math.round(grossIncomePerMonth);

}
const calculateIncomeTax = (salary) => {
  let incomeTax = 0;

  if (salary <= 18200) {
    incomeTax = 0;
  } else if (18200 < salary && salary <= 37000) {
    incomeTax = (salary - 18200) * (19 / 100);

  } else if (37000 < salary && salary <= 87000) {
    incomeTax = 3572 + ((salary - 37000) * (32.5 / 100));

  } else if (8700 < salary && salary <= 180000) {
    incomeTax = 19822 + (salary - 87000) * (37 / 100);

  } else if (salary > 180000) {
    incomeTax = 54232 + (salary - 180000) * (45 / 100);
  }
  return Math.round(incomeTax / 12);

}

export default function handler(req, res) {
  const data = req.body.formData;
  const annualSalary = data.annualSalary;
  const evaluationRate = data.evaluationRate;
  const { workingDays } = getWorkingDaysDetails(data.paymentStartDate);
  const grossIncomeWithinRange = calculateGrossIncome(annualSalary) / 30 * workingDays;
  const incomeTaxWithinRange = calculateIncomeTax(annualSalary) / 30 * workingDays;
  const netIncomeWithinRange = Math.round((grossIncomeWithinRange - incomeTaxWithinRange) / 30 * workingDays);
  const incentiveBonusWithinRange = Math.round((grossIncomeWithinRange * evaluationRate / 100) / 30 * workingDays);



  res.status(200).json({
    data, annualSalary: annualSalary, evaluationRate: evaluationRate, workingDays: workingDays, grossIncomeWithinRange: grossIncomeWithinRange, incomeTaxWithinRange: incomeTaxWithinRange,
    netIncomeWithinRange: netIncomeWithinRange, incentiveBonusWithinRange: incentiveBonusWithinRange
  })

}
