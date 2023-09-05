document.getElementById('editableTable').addEventListener('click', function(event) {
  if (event.target.tagName === 'TD') {  // TD 셀만 대상으로 함
      event.target.setAttribute('contenteditable', 'true');
      event.target.focus();  // 해당 셀에 포커스를 주어 바로 편집 가능하게 합니다.
  }
});

document.addEventListener('click', function(event) {
  if (event.target.tagName !== 'TD') {
      const tds = document.querySelectorAll('#editableTable td');
      tds.forEach(td => {
          td.setAttribute('contenteditable', 'false');
      });
  }
});