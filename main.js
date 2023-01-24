import Sortable from "./node_modules/sortablejs/Sortable";
const headers = {
  "Content-Type": "application/json",
  apikey: "FcKdtJs202301",
  username: "KDT4_KwonBeomJun",
};
function get(target) {
  return document.querySelector(target);
}
function getAll(target) {
  return document.querySelectorAll(target);
}
function createEl(target) {
  return document.createElement(target);
}

const url = "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos";
const todoInput = get(".add-input"); // 검색창
const formEl = get("form"); // 검색 form
const listEl = get(".grid"); // Todo item area
const rangeAllBtn = get(".range-all-item"); // 전체 Todo 버튼
const rangeCheckBtn = get(".range-check-item"); // 선택 Todo 버튼
const rangeNoneBtn = get(".range-none-check"); // 선택되지 않은 Todo 버튼
const mainSpinnerEl = get(".main-spin");
const checkSpinEl = get(".check-spin");
const inputSpinEl = get(".input-spin");

/** Todo 데이터 들고오는 함수 */
async function getTodos() {
  const res = await fetch(url, {
    method: "GET",
    headers,
  });
  const json = await res.json();
  renderTodos(json);
  checkSpinEl.style.display = "none";
  mainSpinnerEl.style.display = "none";
  inputSpinEl.style.display = "none";
}

/** 초기 데이터 가지고 오기 */
(async () => {
  await getTodos();
  mainSpinnerEl.style.display = "none";
  allBtn.checked = false;
})();

rangeAllBtn.addEventListener("click", getTodos);
rangeCheckBtn.addEventListener("click", checkTodosList);
rangeNoneBtn.addEventListener("click", noneTodosList);

/** form 태그 submit*/
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  inputSpinEl.style.display = "block";
  await addTodo(todoInput.value);
  await getTodos();
});

/** 클릭 했을 때 수정 및 데이터 지우기 */
listEl.addEventListener("click", async (e) => {
  viewMore(e);
  changeMode(e);
  editTodo(e);
  await checkToggleTodo(e);
  await removeTodo(e);
});

/** 자세히보기 */
function viewMore(e) {
  if (e.target.className !== "item") return;
  const viewbg = e.target.querySelector(".view-bg");
  const viewEl = e.target.querySelector(".view-more");
  const cancleBtn = e.target.querySelector(".button");
  viewbg.style.display = "block";
  viewEl.style.display = "block";

  cancleBtn.addEventListener("click", (e) => {
    viewbg.style.display = "none";
    viewEl.style.display = "none";
  });
}
// Sortablejs
Sortable.create(listEl, {
  onEnd: async function (e) {
    const itemElements = e.to.children;
    const promises = Array.prototype.map.call(
      itemElements,
      async (item, order) => {
        const id = item.getAttribute("data-id");
        const done = item.getAttribute("data-done");
        const txt = item.querySelector(".txt");
        const title = txt.innerHTML;
        const putUrl = `${url}/${id}`;
        const res = await fetch(putUrl, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify({
            title,
            done,
            order,
          }),
        });
        return await res.json();
      }
    );
    await Promise.all(promises).then(() => {
      getTodos();
    });
  },
});

// 전체 선택 또는 해제
const allBtn = get(".all-check");
allBtn.addEventListener("click", allCheck);

// 선택 삭제
const checkBtn = get(".check-remove");
checkBtn.addEventListener("click", checkRemove);

/** Todo item 데이터 추가하는 함수 */
async function addTodo(title) {
  try {
    await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ title }),
    });
  } catch (err) {
    console.error(err);
  }
  todoInput.value = "";
  todoInput.focus();
}
/** Todo item 렌더링 하는 함수 */
async function renderTodos(todos) {
  todos.sort(function (a, b) {
    if (a.done === true || a.done === "true") {
      return (a = -1);
    } else if (b.done === false || b.done === "false") {
      return (a = 1);
    }
  });

  const liEls = todos.map((todo) => {
    const liEl = createEl("div");
    let isChecked;
    if (todo.done === true || todo.done === "true") {
      isChecked = "checked";
    } else if (todo.done === false || todo.done === "false") {
      isChecked = "";
    }
    liEl.classList.add("item");
    const createdAt = new Date(todo.createdAt).toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });
    const updatedAt = new Date(todo.updatedAt).toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });
    console.log(createdAt);

    const contents = createEl("div");
    const todoTitle = createEl("div");
    const todoCheckBox = createEl("input");
    const editInputBox = createEl("input");
    const label = createEl("label");
    liEl.innerHTML = /* html */ `
      <div class="checked-spin spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="view-bg nodrag" >
        <div class="view-more nodrag" >
          <div class="title">Todo</div>
          <div class="txt">${todo.title}</div>
          <div class="date-btn">
            <div class="date">
              <div class="createdAt">생성일 : ${createdAt.slice(0, 24)}</div>
              <div class="updateAt">수정일 : ${updatedAt.slice(0, 24)}</div>
            </div>
            <div class="button">Close</div>
          </div>
        </div>
      </div>
    `;
    const contentsBtns = createEl("div");
    const editBtns = createEl("div");
    const todoEditBtn = createEl("button");
    const todoRemoveBtn = createEl("button");
    const todoConfirmBtn = createEl("button");
    const todoCancleBtn = createEl("button");
    const iconFirst = createEl("div");
    const iconFirstI = createEl("i");
    const iconSecond = createEl("div");
    const iconSecondI = createEl("i");
    const iconThird = createEl("div");
    const iconThirdI = createEl("i");
    const iconFourth = createEl("div");
    const iconFourthI = createEl("i");
    contents.classList.add("contents");
    todoTitle.classList.add("todo-title");
    todoCheckBox.classList.add("todo-checkbox");
    editInputBox.classList.add("edit-inputbox");
    contentsBtns.classList.add("btns", "contents-btns");
    editBtns.classList.add("btns", "edit-btns");
    todoEditBtn.classList.add("todo-edit-btn", "btn-item");
    todoRemoveBtn.classList.add("todo-remove-btn", "btn-item");
    todoConfirmBtn.classList.add("todo-edit-confirm-btn", "btn-item");
    todoCancleBtn.classList.add("todo-edit-cancle-btn", "btn-item");
    iconFirst.classList.add("icon");
    iconFirstI.classList.add("bi", "bi-pencil-square");
    iconSecond.classList.add("icon");
    iconSecondI.classList.add("bi", "bi-trash");
    iconThird.classList.add("icon");
    iconThirdI.classList.add("bi", "bi-check-lg");
    iconFourth.classList.add("icon");
    iconFourthI.classList.add("bi", "bi-x");

    todoTitle.innerText = "Todo";
    todoCheckBox.type = "checkbox";
    todoCheckBox.checked = `${isChecked}`;
    editInputBox.type = "text";
    editInputBox.value = `${todo.title}`;
    label.innerText = `${todo.title}`;
    iconFirst.append(iconFirstI);
    iconSecond.append(iconSecondI);
    iconThird.append(iconThirdI);
    iconFourth.append(iconFourthI);

    todoEditBtn.append(iconFirst);
    todoRemoveBtn.append(iconSecond);
    todoConfirmBtn.append(iconThird);
    todoCancleBtn.append(iconFourth);

    contentsBtns.append(todoEditBtn, todoRemoveBtn);
    editBtns.append(todoConfirmBtn, todoCancleBtn);

    contents.append(
      todoTitle,
      todoCheckBox,
      editInputBox,
      label,
      contentsBtns,
      editBtns
    );
    liEl.append(contents);

    liEl.dataset.id = todo.id;
    liEl.dataset.done = todo.done;
    return liEl;
  });
  listEl.innerHTML = "";
  listEl.append(...liEls);
}

/** Todo 수정버튼 클릭했을 때 함수 */
function changeMode(e) {
  const item = e.target.closest(".item");
  if (item === null) return;
  const label = item.querySelector("label");
  const editInput = item.querySelector('input[type="text"]');
  const contentBtns = item.querySelector(".contents-btns");
  const editBtns = item.querySelector(".edit-btns");
  const value = editInput.value;
  // 수정 버튼이 맞으면
  if (e.target.className === "todo-edit-btn btn-item") {
    label.style.display = "none";
    editInput.style.display = "block";
    contentBtns.style.display = "none";
    editBtns.style.display = "flex";
    // 수정시 focus
    editInput.focus();
    editInput.value = "";
    editInput.value = value;
  }
  // 수정 취소 버튼이면
  if (e.target.className === "todo-edit-cancle-btn btn-item") {
    label.style.display = "block";
    editInput.style.display = "none";
    contentBtns.style.display = "flex";
    editBtns.style.display = "none";
    // 수정 취소시 원래 value로
    editInput.value = label.innerText;
  }
}

/** Todo 수정 완료 했을 떄 */
async function editTodo(e) {
  e.preventDefault();
  if (e.target.className !== "todo-edit-confirm-btn btn-item") return;
  const item = e.target.closest(".item");
  const id = item.dataset.id;
  const done = item.dataset.done;
  const editInput = item.querySelector('input[type="text"]');
  const value = editInput.value;
  await fetch(`${url}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      title: value,
      done: done,
    }),
  });
  getTodos();
}

/** Todo 지우는 함수 */
async function removeTodo(e) {
  if (e.target.className !== "todo-remove-btn btn-item") return;
  const liEl = e.target.closest(".item");
  const id = liEl.dataset.id;
  await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers,
  });
  await getTodos();
}

/** Todo checked 함수 */
async function checkToggleTodo(e) {
  if (e.target.className !== "todo-checkbox") return;
  const item = e.target.closest(".item");
  const id = item.dataset.id;
  const done = e.target.checked;
  item.setAttribute("data-done", done);
  const editInput = item.querySelector('input[type="text"]');
  const value = editInput.value;
  const loadEl = item.querySelector(".checked-spin");
  loadEl.style.display = "block";
  await fetch(`${url}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      title: value,
      done,
    }),
  });
  loadEl.style.display = "none";
  getTodos();
}

/** 전체선택 또는 해제 하는 함수 */
function allCheck() {
  checkSpinEl.style.display = "block";
  const allCheckBtn = Array.from(getAll(".todo-checkbox"));

  let chackValue = allBtn.checked;

  const fetchPromises = allCheckBtn.map((i) => {
    if (i.className !== "todo-checkbox") return;
    const item = i.closest(".item");
    const id = item.dataset.id;
    let done = i.checked;

    if (chackValue === true) {
      done = true;
      item.setAttribute("data-done", true);
    } else {
      done = false;
      item.setAttribute("data-done", false);
    }
    const editInput = item.querySelector('input[type="text"]');
    const value = editInput.value;
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        title: value,
        done,
      }),
    });
  });

  Promise.all(fetchPromises).then(() => {
    getTodos();
  });
}

/** 선택한 item 삭제하는 함수 */
function checkRemove() {
  const allCheckBtn = Array.from(getAll(".todo-checkbox:checked"));
  const fetchPromises = allCheckBtn.map(async (i) => {
    if (i.className !== "todo-checkbox") return;
    checkSpinEl.style.display = "block";
    const item = i.closest(".item");
    const id = item.dataset.id;
    const editInput = item.querySelector('input[type="text"]');
    const value = editInput.value;
    await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({
        title: value,
      }),
    });
  });
  Promise.all(fetchPromises).then(() => {
    getTodos();
  });
  allBtn.checked = false;
}

/** 선택된 항목들만 보기 */
function checkTodosList() {
  const allCheckBtn = getAll(".item");
  allCheckBtn.forEach((i) => {
    if (i.getAttribute("data-done") === "false") {
      i.style.display = "none";
    } else {
      i.style.display = "block";
    }
  });
}

/** 선택되지 않은 항목들만 보기 */
function noneTodosList() {
  const allCheckBtn = getAll(".item");
  allCheckBtn.forEach((i) => {
    if (i.getAttribute("data-done") === "true") {
      i.style.display = "none";
    } else {
      i.style.display = "block";
    }
  });
}
