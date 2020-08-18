import { data } from "./data.js"

const content = document.getElementById("content");
const landMenu = document.getElementById("landmenu");
const search = document.getElementById("search")
const options = []
const values = []

// Push country names and country shorthand names to arrays
for (let i = 0; i < data.length; i++) {
  if (!options.includes(data[i].countryLong)) options.push(data[i].countryLong)

  if (!values.includes(data[i].country)) values.push(data[i].country)

  options.sort();
  values.sort();
}

// Add options and values to select menu from options/values arrays
landMenu.innerHTML = `
  <option value="all">Alla</option>
  ${options.map((country, index) => `
  <option value="${values[index]}">${country}</option>
  `)}
`

// Add the HTML / the list items
function listContent(arr) {

  const regex = new RegExp(search.value, 'gi');

  const str = search.value;

  if (arr.length === 0) return content.innerHTML = `
  <div class="race-item no-results">
    <div class="event no-results">
      Inga resultat för "${str}". <span class="clear-field">Rensa sökfältet</span>
    </div>
  </div>
  `

  return content.innerHTML = `
  ${arr.map(race => `
  <div class="race-item">
  <div class="event">
    <div class="event-text">
      ${race.name.replace(regex, str => `<span class="highlight">${str}</span>`)}
    </div>
    <div class="date-mobile">
      <span class="date-mobile__d">${race.date}</span>
      <span class="flag-icon flag-icon-${race.country}"></span>
    </div>
  </div>
  <span class="location"
    >
    <div class="place-text">
    ${race.place.replace(regex, str => `<span class="highlight">${str}</span>`)}
    </div > <span class="flag-icon flag-icon-${race.country}"></span
></span >
  <span class="date">${race.date}</span>
  <span class="price">${race.price} ${race.currency}</span>
  <a
    class="action"
    href="${race.link}"
    target="_blank">till hemsida</a>
  </div >
  `).join("")
    } `
}

// Filters by country. With select menu
function updateListWithSelect() {

  // Clear search field
  search.value = ""

  const filterRaces = data.filter(race => {

    if (landMenu.value === "all") return race;

    if (race.country === landMenu.value) return race;
  })

  listContent(filterRaces);
}

// Listens for user input in search bar
function searchFilter() {

  // Clear select menu
  landMenu.value = "all"

  const filterRaces = data.filter(race => {
    const regex = new RegExp(search.value, 'gi')

    if (race.name.match(regex) || race.place.match(regex)) {
      return race;
    }
  })

  listContent(filterRaces);
}

// If no matches are found the user can click to clear search field
function clearSearchField(e) {
  if (e.target.className = "clear-field") {
    search.value = "";
    listContent(data);
  }
}

// Initialize the page with list items
listContent(data);

// Event listeners
landMenu.addEventListener("input", updateListWithSelect)

// Updates racelist with every keypress
search.addEventListener("input", searchFilter)

// Clears search field
content.addEventListener("click", clearSearchField)
