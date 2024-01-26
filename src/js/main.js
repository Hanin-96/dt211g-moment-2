"use strict"

let data = [];

async function loadSchedule() {
    try {
        const response = await fetch("https://dahlgren.miun.se/ramschema_ht23.php");
        data = await response.json();
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

//Skapar eventlistener för klick på kurskod
document.getElementById("course-code").addEventListener("click", sortCourse);

let sortedDown = true;
function sortCourse() {
    document.getElementById("getSchedule").innerHTML = "";

    let schedules = [];
    if (sortedDown === true) {
        schedules = data.sort((itemA, itemB) => (itemA.code > itemB.code) ? 1 : -1);
        sortedDown = false;
    } else {
        schedules = data.sort((itemA, itemB) => (itemA.code < itemB.code) ? 1 : -1);
        sortedDown = true;
    }
    schedules.forEach(schedule => {
        document.getElementById("getSchedule").innerHTML += `<tr><td>${schedule.code}</td><td>${schedule.coursename}</td><td>${schedule.progression}</td></tr>`;
    });
}




