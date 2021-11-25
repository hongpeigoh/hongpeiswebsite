const express = require("express");

const router = express.Router();

const User = require("../model/user");
const Project = require("../model/project");
const Lane = require("../model/lane");
const Card = require("../model/card");

const strict = { strict: true };

router.get("/api/kanban", (req, res, next) => {
  res.send("<h1>Kanban</h1>");
});

router.get("/api/kanban/:userId", async function (req, res, next) {
  try {
    const user = await User.findById(req.params.userId)
      .populate(["projects"])
      .select("_id username projects");

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.post("/api/kanban/:userId/addProject", async function (req, res, next) {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      userId: req.params.userId,
      lanes: [],
    });
    const proj = await project.save();
    await User.findByIdAndUpdate(req.params.userId, {
      $push: { projects: proj },
    });
    res.status(201).json(proj);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.put("/api/kanban/:userId/editProject", (req, res, next) => {
  validateProject(req.params.userId, req.body._id).then((validated) => {
    if (!validated) {
      return res.sendStatus(403);
    }
    const project = {
      _id: req.body._id,
      title: req.body.title,
      description: req.body.description,
      lanes: req.body.lanes,
    };
    Project.findByIdAndUpdate(
      req.body._id,
      project,
      { strict: true, returnDocument: "after" },
      function (error, updatedProject) {
        if (error) {
          res.status(404).send(error);
        } else {
          res.status(201).json(updatedProject);
        }
      }
    );
  });
});

router.delete("/api/kanban/:userId/deleteProject/:projId", (req, res, next) => {
  validateProject(req.params.userId, req.params.projId).then((validated) => {
    if (!validated) {
      return res.sendStatus(403);
    }
    Project.findByIdAndDelete(
      req.params.projId,
      strict,
      function (error, project) {
        if (error) {
          res.status(404).send(error);
        } else {
          for (let lane in project.lanes) {
            // delete lane
          }
          res.sendStatus(201);
        }
      }
    );
  });
});

router.post("/api/kanban/:userId/addLane", (req, res, next) => {
  console.log("Unsupported operation");
});

router.put("/api/kanban/:userId/editLane", (req, res, next) => {
  console.log("Unsupported operation");
});

router.delete("/api/kanban/:userId/deleteLane", (req, res, next) => {
  console.log("Unsupported operation");
});

router.post("/api/kanban/:userId/addCard", (req, res, next) => {
  console.log("Unsupported operation");
});

router.put("/api/kanban/:userId/editCard", (req, res, next) => {
  console.log("Unsupported operation");
});

router.delete("/api/kanban/:userId/deleteCard", (req, res, next) => {
  console.log("Unsupported operation");
});

async function validateProject(userId, projectId) {
  const project = await Project.findById(projectId).exec();
  return project && userId === project.userId.toString();
}

module.exports = router;
