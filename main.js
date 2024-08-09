var s='';
var spaces=[];
for (let i = 0; i < 31; i++) {
    spaces[i]=s;
    s+=' ';
    
}
var ac=[];
for(let il = 0; il < 50; il++){
    ac[il]=localStorage.getItem(`${il}`);
}
localStorage.setItem('allAccts',0);
function hideRename() {
    document.getElementById('rename').style.display = 'none';
    document.getElementById('rename_name').style.display = 'none';
    document.getElementById('rename_name').value = '';
    document.getElementById('ren').style.display = 'none';
    document.getElementById('error2').style.display = 'none';
}
function hideAddAccount() {
    document.getElementById('add_new_account').style.display = 'none';
    document.getElementById('new_account_name').style.display = 'none';
    document.getElementById('new_account_name').value = '';
    document.getElementById('create').style.display = 'none';
    document.getElementById('error1').style.display = 'none';
}
hideAddAccount();
hideRename();
const showRename=(ID)=>{
    document.getElementById('rename').style.display = 'block';
    document.getElementById('rename_name').style.display = 'inline';
    document.getElementById('ren').style.display = 'inline';
}
const addAccount=()=>{
    document.getElementById('add_new_account').style.display='block';
    document.getElementById('new_account_name').style.display='inline';
    document.getElementById('create').style.display='inline';
    

    
}

const createAccount=(name=null)=>{
var ac=[];
for(let il = 0; il < 50; il++){
    ac[il]=localStorage.getItem(`${il}`);
}
var allAccts=parseInt(localStorage.getItem('allAccts'))
const accounts=document.getElementById('accounts');
var acc_name= document.getElementById('new_account_name').value;
    if (typeof(name)!='string'&&checkInput('new_account_name')) {
        allAccts++;
        var acc_name= document.getElementById('new_account_name').value;
        
        var create=true;
        if (ac.includes(acc_name.toLowerCase())) {
            var create=false;
            problem('name_already_exists');
        } else {
            var create=true;
        }
    }else if(typeof(name)=='string'){
        var acc_name=name;
        var create=true;
    }else{
        var create=false;
    }
    
    if(accounts.innerText=='click the plus button below to add an account'){accounts.innerText=''}
    if(create){
        localStorage.setItem('allAccts',allAccts)
        localStorage.setItem(allAccts,acc_name.toLowerCase());
        hideAddAccount()
    accounts.innerHTML+=`<div class="account" id="${allAccts}"><p class="all_accts_name">${acc_name}</p>
                            <a href="details.html"><button class="open" onclick="Open('${allAccts}')">OPEN</button></a><br>
                            <button class="delete" onclick="deleteAccount('${allAccts}')">DELETE</button><br>
                            <button class="rename" onclick="renameAccount('${allAccts}')">RENAME</button></div>`;
    }else if(!checkInput('new_account_name')){
        problem('no_name_for_new_acconut');
    }
}
const checkInput=(ID)=>{
    let input=document.getElementById(ID).value;
    return (spaces.includes(input))?false:true;
}
const retrieveAccounts=()=>{
    var va=0;
    const accounts=document.getElementById('accounts');
    accounts.innerText='';
    accounts.innerHTML='';
    for (let i = 0; i < 50; i++) {
        if (typeof(localStorage.getItem(i))=='string') {
            va++;
            localStorage.setItem('allAccts',va);
            if(va!=i){ localStorage.setItem(va,localStorage.getItem(i));
            localStorage.removeItem(i);}
           
            createAccount(localStorage.getItem(va));
            
        }
    }
    if (accounts.innerHTML=='') {
        accounts.innerText='click the plus button below to add an account';
    }
}
const problem=(error)=>{
    switch (error) {
        case 'no_name_for_new_acconut':
            document.getElementById('error1').style.display='inline';
            document.getElementById('error1').innerHTML='This input cannot be left empty';
            break;
        case 'no_name_for_new_rename_account':
            document.getElementById('error2').style.display='inline';
            document.getElementById('error2').innerHTML='This input cannot be left empty';
            break;
        case 'name_already_exists':
            document.getElementById('error1').style.display='inline';
            document.getElementById('error1').innerHTML='This name already exists';
            break;
        case 'name_already_exists_for_rename':
            document.getElementById('error2').style.display='inline';
            document.getElementById('error2').innerHTML='This name already exists';
            break;
        default:
            break;
    }
}
retrieveAccounts();

const rename=(name)=>{
    if(checkInput('rename_name')){
        var ac=[];
        for(let il = 0; il < 50; il++){
            ac[il]=localStorage.getItem(`${il}`);
        }
        if (ac.includes(name.toLowerCase())) {
            problem('name_already_exists_for_rename');
        } else {
            hideRename();
        localStorage.setItem(renameID,name);
        retrieveAccounts();
        }
        
    }else{
        problem('no_name_for_new_rename_account')
    }
}
function deleteAccount(ID) {
    localStorage.removeItem(ID);
    localStorage.setItem('allAccts',parseInt(localStorage.getItem('allAccts'))-1)
    retrieveAccounts();
}
function renameAccount(ID) {
    showRename();
    renameID=ID;
}
function Open(ID){
    localStorage.setItem('acc_name_op',localStorage.getItem(ID));
    
}
