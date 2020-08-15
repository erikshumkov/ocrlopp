import { data } from "./data.js"

const content = document.getElementById("content");
const landMenu = document.getElementById("landmenu");
const options = []
const values = []

for (let i = 0; i < data.length; i++) {
  if (!options.includes(data[i].countryLong)) options.push(data[i].countryLong)

  if (!values.includes(data[i].country)) values.push(data[i].country)
}

landMenu.innerHTML = `
  <option value="all">Alla</option>
  ${options.map((country, index) => `
  <option value="${values[index]}">${country}</option>
  `)}
`

function listContent(arr) {
  return content.innerHTML = `
  ${arr.map(race => `
  <div class="race-item">
  <div class="event">
    ${race.name}
    <div class="date-mobile">
      <span class="date-mobile__d">${race.date}</span>
      <span class="flag-icon flag-icon-${race.country}"></span>
    </div>
  </div>
  <span class="location"
    >${race.place} <span class="flag-icon flag-icon-${race.country}"></span
  ></span>
  <span class="date">${race.date}</span>
  <span class="price">${race.price} ${race.currency}</span>
  <a
    class="action"
    href="${race.link}"
    target="_blank">till hemsida</a>
  </div>
  `).join("")}`
}

function updateList() {
  const filterDataArr = data.filter(race => {

    if (landMenu.value === "all") return race;

    if (race.country === landMenu.value) return race;
  })

  listContent(filterDataArr);
}

// Initialize the page with list items
listContent(data);

// Event listeners
landMenu.addEventListener("input", updateList)