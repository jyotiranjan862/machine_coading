import { Task } from "../model/task.model.js";

export const TaskController = {
  async createTask(req: any, res: any) {
    try {
      const { title, description, status = "pending", dueDate } = req.body;
      const task = await Task.create({ title, description, status, dueDate });
      res.status(201).json({ message: "Task created successfully", task });
    } catch (err) {
      throw new Error("Error creating task: " + err);
      res.status(500).json({ message: "Error creating task", error: err });
    }
  },
  async getTaskById(req: any, res: any) {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      res.status(200).json({ message: "Task fetched successfully", task });
    } catch (err) {
      throw new Error("Error fetching task: " + err);
    }
  },
  async getAllTasks(req: any, res: any) {
    try {
      const { page = 1, limit = 10, search = "", status = "" } = req.query;
      const query: Record<string, unknown> = {};

      if (search) {
        query.title = { $regex: search, $options: "i" };
      }

      if (status) {
        query.status = status;
      }

      const tasks = await Task.find(query)
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      res.status(200).json({ message: "Tasks fetched successfully", tasks });
    } catch (err) {
      throw new Error("Error fetching tasks: " + err);
    }
  },
  async updateTask(req: any, res: any) {
    try{
        const {id} =req.params;
        const {title,description,status,dueDate} = req.body;
        const task =await Task.findById(id).lean();
        if(!task){
            res.status(404).json({ message: "Task not found" });
            return;
        }
        const updateDataThatChanged: Record<string, unknown> = {};
        if(title && title !== task.title) updateDataThatChanged.title = title;
        if(description && description !== task.description) updateDataThatChanged.description = description;
        if(status && status !== task.status) updateDataThatChanged.status = status;
        if(dueDate && new Date(dueDate).getTime() !== new Date(task.dueDate).getTime()) updateDataThatChanged.dueDate = dueDate;

        const updatedTask = await Task.findByIdAndUpdate(id, updateDataThatChanged, { new: true });
        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
        
    }catch(err){
        throw new Error("Error updating task: " + err);
        res.status(500).json({ message: "Error updating task", error: err });
    }
  },

  async deleteTask(req: any, res: any) {
    try{
        const {id} = req.params;
        const task = await Task.findById(id).lean();
        if(!task){
            res.status(404).json({ message: "Task not found" });
            return;
        }

        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });

    }catch(error){
        throw new Error("Error deleting task: " + error);
        res.status(500).json({ message: "Error deleting task", error: error });
    }
  }
};
