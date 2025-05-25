// js/converter.js
const typeSelector = document.getElementById('converter-type');
const inputUnit = document.getElementById('input-unit');
const outputUnit = document.getElementById('output-unit');
const inputValue = document.getElementById('input-value');
const resultText = document.getElementById('conversion-result');
const convertBtn = document.getElementById('convert-button');

const units = {
  temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
  currency: ['USD', 'EUR', 'COP'],
  time: ['Seconds', 'Minutes', 'Hours']
};

const updateUnits = () => {
  const type = typeSelector.value;
  [inputUnit, outputUnit].forEach(select => {
    select.innerHTML = '';
    units[type].forEach(unit => {
      const opt = document.createElement('option');
      opt.value = unit;
      opt.textContent = unit;
      select.appendChild(opt);
    });
  });
};

const convert = () => {
  const type = typeSelector.value;
  const value = parseFloat(inputValue.value);
  const from = inputUnit.value;
  const to = outputUnit.value;

  if (isNaN(value)) {
    resultText.textContent = 'Invalid input';
    return;
  }

  let result;
  if (type === 'temperature') {
    if (from === 'Celsius' && to === 'Fahrenheit') result = value * 9/5 + 32;
    else if (from === 'Fahrenheit' && to === 'Celsius') result = (value - 32) * 5/9;
    else if (from === 'Celsius' && to === 'Kelvin') result = value + 273.15;
    else if (from === 'Kelvin' && to === 'Celsius') result = value - 273.15;
    else if (from === 'Fahrenheit' && to === 'Kelvin') result = (value - 32) * 5/9 + 273.15;
    else if (from === 'Kelvin' && to === 'Fahrenheit') result = (value - 273.15) * 9/5 + 32;
    else result = value;
  } else if (type === 'time') {
    const multipliers = {
      Seconds: 1,
      Minutes: 60,
      Hours: 3600
    };
    result = value * multipliers[from] / multipliers[to];
  } else if (type === 'currency') {
    const rates = {
      USD: 1,
      EUR: 0.9,
      COP: 4000
    };
    result = value * rates[to] / rates[from];
  }

  resultText.textContent = `Result: ${result.toFixed(2)} ${to}`;
};

typeSelector.addEventListener('change', updateUnits);
convertBtn.addEventListener('click', convert);

window.addEventListener('DOMContentLoaded', updateUnits);
