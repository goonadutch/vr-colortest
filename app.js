let ishihara = [
    {
        imageSrc: "one.png",
        answer: 45,
        options: [12, 45, 3]
    },
    {
        imageSrc: "two.png",
        answer: 16,
        options: [12, 8, 16]
    },
    {
        imageSrc: "three.png",
        answer: 5,
        options: [5, 8, 3]
    },
    {
        imageSrc: "four.png",
        answer: 73,
        options: [12, 8, 73]
    },
	{
        imageSrc: "five.png",
        answer: 6,
        options: [6, 10, 4]
    },
	{
        imageSrc: "six.png",
        answer: 7,
        options: [5, 7, 3]
    },
	{
        imageSrc: "seven.png",
        answer: 6,
        options: [95, 28, 6]
    },
	{
        imageSrc: "eight.png",
        answer: 29,
        options: [29, 70, 38]
    },
	{
        imageSrc: "nine.png",
        answer: 8,
        options: [3, 8, 23]
    },
	{
        imageSrc: "ten.png",
        answer: 26,
        options: [26, 6, 3]
    }
]

const ISHIHARA_BASELINE_CHECK_ENTRY_COUNT = 7

let currentQuestion = 0
let score = 0
let gotCorrect = []
let gotEntries = []

let optionOne = document.getElementById("optionOne")
let optionTwo = document.getElementById("optionTwo")
let optionThree = document.getElementById("optionThree")
let optionImage = document.getElementById("optionImage")

optionOne.addEventListener("click", ishiharaOptions)
optionTwo.addEventListener("click", ishiharaOptions)
optionThree.addEventListener("click", ishiharaOptions)

function ishiharaOptions(e) {

	

    if (e.target.dataset.value == ishihara[currentQuestion].answer) {
        score++
        gotCorrect.push(currentQuestion)
    }
    
	gotEntries.push(e.target.dataset.value)
	
	if(currentQuestion >= ISHIHARA_BASELINE_CHECK_ENTRY_COUNT - 1) {
		let entriesThatShouldBeIncluded = [0, 1, 2, 3, 4, 5, 6]
		const containsElements = entriesThatShouldBeIncluded.every(element => gotCorrect.includes(element))
		if (containsElements) {
			updateFinalImage(optionImage, "noCondition.png")
			setFinalImagePosition(optionImage)
			return removeAllOptionsAndListener([optionOne, optionTwo, optionThree])
		}
	} else {
		console.log("I'm here")
	}

	console.log({currentQuestion, gotCorrect, gotEntries})
	
	currentQuestion++

    if (currentQuestion < ishihara.length) {

        updateForImage(optionImage, currentQuestion)

        updateForOption(optionOne, currentQuestion, 0)
        updateForOption(optionTwo, currentQuestion, 1)
        updateForOption(optionThree, currentQuestion, 2)

    } else {

		let condition = ""

		if(gotEntries[7] == 70) {
			condition = "Deuteranomaly"
			if(gotEntries[8] == 3) {
				condition = "Protanomaly"
				if(gotEntries[9] == 6) {
					condition = "Protanopia"
				}
			}
		}

		console.log(`User has ${condition =! "" ? condition : "No Condition" }`)

		let source = ""
		if(condition == "Deuteranomaly") source = "conditionOne.png"
		if(condition == "Protanomaly") source = "conditionTwo.png"
		if(condition == "Protanopia") source = "conditionThree.png"

		source != "" ? updateFinalImage(optionImage, source) : false
		setFinalImagePosition(optionImage)
		removeAllOptionsAndListener([optionOne, optionTwo, optionThree])

    }

}

function updateFinalImage(optionImage, source) {
	optionImage.setAttribute("src", `/${source}`)
}

function updateForImage(optionImage, currentQuestion = 0) {
    optionImage.setAttribute("src", `/test/${ishihara[currentQuestion].imageSrc}`)
    optionImage.setAttribute("data-current", currentQuestion)
}

function updateForOption(option, currentQuestion = 0, order = 0) {
    option.setAttribute("data-current", currentQuestion)
    option.setAttribute("data-value", ishihara[currentQuestion].options[order])
    option.setAttribute("text", `value: ${ishihara[currentQuestion].options[order]}; color: #000000; align: center; width: 2.26`)
}

function setFinalImagePosition(optionImage) {
	optionImage.setAttribute("position", "-0.415 4.834 4.251")
	optionImage.setAttribute("scale", "2.5 2.5 0")
}

function removeAllOptionsAndListener(options) {
	options.forEach(removeOptionAndListener)
}

function removeOptionAndListener(optionEntry) {
	optionEntry.setAttribute("visible", false)
	optionEntry.removeEventListener("click", ishiharaOptions)
}

function startIshihara() {
    updateForImage(optionImage)
    updateForOption(optionOne, 0, 0)
    updateForOption(optionTwo, 0, 1)
    updateForOption(optionThree, 0, 2)
}

startIshihara()

function playBGSound() {
    let audio = document.querySelector('#backgroundPlayback')
    try {
        audio.volume = 0.2
        audio
            .play()
            .then()
            .catch(() =>
                setTimeout(() => {
                    playBGSound()
                })
            )
    } catch (error) {
        console.log("User has not interacted with the page yet")
    }
}

playBGSound()