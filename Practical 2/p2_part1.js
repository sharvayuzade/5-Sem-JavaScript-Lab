const student = {
    name: "sharvayu", rollno: "1135", marks: [80,77,67,97,89]
}

const [sub1, sub2, sub3, sub4, sub5] = student.marks

const total = sub1 + sub2 + sub3 + sub4 + sub5;
const percentage = (total / 500) * 100;



console.log(`
Report Card

Name       : ${student.name}
Roll No.   : ${student.roll}

Marks:
Sub 1  : ${sub1}
Sub 2  : ${sub2}
Sub 3  : ${sub3}
Sub 4  : ${sub4}
Sub 5  : ${sub5}

Total : ${total}/500
Percentage : ${percentage.toFixed(2)}%

`);