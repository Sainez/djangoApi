$(document).ready(function(){
//---------- On Load Function ----------------
//------ Navigation-------------
$('#adminForm').show();
$('#managersForm').hide();
$('#writersForm').hide();
$('#articlesForm').hide();
//---------- Code Form ----------------

$('#adminTab').on('click', function () {
    $('.list-group a').fadeOut(500);
    $('#managersForm').fadeOut(500, function(){
        $('#writersForm').fadeOut(500, function(){
            $('#articlesForm').fadeOut(500, function(){
                $('.list-group a').fadeIn(1000);
                $('#adminForm').fadeIn(1000);
            });
        });
    });
});


$('#managersTab').on('click', function () {
    $('.list-group a').fadeOut(500);
    $('#adminForm').fadeOut(500, function(){
        $('#writersForm').fadeOut(500, function(){
            $('#articlesForm').fadeOut(500, function(){
                $('.list-group a').fadeIn(1000);
                $('#managersForm').fadeIn(1000);
            });
        });
    });
});


$('#writersTab').on('click', function () {
    $('.list-group a').fadeOut(500);
    $('#managersForm').fadeOut(500, function(){
        $('#adminForm').fadeOut(500, function(){
            $('#articlesForm').fadeOut(500, function(){
                $('.list-group a').fadeIn(1000);
                $('#writersForm').fadeIn(1000);
            });
        });
    });
});


$('#articlesTab').on('click', function () {
    $('.list-group a').fadeOut(500);
    $('#managersForm').fadeOut(500, function(){
        $('#writersForm').fadeOut(500, function(){
            $('#adminForm').fadeOut(500, function(){
                $('.list-group a').fadeIn(1000);
                $('#articlesForm').fadeIn(1000);
            });
        });
    });
});



//--------------------------------------------

});
