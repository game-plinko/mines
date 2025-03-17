function factorial(n: number): number {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}



function pWinning(
    bombs: number,
    spacesUncovered: number
): number {
    // Numerator: (25 - bombs)! * (25 - spacesUncovered)!
    const numerator =
        factorial(25 - bombs) * factorial(25 - spacesUncovered);

    // Denominator: 25! * (25 - (bombs + spacesUncovered))!
    const denominator =
        factorial(25) * factorial(25 - (bombs + spacesUncovered));
    return numerator / denominator;
}

export function getMultiplier(
    bombs: number,
    spacesUncovered: number
): number {
    const pWin = pWinning(bombs, spacesUncovered);

    // multiplier = 0.97 * (1 / pWin), rounded to 0.01 precision
    return Math.round(((1 / pWin) - 0.01) * 100) / 100;
}

