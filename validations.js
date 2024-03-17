const validation = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const { username, age, hobbies } = data;
      if (!username || !age || !hobbies) {
        reject({
          status: 400,
          flag: true,
          comments: [
            "The required feilds are missing, please refer the documentation to find the correct payload (required fields)",
          ],
        });
        return;
      }
      let flag = false;
      const comments = [];
      if (!/^[a-zA-Z]+$/.test(username)) {
        flag = true;
        comments.push(
          "Please enter a valid name E.g. Sunil Please don't enter any special charater, blank space or any numeric value"
        );
      }
      if (typeof +age !== "number") {
        flag = true;
        comments.push("Please enter a valid age E.g. 20");
      } else if (!(age > 1 && age < 100)) {
        flag = true;
        comments.push("Please enter a valid age E.g. 18");
      }

      if (!Array.isArray(hobbies)) {
        flag = true;
        comments.push("Hobbies should be an array. Not a " + typeof hobbies);
      } else {
        for (let hobby of hobbies) {
          if (/[^A-z\s\d][\\\^]?/.test(hobby)) {
            flag = true;
            comments.push(
              "Please enter a valid hobby E.g. Playing Cricket Please don't enter any special charater"
            );
          }
        }
      }

      if (!flag) resolve({ flag, comments, status: 200 });
      else resolve({ flag, comments, status: 400 });
    } catch (error) {
      reject({ status: 500, flag: true, comments: ["Internal Server Error"] });
    }
  });
};

const putValidation = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const { username, age, hobbies } = data;

      let flag = false;
      const comments = [];
      if (username) {
        if (!/^[a-zA-Z]+$/.test(username)) {
          flag = true;
          comments.push(
            "Please enter a valid name E.g. Sunil Please don't enter any special charater, blank space or any numeric value"
          );
        }
      }

      if (age) {
        if (typeof +age !== "number") {
          flag = true;
          comments.push("Please enter a valid age E.g. 20");
        } else if (!(age > 1 && age < 100)) {
          flag = true;
          comments.push("Please enter a valid age E.g. 18");
        }
      }
      if (hobbies) {
        if (!Array.isArray(hobbies)) {
          flag = true;
          comments.push("Hobbies should be an array. Not a " + typeof hobbies);
        } else {
          for (let hobby of hobbies) {
            if (/[^A-z\s\d][\\\^]?/.test(hobby)) {
              flag = true;
              comments.push(
                "Please enter a valid hobby E.g. Playing Cricket Please don't enter any special charater"
              );
            }
          }
        }
      }

      if (!flag) resolve({ flag, comments, status: 200 });
      else resolve({ flag, comments, status: 400 });
    } catch (error) {
      reject({ status: 500, flag: true, comments: ["Internal Server Error"] });
    }
  });
};

module.exports = {
  validation,
  putValidation,
};
