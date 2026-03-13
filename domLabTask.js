const form = document.getElementById('student-form');
const nameInput = document.getElementById('student-name');
const rollInput = document.getElementById('student-roll');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('student-list');
const totalCount = document.getElementById('total-count');
const presentCount = document.getElementById('present-count');
const searchInput = document.getElementById('search');
const sortBtn = document.getElementById('sort-btn');
const highlightBtn = document.getElementById('highlight-btn');

form.addEventListener('submit', addStudent);
nameInput.addEventListener('input', toggleAddButton);
searchInput.addEventListener('input', filterStudents);
sortBtn.addEventListener('click', sortStudents);
highlightBtn.addEventListener('click', highlightFirst);

function addStudent(e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const roll = rollInput.value.trim();
  if (!name || !roll) return;

  const li = document.createElement('li');
  li.classList.add('student-item');

  const span = document.createElement('span');
  span.textContent = `${roll} – ${name}`;

  const presentBox = document.createElement('input');
  presentBox.type = 'checkbox';
  presentBox.addEventListener('change', updatePresentCount);

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('btn-edit');
  editBtn.addEventListener('click', function() {
    editStudent(span);
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.classList.add('btn-delete');
  delBtn.addEventListener('click', () => deleteStudent(li));

  li.appendChild(span);
  li.appendChild(presentBox);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  list.appendChild(li);

  nameInput.value = '';
  rollInput.value = '';
  toggleAddButton();
  updateTotalCount();
  updatePresentCount();
}

function deleteStudent(li) {
  if (confirm("Are you sure you want to delete this student?")) {
    li.remove();
    updateTotalCount();
    updatePresentCount();
  }
}

function editStudent(span) {
  const parts = span.textContent.split(" – ");
  const roll = prompt("Enter new roll:", parts[0]);
  const name = prompt("Enter new name:", parts[1]);
  if (roll && name) span.textContent = `${roll} – ${name}`;
}

function toggleAddButton() {
    
  addBtn.disabled = nameInput.value.trim() === '';
}

function updateTotalCount() {
  totalCount.textContent = `Total students: ${list.children.length}`;
}

function updatePresentCount() {
  let present = 0, absent = 0;
  list.querySelectorAll('.student-item').forEach(li => {
    const checkbox = li.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      present++;
      li.classList.add('present');
    } else {
      absent++;
      li.classList.remove('present');
    }
  });
  presentCount.textContent = `Present: ${present}, Absent: ${absent}`;
}

function filterStudents() {
  const search = searchInput.value.toLowerCase();
  list.querySelectorAll('.student-item').forEach(li => {
    const text = li.querySelector('span').textContent.toLowerCase();
    li.style.display = text.includes(search) ? '' : 'none';
  });
}

function sortStudents() {
  const items = Array.from(list.children);
  items.sort((a, b) => {
    const nameA = a.querySelector('span').textContent.toLowerCase();
    const nameB = b.querySelector('span').textContent.toLowerCase();
    return nameA.localeCompare(nameB);
  });
  items.forEach(item => list.appendChild(item));
}

function highlightFirst() {
  list.querySelectorAll('.student-item').forEach(li => li.classList.remove('highlight'));
  if (list.firstElementChild) list.firstElementChild.classList.add('highlight');
}