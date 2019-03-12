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
                nickname=htmlCommentProtection(nickname);
                console.log(alias);
                console.log(age);
                //var fullalias= '<h1>ฉายา</h1>'+alias+'<p>คำอธิบาย : <textarea>coming soon</textarea></p>';
                //var fullalias= '<h1>ฉายา</h1><h3>'+nickname+'</h3><h2>'+alias+'</h2><p>คำอธิบาย : coming soon</p>';
                var fullalias= '<h1>ฉายา</h1><h3>'+nickname+'</h3><h2>'+alias+'</h2>';
                $("#result").append(fullalias);
                $(".result").toggle();
                $("#play").toggle();
                $("#play").attr("value"," Play ");
                $("#result").fadeIn(5000,function(){
                    $("#play").slideDown("slow");
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
function htmlCommentProtection(text){
    var newVal="";
    for(var i=0;i<text.length;i++){
        /*brutal statement*/
        if((text.charAt(i)== "<"&&text.charAt(i+1)=="!")||(text.charAt(i)==">"&&text.charAt(i-1)=="-")||text.charAt(i)=="*"){
            newVal+="";
        }else{
            newVal+=text.charAt(i);
        }
    }
    return newVal;
}