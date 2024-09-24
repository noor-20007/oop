// get elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let disscount = document.getElementById("disscount");
let small = document.getElementById("total");
let count = document.getElementById("count");
let ategory = document.getElementById("ategory");
let submit = document.getElementById("submit");
let mode = 'Create';
let temp;
//console.log(title,price,taxes,ads,disscount,small,count,ategory,submit);
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value)-
        +disscount.value;
        small.innerHTML=result
        small.style.backgroundColor="#040"
    }else{
        small.innerHTML=""
        small.style.backgroundColor="#a00d02"

    }

}
// create product
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = []; 
}

submit.onclick = function (){
    let newPro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        disscount:disscount.value,
        small:small.innerHTML,
        count:count.value,
        ategory:ategory.value.toLowerCase()
    }
    if(newPro.count>=100){
        alert("you must count number less than 100 !!!!!!")
    }
    if(title.value == '' || price.value == '' || ategory.value == ''){
        alert("you must complete the form!!!!")
    }
    if(title.value != '' && price.value != '' && ategory.value != ''
    && newPro.count < 100 ){
        if(mode === 'Create'){
            if(newPro.count > 1){
                for(let i = 0 ; i < newPro.count ; i++){
                    dataPro.push(newPro);
                };
            }else{
                dataPro.push(newPro);
            };
        }else{
            dataPro[temp] = newPro;
            mode = 'Create';
            submit.innerHTML = 'Create';
            count.style.display = 'block'
    
        }
        clearData();


    }
  

   
    // save local storage
    localStorage.setItem('product',JSON.stringify(dataPro))
    console.log(dataPro)


  
    showData();

};
// clear data
function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    disscount.value = "";
    small.innerHTML = "",
    count.value = "",
    ategory.value = ""
}
// read
function showData(){
    let table = "";
    for(let i = 0; i<dataPro.length ; i++){
        table +=`
        <tr>
                            <td>${i+1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].disscount}</td>
                            <td>${dataPro[i].small}</td>
                            <td>${dataPro[i].ategory}</td>
                            <td><button onclick=updateData(${i}) id="update">update</button></td>
                            <td><button onclick=deleteData(${i}) id="delete">delete</button></td>
                       
                        </tr> 
        
        `;
        getTotal();
    }

    document.getElementById("tbody").innerHTML=table;
    let btnDelete = document.getElementById("deleteAll");
    if(dataPro.length > 0){
        btnDelete.innerHTML=`
        <button onclick="deleteAll()">Delete All(${dataPro.length})</button>
        
        `
        
    }else{
        btnDelete.innerHTML=""
    }

}
showData();
// delete 
function deleteData(i){
      dataPro.splice(i,1);
      localStorage.product = JSON.stringify(dataPro);
      showData();

}
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();

}
// count
// update
function updateData(i){
   title.value = dataPro[i].title;
   price.value = dataPro[i].price;
   taxes.value = dataPro[i].taxes;
   ads.value = dataPro[i].ads;
   disscount.value = dataPro[i].disscount;  
   getTotal();
   count.style.display = 'none';
   ategory.value = dataPro[i].ategory;
   submit.innerHTML = 'Update'
   mode = 'Update';
   temp = i ;
   scroll({
    top:0 ,
    behavior:'smooth'
   })
}
// search

let searchMode = 'title';
function getSearchMode(id){
    let search = document.getElementById('search');
    // console.log(id)
    if(id == "searchTitle"){
        searchMode = 'title'
    }else{
        searchMode = 'category'
       
    }
    search.placeholder = 'search by '+searchMode
    console.log(searchMode);
    search.focus();
    search.value = ''
    showData;

};
function searchData(value){
    let table = '' ;
    if(searchMode =='title'){
        for(let i = 0 ; i<dataPro.length ; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table +=`
                <tr>
                                    <td>${i}</td>
                                    <td>${dataPro[i].title}</td>
                                    <td>${dataPro[i].price}</td>
                                    <td>${dataPro[i].taxes}</td>
                                    <td>${dataPro[i].ads}</td>
                                    <td>${dataPro[i].disscount}</td>
                                    <td>${dataPro[i].small}</td>
                                    <td>${dataPro[i].ategory}</td>
                                    <td><button onclick=updateData(${i}) id="update">update</button></td>
                                    <td><button onclick=deleteData(${i}) id="delete">delete</button></td>
                               
                                </tr> 
                
                `;
                
            }
        }

    }else{
        for(let i = 0 ; i<dataPro.length ; i++){
            if(dataPro[i].ategory.includes(value.toLowerCase())){
                table +=`
                <tr>
                                    <td>${i}</td>
                                    <td>${dataPro[i].title}</td>
                                    <td>${dataPro[i].price}</td>
                                    <td>${dataPro[i].taxes}</td>
                                    <td>${dataPro[i].ads}</td>
                                    <td>${dataPro[i].disscount}</td>
                                    <td>${dataPro[i].small}</td>
                                    <td>${dataPro[i].ategory}</td>
                                    <td><button onclick=updateData(${i}) id="update">update</button></td>
                                    <td><button onclick=deleteData(${i}) id="delete">delete</button></td>
                               
                                </tr> 
                
                `;
                
            }
        }

    }
    document.getElementById("tbody").innerHTML=table;
}