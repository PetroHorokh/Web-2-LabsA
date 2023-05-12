//Стрічкова функція
const Sort_word_in_alphabetical_order = (string) => {
  //розрив стрічки на масив символів, сортування масиву, з'єднання масиву в одну стрічку з розділювачем пустим символом
  return string.split('').sort().join('')
}

//експорт функції
exports.SortWordInAlphabeticalOrder = Sort_word_in_alphabetical_order