let title = document.getElementById("title")
let sum = document.querySelectorAll(".same")
let total = document.getElementById("total")
let category = document.getElementById("category")
let count = document.getElementById("count")
let submit = document.getElementById("submit")
let totalColor = document.querySelectorAll(".color")
let tableBody = document.getElementById("tableBody")
let deleteAll = document.getElementById("deleteAll")
let search = document.getElementById("search")
let productsNum = document.getElementById("productsNum")
let countWarning = document.getElementById("countWarning")

let proContainer = []
let flag = "create"
let tmp
if (localStorage.getItem("products") != null) {
    proContainer = JSON.parse(localStorage.getItem("products"))
    showData()
}
else {
    proContainer = []
}






function getTotal() {
    if (sum[0].value != "") {
        let result = (+sum[0].value + +sum[1].value + +sum[2].value) - +sum[3].value


        total.innerHTML = result

        for (i = 0; i < totalColor.length; i++) {

            totalColor[i].style.backgroundColor = "green"
        }

    }
    else {
        total.innerHTML = ""

        for (i = 0; i < totalColor.length; i++) {



            totalColor[i].style.backgroundColor = "red"
        }
    }
}


for (i = 0; i < sum.length; i++) {
    sum[i].addEventListener("keyup", function () {

        getTotal()




    })
}


submit.addEventListener("click", function () {

    let newPro = {
        title: title.value,
        price: sum[0].value,
        taxes: sum[1].value,
        ads: sum[2].value,
        discount: sum[3].value,
        total: total.innerHTML,
        category: category.value,
        count: count.value
    }

    if (flag === "create") {
        if (newPro.count > 1 && newPro.count <= 100 ) {
            for (i = 0; i < newPro.count; i++) {
                proContainer.push(newPro)
            }
            countWarning.style.display = "none"
        }
        else if (newPro.count > 100) {
          
           countWarning.style.display = "block"
        }
        else {
            proContainer.push(newPro)
            countWarning.style.display = "none" 
        }
    }
    else {
        proContainer[tmp] = newPro
        submit.innerHTML = "create"
        count.style.display = "block"
        flag = "create"
    }





    localStorage.setItem("products", JSON.stringify(proContainer))


    showData()
    clearInputs()
    getTotal()
})



function showData() {
    let container = ""

    for (i = 0; i < proContainer.length; i++) {

        container += `<tr>
        <td>${i+1}</td>
        <td>${proContainer[i].title}</td>
        <td>${proContainer[i].price}</td>
        <td>${proContainer[i].taxes}</td>
        <td>${proContainer[i].ads}</td>
        <td>${proContainer[i].discount}</td>
        <td>${proContainer[i].total}</td>
        <td>${proContainer[i].category}</td>
        <td><button onclick = 'updatePro(${i})' class="change-ptn">update</button></td>
        <td><button onclick = 'deletePro(${i})' class="change-ptn">delete</button></td>
        
    </tr>`
    }

    tableBody.innerHTML = container

    if (proContainer.length > 0) {
        deleteAll.style.display = "block"
        productsNum.innerHTML = `( ${proContainer.length} )`
    }
    else {
        deleteAll.style.display = "none"
    }

}

deleteAll.addEventListener("click", function () {
    localStorage.clear()
    proContainer.splice(0)
    showData()
})


function clearInputs() {
    title.value = ""
    sum[0].value = ""
    sum[1].value = ""
    sum[2].value = ""
    sum[3].value = ""
    category.value = ""
    count.value = ""
}


function deletePro(i) {

    proContainer.splice(i, 1)
    localStorage.setItem("products", JSON.stringify(proContainer))
    showData()
}



function updatePro(i) {
    title.value = proContainer[i].title
    price.value = proContainer[i].price
    taxes.value = proContainer[i].taxes
    discount.value = proContainer[i].discount
    category.value = proContainer[i].category
    count.style.display = "none"
    submit.innerHTML = "update"
    flag = "update"
    getTotal()
    tmp = i
    window.scroll({
        top: 0,
        behavior: "smooth"
    })



}



let searchBtn = document.querySelectorAll(".search")
let searchMood = "title"

for (i = 0; i < searchBtn.length; i++) {
    searchBtn[i].addEventListener("click", function () {
        if (this.id == "searchByCategory") {
            searchMood = "category"

        }
        else {
            searchMood = "title"

        }
        search.placeholder = `search by ${searchMood}`
        search.focus()
        search.value = ""
        showData()
    })
}

function searchPro(value) {

    let container = ""
    for (let i = 0; i < proContainer.length; i++) {
        if (searchMood == "title") {


            if (proContainer[i].title.toLowerCase().includes(value.toLowerCase())) {


                container += `<tr>
                <td>${i+1}</td>
                <td>${proContainer[i].title}</td>
                <td>${proContainer[i].price}</td>
                <td>${proContainer[i].taxes}</td>
                <td>${proContainer[i].ads}</td>
                <td>${proContainer[i].discount}</td>
                <td>${proContainer[i].total}</td>
                <td>${proContainer[i].category}</td>
                <td><button onclick = 'updatePro(${i})' class="change-ptn">update</button></td>
                <td><button onclick = 'deletePro(${i})' class="change-ptn">delete</button></td>
                
            </tr>`
            }



        }
        else {

            if (proContainer[i].category.toLowerCase().includes(value.toLowerCase())) {


                container += `<tr>
                <td>${i+1}</td>
                <td>${proContainer[i].title}</td>
                <td>${proContainer[i].price}</td>
                <td>${proContainer[i].taxes}</td>
                <td>${proContainer[i].ads}</td>
                <td>${proContainer[i].discount}</td>
                <td>${proContainer[i].total}</td>
                <td>${proContainer[i].category}</td>
                <td><button onclick = 'updatePro(${i})' class="change-ptn">update</button></td>
                <td><button onclick = 'deletePro(${i})' class="change-ptn">delete</button></td>
                
            </tr>`
            }



        }
    }
    tableBody.innerHTML = container
}

search.addEventListener("keyup", function () {


    searchPro(this.value)
})





