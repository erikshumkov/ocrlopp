import { data } from "./data.js"

const content = document.getElementById("content");
const landMenu = document.getElementById("landmenu");
const search = document.getElementById("search")
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

  const regex = new RegExp(search.value, 'gi');

  if (arr.length === 0) return content.innerHTML = `
  <div class="race-item no-results">
    <div class="event no-results">
      Inga resultat för "${search.value}". <span class="clear-field">Rensa sökfältet</span>
    </div>
  </div>
  `

  return content.innerHTML = `
  ${arr.map(race => `
  <div class="race-item">
  <div class="event">
    ${race.name.replace(regex, `<span class="hl">${search.value}</span>`)}
    <div class="date-mobile">
      <span class="date-mobile__d">${race.date}</span>
      <span class="flag-icon flag-icon-${race.country}"></span>
    </div>
  </div>
  <span class="location"
    >${race.place.replace(regex, `<span class="hl">${search.value}</span>`)} <span class="flag-icon flag-icon-${race.country}"></span
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

function searchFilter() {
  const filterRaces = data.filter(race => {
    if (
      race.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
      ||
      race.place.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
    ) {
      return race;
    }
  })

  listContent(filterRaces);
}

function clearSearchField(e) {
  if (e.target.className = "clear-field") {
    search.value = "";
    listContent(data);
  }
}

// Initialize the page with list items
listContent(data);

// Event listeners
landMenu.addEventListener("input", updateList)

// Updates racelist with every keypress
search.addEventListener("input", searchFilter)

// Clears search field
content.addEventListener("click", clearSearchField)