//Initialization 
const temparr = [
    { "Name": "Bino", "Register No": 422417104007, "Tamil": 99, "English": 98, "Maths": 97, "Science": 100, "Social": 98, "Total Marks": 492, "Grade": "O" },
    { "Name": "Dino", "Register No": 422417104008, "Tamil": 99, "English": 98, "Maths": 97, "Science": 100, "Social": 98, "Total Marks": 492, "Grade": "O" },
    { "Name": "Lina", "Register No": 422417104009, "Tamil": 99, "English": 98, "Maths": 97, "Science": 100, "Social": 98, "Total Marks": 492, "Grade": "O" },
    { "Name": "Tina", "Register No": 422417104010, "Tamil": 96, "English": 98, "Maths": 97, "Science": 100, "Social": 98, "Total Marks": 489, "Grade": "A+" }
]
let rowPosition = -1;
const tbody = document.querySelector("tbody");

console.log(temparr)

//Get Marks From the Input
function getMarks() {
    const mark1 = document.getElementById("mark1").value;
    const mark2 = document.getElementById("mark2").value;
    const mark3 = document.getElementById("mark3").value;
    const mark4 = document.getElementById("mark4").value;
    const mark5 = document.getElementById("mark5").value;
    return [mark1, mark2, mark3, mark4, mark5];
}

//To disable all Input Fields
function disableOrEnableInView(view) {
    document.getElementById("first_name").disabled = view;
    document.getElementById("last_name").disabled = view
    document.getElementById("reg_no").disabled = view;
    document.getElementById("mark1").disabled = view;
    document.getElementById("mark2").disabled = view;
    document.getElementById("mark3").disabled = view;
    document.getElementById("mark4").disabled = view;
    document.getElementById("mark5").disabled = view;
    document.getElementById("add").disabled = view;
    document.getElementById("update").disabled = view;
}

//This clears the form
function clearForm() {
    const form = document.getElementById("form1");
    form.reset();
}

//Add Title to Table
document.querySelector("thead").innerHTML = `
<tr>
<th>Name</th>
<th>Register No</th>
<th>Tamil</th>
<th>English</th>
<th>Maths</th>
<th>Science</th>
<th>Social</th>
<th>Total</th>
<th>Grade</th>
<th>Actions <button id="close" type="button" onclick=" clearForm(); disableOrEnableInView(false); hideButton();"><i class="fa-solid fa-xmark"></i></button>
</th>
</tr>
`

function addRowContent(num) {
    tbody.innerHTML += `
    <tr>
        <td id="name">${temparr[num].Name}</td>
        <td id="regNo">${temparr[num]["Register No"]}</td>
        <td id="tamil">${temparr[num].Tamil}</td>
        <td id="english">${temparr[num].English}</td>
        <td id="maths">${temparr[num].Maths}</td>
        <td id="science">${temparr[num].Science}</td>
        <td id="social">${temparr[num].Social}</td>
        <td id="totalMarks">${temparr[num]["Total Marks"]}</td>
        <td id="grade">${temparr[num].Grade}</td>
        <td>
        <button id="edit" type="button" onclick="editfn(this)"><i class="fa-regular fa-pen-to-square"></i></button>
        <button id="view" type="button" onclick="viewfn(this)"><i class="fa-solid fa-eye"></i></button>
        <button id="delete" type="button" onclick="deleteRow(this)"><i class="fa-solid fa-trash-can"></i></button>
        </td>
    </tr>
    `
}

let closebtn = document.getElementById("close");
closebtn.style.display = 'none';

function hideButton() {
    closebtn.style.display = 'none';
}

function showButton() {
    closebtn.style.display = 'table-cell';
}

//Add Content to Table by reading the JSON Array
for (let i = 0; i < temparr.length; i++) {
    addRowContent(i);
}

function addRow() {
    // const name = document.getElementById("first_name").value;
    const fname = document.getElementById("first_name").value;
    const lname = document.getElementById("last_name").value;
    const regNo = document.getElementById("reg_no").value;
    const isJsonPresent = temparr.some(item => item["Register No"] == regNo)

    if (isJsonPresent) {
        window.alert("Register Number is already present")
    } else {

        const [mark1, mark2, mark3, mark4, mark5] = getMarks();
        if (mark1 == "" || mark2 == "" || mark3 == "" || mark4 == "" || mark5 == "" || fname == "" || regNo == "") {
            window.alert("Add Necessary fields")
        } else {
            const [total, grade] = calculate(mark1, mark2, mark3, mark4, mark5);
            const markJson = {
                "Name": fname + " " + lname,
                "Register No": regNo,
                "Tamil": mark1,
                "English": mark2,
                "Maths": mark3,
                "Science": mark4,
                "Social": mark5,
                "Total Marks": total,
                "Grade": grade
            };
            temparr.push(markJson);
            const num = temparr.length - 1;
            addRowContent(num);
            clearForm();
        }
    }
}

function deleteRow(td) {
    const row = td.parentElement.parentElement;
    tbody.deleteRow(row.sectionRowIndex);

    //To find the json Object from the JSON Array
    const markObj = temparr.find(item => item["Register No"] == row.cells[1].innerHTML)

    const index = temparr.indexOf(markObj)

    //To remove exactly one object from the position index
    temparr.splice(index, 1);
}

function viewOrEdit(td) {
    const row = td.parentElement.parentElement;
    const name = row.cells[0].innerHTML;
    const regNo = row.cells[1].innerHTML;
    const tamil = row.cells[2].innerHTML;
    const english = row.cells[3].innerHTML;
    const maths = row.cells[4].innerHTML;
    const science = row.cells[5].innerHTML;
    const social = row.cells[6].innerHTML;

    const nameArr = name.split(" ");
    document.getElementById("first_name").value = nameArr[0];
    if (nameArr[1] == undefined) {
        document.getElementById("last_name").value = "";
    } else {
        document.getElementById("last_name").value = nameArr[1];
    }
    document.getElementById("reg_no").value = regNo;
    document.getElementById("mark1").value = tamil;
    document.getElementById("mark2").value = english;
    document.getElementById("mark3").value = maths;
    document.getElementById("mark4").value = science;
    document.getElementById("mark5").value = social;
}

function viewfn(td) {
    viewOrEdit(td);
    disableOrEnableInView(true);
    showButton();
}

function editfn(td) {
    viewOrEdit(td);
    document.getElementById("reg_no").disabled = true;
    document.getElementById("add").disabled = true;
    rowPosition = td.parentElement.parentElement.rowIndex;
    showButton();
}

function updatefn() {
    const table = document.querySelector("table");
    const rows = table.rows;
    const regNo = document.getElementById("reg_no").value;

    const findRegNO = (regNo) => temparr.find(item => item["Register No"] == regNo);
    const foundObject = findRegNO(regNo);

    let [mark1, mark2, mark3, mark4, mark5] = getMarks();
    const fname = document.getElementById("first_name").value;
    const lname = document.getElementById("last_name").value;
    const name = foundObject.Name = fname + " " + lname;
    const tamil = foundObject.Tamil = mark1;
    const english = foundObject.English = mark2;
    const maths = foundObject.Maths = mark3;
    const science = foundObject.Science = mark4;
    const social = foundObject.Social = mark5;
    console.log("Row Position in update " + rowPosition)

    try {
        rows[rowPosition].cells[0].innerHTML = name;
        rows[rowPosition].cells[2].innerHTML = tamil;
        rows[rowPosition].cells[3].innerHTML = english;
        rows[rowPosition].cells[4].innerHTML = maths;
        rows[rowPosition].cells[5].innerHTML = science;
        rows[rowPosition].cells[6].innerHTML = social;
        const [total, grade] = calculate(tamil, english, maths, science, social)
        rows[rowPosition].cells[7].innerHTML = total;
        rows[rowPosition].cells[8].innerHTML = grade;
    } catch (error) {
        console.log(error)
    }
    clearForm();
    disableOrEnableInView(false);
}

function calculate(mark1, mark2, mark3, mark4, mark5) {

    if (Number(mark1) < 0 || Number(mark2) < 0 || Number(mark3) < 0 || Number(mark4) < 0 || Number(mark5) < 0) {
        document.querySelector(".errormessage").innerHTML = "Mark should not be less than Zero";

    } else if (Number(mark1) > 100 || Number(mark2) > 100 || Number(mark3) > 100 || Number(mark4) > 100 || Number(mark5) > 100) {
        document.querySelector(".errormessage").innerHTML = "Mark should be not be above 100";
    } else {

        document.querySelector(".errormessage").innerHTML = ``;

        //Total Marks
        const totalmarks = Number(mark1) + Number(mark2) + Number(mark3) + Number(mark4) + Number(mark5);
        // document.getElementById("total").value = totalmarks.toFixed(2);

        //Average Mark
        const averagemark = (totalmarks / 500) * 100;
        // document.getElementById("average").value = averagemark.toFixed(2);

        console.log("Average Mark " + averagemark.toFixed(2));
        //Grade
        if (averagemark < 40) {
            // document.getElementById("grade").value = "F grade";
            // document.getElementById("result").value = "FAIL";
            console.log("F Grade " + " Fail")
            return [totalmarks, "F"];

        } else if (averagemark >= 40 && averagemark < 60) {
            // document.getElementById("grade").value = "B grade";
            // document.getElementById("result").value = "PASS";
            console.log("B Grade " + " PASS ")
            return [totalmarks, "B"];

        } else if (averagemark >= 60 && averagemark < 80) {
            // document.getElementById("grade").value = "A grade";
            // document.getElementById("result").value = "PASS";
            console.log("A Grade " + " PASS ")
            return [totalmarks, "A"];

        } else if (averagemark >= 80 && averagemark < 90) {
            // document.getElementById("grade").value = "A+ grade";
            // document.getElementById("result").value = "PASS";
            console.log("A+ Grade " + " PASS ")
            return [totalmarks, "A+"];

        } else if (averagemark > 90) {
            // document.getElementById("grade").value = "O grade";
            // document.getElementById("result").value = "PASS";
            console.log("O Grade " + " PASS ")
            return [totalmarks, "O"];
        }
        console.log("Total Marks " + totalmarks.toFixed(2));
    }
}