function change () {
    

    if(document.getElementById("checkBtn").checked)
    {
        document.getElementById("label").innerHTML = "Candidate";
        document.getElementsByClassName("user")[0].style.visibility = "visible";
        document.getElementsByClassName("user")[1].style.visibility = "visible";
        document.getElementsByClassName("user")[2].style.visibility = "visible";
        document.getElementsByClassName("user")[3].style.visibility = "visible";
        document.getElementById("companyName").style.visibility = "hidden";
    }
    else
    {
        document.getElementById("label").innerHTML = "Employee";
        document.getElementsByClassName("user")[0].style.visibility = "hidden";
        document.getElementsByClassName("user")[1].style.visibility = "hidden";
        document.getElementsByClassName("user")[2].style.visibility = "hidden";
        document.getElementsByClassName("user")[3].style.visibility = "hidden";
        document.getElementById("companyName").style.visibility = "visible";
    }
}