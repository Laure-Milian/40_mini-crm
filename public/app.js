(function() {

	var app = {

		endpoint: 'http://localhost:2000',

		fieldsComplete: false,
		
		init: function() {
			this.displayCustomersRequest();
			this.listeners();
		},

		listeners: function() {
			$("#btnPost").on('click', this.checkIfFieldsEmpty.bind(this));
			$("#icon").on('click', function(event) {
				event.preventDefault();
				console.log("clik boutnon");
			});
		},

		// Afficher les customers existants

		displayCustomersRequest: function() {
			$('#data').html('');
			$.ajax(this.endpoint + '/crm')
			.done(this.displayCustomersDone)
			.fail(this.requestFail);
		},

		displayCustomersDone: function(response) {
			console.log(response);
			// Mustache
			var template = $('#template').html();

			var len = response.customers.length;

			for (var i = 0; i < len; i++) {
				var html = Mustache.to_html(template, response.customers[i]);
				$('#data').append(html);
			}
		},

		// Créer un nouveau customer

		checkIfFieldsEmpty: function() {
			for (var i = 0; i < 7; i++) {
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

		// Commun à toutes les requêtes
		requestFail: function() {
			console.log("fail");
		},

		// Supprimer un customer
		deleteCustomer: function(event) {
			event.preventDefault();
			console.log("btn ok");
		}

	}
	

	
	app.init();

})();