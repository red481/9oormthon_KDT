document.getElementById('editableTable').addEventListener('click', function(event) {
  if (event.target.tagName === 'TD' && !(event.target.classList.contains('row-name')))
 {
      event.target.setAttribute('contenteditable', 'true');
      event.target.focus();
  }
});

document.querySelectorAll('.row-name').forEach(function(element) {
  element.setAttribute('contenteditable', 'false');
});

document.addEventListener('click', function(event) {
  if (event.target.tagName !== 'TD') {
      const tds = document.querySelectorAll('#editableTable td');
      tds.forEach(td => {
          td.setAttribute('contenteditable', 'rgb(118, 189, 236)');
      });
  }
});



document.querySelectorAll('.td-cell').forEach(function(cell) {
  cell.addEventListener('click', function(event) {
      let row = cell.parentNode;
      let rowIndex = Array.prototype.indexOf.call(row.parentNode.children, row);
      let colIndex = Array.prototype.indexOf.call(row.children, cell);
      let table = document.getElementById('editableTable');
      let currentCell = document.getElementById('current_cell').firstElementChild;
      currentCell.innerText = `Cell : ${table.rows[0].cells[colIndex].textContent}${rowIndex + 1}`;

      let rowNameTag = table.rows[rowIndex + 1].cells[0];
      let colNameTag = table.rows[0].cells[colIndex];

      rowNameTag.style.backgroundColor = 'rgb(118, 189, 236)';
      colNameTag.style.backgroundColor = 'rgb(118, 189, 236)';
  });
});

document.querySelectorAll('.td-cell').forEach(function(cell) {
  cell.addEventListener('focusout', function(event) {
      let row = cell.parentNode;
      let rowIndex = Array.prototype.indexOf.call(row.parentNode.children, row);
      let colIndex = Array.prototype.indexOf.call(row.children, cell);
      let table = document.getElementById('editableTable');

      let rowNameTag = table.rows[rowIndex + 1].cells[0];
      let colNameTag = table.rows[0].cells[colIndex];

      let currentCell = document.getElementById('current_cell').firstElementChild;
      currentCell.innerText = `Cell : `;

      rowNameTag.style.backgroundColor = 'rgb(235, 235, 235)';
      colNameTag.style.backgroundColor = 'rgb(235, 235, 235)';

      
  });
});

function exportTableToExcel(){

  let myWorkbook = XLSX.utils.table_to_book(document.getElementById('editableTable'), {sheet:"Sheet JS"});
  XLSX.writeFile(myWorkbook, "RDS_fullstack_second.xlsx");

}