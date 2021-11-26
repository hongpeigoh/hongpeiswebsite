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

router.get("/api/kanban/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("projects", "title label")
      .select("_id username projects");

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.get("/api/kanban/:userId/getProject/:projId", async (req, res, next) => {
  try {
    const validated = await validateProject(
      req.params.userId,
      req.params.projId
    );
    if (!validated) {
      return res.sendStatus(403);
    }

    const project = await Project.findById(req.params.projId).populate({
      path: "lanes",
      sort: { index: 1 },
      populate: { path: "cards", sort: { index: 1 } },
    });
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.post("/api/kanban/:userId/addProject", async (req, res, next) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      label: req.body.label,
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

router.put("/api/kanban/:userId/editProject", async (req, res, next) => {
  try {
    const validated = await validateProject(req.params.userId, req.body._id);
    if (!validated) {
      return res.sendStatus(403);
    }

    const project = {
      _id: req.body._id,
      title: req.body.title,
      description: req.body.description,
      label: req.body.label,
    };
    const updatedProject = await Project.findByIdAndUpdate(
      req.body._id,
      project,
      { strict: true, returnDocument: "after" }
    ).exec();
    res.status(201).json(updatedProject);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.delete(
  "/api/kanban/:userId/deleteProject/:projId",
  async (req, res, next) => {
    try {
      const validated = await validateProject(
        req.params.userId,
        req.params.projId
      );
      if (!validated) {
        return res.sendStatus(403);
      }

      const project = await Project.findById(req.params.projId).populate("lanes");
      const user = await User.findById(req.params.userId);

      for (let lane in project.lanes) {
        Card.removeMany({ laneId: lane._id });
        lane.remove();
      }
      project.remove();
      user.projects.pull({ _id: req.params.projId });

      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  }
);

router.post("/api/kanban/:userId/addLane", async (req, res, next) => {
  try {
    const validated = await validateProject(
      req.params.userId,
      req.body.projectId
    );
    if (!validated) {
      return res.sendStatus(403);
    }

    let lane = new Lane({
      title: req.body.title,
      index: req.body.index,
      projectId: req.body.projectId,
      userId: req.params.userId,
      cards: [],
    });
    lane = await lane.save();
    await Project.findByIdAndUpdate(req.body.projectId, {
      $push: { lanes: lane },
    });
    res.status(201).json(lane);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.put("/api/kanban/:userId/editLane", async (req, res, next) => {
  try {
    const validated = await validateLane(req.params.userId, req.body._id);
    if (!validated) {
      return res.sendStatus(403);
    }

    let lane = {
      _id: req.body._id,
      title: req.body.title,
    };
    lane = await Lane.findByIdAndUpdate(req.body._id, lane, {
      strict: true,
      returnDocument: "after",
    }).exec();
    res.status(201).json(lane);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.delete(
  "/api/kanban/:userId/deleteLane/:laneId",
  async (req, res, next) => {
    try {
      const validated = await validateLane(
        req.params.userId,
        req.params.laneId
      );
      if (!validated) {
        return res.sendStatus(403);
      }

      const lane = await Lane.findById(req.params.laneId).exec();
      const project = await Project.findById(lane.projectId);

      Card.removeMany({ laneId: lane._id });
      lane.remove();
      project.lanes.pull({ _id: req.params.laneId });

      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  }
);

router.post("/api/kanban/:userId/addCard", async (req, res, next) => {
  try {
    const validated =
      (await validateProject(req.params.userId, req.body.projectId)) &&
      (await validateLane(req.params.userId, req.body.laneId));
    if (!validated) {
      return res.sendStatus(403);
    }

    let card = new Card({
      title: req.body.title,
      description: req.body.description,
      label: req.body.label,
      laneId: req.body.laneId,
      projectId: req.body.projectId,
      userId: req.params.userId,
    });
    card = await card.save();
    await Lane.findByIdAndUpdate(req.body.laneId, {
      $push: { cards: card },
    });
    res.status(201).json(card);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.put("/api/kanban/:userId/editCard", async (req, res, next) => {
  try {
    const validated =
      (await validateCard(req.params.userId, req.body._id)) &&
      (await validateLane(req.params.userId, req.body.laneId));
    if (!validated) {
      return res.sendStatus(403);
    }

    let card = {
      _id: req.body._id,
      title: req.body.title,
      description: req.body.description,
      label: req.body.label,
      laneId: req.body.laneId,
    };
    card = await Card.findByIdAndUpdate(req.body._id, card, {
      strict: true,
      returnDocument: "after",
    }).exec();
    res.status(201).json(lane);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.delete("/api/kanban/:userId/deleteCard/:cardId", async (req, res, next) => {
    try {
      const validated = await validateCard(
        req.params.userId,
        req.params.cardId
      );
      if (!validated) {
        return res.sendStatus(403);
      }

      const card = await Card.findById(req.params.cardId).exec();
      const lane = await Lane.findById(card.laneId);

      card.remove();
      lane.card.pull({ _id: req.params.cardId });

      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  });

async function validateProject(userId, projectId) {
  const project = await Project.findById(projectId).exec();
  return project && userId === project.userId.toString();
}

async function validateLane(userId, laneId) {
  const lane = await Lane.findById(laneId).exec();
  const validated = await validateProject(userId, lane.projectId);
  return lane && validated;
}

async function validateCard(userId, cardId) {
  const card = await Card.findById(cardId).exec();
  const validated = await validateProject(userId, card.projectId);
  return card && validated;
}

module.exports = router;
