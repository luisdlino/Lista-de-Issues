app.controller('HomeCtrl', function($scope, $http){


    var vm = this;

    vm.loading = true;
    vm.inputTitle = false;

    $http.get('https://api.github.com/repos/luisdlino/Lista-de-Issues/issues').then(function(res){

        vm.repositorio = res.data[0].repository_url || 'Not Found';
        vm.data = res.data;
        vm.loading = false;
    })

    $scope.createIssue = function(titulo, comentario, label){

        if(titulo!=undefined){
            vm.loading = true;
            var dataObj =JSON.stringify({
              title: titulo,
              body: comentario,          
              labels: label
            });


            $http.post("https://api.github.com/repos/luisdlino/Lista-de-Issues/issues?access_token=5507a62fce8eff3c16019476e73af4fe772094ef", dataObj)
            .success(function () {
                update(vm.data.length);      
                document.getElementById('formCriarIssue').style.display = 'none'; 
                document.getElementById('tituloIssue').value = "";
                document.getElementById('commentIssue').value = "";  
            })
            .error(function () {
                alert('error');
                update(0); 
            });
        }

        else {
            document.getElementById('tituloIssue').className = "form-control invalid";
        }
        

    }

    $scope.validInput = function(){
        document.getElementById('tituloIssue').className = "form-control";
    }

    $scope.editIssue = function(number, titleIssue){

        vm.loading = true;
        var dataObj =JSON.stringify({
          title: titleIssue,          
        });

        $http.patch("https://api.github.com/repos/luisdlino/Lista-de-Issues/issues/" +number+ "?access_token=5507a62fce8eff3c16019476e73af4fe772094ef", dataObj)
        .success(function () {
            update(0);            
        })
        .error(function () {
            alert('error');
            update(0); 
        });
    }   


    $scope.lockIssue = function(number){

        vm.loading = true;
        $http.put('https://api.github.com/repos/luisdlino/Lista-de-Issues/issues/' +number+ '/lock?access_token=5507a62fce8eff3c16019476e73af4fe772094ef')
        .success(function () {
            update(0);   
        })
        .error(function () {
            alert('error');
            update(0); 
        });
    }


    $scope.unlockIssue = function(number){

        vm.loading = true;
        $http.delete('https://api.github.com/repos/luisdlino/Lista-de-Issues/issues/' +number+ '/lock?access_token=5507a62fce8eff3c16019476e73af4fe772094ef')
        .success(function () {
            update(0);         
        })
        .error(function () {
            alert('error');
            update(0); 
        });
    }  

    function update(numeroIssues) {

        $http.get('https://api.github.com/repos/luisdlino/Lista-de-Issues/issues').then(function(res){          
            vm.data = res.data;

            if(vm.data.length>numeroIssues)
            {   
                vm.loading = false;   
            }
            else {
                update(numeroIssues);
            }
                     
        })      

 
    }  

});
