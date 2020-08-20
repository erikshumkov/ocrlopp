import { data } from "./data.js"

const UICtrl = (function () {
  const UISelectors = {
    content: "#content",
    landMenu: "#landmenu",
    search: "#search"
  }
  const options = []
  const values = []

  // Push country names and country shorthand names to arrays
  data.forEach(data => {
    if (!options.includes(data.countryLong)) options.push(data.countryLong)

    if (!values.includes(data.country)) values.push(data.country)

    options.sort();
    values.sort();
  })

  // Public Methods
  return {
    populateCountryFilter: function () {
      // Add options and values to select menu from options/values arrays
      const html = `
      <option value="all">Alla</option>
      ${options.map((country, index) => `
      <option value="${values[index]}">${country}</option>
      `)}
      `

      document.querySelector(UISelectors.landMenu).innerHTML = html;
    },
    // Add the HTML / the list items
    populateListItems: function (arr) {

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
    },
    // Listens for user input in search bar
    searchFilter: function () {
      // Clear select menu
      document.querySelector(UISelectors.landMenu).value = "all"

      const filterRaces = data.filter(race => {
        const regex = new RegExp(search.value, 'gi')

        if (race.name.match(regex) || race.place.match(regex)) {
          return race;
        }
      })
      UICtrl.populateListItems(filterRaces);
    },

    // Filters by country. With select menu
    updateListWithSelect: function () {
      const landMenu = document.querySelector(UISelectors.landMenu)
      // Clear search field
      search.value = ""
      const filterRaces = data.filter(race => {
        if (landMenu.value === "all") return race;
        if (race.country === landMenu.value) return race;
      })
      UICtrl.populateListItems(filterRaces);
    },

    // If no matches are found the user can click to clear search field
    clearSearchField: function (e) {
      if (e.target.className = "clear-field") {
        search.value = ""
        UICtrl.populateListItems(data);
      }
    },
    getSelectors: function () {
      return UISelectors
    }
  }
})();

// App Controller
const App = (function (UICtrl) {

  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors()
    // Event listeners
    document.querySelector(UISelectors.landMenu).addEventListener("input", updateListSelectInput)

    // Updates racelist with every keypress
    document.querySelector(UISelectors.search).addEventListener("input", searchFilterInput)

    // Clears search field
    document.querySelector(UISelectors.content).addEventListener("click", clearSearchFieldClick)
  }

  const updateListSelectInput = function () {
    UICtrl.updateListWithSelect()
  }

  const searchFilterInput = function () {
    UICtrl.searchFilter()
  }

  const clearSearchFieldClick = function (e) {
    UICtrl.clearSearchField(e)
  }

  // Public methods
  return {
    init: function () {
      loadEventListeners();

      // Initialize the page with list items
      UICtrl.populateListItems(data);

      // Initialize select menu with options
      UICtrl.populateCountryFilter();
    }
  }
})(UICtrl);

// Initialize App
App.init();