Notes:
- This code does not calculate which projects are managed-access; the list of managed-access projects is included directly in index.html and would need to be updated manually
- The API call only requests one page of projects, so the code may need to be updated if the number of projects exceeds the page size of 500

Updating:
- Open index.html in a web browser and run `await getMonthlyProjects(<catalogNum>)`, where <catalogNum> is the latest release number
- Edit counts.js and replace the array on the right-hand side of the variable assignment with the new array returned by the above function call
- Reload index.html to view the updated graph