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
$("#play").click(function(){
    if($(this).val()=='Play'){
        $(".inform").toggle();
        $.get("json/alias.json",function(data,status){
            if(status=='success'){
                var age = getAge($("#year").val());
                var aliases = data.Alias;
                var alias = aliases[goRandom(aliases.length)];
                var nickname=$("#nickname").val();
                console.log(alias);
                console.log(age);
                //var fullalias= '<h1>ฉายา</h1>'+alias+'<p>คำอธิบาย : <textarea>coming soon</textarea></p>';
                var fullalias= '<h1>ฉายา</h1><h3>'+nickname+'</h3><h2>'+alias+'</h2><p>คำอธิบาย : coming soon</p>';
                $("#result").append(fullalias);
                $(".result").toggle();
                $("#play").attr("value"," Play ");
                $("#result").fadeIn(5000,function(){
                    $("#play").attr("value","Play Again");
                });
            }else
                console.log(status);
        });
    }else if($(this).val()=='Play Again'){
        $("#result").empty();
        $("#result").toggle();
        $(".result").toggle();
        $(".inform").toggle("slow");
        $("#play").attr("value","Play");
    }
});
/*inuse functions*/
function getAge(birthYear) {
    return getCurrentYear() - birthYear;
}
function getCurrentYear() {
    var nowDate = new Date();
    return nowDate.getFullYear();
}
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

/*uncomplicate functions */
// $("#play").click(function () {
//     /*button play*/
//     if ($(this).val() == "Play") {
//         $(".inform").toggle("slow");
//         $.get("aliases.json", function (data, status) {
//             if (status = "success") {
//                 var sex = $("#sex").val();
//                 var year = $("#year").val();
//                 var nickname = $("#nickname").val();
//                 var age = getAge(year);
//                 var type = data.Alias[getSexType(sex)];
//                 var alias = getAlias(type, age);
//                 //console.log(type.identify+"-"+sex+"-"+age+"-"+year);
//                 var tagAlias = '<p>' + nickname + '</p>' + '<h2>The</h2>' + '<p>' + alias + '</p><br>';
//                 $("#result").append(tagAlias);
//                 $("#result").fadeIn(5000,function(){
//                     $("#play").attr("value","Play Again");
//                 });
//             } else {
//                 console.log(status);
//             }
//         });
//         $("#play").attr("value"," Play ");
        
//         //$(this).attr("value", "Play Again");
//     } else if($(this).val()=="Play Again"){
//         $("#result").empty();
//         $("#result").toggle();
//         $(".inform").toggle("slow");
//         $(this).attr("value", "Play");
//     }
// });
// function getAlias(sexType, age) {
//     if (age < 12) {
//         return sexType.$young[goRandom(sexType.$young.length)];
//     } else if (age < 22) {
//         return sexType.$teen[goRandom(sexType.$teen.length)];
//     } else if (age < 40) {
//         return sexType.$adult[goRandom(sexType.$adult.length)];
//     } else {
//         return sexType.$old[goRandom(sexType.$old.length)];
//     }
// }
