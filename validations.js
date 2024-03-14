const validation = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const { username, age, hobbies } = data;
      let flag = false;
      const comments = [];
      if (!/^[a-zA-Z]+$/.test(username)) {
        flag = true;
        comments.push("Please enter a valid name E.g. Sunil Poojari");
      }
      if (typeof +age !== "number") {
        flag = true;
        comments.push("Please enter a valid age E.g. 20");
      } else if (!(age > 1 && age < 100)) {
        flag = true;
        comments.push("Please enter a valid age E.g. 18");
      }
      for (let hobby of hobbies) {
        if (!/^[a-zA-Z]+$/.test(hobby)) {
          flag = true;
          comments.push("Please enter a valid hobby E.g. Playing Cricket");
        }
      }
      if (!flag) resolve({ flag, comments, status: 200 });
      else resolve({ flag, comments, status: 403 });
    } catch (error) {
      reject({ status: 500, flag: true, comments: ["Internal Server Error"] });
    }
  });
};

module.exports = {
  validation,
};