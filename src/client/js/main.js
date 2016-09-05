
$(function(){

	//Validation
	function funValidate(obj,min,max){
		$(obj).validate({
			rules:{
				'user[email]':{
					required:true,
					email:true
				},
				'user[password]':{
					required:true,
					minlength:min,
					maxlength:max
				},
				'user[confirmpassword]':{
					equalTo:'#dSignupPassword'
				}
			},
			messages:{
				'user[email]':{
					required:'Email is required',
					email:'Invalid Email'
				},
				'user[password]':{
					required:'Password is required',
					minlength:'Min password length is '+min,
					maxlength:'Max password length is '+max
				},
				'user[confirmpassword]':{
					equalTo:'Passwords do not match'
				}
			}
		});
	}

	//Ajax Checking
	function signUpAjax(obj,url,method,callback){
		$.ajax({
			url:url,
			type:method,
			//Send email and password to server
			data:{'user[email]':$(obj).find('input:eq(0)').val(),
				  'user[password]':$(obj).find('input:eq(1)').val(),
					'user[confirmpassword]':$(obj).find('input:eq(2)').val(),
				'user[name]':$(obj).find('input:eq(3)').val(),
				'user[role]':$(obj).find('input:eq(4)').val()
			}
		}).done(callback);
	}

	function logInAjax(obj,url,method,callback){
		$.ajax({
			url:url,
			type:method,
			//Send email and password to server
			data:{'user[email]':$(obj).find('input:eq(0)').val(),
				  'user[password]':$(obj).find('input:eq(1)').val()
			}
		}).done(callback);
	}

	/*
		 signup PAGE
	 */
	funValidate('#dSignupForm',2,20);

	$('#dSignupForm').submit(function(event){
		event.preventDefault();

		signUpAjax(this,'/user/signup','POST',function(results){
			switch(results.data){
				case 0:
					$('#dSignupForm .err_tip').html('Account Already Exists').attr('style','block');
					break;
				case 1:
					window.location ="/list/task/team_workload";
					break;
				case 2:
					$('#dSignupForm .err_tip').html('Passwords do not match').attr('style','block');
					break;
				default:
					window.location ="/list/task/team_workload";
		 }
	 });
	});


		//set min and max input length
	funValidate('#signupForm',2,20);

	//Ajax-check when signup
	$('#signupForm').submit(function(event){
		event.preventDefault();

		signUpAjax(this,'/user/signup','POST',function(results){
			switch(results.data){
				case 0:
					$('#signupForm .err_tip').html('Account Already Exists').attr('style','block');
					break;
				case 1:
					window.location ="/list/task/team_workload";
					break;
				case 2:
					$('#signupForm .err_tip').html('Passwords do not match').attr('style','block');
					break;
				default:
					window.location ="/list/task/team_workload";
		  }
		});
	});



	/*
		signin page
	 */
	funValidate('#dSigninForm',2,20);

	$('#dSigninForm').submit(function(event){
		event.preventDefault();

		logInAjax(this,'/user/signin','POST',function(results){
			switch(results.data){
				case 0:
					$('#dSigninForm .err_tip').html('Account Does Not Exist').attr('style','block');
					break;
				case 1:
					$('#dSigninForm .err_tip').html('Password Does Not Match Email').attr('style','block');
					break;
				case 2:
				//Log in successfully
				  window.location ="/list/task/team_workload";
					break;
				case 3:
				//Log in successfully
				  window.location ="/list/task/team_workload";
					break;
				default:
					window.location ="/";
			}
		});
	});


		//set min and max input length
		funValidate('#signinForm',2,20);

		//Ajax -check existance when login
		$('#signinForm').submit(function(event){
			event.preventDefault();

			logInAjax(this,'/user/signin','POST',function(results){
				switch(results.data){
					case 0:
						$('#signinForm .err_tip').html('Account Does Not Exist').attr('style','block');
						break;
					case 1:
						$('#signinForm .err_tip').html('Password Does Not Match Email').attr('style','block');
						break;
					case 2:
					//Log in successfully
					  window.location ="/list/task/team_workload";
						break;
					case 3:
					//Log in successfully
					  window.location ="/list/task/team_workload";
						break;
					default:
						window.location ="/";
				}
			});
		});


});
