exports.processLoanReq = (data) => {
  let totalAmountTobePaid = 0;
  let emiAmount = 0;
  if (data.length < 6) {
    console.log("Seems entered data is incorrect, please recheck the data.");
  }

  totalAmountTobePaid =
    Number(data[3]) +
    Number(data[3]) * Number(data[4]) * Number(data[5]) * 0.01;
  let emiCount = Math.ceil(Number(data[4]) * 12);
  emiAmount = Math.ceil(totalAmountTobePaid / emiCount);

  return {
    [`${data[2]}-${data[1]}`]: {
      customerName: data[2],
      bankName: data[1],
      originalLoanAmount: totalAmountTobePaid,
      amountPaid: 0,
      amountLeftToBePaid: 0,
      lumpSumAmount: {},
      emiCount,
      noOfEMIPayed: 0,
      emiAmount,
      isLumpSumPaid: false,
    },
  };
};
