//이지민 작성
//시간표 js가 너무 길어서 그냥 메모용으로 삭제 예정입니다...
// 시간표를 업데이트하는 함수
const updateTimetable = (subjects) => {
    // 시간표를 초기화합니다.
    clearTimetable();
  
    // 강의를 시간표에 추가합니다.
    subjects.forEach((subject) => {
      addSubjectToTimetable(subject);
    });
};

let subjects = [];
// 시간표에서 강의를 추가하는 함수
const addSubjectToTimetable = (subject) => {
  const dayTimePairs = subject.time.split(", ");
  for (const pair of dayTimePairs) {
    const [day, time] = pair.split("");
    const cell = document.querySelector(`#main-timetable td[data-day="${day}"][data-time="${time}"]`);
    console.log(cell);
    if (cell.children.length > 0) {
      return;
    };
    const div = document.createElement("div");
    div.textContent = subject.name;
    cell.appendChild(div);
  }
  subjects.push(subject);
};

// 시간표를 초기화하는 함수
const clearTimetable = () => {
  subjects = []; // subjects 배열 초기화
  
  const timetable = document.getElementById("main-timetable");
  const cells = timetable.querySelectorAll("td");

  // 각 셀의 자식 요소 제거
  cells.forEach((cell) => {
    while (cell.firstChild) {
      cell.removeChild(cell.firstChild);
    }
  });
  
  console.log("시간표 초기화");
};

//DB
const tempSubjects = [
  { id: 1, name: '프로그래밍언어론', professor: '홍길동', category: '전공필수', time: '월1, 월2, 수3', room: '030-0304' },
  { id: 2, name: '소프트웨어설계PBL', professor: '홍길동', category: '전공필수', time: '월2, 월3', room: '030-0304' },
  { id: 3, name: '데이터베이스', professor: '홍길동', category: '전공필수', time: '금1, 금2', room: '030-0304' },
  { id: 4, name: '데이터과학', professor: '홍길동', category: '전공필수', time: '월11, 월12', room: '030-0304' },
  { id: 5, name: '컴퓨터네트워크', professor: '홍길동', category: '전공필수', time: '화6, 화7, 수3', room: '030-0304' }
];

// 시간표 업데이트
updateTimetable(tempSubjects);

//시간표 요일/교시 인덱스 생성
// const days = ["월", "화", "수", "목", "금", "토"];
// const periods = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
// const timeStringToIndex = {};

// for (let i = 0; i < days.length; i++) {
//   for (let j = 0; j < periods.length; j++) {
//     const time = days[i] + periods[j];
//     timeStringToIndex[time] = i * periods.length + j;
//   }
// }


// //시간표 강의 목록
// let subjects = [];
// //시간표에 강의 추가
// const addSubjectToTimetable = (subject) => {
//   const day = subject.day;
//   const time = subject.time;
//   const duration = subject.duration;
//   const cell = $(`#main-timetable td[data-day=${day}][data-time=${time}]`);

//   if (cell.children().length > 0) {
//     alert("해당시간에 이미 다른 강의가 있습니다.");
//     return;
//   };
//   for (let i=0; i < duration; i++) {
//     const targetCell = $(`#main-timetable td[data-day=${day}][data-time=${time + i}]`);
//     targetCell.append(`<div>${subject.name}</div>`);
//   };
  
//   subjects.push(subject);
// }


// 시간표를 확장하여 추가 교시에 대한 행을 생성합니다.
const expandTimetable = (maxSubjectHour) => {
    const timetable = document.getElementById("main-timetable");
    const currentRows = timetable.querySelectorAll("tr");
    const existingHours = currentRows[0].querySelectorAll("th").length - 1; // 현재 시간표에 있는 교시 수
    const newHours = maxSubjectHour - existingHours; // 추가할 교시 수
  
    for (let i = 1; i <= newHours; i++) {
      const newRow = document.createElement('tr');
      const th = document.createElement('th');
      const time = existingHours + i + 4; // 10, 11, 12
      if (time > 12) {
        th.textContent = time - 12; // 10, 11, 12를 1, 2, 3으로 변환
      } else {
        th.textContent = time; // 그 외의 경우는 그대로 출력
      }
      newRow.appendChild(th);
      for (let j = 0; j < 5; j++) {
        const td = document.createElement('td');
        const day = ['월', '화', '수', '목', '금'][j];
        const cellTime = existingHours + i;
        if (cellTime > 5) {
          td.setAttribute('data-day', day);
          td.setAttribute('data-time', (cellTime - 5).toString());
        } else {
          td.setAttribute('data-day', day);
          td.setAttribute('data-time', (cellTime + 4).toString());
        }
        newRow.appendChild(td);
      }
      timetable.appendChild(newRow);
    }
  };

  // 시간표에 강의를 추가하는 함수
const addSubjectToTimetable = (subject) => {
  const dayTimePairs = subject.time.split(", ");
  
  for (const pair of dayTimePairs) {
    const [day, time] = pair.split(/([^\uAC00-\uD7A3]+)/);
    const cell = document.querySelector(`#main-timetable td[data-day="${day}"][data-time="${time}"]`);
    if (cell.children.length > 0) {
      return;
    }
    const div = document.createElement("div");
    div.textContent = subject.name;
    cell.appendChild(div);
  }
};

//시간표 강의 목록
let subjects = [];
//시간표에 강의 추가
function addSubjectToTimetable(subject) {
  console.log("시간표에 강의 추가");
  
  const dayTimePairs = subject.time.split(",");
  console.log(document.getElementById("main-timetable")); //이부분에서 계속 null 나옴.. html이 두개라 그런가 싶기도 한데 어케 고쳐야될지 모르겠어요..ㅠ
  const mainTimetable = document.querySelector("#main-timetable");
  if (mainTimetable) {
    for (const pair of dayTimePairs) {
      const [day, time] = pair.split("");
      console.log(day, time);
      console.log(document.querySelector("#main-timetable"));
      const cell = document.querySelector(`#main-timetable td[data-day="${day}"][data-time="${time}"]`);
      console.log(cell);
      if (cell.children.length > 0) {
        alert("해당시간에 이미 다른 강의가 있습니다.");
        return;
      };
      const div = document.createElement("div");
      div.textContent = subject.name;
      cell.appendChild(div);
    }
    subjects.push(subject);
    console.log(subjects);
  }
};

// 강의 추가 요청을 서버에 전송하는 함수
const addSubjectToServer = (subject) => {
  // 서버 URL
  const url = '/api/addSubject';

  // AJAX 요청
  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(subject),
    success: function (response) {
      // 
      console.log('강의 추가 요청이 성공적으로 전송되었습니다.');
    },
    error: function (xhr, status, error) {
      console.error('강의 추가 요청이 실패하였습니다.');
    }
  });
};

//강의목록에서 강의 추가 : '시간표에 추가' 버튼 onclick or js파일에서 바로 button onclick 되게
const addSubjectFromList = (id) => {
  console.log('강의 추가');
  const subject = tempSubjects.find(subject => subject.id === id);
  if (subject) {
    addSubjectToSever(subject);
  } else {
    console.log('해당 강의를 찾을 수 없습니다.');
  }
};

// 시간표에 강의를 추가하는 함수
const addSubjectToTimetable = (subject) => {
  const dayTimePairs = subject.time.split(", ");
  let mergedRows = 1; // 통합된 행 수
  let mergedRowStart = null; // 통합된 행 시작 인덱스

  for (let i = 0; i < dayTimePairs.length; i++) {
    const [day, time] = dayTimePairs[i].split(/([^\uAC00-\uD7A3]+)/);
    const cell = document.querySelector(`#main-timetable td[data-day="${day}"][data-time="${time}"]`);
    if (cell.children.length > 0) {
      return;
    }
    if (i > 0) {
      const prevSubject = dayTimePairs[i - 1];
      const [prevDay, prevTime] = prevSubject.split(/([^\uAC00-\uD7A3]+)/);

      if (day === prevDay && Number(time) === Number(prevTime) + 1) {
        mergedRows++;
        continue;
      }
    }

    const div = document.createElement("div");
    div.textContent = subject.name;

    // 통합된 행인 경우, 이전 행들 삭제 및 월1 셀의 ROWSPAN 설정
    if (mergedRows > 1) {
      const startRowIndex = mergedRowStart.parentNode.rowIndex;
      const rowspan = mergedRows;
      const prevRow = mergedRowStart.parentNode;

      for (let j = 1; j < mergedRows; j++) {
        const currentRow = prevRow.nextElementSibling;
        currentRow.cells[startRowIndex].remove();
      }

      mergedRowStart.setAttribute("rowspan", rowspan);
    }

    cell.appendChild(div);

    // 빈 행 삭제
    const currentRow = cell.parentNode;
    const nextRow = currentRow.nextElementSibling;
    if (nextRow && nextRow.childElementCount === 1 && nextRow.firstElementChild.textContent === "") {
      nextRow.remove();
    }

    mergedRows = 1;
    mergedRowStart = cell;
  }
};
applyBackgroundForMergedCells(cell, mergedRows, color);
//
const applyBackgroundForMergedCells = (startCell, rowspan, color) => {
  const startCellIndex = startCell.cellIndex;
  const startRowIndex = startCell.parentNode.rowIndex;

  const table = startCell.closest("table");

  for (let i = 0; i < rowspan; i++) {
    const currentRowIndex = startRowIndex + i;
    const currentRow = table.rows[currentRowIndex];
    if (currentRow) {
      const rowCells = Array.from(currentRow.cells).slice(startCellIndex);
      rowCells.forEach((cell) => {
        cell.style.backgroundColor = color;
      });
    }
  }
};

const isLastSubject = i === dayTimePairs.length - 1; //마지막 교시인지 확인

    //연속된 강의면 mergedRows++
    if (i > 0) {
      const prevSubject = dayTimePairs[i - 1];
      const [prevDay, prevTime] = prevSubject.split(/([^\uAC00-\uD7A3]+)/);
      const currentTime = Number(time);
      const prevTimeEnd = Number(prevTime) + 1;
      if (day === prevDay && currentTime <= prevTimeEnd) {
        mergedRows++;
        if (!isLastSubject) {
          continue;
        }
      }
    }

    const div = document.createElement("div");
    div.innerHTML = `
      <div style="font-weight: bold; font-size: 15px; ">${subject.name}</div>
      <div>${subject.professor}</div>
      <div>${subject.room}</div>
    `;

  
    //연속된 강의면 rowspan 속성 설정 및 셀 삭제
    if (mergedRows > 1) {
      const startCellIndex = mergedRowStart.cellIndex;
      const rowspan = mergedRows;
      const prevRow = mergedRowStart.parentNode;

      for (let j = 1; j < mergedRows; j++) {
        const currentRowIndex = prevRow.rowIndex + j;
        const currentRow = timetable.rows[currentRowIndex];
        const cellToRemove = currentRow.cells[startCellIndex];
        if (cellToRemove) {
          cellToRemove.remove();
        }
      }
      mergedRowStart.setAttribute("rowspan", rowspan);
    }
    mergedRows = 1;
    mergedRowStart = cell;


    const isLastSubject = i === dayTimePairs.length - 1; //마지막 교시인지 확인
    if (!isLastSubject) {
      continue;
    }
    const startCellIndex = mergedRowStart.cellIndex;

  <!-- <tr>
                            <th> </th>
                            <th>월</th>
                            <th>화</th>
                            <th>수</th>
                            <th>목</th>
                            <th>금</th>
                        </tr>
                        <tr>
                            <th>9</th>
                            <td data-day="월" data-time="1"></td>
                            <td data-day="화" data-time="1"></td>
                            <td data-day="수" data-time="1"></td>
                            <td data-day="목" data-time="1"></td>
                            <td data-day="금" data-time="1"></td>
                        </tr>
                        <tr>
                            <th>10</th>
                            <td data-day="월" data-time="2"></td>
                            <td data-day="화" data-time="2"></td>
                            <td data-day="수" data-time="2"></td>
                            <td data-day="목" data-time="2"></td>
                            <td data-day="금" data-time="2"></td>
                        </tr>
                        <tr>
                            <th>11</th>
                            <td data-day="월" data-time="3"></td>
                            <td data-day="화" data-time="3"></td>
                            <td data-day="수" data-time="3"></td>
                            <td data-day="목" data-time="3"></td>
                            <td data-day="금" data-time="3"></td>
                        </tr>
                        <tr>
                            <th>12</th>
                            <td data-day="월" data-time="4"></td>
                            <td data-day="화" data-time="4"></td>
                            <td data-day="수" data-time="4"></td>
                            <td data-day="목" data-time="4"></td>
                            <td data-day="금" data-time="4"></td>
                        </tr>
                        <tr>
                            <th>1</th>
                            <td data-day="월" data-time="5"></td>
                            <td data-day="화" data-time="5"></td>
                            <td data-day="수" data-time="5"></td>
                            <td data-day="목" data-time="5"></td>
                            <td data-day="금" data-time="5"></td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td data-day="월" data-time="6"></td>
                            <td data-day="화" data-time="6"></td>
                            <td data-day="수" data-time="6"></td>
                            <td data-day="목" data-time="6"></td>
                            <td data-day="금" data-time="6"></td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td data-day="월" data-time="7"></td>
                            <td data-day="화" data-time="7"></td>
                            <td data-day="수" data-time="7"></td>
                            <td data-day="목" data-time="7"></td>
                            <td data-day="금" data-time="7"></td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td data-day="월" data-time="8"></td>
                            <td data-day="화" data-time="8"></td>
                            <td data-day="수" data-time="8"></td>
                            <td data-day="목" data-time="8"></td>
                            <td data-day="금" data-time="8"></td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td data-day="월" data-time="9"></td>
                            <td data-day="화" data-time="9"></td>
                            <td data-day="수" data-time="9"></td>
                            <td data-day="목" data-time="9"></td>
                            <td data-day="금" data-time="9"></td>
                        </tr> -->