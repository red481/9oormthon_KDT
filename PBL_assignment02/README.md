# 자바스크립트로 To do app 만들기

## 기능 요구사항
1. 함수를 잘게 쪼개고 변수명을 명확하게 하기
2. localStorage를 활용하여 새로고침 등 상황에서도 데이터를 유지하기

## 구현된 기능
- createTodo(): 우측 상단 '새로운 TO DO 추가하기'를 누르면 To Do 박스가 생성됨.(localSorage와 연동)
- editTodo(): To Do 박스의 오른쪽에 위치한 연필 모양을 누르면 왼쪽의 text input 태그가 활성화(focus) 됨.
- deleteTodo(): To Do 박스의 오른쪽에 위치한 삭제 태그를 누르면 태그가 속한 To do 박스를 localStorage와 html 상에서 제거.
- completeTodo(): To Do 박스의 체크 박스를 누를때마다 text input 태그의 글자들이 줄 그어지거나(line-through) 해제되거나 함. 동시에 누를때마다 체크박스의 상태도 변경됨.(localStorage와 연동)
- textFocusOut(): 활성된 text input 태그를 벗어나면 변경된 내용이 localStorage에 반영됨.
- loadAndInsertHTML(): window.onload에 저장되는 함수(웹페이지가 load 될 시 작동). localStorage를 순회하며 저장된 값들이 생성된 To Do 박스의 태그에 반영됨. 이벤트 리스너도 추가.
- createJson(): key를 랜덤하게 생성하여 생성된 key를 다른 속성값들과 함께 object에 저장되고 object를 return함.
- generateKey(): localStorage와 html의 To Do 박스들을 연동하기 위해 필요한 ID 값을 생성. 0~1000000 사이의 난수 값으로 생성. localStorage의 키로 활용되고 생성되는 To Do 박스의 id 값으로도 설정함.

## 새롭게 배운 것들
- 상위 태그와 그것의 하위 태그를 읽는 방법을 배웠다.
- input 태그 등 태그들의 속성 값과 설정 등에 대해서 더 자세히 알게 되었다.

## 아쉬운 점
- 코드가 중복되는 부분이 있어서 함수를 더 쪼갤 수 있다고 생각하지만 시간 관계상 최대한 쪼개지는 못함.
- 무작위 키를 생성할 때 숫자(0~1000000)만이 아닌 문자값도 같이 무작위로 생성해서 결합하면 키 충돌이 일어나지 않을 확률이 더 높아질탠데 이 부분까진 구현하지 않음.
