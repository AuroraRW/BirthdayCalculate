export function daysLeft(userData){
    let dateNow = new Date();

    let monthOfBirth = userData.DateOfBirth.split('-')[1];
    let dayOfBirth = userData.DateOfBirth.split('-')[2];
    let dateOfBirth = monthOfBirth + '-' + dayOfBirth;
    let days = 0;

    let dateNowFormat = dateNow.getFullYear().toString() + '-' + (dateNow.getMonth() + 1).toString().padStart(2, '0') + '-' + dateNow.getDate().toString().padStart(2,'0');
        
    // get the nearest leap year
    let yearNow = dateNow.getFullYear();
    let yearForNearestLeap = yearNow + (4 - (yearNow - 2000) % 4);
    let dateForLeap = yearForNearestLeap.toString() + '-' + '02-29';

    // for someone born in Feb 29
    if (dateOfBirth === '02-29'){
        days = (Date.parse(dateForLeap) - Date.parse(dateNowFormat)) / (24 * 3600 * 1000);
    }
    else{
        dateOfBirth = dateNow.getFullYear().toString() + '-' + dateOfBirth;
        days = (((Date.parse(dateOfBirth) - Date.parse(dateNowFormat))/ (24 * 3600 * 1000)) + 365) % 365;
        
        // check if there is Feb 29 from now to next birthday
        let nextBirthday= new Date(dateNow.setDate(dateNow.getDate() + days));
        let nextBirthdayFormat = nextBirthday.getFullYear().toString() + '-' + (nextBirthday.getMonth() + 1).toString() + '-' + nextBirthday.getDate().toString();
        if (nextBirthdayFormat > dateForLeap){
        days +=1
        }
    }
    let name = userData.Name
    return {name, days};
}