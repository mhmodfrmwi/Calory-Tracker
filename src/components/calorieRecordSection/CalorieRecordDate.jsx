import styles from "./CalorieRecordDate.module.css";
import StyledRecordCell from "../common/StyledRecordCell";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function CalorieRecordDate({ date }) {
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <StyledRecordCell className={styles.styledRecordCell}>
      <div className={styles["record-date-month"]}>{month}</div>
      <div className={styles["record-date-day"]}>{day}</div>
      <div className={styles["record-date-year"]}>{year}</div>
    </StyledRecordCell>
  );
}

export default CalorieRecordDate;
