const User = require("../model/User");
const Log = require("../model/Log")

exports.registerNewUser = async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        state: "danger"
      });
      let data = await user.save();
      res.status(201).json({data});
    } catch (err) {
      res.status(400).json({ err: err });
    }
};

exports.getUserDetails = async (req, res) => {
    const _id = req.body.userID;
    const user = await User.findOne({_id});
    await res.json(user);
};

exports.getAllUsers = async (req,res) => {
    User.find({}).then((users) => {
      res.send(users);
    }).catch((error) => {
      res.status(500).send(error);
    })
}

exports.updateUser = async (req, res) => {
  try {
      const _id = req.body._id;
      const user = await User.findOne({_id});
      if (user == 0) {
        res.status(401).json({ err: "User not found"});
      } else {
      user.logs = req.body.logs;
      user.state = req.body.state;
      let data = await user.save();
      res.status(200).json(data)
              }
  }
  catch (err) {
      res.status(400).json({err: err}); 
  }
}

exports.setLog = async (req, res) => {
    try {
      const _id = req.body.userID;
      const user = await User.findOne({_id});
      if (user == 0) {
        res.status(401).json({ err: "User not found"});
      } else {
        var logID = getNewId(user.logs);
        let log = new Log ({
            logID: logID,
            date: req.body.date,
            milliSeconds: req.body.milliSeconds,
            state: req.body.state
        })
        user.logs.push(log);
        user.state = log.state;
        let data = await user.save();
        res.status(201).json(data);
      }
    }
    catch (err) {
      res.status(400).json({ err: err });
    }
}

exports.deleteLog = async (req, res) => {
    try {
        const _id = req.body.userID;
        const user = await User.findOne({_id});
        if (user == 0) {
          res.status(401).json({ err: "User not found"});
        } else {
        
        let index = user.logs.findIndex(log => log.logID === req.body.logID);
        user.logs.splice(index,1);

        let data = await user.save();
        res.status(200).json(data);
        }
    }
    catch (err) {
        res.status(400).json({err: err}); 
    }
}

exports.updateLog = async (req, res) => {
    try {
        const _id = req.body.userID;
        const user = await User.findOne({_id});
        if (user == 0) {
          res.status(401).json({ err: "User not found"});
        } else {
        
        let index = user.logs.findIndex(log => log.logID === req.body.logID);

        user.logs[index].date = req.body.date;
        user.logs[index].milliSeconds = req.body.milliSeconds;
        user.logs[index].state = req.body.state;

        user.markModified('logs');
        
        let data = await user.save();
        res.status(200).json(data)
                }
    }
    catch (err) {
        res.status(400).json({err: err}); 
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let data = User.findByIdAndDelete(req.body._id, function (err) {
            if(err) console.log(err);
          });
          res.status(200).json(data);
    }
    catch (err) {
        res.status(400).json({err: err}); 
    }
}

const getNewId = (array) => {
    console.log("Generating ID...")
    if (array.length > 0) {
        return array.length + 1
    } else {
        return 1
    }
}