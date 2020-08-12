import { data } from "./data.js"

const content = document.getElementById("content");

content.innerHTML = `
  ${data.map(race => `
  <div class="race-item">
  <div class="event">
    ${race.name}
    <div class="date-mobile">
      <span class="date-mobile__d">13 Aug, 2020</span>
      <span class="flag-icon flag-icon-se"></span>
    </div>
  </div>
  <span class="location"
    >${race.place} <span class="flag-icon flag-icon-${race.country}"></span
  ></span>
  <span class="date">${race.date}</span>
  <span class="price">${race.price} SEK</span>
  <a
    class="action"
    href="${race.link}"
    target="_blank">till hemsida</a>
  </div>
  `).join("")}
`