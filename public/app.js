(function() {

	var app = {

		endpoint: 'http://localhost:2000', 
		
		init: function() {
			this.displayCustomersRequest();
			this.listeners();
		},

		listeners: function() {
			$("#btnPost").on('click', this.createCustomerRequest.bind(this));
		},

		// Afficher les customers existants

		displayCustomersRequest: function() {
			$('#data').html('');
			$.ajax(this.endpoint + '/crm')
			.done(this.displayCustomersDone)
			.fail(this.requestFail)
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

		createCustomerRequest: function() {
			if ($('input').val() === "") {
				alert("Merci de renseigner tous les champs");
			} else {
				var company = $('#POST-company').val();
				var description = $('#POST-description').val();
				var email = $('#POST-email').val();
				var first_name = $('#POST-first_name').val();
				var last_name = $('#POST-last_name').val();
				var phone = $('#POST-phone').val();
				var role = $('#POST-role').val();
				$.post({
					url: this.endpoint + '/createCustomer',
					dataType: 'html',
					data: {company: company, description: description, email: email, first_name: first_name, last_name: last_name, phone: phone, role: role}
				})
				.done(this.createCustomerDone.bind(this))
				.fail(this.requestFail)
			}
		},

		createCustomerDone: function() {
			this.displayCustomersRequest();
			console.log("ok");
		},

		// Commun à toutes les requêtes
		requestFail: function() {
			console.log("fail");
		}

	}
	

	
	app.init();

})();