//Стрічкова функція
const Biggest_mutual_divider = (a, b) => {

    //знаходження мінімального з двох чисел
    const min = Math.min(a,b)
    //найбільший спільний дільник
    let biggest = 1

    //цикл для знаходження найбільшого спільного дільника
    for(let i = 2; i <= min; i++){
        if( a % i === 0 && b % i === 0) biggest = i;
    }

    return biggest;
}

//експорт функції
exports.BiggestMutualDivider = Biggest_mutual_divider