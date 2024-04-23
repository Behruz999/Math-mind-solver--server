async function generation(req, res) {
  const { limitNumber, countExample, operation } = req.body;
  try {
    const result = await rootExecution(
      limitNumber,
      countExample,
      operation
    );

    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).send({ msg: err?.message || err });
  }
}

async function rootExecution(limitNumber, countExample, operation) {
  switch (operation) {
    case "addition":
      return await addition(limitNumber, countExample);
    case "subtraction":
      return await subtraction(limitNumber, countExample);
    case "multiplication":
      return await multiplication(limitNumber, countExample);
    default:
      return await division(limitNumber, countExample);
  }
}

async function addition(limitNumber, countExample) {
  let result = [];
  for (let i = 0; i < countExample; i++) {
    const randomNumber1 = Math.floor(Math.random() * limitNumber) + 1;
    const randomNumber2 = Math.floor(Math.random() * limitNumber) + 1;
    const eachQuestion = {
      num1: randomNumber1,
      num2: randomNumber2,
      userAnswer: null,
      operation: "addition",
    };
    result.push(eachQuestion);
  }
  return result;
}

async function subtraction(limitNumber, countExample) {
  let result = [];
  for (let i = 0; i < countExample; i++) {
    const randomNumber1 = Math.floor(Math.random() * limitNumber) + 1;
    const randomNumber2 = Math.floor(Math.random() * randomNumber1) + 1;
    const eachQuestion = {
      num1: randomNumber1,
      num2: randomNumber2,
      userAnswer: null,
      operation: "subtraction",
    };
    result.push(eachQuestion); // Fixed: Push eachQuestion object
  }

  return result;
}

async function multiplication(limitNumber, countExample) {
  let result = [];
  for (let i = 0; i < countExample; i++) {
    const randomNumber1 = Math.floor(Math.random() * limitNumber) + 1;
    const randomNumber2 = Math.floor(Math.random() * limitNumber) + 1;
    const eachQuestion = {
      num1: randomNumber1,
      num2: randomNumber2,
      userAnswer: null,
      operation: "multiplication",
    };
    result.push(eachQuestion);
  }

  return result;
}

async function division(limitNumber, countExample) {
  let result = [];
  let generated = 0;

  // carrying on generating till we reach limitation - "countExample"
  while (generated < countExample) {
    // Generate random numbers
    const randomNumber1 = Math.floor(Math.random() * limitNumber) + 1;
    // and below randomNumber2 will be generated based on randomNumber1,
    // cause num2 should be less than num1
    const randomNumber2 = Math.floor(Math.random() * randomNumber1) + 1;

    // Check if division result is a whole number
    const validDivision = randomNumber1 / randomNumber2;
    if (Number.isInteger(validDivision)) {
      const eachQuestion = {
        num1: randomNumber1,
        num2: randomNumber2,
        userAnswer: null,
        operation: "division",
      };
      result.push(eachQuestion);
      generated++;
    }
  }

  return result;
}

module.exports = {
  generation,
};
