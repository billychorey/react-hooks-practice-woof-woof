import React from "react";

function DogBar({ dogList }) {
  // Use the dogList prop here as needed
  // For example, you can map over the dogList to render individual dog items

  return (
    <div id="dog-bar">
      {dogList.map((dog) => (
        <span key={dog.id}>{dog.name}</span>
        // You can render other dog information as well
      ))}
    </div>
  );
}

export default DogBar;
