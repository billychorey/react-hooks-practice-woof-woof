import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import DogBar from "./DogBar";
import DogSummary from "./DogSummary";

function App() {
  const [dogList, setDogList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/pups");
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const dogs = await response.json();
        console.log(dogs);
        setDogList(dogs);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // Function to toggle the good dog status
  function toggleDogStatus(clickedDog) {
    const updatedDogList = [...dogList];
    const dogIndex = updatedDogList.findIndex((dog) => dog.id === clickedDog.id);
    if (dogIndex !== -1) {
      updatedDogList[dogIndex].isGoodDog = !updatedDogList[dogIndex].isGoodDog;
      setDogList(updatedDogList);
    }
  }

  return (
    <div className="App">
      <FilterBar />
      <DogBar dogList={dogList} />
      <DogSummary dogList={dogList} toggleDogStatus={toggleDogStatus} />
    </div>
  );
}

export default App;
