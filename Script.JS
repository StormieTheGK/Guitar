/* =========================
   GUITAR NOTES
========================= */

const tuning = ["E", "A", "D", "G", "B", "E"];

const notes = [
    "C", "C#", "D", "D#", "E", "F",
    "F#", "G", "G#", "A", "A#", "B"
];

const naturalNotes = [
    "C", "D", "E", "F", "G", "A", "B"
];

const cdeNotes = ["C", "D", "E"];
const fgabNotes = ["F", "G", "A", "B"];


/* SHARP / FLAT NAMES */

const sharpFlatNames = {
    "C#": "C#/Db",
    "D#": "D#/Eb",
    "F#": "F#/Gb",
    "G#": "G#/Ab",
    "A#": "A#/Bb"
};


/* GET HTML ELEMENTS */

const fretboardStrings =
    document.querySelectorAll(".guitar-string");

const selectedNote =
    document.getElementById("selectedNote");

const quizQuestion =
    document.getElementById("quizQuestion");

const scoreElement =
    document.getElementById("score");

const showAllButton =
    document.getElementById("showAll");

const hideAllButton =
    document.getElementById("hideAll");

const showNaturalButton =
    document.getElementById("showNatural");

const showSharpFlatButton =
    document.getElementById("showSharpFlat");

const showCDEButton =
    document.getElementById("showCDE");

const showFGABButton =
    document.getElementById("showFGAB");

const resetBoardButton =
    document.getElementById("resetBoard");

const easyQuizButton =
    document.getElementById("easyQuiz");

const hardQuizButton =
    document.getElementById("hardQuiz");


/* QUIZ VARIABLES */

let quizActive = false;
let targetNote = "";
let score = 0;
let quizMode = "easy";


/* =========================
   CREATE FRETBOARD
========================= */

fretboardStrings.forEach((stringElement, stringNumber) => {

    const openNote = tuning[stringNumber];

    const startingNote =
        notes.indexOf(openNote);

    for (let fretNumber = 1; fretNumber <= 12; fretNumber++) {

        const fretElement = createFret(
            stringElement,
            startingNote,
            fretNumber
        );

        stringElement.appendChild(fretElement);
    }
});


function createFret(
    stringElement,
    startingNote,
    fretNumber
) {

    const fretElement =
        document.createElement("div");

    fretElement.classList.add("fret");


    const noteIndex =
        (startingNote + fretNumber) %
        notes.length;

    const noteName =
        notes[noteIndex];


    /* Store the REAL note internally */

    fretElement.dataset.note =
        noteName;

    fretElement.dataset.fret =
        fretNumber;

    fretElement.dataset.string =
        stringElement.dataset.string || "";


    /* Create note text */

    const noteText =
        document.createElement("span");

    noteText.classList.add("fret-note");

    noteText.textContent =
        noteName;

    fretElement.appendChild(noteText);


    /* Click */

    fretElement.addEventListener(
        "click",
        () => {
            selectFret(fretElement);
        }
    );


    return fretElement;
}


/* =========================
   CLICK A FRET
========================= */

function selectFret(fretElement) {

    const note =
        fretElement.dataset.note;


    /* If quiz is active,
       check the answer */

    if (quizActive) {

        checkQuizAnswer(fretElement);

        return;
    }


    selectedNote.textContent =
        sharpFlatNames[note] || note;


    clearFretStates();


    fretElement.classList.add(
        "correct"
    );

    fretElement.classList.add(
        "show-note"
    );
}


/* =========================
   CLEAR FRET STATES
========================= */

function clearFretStates() {

    document.querySelectorAll(".fret")
        .forEach(fret => {

            fret.classList.remove(
                "show-note"
            );

            fret.classList.remove(
                "highlight-cde"
            );

            fret.classList.remove(
                "highlight-fgab"
            );

            fret.classList.remove(
                "correct"
            );

            fret.classList.remove(
                "wrong"
            );
        });
}


/* =========================
   RESTORE NORMAL LABELS
========================= */

function restoreNoteLabels() {

    document.querySelectorAll(".fret")
        .forEach(fret => {

            const noteText =
                fret.querySelector(
                    ".fret-note"
                );

            if (noteText) {

                noteText.textContent =
                    fret.dataset.note;
            }
        });
}


/* =========================
   SHOW ALL
========================= */

if (showAllButton) {

    showAllButton.addEventListener(
        "click",
        () => {

            quizActive = false;
            targetNote = "";

            restoreNoteLabels();
            clearFretStates();


            document.querySelectorAll(".fret")
                .forEach(fret => {

                    fret.classList.add(
                        "show-note"
                    );
                });


            selectedNote.textContent =
                "?";

            quizQuestion.textContent =
                "Practice mode — all notes shown.";
        }
    );
}


/* =========================
   HIDE ALL
========================= */

if (hideAllButton) {

    hideAllButton.addEventListener(
        "click",
        () => {

            quizActive = false;
            targetNote = "";

            restoreNoteLabels();
            clearFretStates();

            selectedNote.textContent =
                "?";

            quizQuestion.textContent =
                "Practice mode — notes hidden.";
        }
    );
}


/* =========================
   SHOW NATURAL NOTES
========================= */

if (showNaturalButton) {

    showNaturalButton.addEventListener(
        "click",
        () => {

            quizActive = false;
            targetNote = "";

            restoreNoteLabels();
            clearFretStates();


            document.querySelectorAll(".fret")
                .forEach(fret => {

                    if (
                        naturalNotes.includes(
                            fret.dataset.note
                        )
                    ) {

                        fret.classList.add(
                            "show-note"
                        );
                    }
                });


            selectedNote.textContent =
                "?";

            quizQuestion.textContent =
                "Natural notes shown — C D E F G A B.";
        }
    );
}


/* =========================
   SHOW SHARP / FLAT NOTES
========================= */

if (showSharpFlatButton) {

    showSharpFlatButton.addEventListener(
        "click",
        () => {

            quizActive = false;
            targetNote = "";

            restoreNoteLabels();
            clearFretStates();


            document.querySelectorAll(".fret")
                .forEach(fret => {

                    const note =
                        fret.dataset.note;


                    if (sharpFlatNames[note]) {

                        const noteText =
                            fret.querySelector(
                                ".fret-note"
                            );

                        noteText.textContent =
                            sharpFlatNames[note];

                        fret.classList.add(
                            "show-note"
                        );
                    }
                });


            selectedNote.textContent =
                "?";

            quizQuestion.textContent =
                "Sharp/Flat notes shown — C#/Db, D#/Eb, F#/Gb, G#/Ab, A#/Bb.";
        }
    );
}


/* =========================
   SHOW CDE
========================= */

if (showCDEButton) {

    showCDEButton.addEventListener(
        "click",
        () => {

            quizActive = false;
            targetNote = "";

            restoreNoteLabels();
            clearFretStates();


            document.querySelectorAll(".fret")
                .forEach(fret => {

                    if (
                        cdeNotes.includes(
                            fret.dataset.note
                        )
                    ) {

                        fret.classList.add(
                            "highlight-cde"
                        );

                        fret.classList.add(
                            "show-note"
                        );
                    }
                });


            selectedNote.textContent =
                "?";

            quizQuestion.textContent =
                "C-D-E notes highlighted.";
        }
    );
}


/* =========================
   SHOW FGAB
========================= */

if (showFGABButton) {

    showFGABButton.addEventListener(
        "click",
        () => {

            quizActive = false;
            targetNote = "";

            restoreNoteLabels();
            clearFretStates();


            document.querySelectorAll(".fret")
                .forEach(fret => {

                    if (
                        fgabNotes.includes(
                            fret.dataset.note
                        )
                    ) {

                        fret.classList.add(
                            "highlight-fgab"
                        );

                        fret.classList.add(
                            "show-note"
                        );
                    }
                });


            selectedNote.textContent =
                "?";

            quizQuestion.textContent =
                "F-G-A-B notes highlighted.";
        }
    );
}


/* =========================
   RESET
========================= */

if (resetBoardButton) {

    resetBoardButton.addEventListener(
        "click",
        resetBoard
    );
}


function resetBoard() {

    restoreNoteLabels();
    clearFretStates();

    selectedNote.textContent =
        "?";

    quizActive = false;
    targetNote = "";

    score = 0;

    scoreElement.textContent =
        "0";

    quizQuestion.textContent =
        "Press a quiz mode to start!";
}


/* =========================
   EASY QUIZ
========================= */

if (easyQuizButton) {

    easyQuizButton.addEventListener(
        "click",
        () => {

            quizMode = "easy";

            startQuiz();
        }
    );
}


/* =========================
   HARD QUIZ
========================= */

if (hardQuizButton) {

    hardQuizButton.addEventListener(
        "click",
        () => {

            quizMode = "hard";

            startQuiz();
        }
    );
}


/* =========================
   START QUIZ
========================= */

function startQuiz() {

    quizActive = true;

    score = 0;

    scoreElement.textContent =
        "0";

    startNewQuestion();
}


/* =========================
   NEW QUESTION
========================= */

function startNewQuestion() {

    restoreNoteLabels();
    clearFretStates();

    selectedNote.textContent =
        "?";


    /* EASY MODE */

    if (quizMode === "easy") {

        const randomNumber =
            Math.floor(
                Math.random() *
                naturalNotes.length
            );

        targetNote =
            naturalNotes[randomNumber];


        quizQuestion.textContent =
            `Easy Mode — Find ${targetNote} on the guitar!`;

        return;
    }


    /* HARD MODE */

    const randomNumber =
        Math.floor(
            Math.random() *
            notes.length
        );

    targetNote =
        notes[randomNumber];


    const targetDisplay =
        sharpFlatNames[targetNote] ||
        targetNote;


    quizQuestion.textContent =
        `Hard Mode — Find ${targetDisplay} on the guitar!`;
}


/* =========================
   CHECK QUIZ ANSWER
========================= */

function checkQuizAnswer(fretElement) {

    const clickedNote =
        fretElement.dataset.note;


    /* CORRECT */

    if (clickedNote === targetNote) {

        fretElement.classList.add(
            "correct"
        );

        fretElement.classList.add(
            "show-note"
        );


        selectedNote.textContent =
            sharpFlatNames[clickedNote] ||
            clickedNote;


        score++;

        scoreElement.textContent =
            score;


        quizQuestion.textContent =
            "🎉 Great job! You found it!";


        setTimeout(() => {

            if (quizActive) {

                startNewQuestion();
            }

        }, 1000);


        return;
    }


    /* WRONG */

    fretElement.classList.add(
        "wrong"
    );

    fretElement.classList.add(
        "show-note"
    );


    selectedNote.textContent =
        sharpFlatNames[clickedNote] ||
        clickedNote;


    const clickedDisplayName =
        sharpFlatNames[clickedNote] ||
        clickedNote;


    quizQuestion.textContent =
        `Almost! That's ${clickedDisplayName}. Try again!`;


    setTimeout(() => {

        fretElement.classList.remove(
            "wrong"
        );

        fretElement.classList.remove(
            "show-note"
        );


        if (quizActive) {

            const targetDisplay =
                sharpFlatNames[targetNote] ||
                targetNote;


            if (quizMode === "easy") {

                quizQuestion.textContent =
                    `Easy Mode — Find ${targetDisplay} on the guitar!`;

            } else {

                quizQuestion.textContent =
                    `Hard Mode — Find ${targetDisplay} on the guitar!`;
            }
        }

    }, 800);
}