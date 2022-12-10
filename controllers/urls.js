const Url = require("../models/Url");
const validUrl = require('valid-url');
const shortid = require('shortid');
const shortenUrl = async (req, res) => {
    console.log(req.body)
    const { longUrl } = req.body;


  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = "localhost:3000/api/v1/urls" + '/' + urlCode;
        const clicks = 0;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          clicks,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(401).json('Invalid long url');
  }
//   res.send("sent url");
};


module.exports = {
  shortenUrl,
//   getShortenUrl
};
// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json({ tasks });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };
// const create = (req, res) => {
//   res.json({ name: "tej" });

//   // res.send('check')
// };
// const createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };
// const getTask = async (req, res) => {
//   try {
//     const { id: myID } = req.params;
//     const task = await Task.findOne({ _id: myID });
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };
// const updateTask = async (req, res) => {
//   try {
//     const { id: myID } = req.params;
//     const task = await Task.findOneAndUpdate({ _id: myID }, req.body,{
//       new:true,
//       runValidators:true,
//     });
//     if (!task) {
//       return res.status(404).json({ msg: "No task with id : ${myID}" });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
//   // res.send("update task");
// };
// const deleteTask = async (req, res) => {
//   // res.send("delete task");
//   try {
//     const { id: myID } = req.params;
//     const task = await Task.findOneAndDelete({ _id: myID });
//     if (!task) {
//       return res.status(404).json({ msg: "No task with id : ${myID}" });
//     }
//     res.status(200).send("successfully deleted item");
//     // res.status(200).json({task})
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };
// module.exports = {
//   getAllTasks,
//   createTask,
//   getTask,
//   updateTask,
//   deleteTask,
//   create,
// };
