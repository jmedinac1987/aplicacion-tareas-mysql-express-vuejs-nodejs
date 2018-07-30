<template>

	<!--Todo quedan dentro de un div por que vuejs solo puede renderizar un solo elemento -->
	<div>		
		
		<!--Navegación -->
		<nav class="navbar navbar-dark bg-dark fixed-top">
			<a href="#" class="navbar-brand"><span class="navTitle">TABLERO </span><span class="navTitle2">DE TAREAS</span></a>
		</nav>	
		
		<!--Formulario y Tabla de contenido -->
		<div class="container pt-5">
			<div class="row pt-5">
				<div class="col-md-6 col-sm-6">
					<div class="card">
						<div class="card-body">
							<form @submit.prevent="addTask">
								<div class="form-group">
									<input type="text" placeholder="Título de la tarea" class="form-control" v-model = "task.title">
								</div>
								<div class="form-group">
									<textarea cols="30" rows="10" class="form-control" placeholder="Ingresa una descripción" v-model = "task.content">
										
									</textarea>
								</div>
								<button class="btn btn-primary btn-block">Enviar</button>
							</form>
						</div>						
					</div>				
				</div>
				<div class="col-md-6 col-sm-6">
					<div class="table-responsive">
						<table class="table table-striped table-bodered">
							<thead class="thead-dark" style="text-align: center;">
								<tr>
									<th>Tarea</th>
									<th>Contenido</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody style="text-align: center;">
								<tr v-for="task of tasks" :key="task.id">
									<td>{{task.title}}</td>
									<td>{{task.content}}</td>
									<td>
										<div class="btn-group">
										<button @click="deleteTask(task.id)" class="btn btn-danger">
											<i class="far fa-trash-alt"></i>
										</button>
										<button @click="getTask(task.id)" class="btn btn-secondary" data-toggle="modal" data-target="#modalEdit">
											<i class="fas fa-edit"></i>
										</button>
										</div>
									</td>								
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- Ventana Modal para editar la tarea -->
			<div class="modal fade" id="modalEdit">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">
								Editar Tarea
							</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								&times;
							</button>					
						</div>
						<div class="modal-body">
							<form>
								<div class="form-group">
									<input type="text" placeholder="Inserta el título de la tarea" class="form-control" v-model = "tasksModal.title">
								</div>
								<div class="form-group">
									<textarea cols="30" rows="10" class="form-control" placeholder="Ingresa una descripción" v-model = "tasksModal.content">
										
									</textarea>
								</div>							
							</form>						
						</div>
						<div class="modal-footer">
							<button @click="updateTask(tasksModal.id)" class="btn btn-primary">Guardar</button>
							<button class="btn btn-secondary" data-dismiss="modal" id="closeModal">Cancelar</button>
						</div>
					</div>
					
				</div>
			</div>
		</div>		
	
	</div>

</template>

<script type="text/javascript">

	class Task {
		constructor(title, content, id){
			this.id = id;
			this.title = title;
			this.content  = content;
		} 
	}
	
	export default {
		data() {
			return {
				task: new Task(),
				tasks: [],
				tasksModal: []
			}
		},
		created(){
			this.getTasks();
		},
		methods: {
			getTasks() {
				fetch('/api/postgres')
				.then(res => res.json())
				.then(data => {
						this.tasks = data.rows;
				});
			},
			addTask() {
				fetch('/api/postgres', {
					method: 'POST',
					body: JSON.stringify(this.task),
					headers: {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					}
				}).then(res => res.json())
				.then(data => { this.getTasks()});

				this.task = new Task();
			},
			deleteTask(id) {
				if (confirm("Desea eliminar la tarea?")) 
				{
					fetch('/api/postgres/' + id, {
						method: 'DELETE',
						headers: {
							'Accept' : 'application/json',
							'Content-Type' : 'application/json'
						}
					}).then(res => res.json())
					.then(data => { this.getTasks()});
				}
			},
			getTask(id){
		
				fetch('/api/postgres/' + id)
				.then(res => res.json())
				.then(data => {					
					this.tasksModal = new Task(data.rows[0].title, data.rows[0].content, data.rows[0].id);				
				});				
			},
			updateTask(id) {
		
				fetch('/api/postgres/' + id, {
						method: 'PUT',
						body: JSON.stringify(this.tasksModal),
						headers: {
							'Accept' : 'application/json',
							'Content-Type' : 'application/json'
						}
				})
				.then(res => res.json())
				.then(data => { this.getTasks()});

				let closeModal = document.getElementById('closeModal');
				closeModal.click();
				this.tasksModal = new Task();
				closeModal = null;
			}
		}
	}
</script>