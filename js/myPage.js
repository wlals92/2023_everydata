//이지민 작성
//임의 DB
const tempCompleted = [
    {id: 1, semester_completed: "2022-2", category: "균형교양(통합교양) 5영역(과학과 기술)	", name: "프로그래밍언어론",  credit: 3, score: "A+"},
    {id: 2, semester_completed: "2023-1", category: "전공필수", name: "프로그래밍언어론",  credit: 3, score: "A+"},
    {id: 3, semester_completed: "2023-1", category: "전공필수", name: "프로그래밍언어론",  credit: 3, score: "A+"},
    {id: 4, semester_completed: "2023-1", category: "전공필수", name: "프로그래밍언어론",  credit: 3, score: "A+"},
    {id: 5, semester_completed: "2023-1", category: "전공필수", name: "프로그래밍언어론",  credit: 3}
]


//이수내역--------------------------------------------
// 서버에서 받아온 학기 정보
const semesters = ["2022-2", "2023-1", "2023-2"];

const semesterSelect = document.getElementById("semester-select");

// 학기 옵션 추가
semesters.forEach(semester => {
  const option = document.createElement("option");
  option.value = semester;
  option.textContent = semester;
  semesterSelect.appendChild(option);
});


const completed_table = document.getElementById("subjects-completed");
const rows = []; // 각 항목의 tr 요소를 저장할 배열

// 초기화: 모든 항목을 테이블에 추가하고 rows 배열에 저장
tempCompleted.forEach(subject => {
  const tr = document.createElement("tr");
  const selectOptions = ["선택", "A+", "A", "B+", "B", "C+", "C", "D+", "D", "F", "P", "NP"]; // 수정 가능한 성적 옵션

  tr.innerHTML = `
    <td>${subject.semester_completed}</td>
    <td>${subject.category}</td>
    <td>${subject.name}</td>
    <td>${subject.credit}</td>
    <td class="score-select-td">
      <select class="score-select">
        ${selectOptions.map(option => `<option value="${option}" ${subject.score === option ? "selected" : ""}>${option}</option>`).join("")}
      </select>
    </td>
  `;

  const select = tr.querySelector(".score-select");
  select.addEventListener("change", function() {
    const selectedScore = this.value; // 선택된 성적 값 가져오기
    // 수정된 성적을 서버로 보내는 로직 추가?
    const subjectId = subject.id; // 해당 과목의 고유 식별자 (임의 DB에서는 id로 가정)
    sendScoreUpdateToServer(subjectId, selectedScore);
    //백에서 temp 불러오는 함수 호출 추가
    updateChart();
  });

  completed_table.appendChild(tr);
  rows.push(tr);
});

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
function sendScoreUpdateToServer(subjectId, selectedScore) {
  // 서버 URL
  const url = `/api/updateScore/${subjectId}`;

  // AJAX 요청
  $.ajax({
    url: url,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({ score: selectedScore }),
    success: function (response) {
      console.log('성적 수정 요청이 성공적으로 전송되었습니다.');
    },
    error: function (xhr, status, error) {
      console.error('성적 수정 요청이 실패하였습니다.');
    }
  });
}


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

//사용자 프로필 : 메인 기준, 마이페이지용 확인---------------
$.ajax({
    url: "/user",
    type: "GET",
    dataType: "json",
    success: function(data) {
      const name = data.name;
      const user_credit = data.user_credit;
      const total_credit = data.total_credit;
      const major = data.major;
      const status = data.status;
      const academic_number = data.academic_number;
      const grade = data.grade;
  
      document.getElementById("profile-name").innerHTML = name;
      document.getElementById("profile-user_credit").innerHTML = user_credit;
      document.getElementById("profile-total_credit").innerHTML = total_credit;
      document.getElementById("profile-major").innerHTML = major;
      document.getElementById("profile-status").innerHTML = status;
      document.getElementById("profile-academic_number").innerHTML = academic_number;
      document.getElementById("profile-grade").innerHTML = grade;
    },
    error: function(xhr, status, error){
      console.log(xhr);
      console.log(status);
      console.log(error);
    }
  });