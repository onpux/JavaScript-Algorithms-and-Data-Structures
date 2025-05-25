// js/validator.js

// Credit Card Validator (Luhn Algorithm)
document.getElementById('validate-card').addEventListener('click', () => {
  const cardNumber = document.getElementById('card-number').value.replace(/\D/g, '');
  const isValid = luhnCheck(cardNumber);
  document.getElementById('card-result').textContent = isValid ? 'Valid card number' : 'Invalid card number';
});

function luhnCheck(number) {
  let sum = 0;
  let alt = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let n = parseInt(number.charAt(i));
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

// Password Generator
document.getElementById('generate-password').addEventListener('click', () => {
  const length = parseInt(document.getElementById('password-length').value);
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * charset.length);
    password += charset[rand];
  }
  document.getElementById('password-output').textContent = password;
});
