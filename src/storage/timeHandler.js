function timeToSeconds(time) {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 3600 + parseInt(minutes) * 60;
}

// Função para comparar dois horários de texto (formato "HH:MM")
function compareTimes(time1, time2) {
    const seconds1 = timeToSeconds(time1);
    const seconds2 = timeToSeconds(time2);
    if (seconds1 < seconds2) {
        return -1; // time1 é menor que time2
    } else if (seconds1 > seconds2) {
        return 1; // time1 é maior que time2
    } else {
        return 0; // time1 é igual a time2
    }
}