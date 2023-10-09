import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import DogBar from "./DogBar";
import DogSummary from "./DogSummary";

function App() {
  const [dogList, setDogList] = useState([]);
  const [visibleDogId, setVisibleDogId] = useState(null);

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
    setVisibleDogId(dogId); // Set the ID of the visible dog to the clicked dog's ID
  };


  return (
    <div className="App">
      <FilterBar />
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
