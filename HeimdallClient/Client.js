const rulesBucket = document.querySelector(".rules_bucket");

const addButton = document.getElementById("add_button");

const validateButton = document.getElementById("validate_button");

const inputFields = document.getElementsByClassName(
	"form_field_and_descriptor"
);

let validRules = [];

let activeRules = ["type", "crux", "color", "title"];

let formFields = {};

Array.from(inputFields).forEach((field) => {
	validRules.push(
		field.getElementsByClassName("input_and_tick")[0].querySelector("input").id
	);
});

function getNewChip(rule) {
	let chip = document.createElement("div");

	chip.appendChild(document.createTextNode(rule));

	rulesBucket.appendChild(chip);

	activeRules.push(rule);
}

addButton.addEventListener("click", function () {
	const input = document.getElementById("rules_input").value;

	if (
		input !== "" &&
		validRules.includes(input) &&
		!activeRules.includes(input)
	) {
		getNewChip(input);

		document.getElementById("rules_input").value = "";
	}
});

validateButton.addEventListener("click", function validate() {
	Array.from(inputFields).forEach(
		(field) =>
			(formFields[
				field
					.getElementsByClassName("input_and_tick")[0]
					.querySelector("input").id
			] = field
				.getElementsByClassName("input_and_tick")[0]
				.querySelector("input").value)
	);

	fetch("https://heimdallapi.ew.r.appspot.com/validateInput", {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ form: formFields, rules: activeRules }),
	})
		.then((response) => response.json())
		.then((data) => {
			markFields(data);
		});
});

function markFields(missingFields) {
	Array.from(inputFields).forEach((field) => {
		field
			.getElementsByClassName("input_and_tick")[0]
			.querySelector("div").style.backgroundColor = "var(--accent)";
	});

	Array.from(inputFields).forEach((field) => {
		let id = field
			.getElementsByClassName("input_and_tick")[0]
			.querySelector("input").id;

		if (missingFields.includes(id)) {
			field
				.getElementsByClassName("input_and_tick")[0]
				.querySelector("div").style.backgroundColor = "red";
		}
	});
}
