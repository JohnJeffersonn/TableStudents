 let sortDirections = {}
 const dateLimit = 2000;
 let array = [
     { sname: 'Сидоров', fname: 'Иван', lname: 'Михайлович', bdate: '23.12.1990', startlearn: '2005', fac: 'Физики' },
     { sname: 'Сидорова', fname: 'Ивана', lname: 'Михайловна', bdate: '12.11.1994', startlearn: '2019', fac: 'Астрономии' },
     { sname: 'Сорокина', fname: 'Мария', lname: 'Алексеевна', bdate: '01.01.1992', startlearn: '2008', fac: 'Математики' },
     { sname: 'Андропов', fname: 'Александр', lname: 'Петрович', bdate: '03.10.1992', startlearn: '2003', fac: 'Информатики' },
     { sname: 'Никифоров', fname: 'Олег', lname: 'Олегович', bdate: '24.12.1995', startlearn: '2021', fac: 'Химии' }
 ]


 buildTable(array)

 function age(str) {
     let [date, month, year] = str.match(/(\d+)/g);
     --month;
     let now = new Date;
     let nowYear = now.getFullYear(),
         nowMonth = now.getMonth(),
         nowDate = now.getDate();
     return nowYear - year - (0 > (nowMonth - month || nowDate - date))
 };

 function buildTable(data) {
     let table = document.getElementById('mytable')
     table.innerHTML = '';
     let html = ''

     for (let i = 0; i < data.length; i++) {
         let fioObj = data[i].sname + " " + data[i].fname + " " + data[i].lname;
         let old = age(data[i].bdate)
         let title = titleLearn(data[i].startlearn)
         let row = `
        <tr>
        <td>${fioObj}</td>
        <td>${data[i].fac}</td>
        <td>${data[i].bdate} (${old})</td>
        <td>${title}</td>
        <tr/>
        `
         html += row


     }
     table.innerHTML = html
 }


 function sortColumn(columnName) {
     const dataType = !Number.isNaN(+array[0][columnName]) ? "number" : "string"
     if (!sortDirections[columnName]) {
         sortDirections[columnName] = false
     }
     sortDirections[columnName] = !sortDirections[columnName];

     switch (dataType) {
         case 'number':
             sortNumberColumn(sortDirections[columnName], columnName);
             break;
         case 'string':
             sortStringColumn(sortDirections[columnName], columnName);
             console.log(array)
             break;

     }
     buildTable(array)
 }

 function sortColumn1(columnName) {
     const dataType = !Number.isNaN(+array[0][columnName]) ? "number" : "string"
     if (!sortDirections[columnName]) {
         sortDirections[columnName] = false
     }
     sortDirections[columnName] = !sortDirections[columnName];

     switch (dataType) {
         case 'number':
             sortDateColumn(sortDirections[columnName], columnName);
             break;
         case 'string':
             sortStringColumn(sortDirections[columnName], columnName);
             console.log(array)
             break;

     }
     buildTable(array)
 }


 function sortDateColumn(sort, columnName) {
     a = new Date(a.bdate).valueOf()
     b = new Date(b.bdate).valueOf()
     array = array.sort((p1, p2) => {
         return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]
     })
 }

 function sortNumberColumn(sort, columnName) {

     array = array.sort((p1, p2) => {
         return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]
     })
 }

 function sortStringColumn(sort, columnName) {

     array = array.sort((p1, p2) => {
         if (sort) {
             if (p1[columnName] > p2[columnName]) {
                 return 1;
             }
             if (p1[columnName] < p2[columnName]) {
                 return -1;
             }
             return 0
         } else {
             if (p1[columnName] > p2[columnName]) {
                 return -1;
             }
             if (p1[columnName] < p2[columnName]) {
                 return 1;
             }
             return 0
         }
     })
 }


 function onAddStudent() {
     const inputStudentName = document.getElementById('student__name').value;
     const inputStudentSName = document.getElementById('student__sname').value;
     const inputStudentLName = document.getElementById('student__lname').value;
     const inputStudentBDate = document.getElementById('student__bdate').value;
     const inputStudentStLearn = document.getElementById('student__startLearn').value;
     const inputStudentFac = document.getElementById('student__faculty').value;
     let birthdayDate = new Date(inputStudentBDate)

     if (!inputStudentName.trim().toLowerCase()) {
         alert('error')
         return
     }

     if (!inputStudentSName.trim().toLowerCase()) {
         alert('error')
         return
     }
     if (!inputStudentLName.trim().toLowerCase()) {
         alert('error')
         return
     }
     if (birthdayDate > new Date() || birthdayDate.getFullYear() < 1900) {
         alert('is not a correct date')
         return
     }
     let startLearnYear = +inputStudentStLearn.trim().toLowerCase()
     if (startLearnYear < dateLimit || Number.isNaN(startLearnYear) || startLearnYear > new Date().getFullYear()) {
         alert('is not a correct date')
         return
     }

     if (!inputStudentFac.trim().toLowerCase()) {
         alert('error')
         return
     }





     let newStudent = {
         fname: inputStudentName,
         sname: inputStudentSName,
         lname: inputStudentLName,
         bdate: inputStudentBDate,
         startlearn: inputStudentStLearn,
         fac: inputStudentFac,
     }

     array.push(newStudent);
     buildTable(array);
     console.log(newStudent);

 }

 function titleLearn(str) {
     let endYear = +str + 4;
     let now = new Date;
     let grade = now.getFullYear() - str;

     let output
     if (grade > 4) {
         output = `${str}-${endYear} (закончил)`
     } else {
         output = `${str}-${endYear} (${grade} курс)`
     }

     return output
 }
 document.querySelector('.filter__list').addEventListener("input", function() {
     let arr = array.slice(0),
         str = '';
     if (inputFio.value.trim().toLowerCase()) {
         let str = inputFio.value.trim().toLowerCase()
         arr = arr.filter(({
             sname,
             fname,
             lname
         }) => [sname, fname, lname].some(title => title.toLowerCase().includes(str)))
     }
     if (inputFac.value.trim().toLowerCase()) {
         let str = inputFac.value.trim().toLowerCase()
         arr = arr.filter(({
             fac
         }) => fac.toLowerCase().includes(str))
     }
     if (inputDateStart.value.trim().toLowerCase()) {
         let str = inputDateStart.value.trim().toLowerCase()
         arr = arr.filter(({
             startlearn
         }) => startlearn.slice(-4) == str)
     }
     if (inputDateEnd.value.trim().toLowerCase()) {
         let str = inputDateEnd.value.trim().toLowerCase()
         arr = arr.filter(({
             startlearn
         }) => +startlearn.slice(-4) + 4 == str)
     }

     buildTable(arr)
 })
