(function() {

	var app = {

		endpoint: 'http://localhost:2000',

		fieldsComplete: false,
		
		init: function() {
			this.displayCustomersRequest();
			this.listeners();
		},

		listeners: function() {
			$('#btnPost').on('click', this.checkIfFieldsEmpty.bind(this));
		},

		listenersDeleteModify: function() {
			$('.delete_button').on('click', this.selectCustomerIDtoDelete);
			$('.write_button').on('click', this.selectCustomerIDtoModify);		
		},

		// Afficher les customers existants

		displayCustomersRequest: function() {
			$('#data').html('');
			$.ajax(this.endpoint + '/crm')
			.done(this.displayCustomersDone)
			.fail(this.requestFail);
		},

		displayCustomersDone: function(response) {
			// Mustache
			var template = $('#template').html();

			var len = response.customers.length;

			for (var i = 0; i < len; i++) {
				var html = Mustache.to_html(template, response.customers[i]);
				$('#data').append(html);
			}

			app.listenersDeleteModify();
		},

		// Créer un nouveau customer

		checkIfFieldsEmpty: function() {
			for (var i = 0; i < 8; i++) {
				if ($("#input"+ i).val() === "") {
					this.fieldsComplete = false; 
				} else {
					this.fieldsComplete = true;
				}
			}
			this.createCustomerRequest();
		},

		createCustomerRequest: function() {
			if (this.fieldsComplete) {
				var company = $('#input1').val();
				var email = $('#input2').val();
				var first_name = $('#input3').val();
				var last_name = $('#input4').val();
				var phone = $('#input5').val();
				var role = $('#input6').val();
				var description = $('#input7').val();
				
				$.post({
					url: this.endpoint + '/createCustomer',
					dataType: 'html',
					data: {company: company, description: description, email: email, first_name: first_name, last_name: last_name, phone: phone, role: role}
				})
				.done(this.createCustomerDone.bind(this))
				.fail(this.requestFail);

				$("input").val("");
				$("textarea").val("");
			} 
			else {
				alert("Merci de remplir tous les champs");					
			}
		},

		createCustomerDone: function() {
			this.displayCustomersRequest();
		},

		// Selection ID customer pour suppression
		selectCustomerIDtoDelete: function() {
			var idCustomer = $(this).data('id');
			app.deleteCustomer(idCustomer);
		},

		// Supprimer un customer
		deleteCustomer: function(id) {
			$.ajax({
				url: this.endpoint + '/deleteCustomer',
				type: 'DELETE',
				data: {id: id}
			})
			.done(this.deleteCustomerDone.bind(this))
			.fail(this.requestFail);
		},

		deleteCustomerDone: function() {
			this.displayCustomersRequest();
		},

/*		// Selection ID customer pour modification
		selectCustomerIDtoModify: function() {
			var idCustomer = $(this).data('id');
			app.modifyCustomer(idCustomer);
		},

		// Modifier un customer
		modifyCustomer: function(id) {
			$.ajax({
				url: this.endpoint + '/deleteCustomer',
				type: 'DELETE',
				data: {id: id}
			})
			.done(this.deleteCustomerDone.bind(this))
			.fail(this.requestFail);
		},

		deleteCustomerDone: function() {
			this.displayCustomersRequest();
		},*/

		// Commun à toutes les requêtes
		requestFail: function() {
			console.log("fail");
		}


	}
	

	
	app.init();

})();