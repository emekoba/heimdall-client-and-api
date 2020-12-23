"use strict";

module.exports.deleteAttribute = function deleteAttributeFromObject(
	object,
	attributeKey
) {
	for (var keyInObject in object) {
		if (keyInObject === attributeKey) {
			delete object[attributeKey];

			return object;
		}
	}

	return 404;
};

module.exports.validate = function validateInput(input, rules) {
	let missingFields = [];

	rules.map((e) => {
		if (
			!(e in input) ||
			input[e] === "" ||
			input[e] === undefined ||
			input[e] === null
		) {
			missingFields.push(e);
		}
	});

	return missingFields;
};

module.exports.getViableIndex = function getViableIndex(
	primaryArr,
	secondaryArr
) {
	let startIdx = 0;

	let trace = 0;

	function recursiveLoopAtNewStartIdx() {
		for (let i = startIdx; i <= primaryArr.length - 1; i++) {
			trace = primaryArr[i] - secondaryArr[i] + trace;

			if (Math.sign(trace) === -1) {
				if (startIdx === primaryArr.length - 1) {
					startIdx = -1;

					break;
				} else {
					startIdx++;

					trace = 0;

					recursiveLoopAtNewStartIdx();

					break;
				}
			}
		}
	}

	recursiveLoopAtNewStartIdx();

	return startIdx;
};
