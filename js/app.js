let $ = document;
let boxElem = $.querySelectorAll(".box");
let dayInput = $.querySelector("#day");
let monthInput = $.querySelector("#month");
let yearInput = $.querySelector("#year");
let dayModal = $.querySelector("#d-modal");
let monthModal = $.querySelector("#m-modal");
let yearModal = $.querySelector("#y-modal");
let btn = $.querySelector("button");
let outputDate = $.querySelector(".date");
let isDateValid = true;
let index = null;
const findIndex = (modal) => {
	if (modal === dayModal) {
		index = 0;
	} else if (modal === monthModal) {
		index = 1;
	} else if (modal === yearModal) {
		index = 2;
	}
};
const notValid = (modal, date) => {
	modal.innerHTML = `Must Be a valid ${date}`;
	modal.style.display = "block";
	findIndex(modal);
	boxElem[index].firstElementChild.style.color = "hsl(0, 100%, 67%)";
	boxElem[index].firstElementChild.nextElementSibling.style.borderColor =
		"hsl(0, 100%, 67%)";
	isDateValid = false;
};
const emptyInput = (modal) => {
	modal.innerHTML = "This Field is required";
	modal.style.display = "block";
	findIndex(modal);
	boxElem[index].firstElementChild.style.color = "hsl(0, 100%, 67%)";
	boxElem[index].firstElementChild.nextElementSibling.style.borderColor =
		"hsl(0, 100%, 67%)";
	isDateValid = false;
};
const correct = (modal) => {
	modal.style.display = "none";
	findIndex(modal);
	boxElem[index].firstElementChild.style.color = "hsl(0, 1%, 44%)";
	boxElem[index].firstElementChild.nextElementSibling.style.borderColor =
		"hsla(0, 1%, 44%, 0.405)";
	isDateValid = true;
};
const checkDate = () => {
	if (dayInput.value < 0 || dayInput.value > 31) {
		notValid(dayModal, "Day");
	} else if (dayInput.value === "") {
		emptyInput(dayModal);
	} else {
		correct(dayModal);
	}
	if (monthInput.value < 0 || monthInput.value > 12) {
		notValid(monthModal, "Month");
	} else if (monthInput.value === "") {
		emptyInput(monthModal);
	} else {
		correct(monthModal);
	}
	if (yearInput.value < 1900 || yearInput.value > 2023) {
		notValid(yearModal, "Year");
	} else if (yearInput.value === "") {
		emptyInput(yearModal);
	} else {
		correct(yearModal);
	}
};
const checkTime = () => {
	if (
		[1, 3, 5, 7, 8, 10, 12].includes(+monthInput.value) &&
		dayInput.value > 31
	) {
		notValid(dayModal, "Day");
	} else if ([4, 6, 9, 11].includes(+monthInput.value) && dayInput.value > 30) {
		notValid(dayModal, "Day");
	} else if (monthInput.value == 2 && dayInput.value > 28) {
		notValid(dayModal, "Day");
	} else if (isDateValid) {
		correct(dayModal);
	}
};
const calculateDate = () => {
	let today = new Date();
	let birthDate = new Date(
		yearInput.value,
		monthInput.value - 1,
		dayInput.value
	);
	// Calculate years
	let years;
	if (
		today.getMonth() > birthDate.getMonth() ||
		(today.getMonth() == birthDate.getMonth() &&
			today.getDate() >= birthDate.getDate())
	) {
		years = today.getFullYear() - birthDate.getFullYear();
	} else {
		years = today.getFullYear() - birthDate.getFullYear() - 1;
	}

	// Calculate months
	let months;
	if (today.getDate() >= birthDate.getDate()) {
		months = today.getMonth() - birthDate.getMonth();
	} else if (today.getDate() < birthDate.getDate()) {
		months = today.getMonth() - birthDate.getMonth() - 1;
	}
	// make month positive
	months = months < 0 ? months + 12 : months;
	// Calculate days
	let days;
	// days of months in a year
	let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (today.getDate() >= birthDate.getDate()) {
		days = today.getDate() - birthDate.getDate();
	} else {
		days =
			today.getDate() - birthDate.getDate() + monthDays[birthDate.getMonth()];
	}

	// Display result
	let ourDate = [years, months, days].map((date) => {
		let elem = $.createElement("p");
		elem.innerHTML = `<span>${date}</span>`;
		return elem;
	});
	ourDate[0].innerHTML += " years";
	ourDate[1].innerHTML += " months";
	ourDate[2].innerHTML += " days";
	outputDate.innerHTML = "";
	outputDate.append(...ourDate);
};
btn.addEventListener("click", () => {
	checkDate();
	checkTime();
	if (isDateValid) {
		calculateDate();
	}
});
