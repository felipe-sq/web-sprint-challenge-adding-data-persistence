const projects = [
  {project_name: "Letters of Introduction Tool", project_description: "A tool for the student body to create Letters of Introduction for their Job Search.", project_completed: 0},
  {project_name: "Student Body Website", project_description: "A website for the student body to manage their information.", project_completed: 0}
]

const resources = [
  {resource_name: "Letters of Introduction Templates", resource_description: "Templates for the Letters of Introduction - Job Search tool."},
  {resource_name: "Student Body Website Scaffolding", resource_description: "A scaffolding resource with templates for the student body website."}
]

const tasks = [
  {task_description: "Create Letters of Introduction Templates", task_notes: "Create the templates for the Letters of Introduction tool.", task_completed: 0, project_id: 1},
  {task_description: "Create Student Body Website Scaffolding", task_notes: "Create the scaffolding for the student body website.", task_completed: 0, project_id: 2}
]

const project_resources = [
  {project_id: 1, resource_id: 1},
  {project_id: 2, resource_id: 2}
]

exports.seed = async function(knex) {
  await knex('projects').insert(projects)
  await knex('resources').insert(resources)
  await knex('tasks').insert(tasks)
  await knex('project_resources').insert(project_resources)
};