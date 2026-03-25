export const downloadMonthlyPDF = (year, month) => {
  window.open(
    `http://localhost:5000/report/monthly-pdf?year=${year}&month=${month}`,
    '_blank'
  );
};

export const downloadYearlyPDF = (year) => {
  window.open(
    `http://localhost:5000/report/yearly-pdf?year=${year}`,
    '_blank'
  );
};
