
const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

const getWorkingDaysDetails = (date) => {
  const workingDays = diffDays(new Date(date.split('-')[0]), new Date(date.split('-')[1])) + 1
  return ({ workingDays })
}

const calculateGrossIncome = (annualSalary) => {
  const grossIncomePerMonth = (annualSalary / 12);
  return grossIncomePerMonth;

}
export default function handler(req, res) {
  const data = req.body.formData;
  const annualSalary = data.annualSalary;
  const evaluationRate = data.evaluationRate;
  const startDate = data.paymentStartDate.split('-')[0];
  const endDate = data.paymentStartDate.split('-')[1];
  const { workingDays } = getWorkingDaysDetails(data.paymentStartDate);
  const grossIncomePerMonth = calculateGrossIncome(annualSalary);




  res.status(200).json({
    data, annualSalary: annualSalary, evaluationRate: evaluationRate, workingDays: workingDays, startDate: startDate,
    endDate: endDate, grossIncomePerMonth: grossIncomePerMonth
  })

}
