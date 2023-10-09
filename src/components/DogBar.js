import React from "react";

function DogBar({ dogList, onNameClick }) {
    // Use the dogList prop here as needed
    // For example, you can map over the dogList to render individual dog items
    
    return (
        <div id="dog-bar">
        {dogList.map((dog) => (
            <span onClick={() => onNameClick(dog.id)} key={dog.id}>{dog.name}</span>
        ))}
        </div>
    );
}

export default DogBar;
