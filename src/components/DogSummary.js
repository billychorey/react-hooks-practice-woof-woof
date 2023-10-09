import React from "react";

function DogSummary({ dogList, updateDogStatus, visibleDogId }) {
  return (
    <div id="dog-summary-container" >
      {dogList.map((dog) => (
        <div 
        key={dog.id} 
        className={`dog-summary ${visibleDogId === dog.id ? "" : "hidden"}`}
        >
          <h1>DOGGO: {dog.name}</h1>
          <div id="dog-info">
            <img src={dog.image} alt={`${dog.name}`} />
            <h2>{dog.name}</h2>
            <button onClick={() => updateDogStatus(dog.id, !dog.isGoodDog)}>
              {dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DogSummary;
