$(function () {
    currentYear = getCurrentYear();
    throughBack = currentYear - 100;
    for (var i = currentYear - 10; i > throughBack; i--) {
        var secret = "<option value=" + i + ">" + i + "</option>";
        $('#year').append(secret);
    }
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var i in months) {
        var secret = "<option value=" + months[i] + ">" + months[i] + "</option>";
        $('#month').append(secret);
    }

});
function getCurrentYear() {
    var nowDate = new Date();
    return nowDate.getFullYear();
}

$("#play").click(function () {
    $(".play").hide();
    $(".inform").hide("slow");
    $.get("aliases.json", function (data, status) {
        if (status = "success") {
            var sex = $("#sex").val();
            var year = $("#year").val();
            var nickname = $("#nickname").val();
            var age = getAge(year);
            var type = data.Alias[getSexType(sex)];
            var alias = getAlias(type, age);
            //console.log(type.identify+"-"+sex+"-"+age+"-"+year);
            var tagAlias= '<h2>'+nickname+'</h2>'+'<h2>The</h2>'+'<h2>'+alias+'</h2><br>';
            $("#result").append(tagAlias);
        } else {
            console.log(status);
        }
    });
    $("#result").slideDown();
    $(".playagain").show("slow");
    console.log("Random Completed");
});
$("#playagain").click(function () {
    $(".play").show();
    $(".inform").show("slow");
    $("#result").empty();
    $("#result").hide();
    $(".playagain").hide();
    $("#header_nickname").val('');
    console.log("Show Form Completed");
});
function goRandom(num) {
    return Math.floor(Math.random() * num);
}
function getSexType(sex) {
    if (sex == "Men") {
        return 0;
    }
    else if (sex == "Female") {
        return 1;
    }
    else {
        return goRandom(2);
    }
}
function getAlias(sexType, age) {
    if (age < 12) {
        return sexType.$young[goRandom(sexType.$young.length)];
    } else if (age < 22) {
        return sexType.$teen[goRandom(sexType.$teen.length)];
    } else if (age < 40) {
        return sexType.$adult[goRandom(sexType.$adult.length)];
    } else {
        return sexType.$old[goRandom(sexType.$old.length)];
    }
}
function getAge(birthYear) {
    return getCurrentYear() - birthYear;
}