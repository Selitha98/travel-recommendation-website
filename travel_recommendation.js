const btnSearch = document.getElementById("btnSearch");
const iconSearch = document.getElementById("iconSearch");
const searchResultsContainer = document.getElementById("search-results-container");

async function fetchData() {
  try {
    const response = await fetch("travel_recommendation_api.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function showResults() {
  // Clear previous search results
  searchResultsContainer.innerHTML = "";

  let searchKeyword = document.getElementById("search_input").value.toLowerCase();
  const data = await fetchData();
  if (!data) return;

  let filteredResults = [];

  // Check the search keyword and filter the data accordingly
  if (searchKeyword === "country") {
    filteredResults = data.countries;
  } else if (searchKeyword === "temple") {
    filteredResults = data.temples;
  } else if (searchKeyword === "beach") {
    filteredResults = data.beaches;
  } else {
    console.log("Invalid search keyword");
    return;
  }

  // Display filtered results
  filteredResults.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("search-result-item");
    li.innerHTML = `
      <div class="parent-container">
        <img src="${item.imageUrl}" alt="${item.name}" class="show-img" width="500px" height="auto">
        <div class="under-section">
          <h1>${item.name}</h1>
          <p>${item.description}</p>
          <button class="visit">Visit</button>
        </div>
      </div>
    `;
    searchResultsContainer.appendChild(li);
  });

}

btnSearch.addEventListener("click", showResults);
iconSearch.addEventListener("click", showResults);
