import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import DogBar from "./DogBar";
import DogSummary from "./DogSummary";

function App() {
  const [dogList, setDogList] = useState([]);
  const [originalDogList, setOriginalDogList] = useState([]);

  const [visibleDogId, setVisibleDogId] = useState(null);
  const [buttonText, setButtonText] = useState('Filter good dogs: OFF')


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
      const updatedDogList = await fetchUpdatedDogList();
      setDogList(updatedDogList);
      } catch (error) {
        console.error('Error updating dog status:', error);
        throw error;
    }
  }

    async function fetchUpdatedDogList() {
      try {
        const response = await fetch('http://localhost:3001/pups');
        if (!response.ok) {
          throw new Error('Fetch failed');
        }
        const updatedDogList = await response.json();
        return updatedDogList;
      } catch (error) {
        console.error('Error fetching updated dog list:', error);
        throw error;
      }
  }

  const handleNameClick = (dogId) => {
    setVisibleDogId((prevVisibleDogId) =>
      prevVisibleDogId === dogId ? null : dogId
    );
  };

  function filterDogs() {
    setButtonText((prevButtonText) =>
      prevButtonText === 'Filter good dogs: OFF' ? 'Filter good dogs: ON' : 'Filter good dogs: OFF'
    );
    
    setVisibleDogId(null);

    if (buttonText === 'Filter good dogs: OFF') {
      const goodDogs = dogList.filter((dog) => dog.isGoodDog === true);
      console.log(goodDogs);
      setDogList(goodDogs);
    } else {
      setDogList(originalDogList);
    }
  }


  return (
    <div className="App">
      <FilterBar filterDogs={filterDogs} buttonText={buttonText}/>
      <DogBar 
      dogList={dogList} 
      onNameClick={handleNameClick}
      />
      <DogSummary 
      dogList={dogList} 
      visibleDogId={visibleDogId} 
      updateDogStatus={updateDogStatus}
      />
    </div>
  );
}

export default App;
