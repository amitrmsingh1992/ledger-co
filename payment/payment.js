exports.processPaymentReq = (data, userInfo) => {
  let lumpSumAmount = data[3];
  let currentEmiCount = data[4];

  const userData = userInfo[`${data[2]}-${data[1]}`];

  if (!userData) {
    console.log(`Entered Customer doesn't exist in our database`);
    return {};
  }

  let updatedData = userData;
  updatedData.isLumpSumPaid = true;

  updatedData.noOfEMIPayed = currentEmiCount;
  if (data[3]) {
    updatedData.lumpSumAmount = {
      [data[4]]: lumpSumAmount,
    };
  }

  return { ...updatedData };
};
