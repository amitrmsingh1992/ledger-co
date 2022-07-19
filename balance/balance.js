exports.processBalanceReq = (data, userInfo) => {
  let userName = data[2];
  let bankName = data[1];
  let currentEmiCount = data[3];
  const userData = userInfo[`${userName}-${bankName}`];
  // in case we are asking for 0th emi data
  if (userData && data[3] == 0) {
    console.log(bankName, userName, data[3], userData.emiCount);
    return;
  }

  // in case we are asking for last emi
  if (userData && data[3] == userData.emiCount) {
    console.log(bankName, userName, userData.totalLoanAmount, 0);
    return;
  }

  // intermediate condition

  let lumpSumpEmiList =
    userData.isLumpSumPaid && Object.keys(userData.lumpSumAmount);
  if (
    lumpSumpEmiList &&
    Math.min(currentEmiCount, ...lumpSumpEmiList) == currentEmiCount
  ) {
    let lumpsumEntries = userData && Object.entries(userData.lumpSumAmount);
    let loanAmountValue = 0;
    lumpsumEntries.map((item) => {
      if (item[0] <= currentEmiCount) {
        loanAmountValue += Number(item[1]);
      }
      return item;
    });

    console.log(
      bankName,
      userName,
      Number(userData.emiAmount) * Number(currentEmiCount) + loanAmountValue,
      Number(userData.emiCount) - Number(currentEmiCount)
    );
  } else if (
    lumpSumpEmiList &&
    Math.max(currentEmiCount, ...lumpSumpEmiList) == currentEmiCount
  ) {
    let lumpSumAmount = Object.values(userData.lumpSumAmount)
      .map((item) => Number(item))
      .reduce((acc, curr) => (acc += curr), 0);
    console.log(
      bankName,
      userName,
      lumpSumAmount + Number(userData.emiAmount) * Number(currentEmiCount),
      Number(userData.emiCount) -
        Number(currentEmiCount) -
        Math.floor(lumpSumAmount / Number(userData.emiAmount))
    );
  } else {
    console.log(
      bankName,
      userName,
      Number(userData.emiAmount) * Number(currentEmiCount),
      Number(userData.emiCount) - Number(currentEmiCount)
    );
  }
};
