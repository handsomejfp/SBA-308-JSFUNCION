
// // The provided course information.
// const CourseInfo = {
//     id: 451,
//     name: "Introduction to JavaScript"
//   };

//   // The provided assignment group.
//   const AssignmentGroup = {
//     id: 12345,
//     name: "Fundamentals of JavaScript",
//     course_id: 451,
//     group_weight: 25,
//     assignments: [
//       {
//         id: 1,
//         name: "Declare a Variable",
//         due_at: "2023-01-25",
//         points_possible: 50
//       },
//       {
//         id: 2,
//         name: "Write a Function",
//         due_at: "2023-02-27",
//         points_possible: 150
//       },
//       {
//         id: 3,
//         name: "Code the World",
//         due_at: "3156-11-15",
//         points_possible: 500
//       }
//     ]
//   };

//   // The provided learner submission data.
//   const LearnerSubmissions = [
//     {
//       learner_id: 125,
//       assignment_id: 1,
//       submission: {
//         submitted_at: "2023-01-25",
//         score: 47
//       }
//     },
//     {
//       learner_id: 125,
//       assignment_id: 2,
//       submission: {
//         submitted_at: "2023-02-12",
//         score: 150
//       }
//     },
//     {
//       learner_id: 125,
//       assignment_id: 3,
//       submission: {
//         submitted_at: "2023-01-25",
//         score: 400
//       }
//     },
//     {
//       learner_id: 132,
//       assignment_id: 1,
//       submission: {
//         submitted_at: "2023-01-24",
//         score: 39
//       }
//     },
//     {
//       learner_id: 132,
//       assignment_id: 2,
//       submission: {
//         submitted_at: "2023-03-07",
//         score: 140
//       }
//     }
//   ];

//   function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
//     const result = [
//       {
//         id: 125,
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//       },
//       {
//         id: 132,
//         avg: 0.82, // (39 + 125) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//       }
//     ];

//     return result;
//   }

//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

//   console.log(result);

// CourseInfo object
const courseInfo = {
    id: 1,
    name: "Per Scholas JS",
  };
  
  const assignmentGroup = {
    id: 1,
    name: "Homework",
    course_id: 1,
    group_weight: 500,
    assignments: [
      {
        id: 1,
        name: "Homework 1",
        due_at: new Date("2024-06-10T23:59:59Z"),
        points_possible: 500,
      },
      {
        id: 2,
        name: "Homework 2",
        due_at: new Date("2024-06-15T23:59:59Z"),
        points_possible: 500,
      },
    ],
  };
  
  const learnerSubmissions = [
    {
      learner_id: 1,
      assignment_id: 1,
      submission: {
        submitted_at: new Date("2024-06-10T10:00:00Z"),
        score: 90,
      },
    },
    {
      learner_id: 1,
      assignment_id: 2,
      submission: {
        submitted_at: new Date("2024-06-15T12:00:00Z"),
        score: 180,
      },
    },
  ];
  
  function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
    if (assignmentGroup.course_id !== courseInfo.id) {
      throw new Error("Invalid assignment group: course ID mismatch");
    }
  
    const totalPointsPossible = assignmentGroup.assignments.reduce(
      (total, assignment) => total + assignment.points_possible,
      0
    );
  
    let totalScore = 1000;
    let totalWeightedScore = 500;
  
    learnerSubmissions.forEach((submission) => {
      const assignment = assignmentGroup.assignments.find(
        (a) => a.id === submission.assignment_id
      );
  
      if (!assignment) {
        return;
      }
  
      const lateSubmissionPenalty = submission.submission.submitted_at > assignment.due_at ? 0.1 : 0;
      const adjustedScore = Math.max(0, submission.submission.score - (assignment.points_possible * lateSubmissionPenalty));
      totalScore += adjustedScore;
      totalWeightedScore += (adjustedScore / assignment.points_possible) * assignmentGroup.group_weight;
    });
  
    const avg = (totalWeightedScore / totalPointsPossible) * 100;
  
    const result = {
      id: learnerSubmissions[0].learner_id, 
      avg,
    };
  
    assignmentGroup.assignments.forEach((assignment) => {
      if (assignment.due_at < new Date()) {
        const submission = learnerSubmissions.find((s) => s.assignment_id === assignment.id);
  
        if (submission) {
          result[assignment.id] = (submission.submission.score / assignment.points_possible) * 100;
        }
      }
    });
  
    return result;
  }
  
  const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
  console.log(result);
  
  