export function splitByShingle(str, shingleSize) {
    let tokens = [];
    for (let i = 0; i <= str.length-shingleSize; ++i) {
        tokens.push(str.substr(i, shingleSize));
    }
    return tokens;
}

export function splitByWord(str) {
    return str.split(/\s+/);
}

export function dice(leftTokens, rightTokens) {
    const intersection = leftTokens.reduce((accumulator, current) => {
        console.log(accumulator)
        return rightTokens.includes(current) ? accumulator.concat(current) : accumulator;
    }, []);

    //         return 2d * intersection / (left.size() + right.size());
    let score = (2 * intersection.length) / (leftTokens.length + rightTokens.length);

    return {
        intersection,
        score
    };
}