"use strict"

async function loadSchedule() {
    try {
        const response = await fetch("https://dahlgren.miun.se/ramschema_ht23.php");
        const data = await response.json();
        console.table(data);

        //Sorterar kurser på kurskod
        const schedules = data.sort((itemA, itemB) => (itemA.code < itemB.code) ? 1 : -1);
        schedules.forEach(schedule => {
            document.getElementById("getSchedule").innerHTML += `<tr><td>${schedule.code}</td><td>${schedule.coursename}</td><td>${schedule.progression}</td></tr>`;
        });

    } catch {
        document.getElementById("getSchedule").innerHTML = "Det går inte läsa av listan"
    }
}

loadSchedule();

function sortCourse() {
    //Sorterar kurser på kurskod
    const schedules = data.sort((itemA, itemB) => (itemA.code > itemB.code) ? 1 : -1);
    schedules.forEach(schedule => {
        document.getElementById("getSchedule").innerHTML += `<tr><td>${schedule.code}</td><td>${schedule.coursename}</td><td>${schedule.progression}</td></tr>`;
    });
}

sortCourse();