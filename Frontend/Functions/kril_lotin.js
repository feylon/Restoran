function lotinToKrill(text) {
    const map = {
        "a": "а", "b": "б", "d": "д", "e": "е", "f": "ф", "g": "г", "h": "ҳ",
        "i": "и", "j": "ж", "k": "к", "l": "л", "m": "м", "n": "н", "o": "о",
        "p": "п", "q": "қ", "r": "р", "s": "с", "t": "т", "u": "у", "v": "в",
        "x": "х", "y": "й", "z": "з", "sh": "ш", "ch": "ч", "o‘": "ў", "g‘": "ғ",
        "ya": "я", "yo": "ё", "yu": "ю", "’": "ъ", "'": "ъ",
        "A": "А", "B": "Б", "D": "Д", "E": "Е", "F": "Ф", "G": "Г", "H": "Ҳ",
        "I": "И", "J": "Ж", "K": "К", "L": "Л", "M": "М", "N": "Н", "O": "О",
        "P": "П", "Q": "Қ", "R": "Р", "S": "С", "T": "Т", "U": "У", "V": "В",
        "X": "Х", "Y": "Й", "Z": "З", "Sh": "Ш", "Ch": "Ч", "O‘": "Ў", "G‘": "Ғ",
        "Ya": "Я", "Yo": "Ё", "Yu": "Ю"
    };

    // Maxsus harflarni birinchi almashtirish
    text = text.replace(/Sh/g, "Ш")
               .replace(/Ch/g, "Ч")
               .replace(/O‘/g, "Ў")
               .replace(/G‘/g, "Ғ")
               .replace(/Ya/g, "Я")
               .replace(/Yo/g, "Ё")
               .replace(/Yu/g, "Ю")
               .replace(/sh/g, "ш")
               .replace(/ch/g, "ч")
               .replace(/o‘/g, "ў")
               .replace(/g‘/g, "ғ")
               .replace(/ya/g, "я")
               .replace(/yo/g, "ё")
               .replace(/yu/g, "ю");

    // Qolgan harflarni almashtirish
    return text.split('').map(char => map[char] || char).join('');
}
export {lotinToKrill}