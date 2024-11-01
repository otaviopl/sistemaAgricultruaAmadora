import React from 'react';
import './PlantDetails.css';

const PlantDetails = ({ plant, onClose }) => {
  // Informações de pragas e cuidados (exemplo)
  const plantInfo = {
    Banana: {
      pests: ['Broca', 'Sigatoka'],
      care: ['Irrigação regular', 'Adubação com potássio'],
    },
    // Adicione outras plantas e seus cuidados aqui
    Tomate: {
      pests: ['Pulgões', 'Lagarta'],
      care: ['Remoção de folhas infectadas', 'Rotação de culturas'],
    },
    // ...
  };

  const { pests, care } = plantInfo[plant] || { pests: [], care: [] };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{plant}</h2>
        <button className="close-button" onClick={onClose}>Fechar</button>
        
        <h3>Pragas</h3>
        <ul>
          {pests.map((pest, index) => (
            <li key={index}>{pest}</li>
          ))}
        </ul>

        <h3>Cuidados</h3>
        <ul>
          {care.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlantDetails;
