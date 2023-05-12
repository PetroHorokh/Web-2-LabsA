//Стрічкова функція
const days_of_month_and_year = (year, month) => {
    //використання класу Date для виводу число останнього дня певного місяця та певного року
    return new Date(year, month, 0).getDate();
}

//експорт функції
exports.days_of_month_and_year = days_of_month_and_year