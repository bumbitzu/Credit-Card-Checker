// All valid credit card numbers
const valid1 = [ 4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8 ];
const valid2 = [ 5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9 ];
const valid3 = [ 3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6 ];
const valid4 = [ 6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5 ];
const valid5 = [ 4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6 ];

// All invalid credit card numbers
const invalid1 = [ 4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5 ];
const invalid2 = [ 5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3 ];
const invalid3 = [ 3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4 ];
const invalid4 = [ 6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5 ];
const invalid5 = [ 5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4 ];

// Can be either valid or invalid
const mystery1 = [ 3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4 ];
const mystery2 = [ 5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9 ];
const mystery3 = [ 6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3 ];
const mystery4 = [ 4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3 ];
const mystery5 = [ 4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3 ];

// An array of all the arrays above
const batch = [ valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5 ];


// Add your functions below:

// Function to validate a credit card number using the Luhn algorithm
const validateCred = (arr) =>
{
  // Create a copy of the array and reverse it for the Luhn algorithm
  let computedArr = arr.slice();
  computedArr.reverse();

  // Extract the first digit (check digit) from the reversed array
  let dropedDigit = computedArr[ 0 ];

  // Remove the first digit from the array
  computedArr.shift();

  // Initialize a sum variable for the algorithm
  let sum = 0;

  // Loop through the array to apply Luhn's algorithm
  for (let i = 0; i < computedArr.length; i++)
  {
    // Double every second digit, starting from the right
    if (i % 2 == 0)
    {
      computedArr[ i ] *= 2;

      // Subtract 9 from any result higher than 9
      if (computedArr[ i ] > 9)
      {
        computedArr[ i ] -= 9
      }
    }

    // Add the digit to the sum
    sum += computedArr[ i ];
  }

  // Add the check digit back to the sum
  sum += dropedDigit;

  // Check if the sum modulo 10 is zero, meaning the card number is valid
  return sum % 10 === 0;
}

// Function to find invalid credit cards from an array of card numbers
const findInvalidCards = (arr) =>
{
  // Copy the original array to avoid modifying it
  let copyArr = arr.slice();

  // Initialize an array to hold card objects
  let cards = [];

  // Iterate over each card number, validating it and storing the result
  copyArr.forEach(item =>
  {
    cards.push({ cardNo: item, isValid: validateCred(item) });
  });

  // Initialize an array to hold invalid card numbers
  let invalid = [];

  // Populate the invalid array with card numbers that failed validation
  cards.forEach(item =>
  {
    if (item.isValid === false)
    {
      invalid.push(item.cardNo);
    }
  })

  // Return the list of invalid card numbers
  return invalid;
}

// Example usage: Find invalid cards from a batch of card numbers
const invalidCards = findInvalidCards(batch);

// Function to identify the companies of invalid card numbers
const idInvalidCardCompanies = (arr) =>
{
  // Initialize an array to store companies
  let companies = [];

  // Iterate over each card number
  arr.forEach(item =>
  {
    // Identify the company based on the first digit of the card number
    switch (item[ 0 ])
    {
      case 3:
        // Add 'Amex' if not already in the array
        if (!companies.includes('Amex'))
        {
          companies.push('Amex');
        }
        break;
      case 4:
        // Add 'Visa' if not already in the array
        if (!companies.includes('Visa'))
        {
          companies.push('Visa');
        }
        break;
      case 5:
        // Add 'Mastercard' if not already in the array
        if (!companies.includes('Mastercard'))
        {
          companies.push('Mastercard');
        }
        break;
      case 6:
        // Add 'Discover' if not already in the array
        if (!companies.includes('Discover'))
        {
          companies.push('Discover');
        }
        break;
      default:
        // Add 'Company not found!' for unrecognized first digits
        if (!companies.includes('Company not found!'))
        {
          companies.push('Company not found!');
        }
    }
  })

  // Return the list of companies
  return companies;
}

// Example usage: Identify companies with issues from invalid card numbers
const companiesWithIsuses = idInvalidCardCompanies(invalidCards);

// Output the companies with issues to the console
console.log(companiesWithIsuses);
