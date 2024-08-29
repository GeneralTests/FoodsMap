// [1] create variables
let maps = [];
if (localStorage.getItem("maps")) {
    maps = JSON.parse(localStorage.getItem("maps"));
    // show cards
    // interface
    // [2] check Maps array has not any items
    // => if array has item do not show .NoOneMap face
    if (maps.length == 0) {
        document.body.style.overflow = 'hidden';
        document.body.innerHTML = `
        <section class="NoOneMap">
            <div class="text">
                لم تقم بإنشاء اي خطة إلى الآن هل تريد إنشاء واحدة
                <br><br>
                <button id="showCreateMapPanel" onclick='showCreateMapPanel()'>أنشإ واحدة الآن</button>
            </div>
        </section>
        `;
    }
    else {
        document.body.style.overflow = 'auto';
        ShowRightCards(maps)

    }
}
else {
    localStorage.setItem("maps", "");
    // => if array has item do not show .NoOneMap face
    document.body.style.overflow = 'hidden';
    document.body.innerHTML = `
    <section class="NoOneMap">
        <div class="text">
            لم تقم بإنشاء اي خطة إلى الآن هل تريد إنشاء واحدة
            <br><br>
            <button id="showCreateMapPanel" onclick='showCreateMapPanel()'>أنشإ واحدة الآن</button>
        </div>
    </section>
    `;
}
// refresh or inner right cards
function ShowRightCards(maps) {
    if (document.querySelector(".ShowContainar")) {
        document.querySelector(".ShowContainar").remove();
    }
    let sect = document.createElement("section")
    sect.className = 'CreateContainar';
    document.body.append(sect)
    let sect2 = document.createElement("section")
    sect2.className = 'ShowContainar';
    sect2.innerHTML = `
    <button class='addNewMap' onclick='showCreateMapPanel2()'>أضف خطة علفية</button>
    <section class='cards'></section>`;
    document.body.append(sect2)
    for (let i = 0; i < maps.length; i++){
        let card = document.createElement("div");
        card.className = `card card${i}`;
        card.innerHTML = `
            <article class="cardNote cardNote${i}">
                <div class="content" dir="auto">
                    ${maps[i].note}
                </div>
                <button class="btn" dir="auto" onclick="ShowNotes('cardNote${i}')">
                    عرض الملاحظات <img src="angleDown.svg" width="15">
                </button>
            </article>
            <article class="cardConent">
                <div class="cardName">
                    ${maps[i].name}
                </div>
                <ul class="cardInfo">
                    <li class="cardTargetAnimal">الحيوان المستهدف : <span id="cardTargetAnimal">${maps[i].targetAnimale}</span></li>
                    <li class="cardProtien" dir="auto">نسبة البروتين :<span id="cardProtien" dir="auto">${maps[i].TotalProtein} %</span></li>
                    <li class="cardTotalWeight"> إجمالي الوزن :<span id="cardTotalWeight"></span>${maps[i].TotalWeight} كيلو</li>
                    <li class="cardTotalPrice">اجمالي التكلفة : <span id="cardTotalPrice">${maps[i].TotalPrice} جنيه</span></li>
                </ul>
                <div class="mapButtons" >
                    <span class="DeletMap" onclick='ShowDeletMap(${i})'>حذف الخطة</span>
                    <span class="showMoreInfo" onclick='ShowAllCardInfo(${i})'>عرض معلومات الخطة بالكامل <img src="grow.svg" width="18"></span>
                </div>
            </article>
        `;
        document.querySelector(".ShowContainar .cards").append(card);
    }
}
// [3] .NoOneMap .onclick=> show create panel panel
function showCreateMapPanel() {
    document.body.style.overflow = 'auto';
    document.body.innerHTML = `
    <section class="CreateContainar">
        <h3 class="title">إنشاء الخلطة 
            <span class="calcIco">
                <img src="calculator.svg" width="30px" draggable="false" id="CalcMenuBtn" onclick="showCalcMenu()">
                <div class="CalcMenu">
                    <span class="CalcResult" dir="auto">الناتج : <span id="CalcResult"></span></span>
                    <input type="number" id="CalcMount" placeholder="الكمية (ك)" oninput="InnerCalcResult()">
                    <input type="number" id="CalcPrice" placeholder="سعر الكيلو" oninput="InnerCalcResult()">
                </div>
            </span>
            </h3>
        <article class="content">
            <input type="text" id="MapName" dir="auto" placeholder="اكتب اسما رمزيا لهذه الخلطة" autofocus>
            <section>
                <div class="table">
                    <table dir="auto">
                        <caption>المكونات</caption>
                        <thead>
                            <th>الإسم</th>
                            <th>الكمية</th>
                            <th>السعر</th>
                            <th class="ThProtien">البروتين %</th>
                        </thead>
                        <tbody id="tbody">
                        </tbody>
                    </table>
                    <ul class="DeletRows">
                    </ul>
                    <button id="addNewItem" onclick="NewRow()">اضف مكون +</button>
                </div>
                <ul class="MapProperties">
                    <li class="TargetAnimal">
                        الحيوان المستهدف
                        <select id="TargetAnimal">
                            <option value="">--اختر شيئا--</option>
                            <option value="خروف تسمين">خروف تسمين</option>
                            <option value="خروف قناية">خروف قناية</option>
                            <option value="خروف طلوقة">خروف طلوقة</option>
                            <option value="AshrNaeja">نعاج عشر</option>
                            <option value="رميسة">رميس</option>
                            <option value="نعاج والدة"> نعاج والدة</option>
                            <option value="عجول قناية"> عجول قناية</option>
                            <option value="عجول طلوقة"> عجول طلوقة</option>
                            <option value="عجول تسمين"> عجول تسمين</option>
                            <option value="عجلة"> عجلة </option>
                            <option value="بقرة فاضية"> بقرة فاضية</option>
                            <option value="بقرة عشر"> بقرة عشر</option>
                            <option value="بقرة والدة"> بقر والدة</option>
                            <option value="بقر حلاب"> بقر حلاب</option>
                            <option value="ماعز"> ماعز</option>
                            <option value="جديان"> جديان</option>
                            <option value="تيوس"> تيوس</option>
                            <option value="كتاكيت"> كتاكيت</option>
                            <option value="بط"> بط</option>
                            <option value="دجاج"> دجاج</option>
                            <option value="ارانب"> ارانب</option>
                        </select>
                    </li>
                    <li class="Date">
                        تاريخ الإنشاء<input id="Date" type="date">
                    </li>
                    <li class="protein auto">
                      :   نسبة البروتين في الخلطة<span id="protein">0</span>%
                    </li>
                    <li class="weight  auto">
                       : اجمالي الوزن<span id="weight">0</span>ك
                    </li>
                    <li class="price  auto">
                       : اجمالي التكلفة<span id="price">0</span>ج
                    </li>
                </ul>
                <div class="notes">
                    <textarea id="Notes" placeholder="ملاحطات (اختياري)" dir="auto"></textarea>
                </div>
            </section>
                <div class="MapButtons">
                    <button class="SaveMap" onclick="CreateMap()">حفظ الخطة</button>
                    <button class="DeletMap" onclick='CancelCreateMap()'>إلفاء الخطة</button>
                </div>
        </article>
    </section>
    <section class="ShowContainar">
    <button class='addNewMap' onclick='showCreateMapPanel2()'>أضف خطة علفية</button>
    <section class='cards'></section>
    </section>
    `; document.querySelector(".CreateContainar").style.display='flex'
    // set input date value
    let d=new Date();
    let inp=document.getElementById("Date")
    if(d.getMonth() + 1<10){
        inp.value=`${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}`
    }
    if(d.getDate()<10){
        inp.value= `${d.getFullYear()}-${d.getMonth() + 1}-0${d.getDate()}`
    }
    if (d.getMonth() + 1 < 10 && d.getDate() < 10) { 
        inp.value= `${d.getFullYear()}-0${d.getMonth() + 1}-0${d.getDate()}`
    }
}
function showCreateMapPanel2() {
    let check=window.getComputedStyle(document.querySelector(".CreateContainar")).getPropertyValue("display")
    if (check!='flex') {
        document.querySelector(".CreateContainar").style.display = 'flex';
        document.querySelector(".CreateContainar").innerHTML = `
        <h3 class="title">إنشاء الخلطة 
            <span class="calcIco">
                <img src="calculator.svg" width="30px" draggable="false" id="CalcMenuBtn" onclick="showCalcMenu()">
                <div class="CalcMenu">
                    <span class="CalcResult" dir="auto">الناتج : <span id="CalcResult"></span></span>
                    <input type="number" id="CalcMount" placeholder="الكمية (ك)" oninput="InnerCalcResult()">
                    <input type="number" id="CalcPrice" placeholder="سعر الكيلو" oninput="InnerCalcResult()">
                </div>
            </span>
            </h3>
        <article class="content">
            <input type="text" id="MapName" dir="auto" placeholder="اكتب اسما رمزيا لهذه الخلطة" autofocus>
            <section>
                <div class="table">
                    <table dir="auto">
                        <caption>المكونات</caption>
                        <thead>
                            <th>الإسم</th>
                            <th>الكمية</th>
                            <th>السعر</th>
                            <th class="ThProtien">البروتين %</th>
                        </thead>
                        <tbody id="tbody">
                        </tbody>
                    </table>
                    <ul class="DeletRows">
                    </ul>
                    <button id="addNewItem" onclick="NewRow()">اضف مكون +</button>
                </div>
                <ul class="MapProperties">
                    <li class="TargetAnimal">
                        الحيوان المستهدف
                        <select id="TargetAnimal">
                            <option value="">--اختر شيئا--</option>
                            <option value="خروف تسمين">خروف تسمين</option>
                            <option value="خروف قناية">خروف قناية</option>
                            <option value="خروف طلوقة">خروف طلوقة</option>
                            <option value="نعاج عشر">نعاج عشر</option>
                            <option value="رميسة">رميس</option>
                            <option value="نعاج والدة"> نعاج والدة</option>
                            <option value="عجول قناية"> عجول قناية</option>
                            <option value="عجول طلوقة"> عجول طلوقة</option>
                            <option value="عجول تسمين"> عجول تسمين</option>
                            <option value="عجلة"> عجلة </option>
                            <option value="بقرة فاضية"> بقرة فاضية</option>
                            <option value="بقرة عشر"> بقرة عشر</option>
                            <option value="بقرة والدة"> بقر والدة</option>
                            <option value="بقر حلاب"> بقر حلاب</option>
                            <option value="ماعز"> ماعز</option>
                            <option value="جديان"> جديان</option>
                            <option value="تيوس"> تيوس</option>
                            <option value="كتاكيت"> كتاكيت</option>
                            <option value="بط"> بط</option>
                            <option value="دجاج"> دجاج</option>
                            <option value="ارانب"> ارانب</option>
                        </select>
                    </li>
                    <li class="Date">
                        تاريخ الإنشاء<input id="Date" type="date">
                    </li>
                    <li class="protein auto">
                        :   نسبة البروتين في الخلطة<span id="protein">0</span>%
                    </li>
                    <li class="weight  auto">
                        : اجمالي الوزن<span id="weight">0</span>ك
                    </li>
                    <li class="price  auto">
                        : اجمالي التكلفة<span id="price">0</span>ج
                    </li>
                </ul>
                <div class="notes">
                    <textarea id="Notes" placeholder="ملاحطات (اختياري)" dir="auto"></textarea>
                </div>
            </section>
                <div class="MapButtons">
                    <button class="SaveMap" onclick="CreateMap()">حفظ الخطة</button>
                    <button class="DeletMap" onclick='CancelCreateMap()'>إلفاء الخطة</button>
                </div>
        </article>
        `;
        window.scrollTo({top: 0,})
        // set input date value
        let d=new Date();
        let inp=document.getElementById("Date")
        if(d.getMonth() + 1<10){
            inp.value=`${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}`
        }
        if(d.getDate()<10){
            inp.value= `${d.getFullYear()}-${d.getMonth() + 1}-0${d.getDate()}`
        }
        if (d.getMonth() + 1 < 10 && d.getDate() < 10) { 
            inp.value= `${d.getFullYear()}-0${d.getMonth() + 1}-0${d.getDate()}`
        } 
    }
}
// [4] show calc & turn on it
let ShowCalc = false;
function showCalcMenu() {
    if (ShowCalc == false) {
        document.querySelector(".CalcMenu").style.display = 'flex';
        ShowCalc = true;
    }
    else {
        document.querySelector(".CalcMenu").style.display = 'none';
        ShowCalc = false;
    }
}
function InnerCalcResult() {
    document.querySelector(".CalcResult").innerHTML=+document.querySelector("#CalcMount").value * +document.querySelector("#CalcPrice").value
}
// =>hidden CalcMenu
document.onclick = (r) => {
    if (document.querySelector(".CalcMenu")) {   
        if (r.target.className != 'CalcMenu' && r.target.className != 'CalcResult' && r.target.id != 'CalcMount' && r.target.id != 'CalcPrice' && r.target.id !='CalcMenuBtn') {
            let check = window.getComputedStyle(document.querySelector(".CalcMenu")).getPropertyValue("display");
            if (check == 'flex') {
                document.querySelector(".CalcMenu").style.display = 'none';
                ShowCalc = false;
            }
        }
    }
}
// Add a new row in table
let trIndex = 0;
function NewRow() {
    let tr = document.createElement("tr");
    tr.id = `row${trIndex}`;
    tr.innerHTML = `
    <td class='tdName'>
        <input type="text" placeholder="الإسم" class="ingredName">
    </td>
    <td class="ingredWasn">
        <span>
            <input type="number" placeholder="الكمية" class="ingredMuch" oninput='InnerTotalWasn()'>
            <select class="ingredUnit" onchange='InnerTotalWasn()'>
                <option value="كيلو">كيلو</option>
                <option value="جرام">جرام</option>
            </select>
        </span>
    </td>
    <td class='tdPrice'>
        <input type="number" class="ingredPrice" placeholder="السعر الكلي" oninput='InnerTotalPrice()'>
    </td>
    <td class="ingredPrtienTd">
        <input type="number" class="ingredProtein" placeholder="البروتين" oninput='InnerTotalProtien()'>
        <span style="display: inline-block;">%</span>
    </td>`;
    // delet row
    document.getElementById("tbody").append(tr);
    document.querySelector(".DeletRows").innerHTML += `
    <li data-delet="${trIndex}" onclick='DeletRow("row${trIndex}",this)'>
        -
    </li>`;
    trIndex = trIndex + 1;
}
// Delet row function
function DeletRow(id, HTMLLiRemove) {
    document.getElementById(id).remove()
    HTMLLiRemove.remove();
    let trs = document.querySelectorAll("#tbody tr");
    let LisRemove=document.querySelectorAll(".DeletRows li")
    if (trs.length == 0) {
        trIndex = 0;
    }
    else {
        for (let id = 0; id < trs.length; id++){
            trs[id].id = `row${id}`;
            LisRemove[id].setAttribute("data-delet", `${id}`);
            LisRemove[id].setAttribute("onclick",`DeletRow("row${id}",this)`)
        }
        trIndex = trs.length;
    }
    // refersh auto information
    InnerTotalProtien(); 
    InnerTotalPrice();
    InnerTotalWasn()
}
// inner auto information
function InnerTotalProtien() {
    let trs = document.querySelectorAll("tbody tr");
    let proteinSP = document.getElementById("protein");
    let weightSP = document.getElementById("weight").textContent;
    proteinSP.textContent = 0;
    for (let i = 0; i < trs.length; i++){
        let add =(+trs[i].querySelector("td .ingredMuch").value/+weightSP) * +trs[i].querySelector("td .ingredProtein").value
        let val = +proteinSP.textContent + add;
        proteinSP.textContent = +val.toFixed(1);
        // .log(weightSP/100)
    }
}
function InnerTotalPrice() {
    let trs = document.querySelectorAll("tbody tr");
    let priceSP = document.getElementById("price");
    priceSP.textContent = 0;
    for (let i = 0; i < trs.length; i++){
        priceSP.textContent = + priceSP.textContent + +trs[i].querySelector("td .ingredPrice").value;
    }
}
function InnerTotalWasn() {
    let trs = document.querySelectorAll("tbody tr");
    let weightSP = document.getElementById("weight");
    weightSP.textContent = 0;
    for (let i = 0; i < trs.length; i++){
        let weightUnit = trs[i].querySelector("td .ingredUnit").value;
        if (weightUnit == 'كيلو') {
            weightSP.textContent = +weightSP.textContent + +trs[i].querySelector("td .ingredMuch").value;
        }
        else if (weightUnit == 'جرام') {
            weightSP.textContent = +weightSP.textContent + (+trs[i].querySelector("td .ingredMuch").value/1000);
        }
    }
    InnerTotalProtien();
}
// [5] create map =>{
function CreateMap() {
// 2:[create & push] map to array & LocalStorage
    // 1: check from items
    let TargetAnimalVal = document.getElementById("TargetAnimal");
    let DateVal = document.getElementById("Date");
    let MapName = document.getElementById("MapName");
    let trs = document.querySelectorAll("tbody tr");
    let note = document.getElementById("Notes");
    // auto matec value
    let weightSP = document.getElementById("weight");
    let priceSP = document.getElementById("price");
    let proteinSP = document.getElementById("protein");
    // remove red bg from all td
    for (let RMV = 0; RMV < trs.length; RMV++){
        trs[RMV].querySelectorAll('td').forEach((td) => {
            td.style.background='transparent'
        })
    }
    // check from table & add red bg to null td
    let td_null_count = 0;
    for (let index = 0; index < trs.length; index++) {
        // check from all values
        let ingredName = trs[index].querySelector("td .ingredName").value;
        let ingredMuch = trs[index].querySelector("td .ingredMuch").value;
        let ingredUnit = trs[index].querySelector("td .ingredUnit").value;
        let ingredPrice = trs[index].querySelector("td .ingredPrice").value;
        let ingredProtein = trs[index].querySelector("td .ingredProtein").value;
        if (ingredName == '') {
            trs[index].querySelector(".tdName").style.background = 'rgba(255, 0, 0, 0.157)';
            td_null_count = td_null_count+1;
        }
        if (ingredMuch == '') {
            trs[index].querySelector(".ingredWasn").style.background = 'rgba(255, 0, 0, 0.157)';
            td_null_count = td_null_count+1;
        }
        if (ingredPrice == '') {
            trs[index].querySelector(".tdPrice").style.background = 'rgba(255, 0, 0, 0.157)';
            td_null_count = td_null_count+1;
        }
        if (ingredProtein == '') {
            trs[index].querySelector(".ingredPrtienTd").style.background = 'rgba(255, 0, 0, 0.157)';
            td_null_count = td_null_count+1;
        }
    }
    // check from all inputs in all tr
    if (td_null_count > 0 && trs.length > 0) {
        let div = document.createElement("div");
        div.className = 'nullTdmessage';
        div.innerHTML = 'تأكد من تعبئة جميع الحقول, وعدم ترك اي حقل احمر';
        document.body.append(div);
        setTimeout(() => {
            div.remove();
        },5000)
    }
    // made interface for any problem
    if (trs.length == 0) {
        let div = document.createElement("div");
        div.className = 'nullTdmessage';
        div.innerHTML = 'يجب عليك كتابة مكونات هذه الخلطة';
        document.body.append(div);
        setTimeout(() => {
            div.remove();
        },5000)
    }
    if (MapName.value == '') {
        let div = document.createElement("div");
        div.className = 'nullTdmessage';
        div.innerHTML = 'اكتب اسما رمزيا لهذه الخطة';
        document.body.append(div);
        setTimeout(() => {
            div.remove();
        },5000)
    }
    if (TargetAnimalVal.value == '') {
        let div = document.createElement("div");
        div.className = 'nullTdmessage';
        div.innerHTML = 'حدد الحيوان المستهدف لهذه الخطة';
        document.body.append(div);
        setTimeout(() => {
            div.remove();
        },5000)
    }
    // if all values was fill
    if (td_null_count == 0 && trs.length > 0 && MapName.value != '' && TargetAnimalVal.value != '') {
        // start create the map
        document.querySelector(".CreateContainar").style.display = 'none';
        let ShowContainar = document.querySelector(".ShowContainar .cards");
        let map = {
            name: MapName.value,
            targetAnimale: TargetAnimalVal.value,
            date: DateVal.value,
            note: note.value,
            TotalProtein: proteinSP.innerHTML,
            TotalWeight: weightSP.innerHTML,
            TotalPrice: priceSP.innerHTML,
            ingrediants: [],
        }
        for (i = 0; i < trs.length; i++){
            let ingrediantsGroup = {
                ingredName: "",
                ingredMuch: "",
                ingredPrice: "",
                ingredProtein:"",
                ingredUnit:"",  
            }
            ingrediantsGroup.ingredName = trs[i].querySelector(".ingredName").value;
            ingrediantsGroup.ingredMuch = trs[i].querySelector(".ingredMuch").value;
            ingrediantsGroup.ingredPrice = trs[i].querySelector(".ingredPrice").value;
            ingrediantsGroup.ingredProtein = trs[i].querySelector(".ingredProtein").value;
            ingrediantsGroup.ingredUnit = trs[i].querySelector(".ingredUnit").value;
            map.ingrediants.push(ingrediantsGroup); 
        }
        // .log(ingrediantsGroup)
        maps.push(map);
        localStorage.setItem("maps", JSON.stringify(maps))
        // interface
        let card = document.createElement("div");
        card.className = `card card${maps.length-1}`;
        card.innerHTML = `
            <article class="cardNote cardNote${maps.length-1}">
                <div class="content" dir="auto">
                    ${map.note}
                </div>
                <button class="btn" dir="auto" onclick="ShowNotes('cardNote${maps.length-1}')">
                    عرض الملاحظات <img src="angleDown.svg" width="15">
                </button>
            </article>
            <article class="cardConent">
                <div class="cardName">
                    ${map.name}
                </div>
                <ul class="cardInfo">
                    <li class="cardTargetAnimal">الحيوان المستهدف : <span id="cardTargetAnimal">${map.targetAnimale}</span></li>
                    <li class="cardProtien" dir="auto">نسبة البروتين :<span id="cardProtien" dir="auto">${map.TotalProtein} %</span></li>
                    <li class="cardTotalWeight"> إجمالي الوزن :<span id="cardTotalWeight"></span>${map.TotalWeight} كيلو</li>
                    <li class="cardTotalPrice">اجمالي التكلفة : <span id="cardTotalPrice">${map.TotalPrice} جنيه</span></li>
                </ul>
                <div class="mapButtons">
                    <span class="DeletMap" onclick='ShowDeletMap(${maps.length-1})'>حذف الخطة</span>
                    <span class="showMoreInfo" onclick='ShowAllCardInfo(${maps.length - 1})'>
                        عرض معلومات الخطة بالكامل 
                        <img src="grow.svg" width="18">
                    </span>
                </div>
            </article>
        `;
        ShowContainar.append(card)
        document.body.style.overflow = 'auto';
        document.querySelector(".CreateContainar").innerHTML = '';
        // if problems message is defiend : remove it 
        if (document.querySelector(".nullTdmessage")) {
            document.querySelector(".nullTdmessage").remove();
        }   
    }
}
// cancel create map
function CancelCreateMap() {
    document.querySelector(".CreateContainar").style.display = 'none';
    document.querySelector(".CreateContainar").innerHTML = '';
    // if problems message is defiend : remove it 
    if (document.querySelector(".nullTdmessage")) {
        document.querySelector(".nullTdmessage").remove();
    }
}
// show notes function
function ShowNotes(Class) {
    document.querySelector(`.${Class} .content`).classList.toggle("displayFlex")
    document.querySelector(`.${Class} .btn`).classList.toggle("BtnAct")
}
// show all card info
function ShowAllCardInfo(index) {
    // add focus to card which editing now
    document.querySelectorAll(".card").forEach((card) => {
        card.classList.add("EditingCardBlur");
        card.classList.remove("editingCardFocus");
    })
    document.querySelector(`.card${index}`).classList.add('editingCardFocus');
    document.querySelector(`.card${index}`).classList.remove('EditingCardBlur');
    // edit\show card panel
    document.querySelector(".CreateContainar").style.display = 'flex';
    document.querySelector(".CreateContainar").innerHTML = `
        <h3 class="title">قراء الخطة </h3>
        <article class="content">
            <div class='read_mapName'>${maps[index].name}</div>
            <section>
                <div class="table">
                    <table dir="auto">
                        <caption>المكونات</caption>
                        <thead>
                            <th>الإسم</th>
                            <th>الكمية</th>
                            <th>السعر</th>
                            <th class="ThProtien">البروتين %</th>
                        </thead>
                        <tbody id="ReadMapTbody">
                        </tbody>
                    </table>
                </div>
                <ul class="MapProperties">
                    <li class="TargetAnimal" dir='auto'>
                        الحيوان المستهدف
                        :
                        ${maps[index].targetAnimale}
                    </li>
                    <li class="Date" style='gap:3px;'>
                        تاريخ الإنشاء : ${maps[index].date}
                    </li>
                    <li class="protein" style='gap:3px;'>
                    : نسبة البروتين في الخلطة<span id="protein">${maps[index].TotalProtein}</span>%
                    </li>
                    <li class="weight" style='gap:3px;'>
                    : اجمالي الوزن<span id="weight">${maps[index].TotalWeight}</span>كيلو
                    </li>
                    <li class="price" style='gap:3px;'>
                    : اجمالي التكلفة<span id="price">${maps[index].TotalPrice}</span>جنية
                    </li>
                </ul>
                <div class="notes">
                    <span id="ReadNotes" dir="auto">
                    ${maps[index].note}
                    </span>
                </div>
            </section>
                <div class="MapButtons">
                    <button class="SaveMap" onclick="EditMap(${index})">تعديل الخطة</button>
                    <button class='SaveMap' onclick='removeMapPanelRead()'>حسنا</button>
                </div>
        </article>
        `;
    // scroll to top
    window.scrollTo({ top: 0, });
    // append tbody td
    for (let a = 0; a < maps[index].ingrediants.length; a++){
        document.querySelector("#ReadMapTbody").innerHTML += `
        <tr>
            <td dir='auto'>${maps[index].ingrediants[a].ingredName}</td>
            <td dir='auto'>${maps[index].ingrediants[a].ingredMuch} ${maps[index].ingrediants[a].ingredUnit}</td>
            <td dir='auto'>${maps[index].ingrediants[a].ingredPrice}</td>
            <td dir='auto'>${maps[index].ingrediants[a].ingredProtein}%</td>
        </tr>
        `;

    }

}
function removeMapPanelRead() {
    document.querySelector(".CreateContainar").innerHTML = ``;
    document.querySelector(".CreateContainar").style.display = 'none';
    if (document.querySelector(".EditingCardBlur")) {
        document.querySelectorAll(".EditingCardBlur").forEach((item) => {
            item.classList.remove("EditingCardBlur");
        });
    }
    document.querySelector(".editingCardFocus").classList.remove("editingCardFocus");
    if (document.querySelector(".nullTdmessage")) {
        document.querySelector(".nullTdmessage").remove();
    }
}
function EditMap(index) {
    document.querySelector(".CreateContainar").style.display = 'flex';
    document.querySelector(".CreateContainar").innerHTML = `
    <h3 class="title">تعديل الخلطة 
        <span class="calcIco">
            <img src="calculator.svg" width="30px" draggable="false" id="CalcMenuBtn" onclick="showCalcMenu()">
            <div class="CalcMenu">
                <span class="CalcResult" dir="auto">الناتج : <span id="CalcResult"></span></span>
                <input type="number" id="CalcMount" placeholder="الكمية (ك)" oninput="InnerCalcResult()">
                <input type="number" id="CalcPrice" placeholder="سعر الكيلو" oninput="InnerCalcResult()">
            </div>
        </span>
        </h3>
    <article class="content">
        <input type="text" id="MapName" dir="auto" value='${maps[index].name}' placeholder="اكتب اسما رمزيا لهذه الخلطة" autofocus>
        <section>
            <div class="table">
                <table dir="auto">
                    <caption>المكونات</caption>
                    <thead>
                        <th>الإسم</th>
                        <th>الكمية</th>
                        <th>السعر</th>
                        <th class="ThProtien">البروتين %</th>
                    </thead>
                    <tbody id="tbody">
                    </tbody>
                </table>
                <ul class="DeletRows">
                </ul>
                <button id="addNewItem" onclick="NewRow()">اضف مكون +</button>
            </div>
            <ul class="MapProperties">
                <li class="TargetAnimal">
                    الحيوان المستهدف
                    <select id="TargetAnimal" >
                        <option value="">--اختر شيئا--</option>
                        <option value="خروف تسمين">خروف تسمين</option>
                        <option value="خروف قناية">خروف قناية</option>
                        <option value="خروف طلوقة">خروف طلوقة</option>
                        <option value="نعاج عشر">نعاج عشر</option>
                        <option value="رميسة">رميس</option>
                        <option value="نعاج والدة"> نعاج والدة</option>
                        <option value="عجول قناية"> عجول قناية</option>
                        <option value="عجول طلوقة"> عجول طلوقة</option>
                        <option value="عجول تسمين"> عجول تسمين</option>
                        <option value="عجلة"> عجلة </option>
                        <option value="بقرة فاضية"> بقرة فاضية</option>
                        <option value="بقرة عشر"> بقرة عشر</option>
                        <option value="بقرة والدة"> بقر والدة</option>
                        <option value="بقر حلاب"> بقر حلاب</option>
                        <option value="ماعز"> ماعز</option>
                        <option value="جديان"> جديان</option>
                        <option value="تيوس"> تيوس</option>
                        <option value="كتاكيت"> كتاكيت</option>
                        <option value="بط"> بط</option>
                        <option value="دجاج"> دجاج</option>
                        <option value="ارانب"> ارانب</option>
                    </select>
                </li>
                <li class="Date">
                    تاريخ الإنشاء<input id="Date" type="date" value='${maps[index].date}'>
                </li>
                <li class="protein auto">
                    :   نسبة البروتين في الخلطة<span id="protein">${maps[index].TotalProtein}</span>%
                </li>
                <li class="weight  auto">
                    : اجمالي الوزن<span id="weight">${maps[index].TotalWeight}</span>ك
                </li>
                <li class="price  auto">
                    : اجمالي التكلفة<span id="price">${maps[index].TotalPrice}</span>ج
                </li>
            </ul>
            <div class="notes">
                <textarea id="Notes" placeholder="ملاحطات (اختياري)" dir="auto"></textarea>
            </div>
        </section>
            <div class="MapButtons">
                <button class="SaveMap" onclick="SaveEditMap(${index})">حفظ التعديل</button>
                <button class="DeletMap" onclick='removeMapPanelRead()'>تجاهل التعديل</button>
            </div>
    </article>
    `;
    // set values
    document.querySelector("#Notes").innerText = maps[index].note;
    // set select value
    document.querySelector("#TargetAnimal").value = maps[index].targetAnimale;
    // set tabel items
    trIndex = 0;
    for (let a = 0; a < maps[index].ingrediants.length; a++){
        let tr = document.createElement("tr");
        tr.id=`row${trIndex}`
        tr.innerHTML= 
        `<td class='tdName'>
            <input type="text" placeholder="الإسم" class="ingredName" value='${maps[index].ingrediants[a].ingredName}'>
        </td>
        <td class="ingredWasn">
            <span>
                <input type="number" placeholder="الكمية" class="ingredMuch" oninput='InnerTotalWasn()' value='${maps[index].ingrediants[a].ingredMuch}'>
                <select class="ingredUnit ingredUnitEdit${a}" onchange='InnerTotalWasn()'>
                    <option value="كيلو">كيلو</option>
                    <option value="جرام">جرام</option>
                </select>
            </span>
        </td>
        <td class='tdPrice'>
            <input type="number" class="ingredPrice" placeholder="السعر الكلي" oninput='InnerTotalPrice()' value='${maps[index].ingrediants[a].ingredPrice}'>
        </td>
        <td class="ingredPrtienTd">
            <input type="number" class="ingredProtein" placeholder="البروتين" oninput='InnerTotalProtien()' value='${maps[index].ingrediants[a].ingredProtein}'>
            <span style="display: inline-block;">%</span>
        </td>`;

    document.getElementById("tbody").append(tr);
    // set seletc value
    document.querySelector(`.ingredUnitEdit${a}`).value=maps[index].ingrediants[a].ingredUnit    
    // delet row
    document.querySelector(".DeletRows").innerHTML += `
    <li data-delet="${trIndex}" onclick='DeletRow("row${trIndex}",this)'>
        -
    </li>`;
    trIndex = trIndex + 1;


    }
}
function SaveEditMap(index) {
    let TargetAnimalVal = document.getElementById("TargetAnimal");
    let DateVal = document.getElementById("Date");
    let MapName = document.getElementById("MapName");
    let trs = document.querySelectorAll("tbody tr");
    let note = document.getElementById("Notes");
    // auto matec value
    let weightSP = document.getElementById("weight");
    let priceSP = document.getElementById("price");
    let proteinSP = document.getElementById("protein");
    // remove red bg from all td
    for (let RMV = 0; RMV < trs.length; RMV++){
        trs[RMV].querySelectorAll('td').forEach((td) => {
            td.style.background='transparent'
        })
    }
    // check from table & add red bg to null td
    let td_null_count = 0;
    for (let index = 0; index < trs.length; index++) {
        // check from all values
        let ingredName = trs[index].querySelector("td .ingredName").value;
        let ingredMuch = trs[index].querySelector("td .ingredMuch").value;
        let ingredUnit = trs[index].querySelector("td .ingredUnit").value;
        let ingredPrice = trs[index].querySelector("td .ingredPrice").value;
        let ingredProtein = trs[index].querySelector("td .ingredProtein").value;
        if (ingredName == '') {
            trs[index].querySelector(".tdName").style.background = 'rgba(255, 0, 0, 0.157)';
            td_null_count = td_null_count+1;
        }
        if (ingredMuch == '') {
            trs[index].querySelector(".ingredWasn").style.background = 'rgba(255, 0, 0, 0.157)';
            td_null_count = td_null_count+1;
        }
        if (ingredPrice == '') {
            trs[index].querySelector(".tdPrice").style.background = 'rgba(255, 0, 0, 0.157)';
            td_null_count = td_null_count+1;
        }
        if (ingredProtein == '') {
            trs[index].querySelector(".ingredPrtienTd").style.background = 'rgba(255, 0, 0, 0.157)';
            td_null_count = td_null_count+1;
        }
    }
    // check from all inputs in all tr
    if (td_null_count > 0 && trs.length > 0) {
        let div = document.createElement("div");
        div.className = 'nullTdmessage';
        div.innerHTML = 'تأكد من تعبئة جميع الحقول, وعدم ترك اي حقل احمر';
        document.body.append(div);
        setTimeout(() => {
            div.remove();
        },5000)
    }
    // made interface for any problem
    if (trs.length == 0) {
        let div = document.createElement("div");
        div.className = 'nullTdmessage';
        div.innerHTML = 'يجب عليك كتابة مكونات هذه الخلطة';
        document.body.append(div);
        setTimeout(() => {
            div.remove();
        },5000)
    }
    if (MapName.value == '') {
        let div = document.createElement("div");
        div.className = 'nullTdmessage';
        div.innerHTML = 'اكتب اسما رمزيا لهذه الخطة';
        document.body.append(div);
        setTimeout(() => {
            div.remove();
        },5000)
    }
    if (TargetAnimalVal.value == '') {
        let div = document.createElement("div");
        div.className = 'nullTdmessage';
        div.innerHTML = 'حدد الحيوان المستهدف لهذه الخطة';
        document.body.append(div);
        setTimeout(() => {
            div.remove();
        },5000)
    }
    // if all values was fill
    if (td_null_count == 0 && trs.length > 0 && MapName.value != '' && TargetAnimalVal.value != '') {
        // start create the map
        document.querySelector(".CreateContainar").style.display = 'none';
        // document.querySelector(".CreateContainar").style.display = 'none';
        let ShowContainar = document.querySelector(".ShowContainar .cards");
        let map = {
            name: MapName.value,
            targetAnimale: TargetAnimalVal.value,
            date: DateVal.value,
            note: note.value,
            TotalProtein: proteinSP.innerHTML,
            TotalWeight: weightSP.innerHTML,
            TotalPrice: priceSP.innerHTML,
            ingrediants: [],
        }
        for (i = 0; i < trs.length; i++){
            let ingrediantsGroup = {
                ingredName: "",
                ingredMuch: "",
                ingredPrice: "",
                ingredProtein:"",
                ingredUnit:"",  
            }
            ingrediantsGroup.ingredName = trs[i].querySelector(".ingredName").value;
            ingrediantsGroup.ingredMuch = trs[i].querySelector(".ingredMuch").value;
            ingrediantsGroup.ingredPrice = trs[i].querySelector(".ingredPrice").value;
            ingrediantsGroup.ingredProtein = trs[i].querySelector(".ingredProtein").value;
            ingrediantsGroup.ingredUnit = trs[i].querySelector(".ingredUnit").value;
            map.ingrediants.push(ingrediantsGroup); 
        }
        // .log(ingrediantsGroup)
        // edit map line
        maps[index] = map;
        localStorage.setItem("maps", JSON.stringify(maps))
        document.querySelector(`.card${index}`).remove();
        // remove EditingCardBlur class
        if (document.querySelectorAll(".EditingCardBlur")) {            
            document.querySelectorAll(".EditingCardBlur").forEach((card) => {
                card.classList.remove("EditingCardBlur");
            })
        };
        // interface
        let card = document.createElement("div");
        card.className = `card card${index}`;
        card.innerHTML = `
            <article class="cardNote cardNote${maps.length-1}">
                <div class="content" dir="auto">
                    ${map.note}
                </div>
                <button class="btn" dir="auto" onclick="ShowNotes('cardNote${maps.length-1}')">
                    عرض الملاحظات <img src="angleDown.svg" width="15">
                </button>
            </article>
            <article class="cardConent">
                <div class="cardName">
                    ${map.name}
                </div>
                <ul class="cardInfo">
                    <li class="cardTargetAnimal">الحيوان المستهدف : <span id="cardTargetAnimal">${map.targetAnimale}</span></li>
                    <li class="cardProtien" dir="auto">نسبة البروتين :<span id="cardProtien" dir="auto">${map.TotalProtein} %</span></li>
                    <li class="cardTotalWeight"> إجمالي الوزن :<span id="cardTotalWeight"></span>${map.TotalWeight} كيلو</li>
                    <li class="cardTotalPrice">اجمالي التكلفة : <span id="cardTotalPrice">${map.TotalPrice} جنيه</span></li>
                </ul>
                <div class="mapButtons">
                    <span class="DeletMap" onclick='ShowDeletMap(${maps.length-1})'>حذف الخطة</span>
                    <span class="showMoreInfo" onclick='ShowAllCardInfo(${maps.length - 1})'>
                        عرض معلومات الخطة بالكامل 
                        <img src="grow.svg" width="18">
                    </span>
                </div>
            </article>
        `;
        ShowContainar.append(card)
        document.querySelector(".CreateContainar").innerHTML = '';
        // if problems message is defiend : remove it 
        if (document.querySelector(".nullTdmessage")) {
            document.querySelector(".nullTdmessage").remove();
        }
    }
}
function ShowDeletMap(index) {
    let sect = document.createElement("section");
    sect.className = 'AreSureDeletCard';
    sect.innerHTML = `
        <article>
            <span class="title">هل انت متأكد من حذف هذه الخطة</span>
            <div class="btns">
                <button id="yes" onclick='DeletMap(${index})'>نعم</button>
                <button id="no" onclick="document.body.style.overflow = 'auto';document.querySelector('.AreSureDeletCard').remove()">لا</button>
            </div>
        </article>
    `;
    document.body.append(sect);
    document.body.style.overflow = 'hidden';
}
function DeletMap(index) {
    maps.splice(index, 1);
    localStorage.setItem("maps", JSON.stringify(maps));  
    // refresh data
    // [2] check Maps array has not any items
    // => if array has item do not show .NoOneMap face
    if (maps.length == 0) {
        document.body.style.overflow = 'hidden';
        document.body.innerHTML = `
        <section class="NoOneMap">
            <div class="text">
                لم تقم بإنشاء اي خطة إلى الآن هل تريد إنشاء واحدة
                <br><br>
                <button id="showCreateMapPanel" onclick='showCreateMapPanel()'>أنشإ واحدة الآن</button>
            </div>
        </section>
        `;
    }
    else {
        document.body.style.overflow = 'auto';
        ShowRightCards(maps);
       document.querySelector('.AreSureDeletCard').remove()
    }
}
