//이지민 작성

//사용자 프로필
$.ajax({
  url: "../php/getProfile.php",
  type: "GET",
  dataType: "json",
  success: function(data) {
    const name = data.name;
    const status = data.status;
    const academic_number = data.academic_number;
    const grade = data.grade;
    const user_credit = data.user_credit;
    const total_credit = data.total_credit;
    const curriculum_year = data.curriculum_year;
    const major = data.major;
    const minor = data.minor;
    const double_major = data.double_major;

    document.getElementById("profile-name").innerHTML = name;
    document.getElementById("profile-status").innerHTML = status;
    document.getElementById("profile-student_id").innerHTML = academic_number;
    document.getElementById("profile-grade").innerHTML = grade;
    document.getElementById("profile-user_credit").innerHTML = user_credit;
    document.getElementById("profile-total_credit").innerHTML = total_credit;
    document.getElementById("profile-curriculum_year").innerHTML = curriculum_year;
    document.getElementById("profile-major").innerHTML = major;
    const minorElement = document.getElementById("profile-minor");
    minorElement.innerHTML = minor !== 'null' ? minor : '-';
    const doubleMajorElement = document.getElementById("profile-double_major");
    doubleMajorElement.innerHTML = double_major !== 'null' ? double_major : '-';
  },
  error: function(xhr, status, error){
    console.log(xhr);
    console.log(status);
    console.log(error);
  }
});

//이수내역--------------------------------------------
// 서버에서 받아온 학기 정보
(async () => {
  try {
    const response = await fetch('../php/getSemesters.php');
    if (!response.ok) {
      throw new Error('서버 요청 실패');
    }

    const data = await response.json();
    console.log(data);
    const semesterSelect = document.getElementById("semester-select");

    data.forEach((row) => {
      const option = document.createElement("option");
      option.value = row;
      option.textContent = row;
      semesterSelect.appendChild(option);
    });
    
  } catch (error) {
    console.error('서버 요청 실패.', error);
  }
})();

const table = document.getElementById('subjects-completed');
const rows = [];

// 이수내역 불러오기
(async () => {
  try {
    const response = await fetch('../php/getCompleted.php');
    if (!response.ok) {
      throw new Error('서버 요청 실패');
    }
    const data = await response.json();
    console.log(data);
    data.forEach((row) => {
      const tr = document.createElement("tr");
      const selectOptions = ["선택", "A+", "A0", "B+", "B0", "C+", "C0", "D+", "D0", "F", "P", "NP"]; // 수정 가능한 성적 옵션

      tr.innerHTML = `
        <td>${row.semester_completed}</td>
        <td>${row.category}</td>
        <td>${row.subject_name}</td>
        <td>${row.credit}</td>
        <td class="score-select-td">
          <select class="score-select">
            ${selectOptions.map(option => `<option value="${option}" ${row.score === option ? "selected" : ""}>${option}</option>`).join("")}
          </select>
        </td>
      `;
      const select = tr.querySelector(".score-select");
      select.addEventListener("change", function() {
        const selectedScore = this.value; // 선택된 성적 값 가져오기
        // 수정된 성적을 서버로 보내는 로직 추가?
        const subjectId = row.subjects_completed_id; // 해당 과목의 고유 식별자 (임의 DB에서는 id로 가정)
        sendScoreUpdateToServer(subjectId, selectedScore);
        //백에서 temp 불러오는 함수 호출 추가
        updateChart();
      });

      table.appendChild(tr);
      rows.push(tr);
    });
    
  } catch (error) {
    console.error('서버 요청 실패.', error);
  }
})();

// 선택한 학기 과목만 보이게 하기
document.getElementById("semester-select").addEventListener("change", function() {
  const selectedSemester = this.value; // 선택된 학기 값 가져오기

  rows.forEach(row => {
    const semester = row.querySelector("td:first-child").textContent; // 해당 과목의 학기 값 가져오기

    // 선택된 학기에 이수한 과목은 보이게, 아닌 과목은 숨기기
    if (selectedSemester === "전체 학기" || semester === selectedSemester) {
      row.style.display = ""; // 보이기
    } else {
      row.style.display = "none"; // 숨기기
    }
  });
});

// 성적 정보를 받아오지 못한 경우 "선택" 표시
rows.forEach(row => {
  const select = row.querySelector(".score-select");
  const selectedScore = select.value;
  if (!selectedScore) {
    // 성적 정보가 없는 경우 "선택" 표시
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "선택";
    defaultOption.selected = true;
    select.insertBefore(defaultOption, select.firstChild);
  }
});


// 서버로 수정된 성적 정보 전송
// function sendScoreUpdateToServer(subjectId, selectedScore) {
//   // 서버 URL
//   const url = `/api/updateScore/${subjectId}`;

//   // AJAX 요청
//   $.ajax({
//     url: url,
//     type: 'PUT',
//     contentType: 'application/json',
//     data: JSON.stringify({ score: selectedScore }),
//     success: function (response) {
//       console.log('성적 수정 요청이 성공적으로 전송되었습니다.');
//     },
//     error: function (xhr, status, error) {
//       console.error('성적 수정 요청이 실패하였습니다.');
//     }
//   });
// }


// 성적 그래프-------------------------------------------
const tempScore = [
    {id: 1, semester: "1-1", total_score: 4.5, major_score: 4.5},
    {id: 2, semester: "1-2", total_score: 4.2, major_score: 4.0},
    {id: 3, semester: "2-1", total_score: 4.0, major_score: 4.3},
    {id: 4, semester: "2-2", total_score: 3.5, major_score: 3.85},
    {id: 5, semester: "3-1"},
    {id: 6, semester: "3-2"},
    {id: 7, semester: "4-1"},
    {id: 8, semester: "4-2"}
]

let labels = [];
let totals = [];
let majors = [];
for (let smst of tempScore){
  labels.push(smst.semester);
  totals.push(smst.total_score);
  majors.push(smst.major_score);
}

const updateChart = () => {
  let labels = [];
  let totals = [];
  let majors = [];
  for (let smst of tempScore){
    labels.push(smst.semester);
    totals.push(smst.total_score);
    majors.push(smst.major_score);
  }
  myChart.data.labels = labels;
  myChart.data.datasets[0].data = totals;
  myChart.data.datasets[1].data = majors;
  
  myChart.update();
}

const ctx = document.getElementById("myChart").getContext('2d');
const myChart = new Chart(ctx, {
    type:'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: '전체',
                data: totals,
                borderColor: '#40BBCA',
                backgroundColor: '#d3f0f0',
                borderWidth: 1
            },
            {
                label: '전공',
                data: majors,
                borderColor: '#A5A5A5',
                backgroundColor: '#D9D9D9',
                borderWidth: 1
            }
        ]
    },
    options: {
        maintainAspectRatio :false,
        // legend: {
        //     position: 'bottom'
        // },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
});
