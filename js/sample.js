//이지민 작성


//임의 DB
const tempSubjects = [
  {id: 1, name: "프로그래밍언어론", professor:"홍길동", category: "전공필수", time:"월1, 월2, 수3", room: "030-0304"},
  {id: 2, name: "소프트웨어설계PBL", professor:"홍길동", category: "전공필수", time:"월2, 월3", room: "030-0304"},
  {id: 3, name: "데이터베이스", professor:"홍길동", category: "전공필수", time:"금1, 금2", room: "030-0304"},
  {id: 4, name: "데이터과학", professor:"홍길동", category: "전공필수", time:"월11, 월12", room: "030-0304"},
  {id: 5, name: "컴퓨터네트워크", professor:"홍길동", category: "전공필수", time:"화6, 화7, 수3", room: "030-0304"}
]


const table = document.getElementById("div-class_list_table");
tempSubjects.forEach(subjects => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${subjects.name}</td>
    <td>${subjects.professor}</td>
    <td>${subjects.category}</td>
    <td>${subjects.time}</td>
    <td>${subjects.room}</td>
    <td><button type="button" onclick="addSubjectFromList(${subjects.id})">시간표에 추가</button></td>
  `;
  table.appendChild(tr);
});

// 서버에 강의 추가 요청 전송
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
      console.log('강의 추가 요청이 성공적으로 전송되었습니다.');

      localStorage.setItem('subjectAdded', 'true');
    },
    error: function (xhr, status, error) {
      console.error('강의 추가 요청이 실패하였습니다.');
    }
  });
};

// 서버에서 강의 목록 가져오기
const getSubjectsFromServer = () => {
  // 서버 URL
  const url = '/api/getSubjects';

  return $.ajax({
    url: url,
    type: 'GET',
    success: function (subjects) {
      return subjects;
    },
    error: function (xhr, status, error) {
      console.error('강의 목록을 가져오는 도중 오류가 발생하였습니다.', error);
      return [];
    }
  });
};

// 이미 추가된 강의인지 확인하는 함수
const isAlreadyAdded = async (subject) => {
  const subjects = await getSubjectsFromServer();
  const alreadyAdded = subjects.find((addedSubject) => addedSubject.id === subject.id);
  return alreadyAdded !== undefined;
};

// 강의 시간 충돌 여부 확인하는 함수
const isTimeConflict = async (day, time) => {
  const subjects = await getSubjectsFromServer();
  const cell = subjects[day][time];
  return cell && cell.length > 0;
};

// 강의목록에서 강의 추가
const addSubjectFromList = async (id) => {
  console.log('강의 추가');
  const subject = tempSubjects.find((subject) => subject.id === id);
  if (subject) {
    const dayTimePairs = subject.time.split(", ");

    for (let i = 0; i < dayTimePairs.length; i++) {
      const [day, time] = dayTimePairs[i].split(/([^\uAC00-\uD7A3]+)/);

      const isAdded = await isAlreadyAdded(subject);
      if (isAdded) {
        alert('이미 추가된 강의입니다.');
      } else {
        const isConflict = await isTimeConflict(day, time);
        if (isConflict) {
          alert('해당 시간에 이미 다른 강의가 있습니다.');
        } else {
          addSubjectToServer(subject);
        }
      }
    }
  } else {
    console.log('해당 강의를 찾을 수 없습니다.');
  }
}; 