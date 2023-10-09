import React from "react";

function DogSummary({ dogList, toggleDogStatus }) {
  return (
    <div id="dog-summary-container">
      {dogList.map((dog) => (
        <div key={dog.id}>
          <h1>DOGGO: {dog.name}</h1>
          <div id="dog-info">
            <img src={dog.image} alt={`${dog.name}`} />
            <h2>{dog.name}</h2>
            <button onClick={() => toggleDogStatus(dog)}>
              {dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DogSummary;
