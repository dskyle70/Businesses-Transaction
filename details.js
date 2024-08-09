localStorage.setItem('selling_items',0);
localStorage.setItem('no_of_t',0);

let opened_account=localStorage.getItem('acc_name_op');
document.getElementById('acc_name_opened').innerText=opened_account;
document.getElementById('acc_name_opened_').innerText=opened_account;
document.getElementById('acc_name_opened__').innerText=opened_account;
document.getElementById('_acc_name_opened').innerText=opened_account;
document.getElementById('__acc_name_opened').innerText=opened_account;
document.getElementById('ano').innerText=opened_account;
document.getElementById('anod').innerText=opened_account;
document.getElementById('anoo').innerText=opened_account;
var s='';
var spaces=[];
for (let i = 0; i < 31; i++) {
    spaces[i]=s;
    s+=' ';
    
}
if(typeof(localStorage.getItem(`debt_bal_for_${opened_account}`))=='object'){
    current_debt=0;
    localStorage.setItem(`debt_bal_for_${opened_account}`,0);
}else{
    current_debt=parseInt(localStorage.getItem(`debt_bal_for_${opened_account}`));
}
if(typeof(localStorage.getItem(`debt_owing_to_${opened_account}`))=='object'){
    current_owes=0;
    localStorage.setItem(`debt_owing_to_${opened_account}`,0);
}else{
    current_debt=parseInt(localStorage.getItem(`debt_owing_to_${opened_account}`));
}
function ch_trans(type){
    let transactions=document.getElementById('transactions');
    let opened_account=localStorage.getItem('acc_name_op');
    switch (type) {
        case 'purchase':
            transactions.innerHTML=`<p>what did 
        <span id="acc_name_opened"></span>
         do ?</p>
         <p><button type="button" onclick="ch_trans('purchase')">purchase something</button><button type="button" onclick="ch_trans('debt')">pay debt</button><button type="button" onclick="ch_trans('collect')">collect money</button></p>
    <p>Did 
        <span id="acc_name_opened_"></span> buy <select id="selling_it"></select>, if so, how many did <span id="acc_name_opened__"></span> buy</p>
    <p>answer: <input type="number" id="qty"><br><span id="error4"></span>
    <p>how much did <span id="__acc_name_opened"></span> pay: <input type="number" id="payment"><br><span id="error5"></span></p>
    <button onclick="confirm('purchase')" id="done">DONE</button></p>`;
    document.getElementById('acc_name_opened').innerText=opened_account;
document.getElementById('acc_name_opened_').innerText=opened_account;
document.getElementById('acc_name_opened__').innerText=opened_account;
document.getElementById('_acc_name_opened').innerText=opened_account;
document.getElementById('__acc_name_opened').innerText=opened_account;
retrieveItems();
            break;
        case 'debt':
            transactions.innerHTML=`<p>what did 
        <span id="acc_name_opened"></span>
         do ?</p>
         <p><button type="button" onclick="ch_trans('purchase')">purchase something</button><button type="button" onclick="ch_trans('debt')">pay debt</button><button type="button" onclick="ch_trans('collect')">collect money</button></p>
    <p>How much did <span id="acc_name_opened_"></span> pay <input type='number' id='debt_pd'><br><span id="error4"></span></p>
    <button onclick="confirm('debt')" id="done">DONE</button></p>
    `;
document.getElementById('acc_name_opened').innerText=opened_account;
document.getElementById('acc_name_opened_').innerText=opened_account;
            break;
        default:
            break;
    }
    

}
const checkInput=(ID)=>{
    let input=document.getElementById(ID).value;
    return (spaces.includes(input))?false:true;
}

const addSelling_items=()=>{
    document.getElementById('addSelling_items').style.display='inline';
}

    if(checkInput('new_selling_item')&&checkInput('price')){
        document.getElementById('selling_items').innerHTML+=`|${spaces[5]}
        ${document.getElementById('new_selling_item').value}:${document.getElementById('price').value};`;
    }

function hideAddSellingItem() {
    document.getElementById('addSelling_items').style.display='none';
}
const add_item=(name=null,cost=null)=>{
    hideProblem();
    var ac=[];
    for(let il = 0; il < 50; il++){
        ac[il]=localStorage.getItem(`item${il}`);
    }
    var SI=parseInt(localStorage.getItem('selling_items'))
    const items=document.getElementById('selling_items');
    var item_name = document.getElementById('new_selling_item').value;
    var price = document.getElementById('price').value;
if (typeof(name)!='string'&&checkInput('new_selling_item')&&checkInput('price')) {
            SI++;
            var item_name = document.getElementById('new_selling_item').value;
            var price = document.getElementById('price').value;
            var create=true;
            if (ac.includes(item_name.toLowerCase())) {
                var create=false;
                problem('item name already exists');
            } else {
                var create=true;
            }
}else if(typeof(name)=='string'){
            var item_name=name;
            var price=cost;
            var create=true;
}else{
            var create=false;
}
        
        if(items.innerText==':you do not have any stored selling item;'){items.innerText=''}
        if(create){
            localStorage.setItem('selling_items',SI);
            localStorage.setItem(`item${SI}`,item_name.toLowerCase());
            localStorage.setItem(`p${SI}`,price);
        items.innerHTML+=`<span>${item_name} :  N${price}<br>
                                <input type="button" value="DELETE" onclick="deleteItem('item${SI}')">
                                <input type="button" value="RENAME" onclick="renameItem('${SI}')"></span>`;
        document.getElementById('selling_it').innerHTML+=`<option id="item_${SI}">${item_name}</option>`
        }else if(!checkInput('new_selling_item')){
            problem('no name for new item');
        }else if(!checkInput('price')){
            problem('no price for new item');
        }
    }
    
    const problem=(error)=>{
        const error1=document.getElementById('error1');
        const error2=document.getElementById('error2');
        const error3=document.getElementById('error3');
        const error4=document.getElementById('error4');
        const error5=document.getElementById('error5');
        switch (error) {
            case 'item name already exists':
                error1.style.display='inline';
                error1.innerText=`${error}`;
                break;
            case 'no name for new item':
                error1.style.display='inline';
                error1.innerText='this input cannot be left empty'
                break;
            case 'no price for new item':
                error2.style.display='inline';
                error2.innerText='this input cannot be left empty';
                break;
            case 'name_already_exists_for_rename':
                error3.style.display='inline';
                error3.innerText='this name already exists';
                break;
            case 'no_name_for_new_rename_account':
                error3.style.display='inline';
                error3.innerText='this input cannot be left empty';
                break;
            case 'no_qty_bought':
                error4.style.display='inline';
                error4.innerText='this input cannot be left empty';
                break;
            case 'no_price_paid':
                error5.style.display='inline';
                error5.innerText='this input cannot be left empty'
                break;
            default:
                break;
        }
    }
    const retrieveItems=()=>{
        var va=0;
        const items=document.getElementById('selling_items');
        items.innerText='';
        items.innerHTML='';
        for (let i = 0; i < 50; i++) {
            if (typeof(localStorage.getItem(`item${i}`))=='string') {
                va++;
                localStorage.setItem('selling_items',va);
                if(va!=i){ 
                localStorage.setItem(`item${va}`,localStorage.getItem(`item${i}`));
                localStorage.setItem(`p${va}`,localStorage.getItem(`p${i}`))
                localStorage.removeItem(`p${i}`);
                localStorage.removeItem(`item${i}`);
            }
               
                add_item(localStorage.getItem(`item${va}`),localStorage.getItem(`p${va}`));
                
            }
        }
        if (items.innerHTML=='') {
            items.innerText=':you do not have any stored selling item;';
        }
    }
    retrieveItems();
    function deleteItem(ID) {
        localStorage.removeItem(ID);
        retrieveItems();
    }
    function rename_item(_name,_price) {
            if(checkInput('new_si_name')&&checkInput('new_price')){
                var ac=[];
                for(let il = 0; il < 50; il++){
                    ac[il]=localStorage.getItem(`item${il}`);
                }
                if (ac.includes(name.toLowerCase())) {
                    problem('name_already_exists_for_rename');
                } else {
                    hideRename();
                localStorage.setItem(`item${iD}`,_name);
                localStorage.setItem(`p${iD}`,_price);
                document.getElementById('selling_it').innerHTML='';
                retrieveItems()
                addSelling_items();
                
                ;
                }
                
            }else{
                problem('no_name_for_new_rename_account');
            }
           
        
    }
    function showRename() {
        document.getElementById('rename').style.display='block';
    }
    function hideRename() {
        document.getElementById('rename').style.display='none';
    }
    function renameItem(ID) {
        hideAddSellingItem();
        showRename();
        iD=ID;
    }
    function hideProblem() {
        document.getElementById('error1').style.display='none';
        document.getElementById('error2').style.display='none';
        document.getElementById('error3').style.display='none';
        document.getElementById('error4').style.display='none';
    }
    const purchase=(NAME,ITEM,QTY,PAYMENT)=>{
        
       var statement =`${NAME} bought ${QTY} ${ITEM} and paid N${PAYMENT} `;
       let e='';
       let i=0;
       while (e!=ITEM) {
        i++;
        e=localStorage.getItem(`item${i}`);
       }
       let p=parseInt(localStorage.getItem(`p${i}`));
       if (p*QTY>=PAYMENT) {
        statement+=`therefore ${NAME} owes you N${(p*QTY)-PAYMENT} <br>`;
        localStorage.setItem(`debt_bal_for_${opened_account}`,parseInt(localStorage.getItem(`debt_bal_for_${opened_account}`))+parseInt((p*QTY)-PAYMENT));
       } else {
        statement+=`therefore, you are to give ${NAME} N${PAYMENT-(p*QTY)} <br>`;
        localStorage.setItem(`debt_owing_to_${opened_account}`,parseInt(localStorage.getItem(`debt_owing_to_${opened_account}`))+parseInt(PAYMENT-(p*QTY)));
       }
       localStorage.setItem(`${opened_account}_trans_${parseInt(localStorage.getItem('no_of_t'))+1}`,statement);
       localStorage.setItem('no_of_t',parseInt(localStorage.getItem('no_of_t'))+1)
document.getElementById('trans_history').innerHTML+=statement;
    }
    
 function done(what) {
    document.getElementById('confirm_purchase').style.display='none';
    if(what=='purchase'){
        if(document.getElementById('trans_history').innerText==':you do not have any transaction history with this account;'){
            document.getElementById('trans_history').innerText='';
        }
        const NAME=localStorage.getItem('acc_name_op');
        const ITEM_p=document.getElementById('selling_it').value;
        const qty=document.getElementById('qty').value;
        const payment=document.getElementById('payment').value;
        purchase(NAME,ITEM_p,qty,payment);
    }else if(what=='debt'){
        if(checkInput('debt_pd')){
            s_f_d(document.getElementById('debt_pd').value);
        }else{
            problem('no_qty_bought');
        }
    }
}
 const retrieveTransactions=()=>{
    var va=0;
    var t=0;
    const trans_history=document.getElementById('trans_history');
    trans_history.innerText='';
    trans_history.innerHTML='';
    for (let i = 0; i < 50; i++) {
        if (typeof(localStorage.getItem(`${opened_account}_trans_${i}`))=='string') {
            va++;
            localStorage.setItem(`${opened_account}_trans`,va);
            t++;
            if(va!=i){ 
            localStorage.setItem(`${opened_account}_trans_${va}`,localStorage.getItem(`${opened_account}_trans_${i}`));
            localStorage.removeItem(`${opened_account}_trans_${i}`);
            }
           trans_history.innerHTML+=localStorage.getItem(`${opened_account}_trans_${va}`)+`<br>`;
           localStorage.setItem('no_of_t',t);
        }
    }
    if (trans_history.innerHTML=='') {
        trans_history.innerText=':you do not have any transaction history with this account;';
    }
}
retrieveTransactions();
function s_f_d(){

}
function hideErrors(){
    for (let i = 0; i < 5; i++) {
        if (document.getElementById(`error${i}`)!=null) {
             document.getElementById(`error${i}`).style.display='none';
        }
    }
}
function confirm(what) {
hideErrors();
    switch (what) {
        case 'purchase':
        if(checkInput('qty')&&checkInput('payment')){
            document.getElementById('confirm_purchase').style.display='block';
            document.getElementById('qtty').innerText=document.getElementById('qty').value;
            document.getElementById('item_purc').innerText=document.getElementById('selling_it').value;
            document.getElementById('pp').innerText=document.getElementById('payment').value;

        }else{
            if(!checkInput('qty')){
                 problem('no_qty_bought')
            }
            if(!checkInput('payment')){
                problem('no_price_paid')
            }
        }
            break;
        case 'debt':
            document.getElementById('confirm_pdebt').style.display='block';
            break;
        default:
            break;
    }
}
function hideConfirm(){
    document.getElementById('confirm_purchase').style.display='none';
}