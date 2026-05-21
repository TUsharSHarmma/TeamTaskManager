import Task from "../models/Task.js";

export const createTask = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      project,
      assignedTo,
      priority,
      dueDate
    } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      priority,
      dueDate
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getTasks = async (
  req,
  res
) => {
  try {
    let tasks;

    if (req.user.role === "Admin") {
      tasks = await Task.find()
        .populate(
          "assignedTo",
          "name email"
        )
        .populate("project", "title");
    } else {
      tasks = await Task.find({
        assignedTo: req.user._id
      })
        .populate(
          "assignedTo",
          "name email"
        )
        .populate("project", "title");
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateTask = async (
  req,
  res
) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    task.status =
      req.body.status || task.status;

    task.submissionNote =
      req.body.submissionNote ||
      task.submissionNote;

    const updatedTask =
      await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteTask = async (
  req,
  res
) => {
  try {
    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Task deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getSingleTask = async (
  req,
  res
) => {
  try {
    const task = await Task.findById(
      req.params.id
    )
      .populate("assignedTo", "name")
      .populate("project", "title");

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};