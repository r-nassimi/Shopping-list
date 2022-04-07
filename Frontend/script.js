let allShops = [];

let textValue = '';
let costValue = '';

let activeEdit = null;

let textInput = null;
let costInput = null;

let textChange = null;
let costChange = null;
let dateChange = null;

let dateNow = new Date().toISOString().slice(0, 10);
let currentDate = dateNow;

const URL = 'http://localhost:8000';

window.onload = async () =>{
  textInput = document.getElementById('where-spend');
  costInput = document.getElementById('how-much');
  textInput.addEventListener('change', updateText);
  costInput.addEventListener('change', updateCost);
  getShop();
}

const getShop = async () => {
  const response = await fetch(`${URL}/allShops`, {
    method: 'GET'
  });
  const result = await response.json();
  allShops = result.data;
  render();
}

onClickButton = async () => {
  if (textValue && costValue) {
    pushShops();
  } else {
    alert('Input something!');
  }
}

const pushShops = async () => {
  const response = await fetch(`${URL}/createShop`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      text: textValue,
      date: currentDate,
      cost: costValue
    }),
  }).then(async (response) => {
    const result = await response.json();
    allShops.push(result.data);
    textInput.value = '';
    costInput.value = '';
    textValue = '';
    costValue = '';
    render();
  });
}

const updateText = (event) => {
  textValue = event.target.value;
}

const updateCost = (event) => {
  costValue = event.target.value;
}

const changeText = (ev) => {
  textChange = ev.target.value;
}

const changeDate = (ev) => {
  dateChange = ev.target.value;
}
const changeCost = (ev) => {
  costChange = ev.target.value;
}

render = () => {
  const content = document.getElementById('content-purchase');
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  let startValue = 0;
  let checkReduce = allShops.reduce(function (sum, currentSum) {
    return sum + currentSum.cost
  }, startValue);

  allShops.map((item, _id) => {
    const container = document.createElement('div');
    container.id = `shop-${_id}`;
    container.className = 'cost-container';
    const list = document.createElement('p');
    list.innerText = _id + 1 + ")";
    container.appendChild(list);
    const editContainer = document.createElement('div');
    editContainer.className = 'editContainer';

    if (item._id === activeEdit) {
      const inputText = document.createElement('input');
      inputText.type = 'text';
      inputText.value = item.text;
      inputText.className = 'text-class'

      const inputDate = document.createElement('input');
      inputDate.type = 'date';
      inputDate.value = item.date;
      inputDate.className = 'date-class';

      const inputCost = document.createElement('input');
      inputCost.type = 'number';
      inputCost.value = item.cost;
      inputCost.className = 'cost-class';

      inputText.addEventListener('change', changeText);
      inputDate.addEventListener('change', changeDate);
      inputCost.addEventListener('change', changeCost);

      list.appendChild(inputText);
      editContainer.appendChild(inputDate);
      editContainer.appendChild(inputCost);

      container.appendChild(inputText);
      container.appendChild(editContainer);
    } else {
      const text = document.createElement('p');
      text.className = 'text-class';
      text.innerText = item.text;
      
      const inputDate = document.createElement('p');
      inputDate.innerText = item.date;

      const textCost = document.createElement('p');
      textCost.className = 'cost-class';
      textCost.innerText = item.cost + ' р.';

      container.appendChild(text);
      editContainer.appendChild(inputDate);
      editContainer.appendChild(textCost);
      container.appendChild(editContainer);
    }

    if (item._id === activeEdit) {
      const imageDone = document.createElement('img');
      imageDone.src = "http://cdn.onlinewebfonts.com/svg/img_327356.png";
      imageDone.onclick = function() {
        editValue(_id, itemText, itemDate, itemCost);
        doneEdit();
      }
      editContainer.appendChild(imageDone);
      container.appendChild(editContainer);
    } else {
      const imageEdit = document.createElement('img');
      imageEdit.src = "https://icons.veryicon.com/png/o/internet--web/billion-square-cloud/rename-5.png";
      imageEdit.onclick = () => {
        activeEdit = item._id;
        render();
      }
      editContainer.appendChild(imageEdit);
      container.appendChild(editContainer);
      const imageDelete = document.createElement('img');
      imageDelete.src = "https://www.pngplay.com/wp-content/uploads/7/Delete-Icon-Background-PNG-Image.png";
      imageDelete.onclick = () => {
        deleteShop(item._id);
      }
      document.getElementById('reduceSum').innerHTML = checkReduce;
      editContainer.appendChild(imageDelete);
      container.appendChild(editContainer);
    }


    content.appendChild(container);
  });
};

const editValue = async (_id, itemText, itemDate, itemCost) => {
  let changedText = textChange;
  let changedDate = dateChange;
  let changedCost = costChange;
  const response = await fetch(`${URL}/updateShop`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      _id: _id,
      text: textChange ? textChange : itemText,
      date: dateChange ? dateChange : itemDate,
      cost: costChange ? costChange : itemCost
    }),
  });
  allShops = allShops.map((item) => {
    let newShop = { ...item };
    if (item._id === _id) {
      newShop.text = changedText ? changedText : itemText;
      newShop.date = Date(changedDate ? changedDate : itemDate);
      newShop.cost = Number(changedCost ? changedCost : itemCost)
    }
    return newShop;
  });
  const result = await response.json();
  allShops = result;
  render()
}

const doneEdit = () => {
  activeEdit = null;
  textChange = null;
  dateChange = null;
  costChange = null;
  render();
}

const deleteShop = async (_id) => {
  const response = await fetch(`${URL}/deleteShop?_id=${_id}`, {
    method: 'DELETE',
  })
  const resp = await response.json();
  allShops = resp;
  render();
}