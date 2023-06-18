// import $ from "jquery";
// const axios = require('axios');
// var Qs = require('qs');

window.onload = function () {
    codeEditor();
};

function codeEditor() {
    var editor = ace.edit("editor");

    editor.setTheme("ace/theme/twilight"); //theme
    editor.session.setMode("ace/mode/java"); //syntax highlighting
    editor.setOptions({
        fontSize: "15pt"
    });

    let javacode = `public class Main{
    public static void main(String args[]){
        // System.out.println("CodeExpresso");
    }
}`;
      
    editor.setValue(javacode)

    $(document).ready(function () {
        $("#run").click(function () {
            let code = editor.getValue();
            let input = $("#inputArea").val()
            
            $("#ans").html("Loading...");

            //get code and user input
            
            var data = Qs.stringify({
                code: code,
                language: "java",
                input: input,
            });

            //format data for API call
            var config = {
                method: "post",
                url: "https://codex-api.herokuapp.com/",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                data: data,
            };
              
            //API call
            axios(config)
            .then(function (response) {
                console.log(response)
                if(response.data.output){
                    var output = response.data.output;
                    $("#ans").html(output);
                }else if(response.data.error){
                    $("#ans").html(response.data.error);
                }else{
                    $("#ans").html('');
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });

        });
    });
} 