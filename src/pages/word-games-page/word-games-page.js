import React, {useState} from 'react';
import {PopUp} from "../../components/pop-up/pop-up";

// TODO add some view to this page. Now it looks ugly(:
export const WordGamesPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onClick = () => setIsOpen(!isOpen);
  return (
    <>
      <h1>Word Games</h1>
      <div>Games will be added here in the future</div>
        <button onClick={onClick}> Start game </button>
        <PopUp open={isOpen} onClose={onClick}>
            <div className="content1">
                <h1>Game heading</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
                    hic iure quisquam quod ratione rem repudiandae ut voluptatibus!
                    Distinctio, doloribus hic illum iure molestiae molestias
                    necessitatibus neque non pariatur tenetur. Accusantium alias beatae
                    consectetur consequatur cupiditate id illo ipsum laboriosam, libero
                    magnam maxime nisi, quibusdam recusandae rem similique tenetur
                    vitae, voluptatum? Corporis dolore dolores fugit nulla.
                </p>
            </div>
        </PopUp>
    </>
  );
};
