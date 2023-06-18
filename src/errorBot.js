function showErrorBot(){
    try{
        var errorDiv = document.getElementById("errorDiv");
        if(errorDiv.style.opacity!=1){
            errorDiv.classList.add("showErrorBot");
            setTimeout(function() {
                errorDiv.classList.remove("showErrorBot");
                errorDiv.style.opacity = '1';
                // errorDiv.style.display = "none";
            }, 250);
        }
    }catch(error){};
}

function hideErrorBot(){
    try{
        var errorDiv = document.getElementById("errorDiv");
        if(errorDiv.style.opacity!=0){
            var errorDiv = document.getElementById("errorDiv");
            errorDiv.classList.add("hideErrorBot");
            setTimeout(function() {
                errorDiv.classList.remove("hideErrorBot");
                errorDiv.style.opacity = '0';
                    // errorDiv.style.display = "none";
            }, 250);
        }
    }catch(error){};
}

function validateEmail() {
    var input = document.getElementById('email').value
    // var errorDiv = document.getElementById("errorDiv");
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input==""||input==null){
        hideErrorBot();
    }
    else if (input.match(validRegex)) {
        hideErrorBot();
    } else {
        showErrorBot();
    }
}

function scorePassword() {
    try{
        var pass = document.getElementById('id_password').value;
        var score = 0;
        if (!pass||pass==""||pass==null){
            document.getElementById('progressBar').value = 5;
            passStrength(score);
            passReqs();
            return;
        }
            
        // award every unique letter until 5 repetitions
        var letters = new Object();
        for (var i=0; i<pass.length; i++) {
            letters[pass[i]] = (letters[pass[i]] || 0) + 1;
            score += 5.0 / letters[pass[i]];
        }

        // bonus points for mixing it up
        var variations = {
            digits: /\d/.test(pass),
            lower: /[a-z]/.test(pass),
            upper: /[A-Z]/.test(pass),
            nonWords: /\W/.test(pass),
        }

        var variationCount = 0;
        for (var check in variations) {
            variationCount += (variations[check] == true) ? 1 : 0;
        }
        score += (variationCount - 1) * 10;
        document.getElementById('progressBar').value = parseInt(score);
        passStrength(parseInt(score));
        passReqs();
        return;
    }catch(error){};
}

function passStrength(score) {
    var passStrength = document.getElementById('passStrength');
    if (score >= 100){
        passStrength.innerHTML = 'Password Strength: Super Strong';
        document.documentElement.style.setProperty('--progressBarColor', "orange")
        document.documentElement.style.setProperty('--barOpacity', "1")
        return "super strong";
    }
    if (score > 80){
        passStrength.innerHTML = 'Password Strength: Strong';
        document.documentElement.style.setProperty('--progressBarColor', "darkgreen")
        document.documentElement.style.setProperty('--barOpacity', "1")
        return "strong";
    }   
    if (score > 60){
        passStrength.innerHTML = 'Password Strength: Good';
        document.documentElement.style.setProperty('--progressBarColor', "yellow")
        document.documentElement.style.setProperty('--barOpacity', "1")
        return "good";
    }   
    if (score >= 30){
        passStrength.innerHTML = 'Password Strength: Weak';
        document.documentElement.style.setProperty('--progressBarColor', "red")
        document.documentElement.style.setProperty('--barOpacity', "1")
        return "weak";
    }
    if (score >= 1){
        passStrength.innerHTML = 'Password Strength: Super Weak';
        document.documentElement.style.setProperty('--progressBarColor', "darkred")
        document.documentElement.style.setProperty('--barOpacity', "1")
        return "weak";
    }
    passStrength.innerHTML = 'Password Strength:';
    document.documentElement.style.setProperty('--progressBarColor', "darkred")
    document.documentElement.style.setProperty('--barOpacity', "0")
    return "";
}

function passReqs(){
    var pass = document.getElementById('id_password');
    if (pass.value.length >= 8){
        var passLength = document.getElementById('passLength');
        passLength.style.color = 'darkgreen';
        passLength.style.marginLeft = '0.5rem';
    }else{
        var passLength = document.getElementById('passLength');
        passLength.style.color = 'black';
        passLength.style.marginLeft = '0';
    }
    if (/[a-z]/.test(pass.value)){
        var passLower = document.getElementById('passLower');
        passLower.style.color = 'darkgreen';
        passLower.style.marginLeft = '0.5rem';
    }else{
        var passLower = document.getElementById('passLower');
        passLower.style.color = 'black';
        passLower.style.marginLeft = '0';
    }
    if (/[A-Z]/.test(pass.value)){
        var passUpper = document.getElementById('passUpper');
        passUpper.style.color = 'darkgreen';
        passUpper.style.marginLeft = '0.5rem';
    }else{
        var passUpper = document.getElementById('passUpper');
        passUpper.style.color = 'black';
        passUpper.style.marginLeft = '0';
    }
    if (/[0-9]/.test(pass.value)){
        var passNumber = document.getElementById('passNumber');
        passNumber.style.color = 'darkgreen';
        passNumber.style.marginLeft = '0.5rem';
    }else{
        var passNumber = document.getElementById('passNumber');
        passNumber.style.color = 'black';
        passNumber.style.marginLeft = '0';
    }
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(pass.value)){
        var passSpecial = document.getElementById('passSpecial');
        passSpecial.style.color = 'darkgreen';
        passSpecial.style.marginLeft = '0.5rem';
    }else{
        var passSpecial = document.getElementById('passSpecial');
        passSpecial.style.color = 'black';
        passSpecial.style.marginLeft = '0';
    }
}

export{ validateEmail };