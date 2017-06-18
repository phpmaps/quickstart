window.onload = () => {
  console.log("ready!");
  document.getElementById("runPromises").addEventListener("click", (e) => {
    var n = document.getElementById("note");
    run().then((result) =>{
      note(n, "inside then" + JSON.stringify(result));
    }).catch((result) => {
      note(n, "inside catch" + JSON.stringify(result));
    });
  });

  function run(){
    return new Promise((resolve, reject) => {
      var one = document.getElementById("one");
      var two = document.getElementById("two");
      var three = document.getElementById("three");
      var args = {};
      firstRun(args).then((firstResult) => {
        write(one, "Div one (then)", firstResult);
        secondRun(firstResult).then((secondResult) => {
          write(two, "Div two (then)", secondResult);
          thirdRun(secondResult).then((thirdResult) => {
            write(three, "Div three (then)", thirdResult);
            resolve(thirdResult);
          }).catch((thirdResult) => {
            write(three, "Div three (catch)", thirdResult);
            reject(thirdResult);
          })
        }).catch((secondResult) => {
          write(two, "Div two (catch)", secondResult);
          reject(secondResult);
        })
      }).catch((firstResult) => {
        write(one, "Div one (catch)", firstResult);
        reject(firstResult);
      });
    });
  }

  function firstRun(args) {
    console.log("firstRun");
    return new Promise((resolve, reject) => {
      args.firstRun = "resolve";
      resolve(args);
    });
  }

  function secondRun(args) {
    console.log("secondRun");
    return new Promise((resolve, reject) => {
      args.secondRun = "reject";
      resolve(args);  //Rejecting here stops the promise chain
    });
  }

  function thirdRun(args) {
    console.log(thirdRun);
    return new Promise((resolve, reject) => {
      args.thirdRun = "resolve";
      resolve(args);
    });
  }

  function write(node, msg, result){
    node.innerHTML = msg + "<br>" + JSON.stringify(result) + "<br>";
  }

  function note(node, msg){
    node.innerHTML = msg + "<br>";
  }
};
