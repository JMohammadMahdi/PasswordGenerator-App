const PassGenerated = document.getElementById("PassDetails");
const LengthRange = document.getElementById("rangePass");
const ShowRangeValue = document.getElementById("RangeValue");
// checkboxs
const CheckboxsEle = document.querySelectorAll(".checkInput");
// Generate btn
const GenerateEle = document.getElementById("GEN");
// Length
const CopyPassBtn = document.querySelector(".Copy");

let Strength = [1, 0, 0, 0];

LengthRange.addEventListener("input", event => {
    const value = event.target.value;
    ShowRangeValue.innerText = value;

    // check Level
    StrengthScore();
});

CheckboxsEle.forEach(checkbox => {
    checkbox.addEventListener("input", event => {
        const Ele = event.target;
        const idEle = event.target.id;

        if (idEle == "LowercaseChar") {
            Strength[0] = (Ele.checked) ? 1 : 0;
        } else if (idEle == "UppercaseChar") {
            Strength[1] = (Ele.checked) ? 1 : 0;
        } else if (idEle == "NumbersChar") {
            Strength[2] = (Ele.checked) ? 1 : 0;
        } else if (idEle == "SymbolsChar") {
            Strength[3] = (Ele.checked) ? 1 : 0;
        }

        // check Level
        StrengthScore();
    });
});

function StrengthScore() {
    const Levels = document.querySelectorAll(".level");
    const levelName = document.getElementById("StrengthName");

    let level = 0;

    const countStrengthSelect = {
        select: 0,
        unselect: 0
    }

    for (const iterator of Strength) {
        if (iterator) {
            countStrengthSelect.select += 1;
        } else {
            countStrengthSelect.unselect += 1;
        }
    }

    if ((countStrengthSelect.select == 4) && LengthRange.value >= 10) {
        level = 4;
        levelName.innerText = "HARD";
    } else if (countStrengthSelect.select == 3 || countStrengthSelect.select == 4) {
        level = 3;
        levelName.innerText = "HIGH"
    } else if (countStrengthSelect.select == 2) {
        level = 2;
        levelName.innerText = "MEDIUM";
    } else if (countStrengthSelect.select == 1) {
        level = 1;
        levelName.innerText = "LOW";
    } else {
        level = 0;
        levelName.innerText = "V'LOW";
    }

    // show Level
    for (let index = 0; index < 4; index++) {
        if (index <= level - 1) {
            Levels[index].classList.add("levelUp");
            Levels[index].classList.remove("levelDown");
        } else {
            Levels[index].classList.add("levelDown");
            Levels[index].classList.remove("levelUp");
        }
    }
}

function GenPassword(passStrength, passLength) {
    // passStrength => [LowercaseChar, UppercaseChar, NumbersChar, SymbolsChar] : (0, 1)
    // passLength => count of Password

    let Password = "";
    const charLower = "abcdefghijklmnopqrstuvwxyz";
    const charUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!#$%&()*+,-./:;<=>?@[]^_`{|}~";

    let MembersType = [];
    if (passStrength[0]) { MembersType.push(0) };
    if (passStrength[1]) { MembersType.push(1) };
    if (passStrength[2]) { MembersType.push(2) };
    if (passStrength[3]) { MembersType.push(3) };

    for (let index = 0; index < passLength; index++) {
        const randomtype = Math.floor(Math.random() * MembersType.length);

        if (MembersType[randomtype] == 0) {
            const charLowerRandom = Math.floor(Math.random() * charLower.length);
            Password += charLower[charLowerRandom];
        } else if (MembersType[randomtype] == 1) {
            const charUpperRandom = Math.floor(Math.random() * charUpper.length);
            Password += charUpper[charUpperRandom];
        } else if (MembersType[randomtype] == 2) {
            const NumberRandom = Math.floor(Math.random() * numbers.length);
            Password += numbers[NumberRandom];
        } else if (MembersType[randomtype] == 3) {
            const SymbolRandom = Math.floor(Math.random() * symbols.length);
            Password += symbols[SymbolRandom];
        }
    }

    PassGenerated.innerText = Password;
}

GenerateEle.addEventListener("click", () => {
    if (Strength.includes(1)) {
        GenPassword(Strength, LengthRange.value);
        document.querySelector('.Password-generated').style.display = 'flex';
    } else {
        alert("Fill in at least one field");
    }

    // show password box elements
});

CopyPassBtn.addEventListener("click", () => {
    const password = PassGenerated.innerText;
    navigator.clipboard.writeText(password);

    // show message
    PassGenerated.innerText = "Copied Password!";
    setTimeout(() => {
        PassGenerated.innerText = password;
    }, 1000);

    // GenPass box animation Hide
    const GenPassBox = document.querySelector(".Password-generated");
    setTimeout(() => {
        GenPassBox.style.animation = "HidePassGeneratorBox 1.5s";
    }, 1500);
    setTimeout(() => {
        GenPassBox.style.display = "none";
        GenPassBox.style.animation = "none"
    }, 2900);
});