// const checkProjectId = async (req, res, next) => {  
//   try {
//     const {id} = await Project.getProjectById(req.params.project_id);
//     if (id) {
//       req.body.project_id = id;
//       next();
//     } else {
//       res.status(404).json({ message: `Project with project_id ${id} not found` });
//     }
//   } catch (error) {
//     next(error);
//   }
// } This is not needed because we are using the middleware validateTask

const validateTask = async (req, res, next) => {
  try {
    const { task_description, project_id } = req.body;
    if (!task_description || typeof task_description !== 'string' || task_description.trim() === '') {
      res.status(400).json({ message: 'Task description is required!' });
    } if (!project_id) {
      res.status(400).json({ message: `Project ID of ${project_id} not found!` });
    }
    next();

  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateTask
}