// below my own

// function check(userAnswers) {
//   let summary = {
//     summaries: [],
//     totalCorrect: 0,
//     examplesCount: 0,
//   };
//   const results = [];
//   const totalCorrect = userAnswers.reduce((acc, summary) => {
//     const { num1, num2, userAnswer, operation } = summary;
//     if (operation == "addition") {
//       if (num1 + num2 == userAnswer) {
//         const eachSummary = {
//           num1,
//           num2,
//           userAnswer,
//           answer: num1 + num2,
//           isCorrect: true,
//           operation: "addition",
//         };
//         acc++;
//         results.push(eachSummary);
//       } else {
//         const eachSummary = {
//           num1,
//           num2,
//           userAnswer,
//           answer: num1 + num2,
//           isCorrect: false,
//           operation: "addition",
//         };
//         results.push(eachSummary);
//       }
//     } else if (operation == "subtraction") {
//       if (num1 - num2 == userAnswer) {
//         const eachSummary = {
//           num1,
//           num2,
//           userAnswer,
//           answer: num1 - num2,
//           isCorrect: true,
//           operation: "subtraction",
//         };
//         acc++;
//         results.push(eachSummary);
//       } else {
//         const eachSummary = {
//           num1,
//           num2,
//           userAnswer,
//           answer: num1 - num2,
//           isCorrect: false,
//           operation: "subtraction",
//         };
//         results.push(eachSummary);
//       }
//     } else if (operation == "multiplication") {
//       if (num1 * num2 == userAnswer) {
//         const eachSummary = {
//           num1,
//           num2,
//           userAnswer,
//           answer: num1 * num2,
//           isCorrect: true,
//           operation: "multiplication",
//         };
//         acc++;
//         results.push(eachSummary);
//       } else {
//         const eachSummary = {
//           num1,
//           num2,
//           userAnswer,
//           answer: num1 * num2,
//           isCorrect: false,
//           operation: "multiplication",
//         };
//         results.push(eachSummary);
//       }
//     } else if (operation == "division") {
//       if (num1 / num2 == userAnswer) {
//         const eachSummary = {
//           num1,
//           num2,
//           userAnswer,
//           answer: num1 / num2,
//           isCorrect: true,
//           operation: "division",
//         };
//         acc++;
//         results.push(eachSummary);
//       } else {
//         const eachSummary = {
//           num1,
//           num2,
//           userAnswer,
//           answer: num1 / num2,
//           isCorrect: false,
//           operation: "division",
//         };
//         results.push(eachSummary);
//       }
//     }
//     return acc;
//   }, 0);

//   summary.summaries = results;
//   summary.totalCorrect = totalCorrect;
//   summary.examplesCount = results.length;

//   return summary;
// }

// console.log(
//   check([
//     { num1: 22, num2: 20, userAnswer: 40, operation: "addition" },
//     { num1: 44, num2: 6, userAnswer: 50, operation: "addition" },
//     { num1: 27, num2: 20, userAnswer: 40, operation: "addition" },
//     { num1: 84, num2: 20, userAnswer: 100, operation: "addition" },
//     { num1: 11, num2: 24, userAnswer: 35, operation: "addition" },
//     { num1: 95, num2: 22, userAnswer: 40, operation: "addition" },
//     { num1: 22, num2: 20, userAnswer: 40, operation: "addition" },
//     { num1: 22, num2: 20, userAnswer: 40, operation: "addition" },
//     { num1: 22, num2: 20, userAnswer: 40, operation: "addition" },
//     { num1: 22, num2: 20, userAnswer: 40, operation: "addition" },
//   ]),
//   "- check function"
// );

// below chatgpt improved

async function check(req, res) {
  try {
    const result = await inspect(req.body.userAnswers);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).send({ msg: err?.message });
  }
}

async function inspect(userAnswers) {
  let summary = {
    summaries: [],
    examplesCount: userAnswers.length,
    totalCorrect: 0,
    percentCorrect: 0,
  };

  function evaluateOperation(num1, num2, userAnswer, operation) {
    const answer = {
      num1,
      num2,
      userAnswer,
      operation,
      isCorrect: false,
      answer: null,
    };

    switch (operation) {
      case "addition":
        answer.answer = num1 + num2;
        break;
      case "subtraction":
        answer.answer = num1 - num2;
        break;
      case "multiplication":
        answer.answer = num1 * num2;
        break;
      case "division":
        answer.answer = num1 / num2;
        break;
      default:
        break;
    }

    answer.isCorrect = answer.answer === userAnswer;
    return answer;
  }

  summary.summaries = userAnswers.map(({ num1, num2, userAnswer, operation }) =>
    evaluateOperation(num1, num2, userAnswer, operation)
  );

  summary.totalCorrect = summary.summaries.reduce((acc, curr) => {
    if (curr.isCorrect) {
      acc++;
    }
    return acc;
  }, 0);

  summary.percentCorrect =
    ((summary.totalCorrect / summary.examplesCount) * 100).toFixed(2) + "%";

  return summary;
}

// const result = check([
//   { num1: 22, num2: 20, userAnswer: 42, operation: "addition" },
//   { num1: 44, num2: 6, userAnswer: 50, operation: "addition" },
//   { num1: 27, num2: 20, userAnswer: 40, operation: "addition" },
//   { num1: 84, num2: 20, userAnswer: 100, operation: "addition" },
//   { num1: 11, num2: 24, userAnswer: 35, operation: "addition" },
//   { num1: 95, num2: 22, userAnswer: 40, operation: "addition" },
//   { num1: 22, num2: 20, userAnswer: 40, operation: "addition" },
//   { num1: 22, num2: 20, userAnswer: 40, operation: "addition" },
//   { num1: 22, num2: 20, userAnswer: 40, operation: "addition" },
//   { num1: 22, num2: 20, userAnswer: 40, operation: "addition" },
// ]);

// console.log(result);

module.exports = {
  check,
};
