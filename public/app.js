(function() {

	var app = {

		endpoint: 'http://localhost:2000', 
		
		init: function() {
			this.request();
		},

		request: function() {
			$.ajax(this.endpoint + '/crm')
			.done(this.requestDone)
			.fail(this.requestFail)
		},

		requestDone: function(response) {
			console.log(response.customers);
			var len = response.customers.length;

			for (var i = 0; i < len; i++) {
				$('#data').append('<div class="ui card"> <ul id="customer' + i +'"> </ul> </div>')
				for (var prop in response.customers[i]) {
					$('#customer' + i).append('<li>' + response.customers[i][prop] + '</li>')
				}
			}
		},

		requestFail: function() {
			console.log("fail");
		}

	}
	

	
	app.init();

})();