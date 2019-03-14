$(function () {
    /*first value*/
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
$("#play").click(function () {
    /*brutal statement*/
    if ($(this).val() == 'Play') {
        $("#play").slideUp(100, function () {
            $.get("json/alias.json", function (data, status) {
                if (status == 'success') {
                    $(".inform").toggle("slow");
                    //var age = getAge($("#year").val());
                    var aliases = data.Alias;
                    var alias = aliases[goRandom(aliases.length)];
                    var nickname = antiComment($("#nickname").val());
                    var fullalias = '<h1>ฉายา</h1><h3>' + nickname + '</h3><h2>' + alias + '</h2>';
                    $("#result").append(fullalias);
                    $("#play").attr("value", " Play ");
                    $("#result").fadeIn(5000, function () {
                        $("#play").slideDown("slow").attr("value", "Play Again");/*brutal statement in this line*/
                    });
                } else
                    console.log(status);
            });
        }

        );

    } else if ($(this).val() == 'Play Again') {
        $("#result").empty().toggle();
        $(".inform").toggle("slow");
        $("#play").attr("value", "Play");/*brutal statement in this line*/
    }
});
/*inuse functions*/
function goRandom(num) {
    return Math.floor(Math.random() * num);
}
function antiComment(text) {
    var newVal = "";
    for (var i = 0; i < text.length; i++) {
        /*brutal statement*/
        if ((text.charAt(i) == "<" && text.charAt(i + 1) == "!") || (text.charAt(i) == ">" && text.charAt(i - 1) == "-") || text.charAt(i) == "*") {
            newVal += "";
        } else {
            newVal += text.charAt(i);
        }
    }
    return newVal;
}
/*nope*/
function getAge(birthYear) {
    return getCurrentYear() - birthYear;
}
function getCurrentYear() {
    var nowDate = new Date();
    return nowDate.getFullYear();
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