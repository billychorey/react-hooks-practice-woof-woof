import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import DogBar from "./DogBar";
import DogSummary from "./DogSummary";

function App() {
  const [dogList, setDogList] = useState([]);
  const [visibleDogId, setVisibleDogId] = useState(null);
  const [buttonText, setButtonText] = useState('Filter good dogs: OFF');
  const [originalDogList, setOriginalDogList] = useState([]);
  const [filteredDogList, setFilteredDogList] = useState([]);
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
        setOriginalDogList(dogs);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  async function updateDogStatus(dogId, isGoodDog) {
    try {
      const response = await fetch(`http://localhost:3001/pups/${dogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isGoodDog }),
      });
      if (!response.ok) {
        throw new Error('Update failed');
      }

      const updatedDogList = dogList.map((dog) =>
        dog.id === dogId ? { ...dog, isGoodDog } : dog
      );

      setDogList(updatedDogList);

      if (buttonText === 'Turn filter off') {
        const updatedFilteredDogList = filteredDogList.map((dog) =>
          dog.id === dogId ? { ...dog, isGoodDog } : dog
        );
        setFilteredDogList(updatedFilteredDogList);
      }
    } catch (error) {
      console.error('Error updating dog status:', error);
      throw error;
    }
  }

  const handleNameClick = (dogId) => {
    setVisibleDogId(dogId);
  };

  function filterDogs() {
    setButtonText((prevButtonText) =>
      prevButtonText === 'Filter good dogs: OFF' ? 'Turn filter off' : 'Filter good dogs: OFF'
    );

    setVisibleDogId(null);

    if (buttonText === 'Filter good dogs: OFF') {
      const goodDogs = dogList.filter((dog) => dog.isGoodDog === true);
      setFilteredDogList(goodDogs);
    } else {
      setFilteredDogList(originalDogList);
    }
  }

  const displayDogList = buttonText === 'Turn filter off' ? filteredDogList : dogList;

  return (
    <div className="App">
      <FilterBar filterDogs={filterDogs} buttonText={buttonText} />
      <DogBar dogList={displayDogList} onNameClick={handleNameClick} />
      <DogSummary dogList={displayDogList} updateDogStatus={updateDogStatus} visibleDogId={visibleDogId} />
    </div>
  );
}

export default App;
