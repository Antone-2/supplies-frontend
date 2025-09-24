// src/handlers/factor.js

function getFactors(n) {
    if (typeof n !== 'number' || n < 1) return [];
    const factors = [];
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) factors.push(i);
    }
    return factors;
}

module.exports = { getFactors };