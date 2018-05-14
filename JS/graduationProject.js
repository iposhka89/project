$(document).ready(function () {ajaxForLoading()});
function ajaxForLoading() {
    $.ajax({
        url: 'http://localhost:9999/api/tasks',
        method: 'GET',
        success: function (response) {
            for (var i = 0; i < response.tasks.length; i++) {
				var loadTaskFormHtml = 	'<div id=" '+ response.tasks[i].id + ' " class="taskBlock">' +
											'<div id="taskElement" class="activeTask">' +
												'<div id="taskTitle" class="taskName">' + 
													'<h2>'+ response.tasks[i].title +'</h2>' + 
												'</div>' +
												'<div class="taskDescription">' + 
													'<textarea cols="30" rows="1">' + response.tasks[i].description +'</textarea>' + 
												'</div>' +
												'<div class="rowBtn">' +
													'<button id="editBtn">Edit</button>' +
													'<button id="doneBtn">Done</button>' +
													'<button id="removeBtn">Remove</button>' +
												'</div>' + 
											'</div>' + 
										'</div>';
                $('#taskContent').append(loadTaskFormHtml);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function ajaxForAddTask( newTaskName, newTaskDescription ){
	$.ajax({
        url: 'http://localhost:9999/api/tasks',
        method: 'POST',
        data: {
            title: newTaskName,
            description: newTaskDescription
        },
        success: function(response) {
            console.log(response.task);
			var addTaskFormHtml = 	'<div id=" '+ response.task.id + ' " class="taskBlock">' +
									'<div id="taskElement" class="activeTask">' +
										'<div id="taskTitle" class="taskName">' + 
											'<h2>'+ newTaskName +'</h2>' + 
										'</div>' +
										'<div class="taskDescription">' + 
											'<textarea cols="30" rows="1">' + newTaskDescription +'</textarea>' + 
										'</div>' +
										'<div class="rowBtn">' +
											'<button id="editBtn">Edit</button>' +
											'<button id="doneBtn">Done</button>' +
											'<button id="removeBtn">Remove</button>' +
										'</div>' + 
									'</div>' + 
								'</div>';
            $('#taskContent').prepend(addTaskFormHtml);
			$('#addTaskBtn').attr('disabled', true);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function ajaxForDeleteTask(taskId){
	$.ajax({
                 url: 'http://localhost:9999/api/tasks/' + taskId,
                 method: 'DELETE',
                 success: function (response) {
                     console.log(response);
                 },
                 error: function (error) {
                     console.log(error);
                 }
             });
}

function addNewTask() {
    var newTaskName = $('#addName').val().trim(),
		newTaskDescription = $('#addTaskDescription').val().trim();
	$('#addName').val('');
    $('#addDescription').val('');
    ajaxForAddTask(newTaskName, newTaskDescription);
}
function deleteTask(){
	 if (confirm('Delete task?')) {
             var taskId = $(this).closest('.taskBlock').attr('id').trim();
             $(this).closest('.taskBlock').remove();
             ajaxForDeleteTask(taskId);
         }
 }
function editTask(){
	var oldName = $(this).closest('#taskElement').find('#taskTitle').text(),
		oldDescription = $(this).closest('#taskElement').find('.taskDescription').text(),
		editTaskFormHtml = '<div id="editTaskElement" class="activeTask">' +
										'<div id="taskTitle" class="taskName">' + 
											'<input type="text" id="editTitle" placeholder="" value="' + oldName + '"' + 
										'</div>' +
										'<div class="editTaskDescription">' + 
											'<textarea cols="30" rows="1">' + oldDescription +'</textarea>' + 
										'</div>' +
										'<div class="rowBtn">' +
											'<button id="saveBtn">Save</button>' +
											'<button id="doneBtn">Done</button>' +
											'<button id="removeBtn">Remove</button>' +
										'</div>' + 
									'</div>';
	$(this).closest('.taskBlock').append(editTaskFormHtml);
	$(this).closest('#taskElement').remove();
}

functoin saveTask(){
	var saveTaskId = $(this).closest('.taskBlock').attr('id').trim(),
		saveTaskName = $(this).closest('#editTaskElement').find('#taskTitle').text(),
		saveTaskDescription = $(this).closest('#editTaskElement').find('.editTaskDescription').text();
		alert(saveTaskId);alert(saveTaskName);alert(saveTaskDescription);
}
$('#editTitle').on('blur',(function(){
	($(this).val!="")? $('#saveBtn').attr('disabled', false) : $('#saveBtn').attr('disabled', true);
}));
$('#addName').on('keyup',(function(){
	($(this).val()!="")? $('#addTaskBtn').attr('disabled', false): $('#addTaskBtn').attr('disabled', true);
}));

$('#addTaskBtn').on('click', addNewTask);
$('#taskContent').on('click','#removeBtn',deleteTask);
$('#taskContent').on('click','#editBtn',editTask);
$('#taskContent').on('click','#saveBtn',saveTask);