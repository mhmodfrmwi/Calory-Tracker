import { useState } from "react";
import styles from "./CaloriesRecordEdit.module.css";

function CaloriesRecordEdit({ onFormSubmit, onCancel }) {
  const DEFAULT_VALUES = {
    date: "",
    meal: "Breakfast",
    content: "",
    calories: 0,
  };

  const [mealRecord, setMealRecord] = useState(DEFAULT_VALUES);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setMealRecord((prev) => ({
      ...prev,
      [id]: id === "calories" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(mealRecord);
    setMealRecord(DEFAULT_VALUES);
  };

  const handleCancel = () => {
    setMealRecord(DEFAULT_VALUES);
    onCancel();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        value={mealRecord.date}
        onChange={handleChange}
      />
      <label htmlFor="meal">Meal:</label>
      <select id="meal" value={mealRecord.meal} onChange={handleChange}>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
      <label htmlFor="content">Content:</label>
      <input
        type="text"
        id="content"
        value={mealRecord.content}
        onChange={handleChange}
      />
      <label htmlFor="calories">Calories:</label>
      <input
        type="number"
        id="calories"
        value={mealRecord.calories}
        onChange={handleChange}
        className={`${styles["calories-input"]} ${mealRecord.calories < 0 ? styles.error : ""}`}
      />
      <div className={styles.footer}>
        <button type="submit">Add Record</button>
        <button
          type="button"
          className={styles.secondary}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CaloriesRecordEdit;
