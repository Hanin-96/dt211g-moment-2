"use strict"

// Data variablen sparar all data som hämtats via fetch-anrop  
let data = [];

// Funktion för att hämta och skriva ut data i tabell
async function loadSchedule() {
    try {
        const response = await fetch("https://dahlgren.miun.se/ramschema_ht23.php");
        data = await response.json();

        //Sorterar kurser på kurskod
        const schedules = data;
        schedules.forEach(schedule => {
            document.getElementById("getSchedule").innerHTML += `<tr><td>${schedule.code}</td><td>${schedule.coursename}</td><td>${schedule.progression}</td></tr>`;
        });

    } catch {
         //Ifall ingen utskrift av data kan ske i tabellen ska följande skrivas ut
        document.getElementById("getSchedule").innerHTML = "Det går inte läsa av listan"
    }
}

loadSchedule();

//Skapar eventlistener för klick på kurskod
document.getElementById("course-code").addEventListener("click", () => {
    sort("code");
});

document.getElementById("course-name").addEventListener("click", () => {
    sort("coursename");
});

document.getElementById("course-progression").addEventListener("click", () => {
    sort("progression");
});

function sort(sortBy) {
    //rensar innehåll i tabell för att skriva ut ny ordning
    document.getElementById("getSchedule").innerHTML = "";

    let schedules = [];
    
        schedules = data.sort((itemA, itemB) => (itemA[sortBy] > itemB[sortBy]) ? 1 : -1);


    schedules.forEach(schedule => {
        document.getElementById("getSchedule").innerHTML += `<tr><td>${schedule.code}</td><td>${schedule.coursename}</td><td>${schedule.progression}</td></tr>`;
    });
}

//Filtrera innehåll beroende på input i sökfält

//Eventlistener på sökfältet
document.getElementById("search").addEventListener("keyup", () => {
  searchInput();
});

function searchInput() {
  //Deklarera variabler
  let searchText = document.getElementById("search");
  let input = searchText.value.toUpperCase();

  document.getElementById("getSchedule").innerHTML = "";

  let schedules = data.filter((schedule) => schedule.code.toUpperCase().includes(input) || schedule.coursename.toUpperCase().includes(input));
  console.log(schedules);

  schedules.forEach(schedule => {
    document.getElementById("getSchedule").innerHTML += `<tr><td>${schedule.code}</td><td>${schedule.coursename}</td><td>${schedule.progression}</td></tr>`;
});

}


