//Стрічкова функція
const Split_string_into_array = (string) => {
    //розбиття стрічки за символами в дужнав, заданих як RegEx вираз
    return string.split(/[, .-]/)
}

//експорт функції
exports.SplitStringIntoArray = Split_string_into_array