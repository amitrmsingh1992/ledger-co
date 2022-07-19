const fs = require("fs");
const loan = require("./loan/loan");
const balance = require("./balance/balance");
const payment = require("./payment/payment");
const { GlobalConstants } = require("./constants/global");

let userInfo = {};

const trxnInitiation = (data) => {
  switch (data[0]) {
    case GlobalConstants.LOAN: {
      const userData = loan.processLoanReq(data);

      userInfo = { ...userInfo, ...userData };

      break;
    }
    case GlobalConstants.BALANCE: {
      balance.processBalanceReq(data, userInfo);
      break;
    }
    case GlobalConstants.PAYMENT: {
      const updatedData = payment.processPaymentReq(data, userInfo);
      userInfo = { ...userInfo, [`${data[2]}-${data[1]}`]: { ...updatedData } };
      break;
    }
  }
};

const ledgerInitFunction = () => {
  try {
    const args = process.argv.slice(2);
    if (!args[0]) {
      throw new Error("please provide proper file name");
    }
    const fileData = fs.readFileSync(args[0]).toString().split("\n");
    fileData.map((item) => {
      const trxn = item.split(" ");
      trxnInitiation(trxn);
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
    } else {
      console.error(
        "Please check whether proper file path argument is passed or not, it should look like: nodejs <node-file> <test.file> "
      );
    }
  }
};

ledgerInitFunction();
