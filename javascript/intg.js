var type = "intg"

function gen() {
	document.getElementById("latex").innerHTML = "Loading...";
	result = "";
	while (result == "") {
		try {
			result = Algebrite.simplify(generate(terms, cascade, level3)).toString();
			if (result == "" || !(result.includes("x")) || result.includes("i")) {
				result = "";
				throw "Not a valid equation";
			}
		}
		catch (err) {
			console.log(err);
		}
	}
	latex = document.getElementById("latex")
	katex.render(Algebrite.run("printlatex(d(" + result + "))").toString(),latex, {throwOnError: false});
}

function checkAnswer(integral) {
	return !Algebrite.simplify("(" + integral + ")-(" + result + ")").toString().includes("x")
}

function submit() {
	var box = document.getElementById("answer");
	answer = box.value;
	if (answer == "") {return}
	var output = document.getElementById("result");
	var correct = checkAnswer(answer);
	if (correct == true) {
		output.innerHTML = "Correct!";
		right++;
		streak++;
		if (streak > streakRecord.intg[difficulty]) {
			streakRecord.intg[difficulty] = streak
			localStorage.streak = JSON.stringify(streakRecord);
		}
	}
	else {
		output.innerHTML = "Incorrect! The integral was: \\(" + Algebrite.run("printlatex(" + result + ")").toString() + "\\) not \\(" + Algebrite.run("printlatex(" + answer + ")").toString() + "\\)";
		renderMathInElement(output);
		wrong++;
		streak = 0;
	}
	score();
	box.value = "";
	gen();
}