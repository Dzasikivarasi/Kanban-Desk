import React, { useState, useEffect } from "react";
import Wrapper from './Wrapper';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

const TASKS_STORAGE_KEY = "tasks";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const updateTasks = (newData) => {
    setTasks(newData)
  }

  // Сохранение задач в localStorage
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Wrapper>
      <Header />
      <Main tasks={tasks} updateTasks={updateTasks} />
      <Footer tasks={tasks} />
    </Wrapper>
  );
}
