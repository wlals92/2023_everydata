//이지민 작성

const tempSubjects = [];
const table = document.getElementById("div-class_list_table");
function displaySubjectList(subjectsList) {
  // 기존 테이블 내용 삭제
  while (table.firstChild) {
    table.firstChild.remove();
  }

  fetch('../php/getSubjectsList.php', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      subjectsList.push(...data);
      console.log(subjectsList); // tempSubjects 배열 확인

      subjectsList.forEach(subject => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${subject.subject_name}</td>
          <td>${subject.professor}</td>
          <td style="width: 120px;">${subject.category}<br>(${subject.ge_category})</td>
          <td>${subject.lecture_time}</td>
          <td>${subject.lecture_room}</td>
          <td><button type="button" onclick="addSubjectFromList(${subject['1st_subject_id']})">시간표에 추가</button></td>
        `;
        table.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('데이터를 가져오는 도중 오류가 발생했습니다.', error);
    });
};

// 초기 페이지 로드 시 전체 강의 목록 표시
displaySubjectList(tempSubjects);

// 서버에 강의 추가 요청 전송
const addSubjectToServer = (subject) => {
  // AJAX 요청
  $.ajax({
    url: '../php/addSubject.php',
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

// 서버에서 현재 강의 목록 가져오기
const getTimetableFromServer = () => {
  return $.ajax({
    url: '../php/getTimetable.php',
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
  const subjects = await getTimetableFromServer();
  const alreadyAdded = subjects.find((addedSubject) => addedSubject.id === subject.id);
  return alreadyAdded !== undefined;
};

// 강의 시간 충돌 여부 확인하는 함수
const isTimeConflict = async (day, time) => {
  const subjects = await getTimetableFromServer();
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