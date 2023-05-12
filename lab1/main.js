// Пі'єднання фукнцій через об'єкти
//Функція завдання 1
const SplitStringIntoArray = require("./Task1-6/split_string_into_array")
//Функція завдання 2
const SortWordInAlphabeticalOrder = require("./Task1-6/sort_word_in_alphabetical_order")
//Функція завдання 3
const BiggestMutualDivider = require("./Task1-6/biggest_mutual_divider")
//Функція завдання 4
const ShuffleArray = require("./Task1-6/shuffle_array")
//Функція завдання 5
const days_of_month_and_year = require("./Task1-6/days_of_month_and_year")
//Функція завдання 6
const sort_array_of_users_by_field = require("./Task1-6/sort_array_of_users_by_field")

// Виклик функцій через методи об'єктів, які були під'єднанні через request, з тестовими даними

//завдання 1
console.log('Task 1')
//Тестові дані '3231241 3121 32131'
console.log(SplitStringIntoArray.SplitStringIntoArray('3231241 3121 32131'))

//завдання 2
console.log('Task 2')
//Тестові дані 'WordToSort'
console.log(SortWordInAlphabeticalOrder.SortWordInAlphabeticalOrder('WordToSort'))

//завдання 3
console.log('Task 3')
//Тестові дані 3,6
console.log(BiggestMutualDivider.BiggestMutualDivider(3,6))

//завдання 4
console.log('Task 4')
//Тестові дані [123,321313,101,22231]
console.log(ShuffleArray.ShuffleArray([123,321313,101,22231]))

//завдання 5
console.log('Task 5')
console.log(days_of_month_and_year.days_of_month_and_year(1999,10))

//завдання 6
console.log('Task 6')
//Тестові дані
// [
//     {name:'Norman', surname: 'Peterson'},
//     {name:'Adam', surname: 'Henpeck'},
//     {name:'Anna', surname: 'Peterson'},
// ]
console.log(sort_array_of_users_by_field.sort_array_of_users_by_field([
    {name:'Norman', surname: 'Peterson'},
    {name:'Adam', surname: 'Henpeck'},
    {name:'Anna', surname: 'Peterson'},
]))

