import React from "react";

function DogBar({ dogList, onNameClick }) {
    
    return (
        <div id="dog-bar">
        {dogList.map((dog) => (
            <span onClick={() => onNameClick(dog.id)} key={dog.id}>{dog.name}</span>
        ))}
        </div>
    );
}

export default DogBar;
