import {useEffect, useState} from "react";
import ListingSection from "./components/calorieRecordSection/ListingSection";
import CaloriesRecordEdit from "./components/edit/CaloriesRecordEdit";
import Modal from "react-modal";
import styles from "./App.module.css";
import {getDateFromString} from "./utils";

const LOCAL_STORAGE_KEY="caloriesRecords";

function App() {
	const [records, setRecords] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const saveTolocalStorage=(record)=>{
		const records = JSON.parse(localStorage.getItem('caloriesRecords')) || [];
		records.push(record);
		localStorage.setItem('caloriesRecords', JSON.stringify(records));
		console.log(records);
	}
	const getRecords=()=>{
		const records = JSON.parse(localStorage.getItem('caloriesRecords')) || [];
        return records;
	}

	useEffect(()=>{
		setRecords(getRecords().map((record)=>{
			return {
                ...record,
                date: new Date(record.date),
                id: record.id,
            }
		}));
	},[])
	const modalStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			border: "none",
			padding: "0px",
			borderRadius: "var(--theme-border-radius-smooth)",
		},
		overlay: {
			background: "rgba(0,0,0,.5)",
		},
	};

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const formSubmitHandler = (record) => {
		const formattedRecord = {
			...record,
			date: getDateFromString(record.date),
			id: crypto.randomUUID(),

		};

		setRecords([formattedRecord, ...records]);
		saveTolocalStorage(formattedRecord);
		handleCloseModal();
	};

	return (
		<div className="App">
			<h1 className={styles.title}>Calorie Tracker</h1>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={handleCloseModal}
				contentLabel="Modal"
				style={modalStyles}
			>
				<CaloriesRecordEdit
					onFormSubmit={formSubmitHandler}
					onCancel={handleCloseModal}
				/>
			</Modal>

			<ListingSection allRecords={records} />
			<button className={styles["open-modal-button"]} onClick={handleOpenModal}>
				Track food
			</button>
		</div>
	);
}

export default App;
