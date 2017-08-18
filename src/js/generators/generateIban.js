
export function generateIban() {
    return generateFinnishIBAN();
}

const
    REF_NUMBER_MULTIPLIERS = [7, 3, 1],
    FINNISH_REF_NUMBER_REGEX = /^(\d{4,20}|RF\d{6,22})$/i,
    FINNISH_IBAN_REGEX = /^FI\d{16}$/,
    FINNISH_VIRTUAL_BAR_CODE_REGEX = /^[45]\d{53}$/,
    FINNISH_DATE_REGEX = /^(\d\d?)\.(\d\d?)\.(\d{4})$/,
    IBAN_OFFSET_FROM_ASCIICODE = -55

function lettersToNumbers(str) {
    return [...str].map(char => {
        if (/\D/.test(char)) {
            return String(char.charCodeAt(0) + IBAN_OFFSET_FROM_ASCIICODE)
        }
        return char
    }).join('')
}

function randomNumberWithLength(length) {
    let randomNumber = ''
    for (let i = 0; i < length; i++) {
        randomNumber += Math.floor(Math.random() * 9) + 1 // 1...9, because a real number can't begin with zero
    }
    return parseInt(randomNumber, 10)
}

function luhnMod10(value) {
    let sum = 0
    for (let i = 0; i < value.length; i++) {
        const multiplier = (i % 2 === 0) ? 2 : 1
        let add = multiplier * parseInt(value[i], 10)
        if (add >= 10) {
            add -= 9
        }
        sum += add
    }
    const mod10 = sum % 10
    return mod10 === 0 ? mod10 : 10 - mod10
}

function modForLargeNumber(base, divisor) {
    let dividend = ''
    for (let i = 0; i < base.length; i++) {
        dividend = parseInt(dividend + base[i], 10)
        if (dividend >= divisor) {
            const remainder = dividend % divisor
            if (i == base.length - 1) {
                return remainder
            } else {
                dividend = remainder
            }
        }
    }
    return parseInt(dividend, 10)
}

function generateFinnishIBAN() {
    const
        defaultCheckDigit = '00',
        danskeBankOffice = '800026',  //  Use a real bank and office for simplicity
        countryCodeInDigits = lettersToNumbers('FI'),
        bankAccount = randomNumberWithLength(7),
        localAccountNumber = danskeBankOffice + bankAccount + luhnMod10(danskeBankOffice + bankAccount),

        accountNumberCandidate = localAccountNumber + countryCodeInDigits + defaultCheckDigit,

        checkDigit = 98 - modForLargeNumber(accountNumberCandidate, 97),
        checkChars = checkDigit >= 10 ? checkDigit.toString() : '0' + checkDigit

    return 'FI' + checkChars + localAccountNumber
}