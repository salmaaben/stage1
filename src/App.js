import React, { useState } from 'react';
import './App.css';
import IAVRABAT from './images/IAVRABAT.jpg';

function App() {
  return (
    <div className="container">
      <fieldset>
      <img src={IAVRABAT} alt="Description de l'image" className='img' />
      <br></br>
      <h3 className='title'>Système Informatique</h3>
      <TaskManager />
   </fieldset> </div>
  );
}

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [highlightedTask, setHighlightedTask] = useState(null);
  const [isTaskListVisible, setTaskListVisibility] = useState(true);

  const addTask = () => {
    setTasks([...tasks, { name: taskName, date: taskDate }]);
    setTaskName('');
    setTaskDate('');
  };

  const modifyTask = (taskNameToModify, newName) => {
    setTasks(tasks.map(task => 
      task.name === taskNameToModify ? { ...task, name: newName } : task
    ));
  };

  const searchTask = () => {
    const taskToHighlight = tasks.find(task => task.date === searchDate);
    if (taskToHighlight) {
      setHighlightedTask(taskToHighlight);
      setSearchResult('Tâche trouvée.');
    } else {
      setHighlightedTask(null);
      setSearchResult('Aucune tâche trouvée pour cette date.');
    }
  };

  const clearSearch = () => {
    setHighlightedTask(null);
    setSearchResult('');
    setSearchDate('');
  };

  const handleRemoveTask = () => {
    const confirmation = window.prompt("Êtes-vous sûr de vouloir supprimer la tâche sélectionnée ? Entrez 'oui' pour confirmer.");
    if (confirmation === "oui") {
      alert("La tâche a été supprimée !");
    } 
    else {
      alert("La suppression de la tâche a été annulée.");
    }

    if (highlightedTask) {
      setTasks(tasks.filter(task => task.name !== highlightedTask.name));
      setHighlightedTask(null);
      setSearchResult('');
    }
  };

  const toggleTaskListVisibility = () => {
    setTaskListVisibility(!isTaskListVisible);
  };

  return (
    <div className="task-manager">
        <h1 className='titre1'>Gestion des tâches</h1>
        <input type="text" placeholder="Tâche" value={taskName} onChange={e => setTaskName(e.target.value)} />
        <input type="date" placeholder="Date" value={taskDate} onChange={e => setTaskDate(e.target.value)} />
        <button onClick={addTask}>Ajouter</button>
        <br />
        <input type="date" placeholder="Date de recherche" value={searchDate} onChange={e => setSearchDate(e.target.value)} />
        <button onClick={searchTask}>Rechercher par date</button>
        <button onClick={clearSearch}>Effacer recherche</button>
        <p>{searchResult}</p>
        <h2>Liste des Tâches</h2>
        {isTaskListVisible && (
          <ul>
            {tasks.map((task, index) => (
              <li key={index} style={{ backgroundColor: highlightedTask === task ? 'yellow' : 'inherit' }}>
                {task.name} - {task.date}
                <button onClick={() => modifyTask(task.name, prompt('Nouveau nom de la tâche :'))}>Modifier</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={toggleTaskListVisibility}>{isTaskListVisible ? 'Fermer' : 'Ouvrir'} </button>
        {highlightedTask && <button onClick={handleRemoveTask}>Supprimer la tâche sélectionnée</button>}
    </div>
  );
}

export default App;