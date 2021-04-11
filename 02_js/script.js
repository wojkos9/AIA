function save_row(el) {
    let tr = el.parentElement.parentElement;
    tr.querySelectorAll("input[type=text]").forEach((e)=>{
        e.parentElement.innerHTML = "<a>"+e.value+"</a>";
    });
    console.log(el);
    el.textContent="Edit";
    el.onclick=()=>{edit_row(el)};
}

function edit_row(el) {
    let tr = el.parentElement.parentElement;
    tr.querySelectorAll("a").forEach((e)=>{
        e.parentElement.innerHTML = '<input type="text" value="'+e.innerText+'"/>';
    });
    tr.querySelector("input").focus();
    el.textContent="Save";
    el.onclick=()=>{save_row(el)};
}

function remove_row(el) {
    let tr = el.parentElement.parentElement;
    tr.remove();
}

function add_row() {
    const rowContent = '\
    <td><input type="text"/></td>\
    <td><input type="text"/></td>\
    <td><button>Save</button><button>Remove</button></td>';
    let newRow = document.createElement("tr");
    newRow.innerHTML = rowContent;
    let handlers = [save_row, remove_row]
    let btns = newRow.querySelectorAll("button").forEach((e, i)=>{
        e.onclick = ()=>{handlers[i](e);}
    });
    let e = document.getElementById("main-tb");
    e.insertAdjacentElement('beforeend', newRow);
    newRow.querySelector("input").focus();
}