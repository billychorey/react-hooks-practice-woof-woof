import React from "react";

function FilterBar({filterDogs, buttonText}) {
    function handleFilter() {
        filterDogs();
    }

    return (
        <div id="filter-div">
        <button id="good-dog-filter" onClick={handleFilter}>{buttonText}</button>
        </div>
    );
}

export default FilterBar;