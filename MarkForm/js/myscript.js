function calculate() {
    const mark1 = document.getElementById("mark1").value;
    const mark2 = document.getElementById("mark2").value;
    const mark3 = document.getElementById("mark3").value;
    const mark4 = document.getElementById("mark4").value;
    const mark5 = document.getElementById("mark5").value;

    if(Number(mark1) < 0 || Number(mark2) < 0 || Number(mark3) < 0 || Number(mark4) < 0 || Number(mark5) < 0){
        document.querySelector(".errormessage").innerHTML = "Mark should not be less than Zero";

    }else if (Number(mark1) > 100 || Number(mark2) > 100 || Number(mark3) > 100 || Number(mark4) > 100 || Number(mark5) > 100) {
        document.querySelector(".errormessage").innerHTML = "Mark should be not be above 100";
    } else {

        document.querySelector(".errormessage").innerHTML = ``;
        
        //Total Marks
        const totalmarks = Number(mark1) + Number(mark2) + Number(mark3) + Number(mark4) + Number(mark5);
        document.getElementById("total").value = totalmarks;

        //Average Mark
        const averagemark = (totalmarks / 500) * 100;
        document.getElementById("average").value = averagemark;

        //Grade
        if (averagemark < 40) {
            document.getElementById("grade").value = "F grade";
            document.getElementById("result").value = "FAIL";
            console.log("F Grade " + " Fail")

        } else if (averagemark >= 40 && averagemark < 60) {
            document.getElementById("grade").value = "B grade";
            document.getElementById("result").value = "PASS";
            console.log("B Grade " + " PASS ")

        } else if (averagemark >= 60 && averagemark < 80) {
            document.getElementById("grade").value = "A grade";
            document.getElementById("result").value = "PASS";
            console.log("A Grade " + " PASS ")

        } else if (averagemark >= 80 && averagemark < 90) {
            document.getElementById("grade").value = "A+ grade";
            document.getElementById("result").value = "PASS";
            console.log("A+ Grade " + " PASS ")

        } else if (averagemark > 90) {
            document.getElementById("grade").value = "O grade";
            document.getElementById("result").value = "PASS";
            console.log("O Grade " + " PASS ")
        }

        console.log("Total Marks " + totalmarks);
        console.log("Average Mark " + averagemark);
    }
}