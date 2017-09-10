/* Note: does not *actually* generate anything. Performs an AJAX call to the randomtext.me API. */

$(document).ready(() => {
    $(document).on("error", onError);

    $("#btnGenerate").click(() => {
        $("#divSpinner").show();

        var numSentences = $("#numSentences").val();
        var minWords     = $("#numMinWords").val();
        var maxWords     = $("#numMaxWords").val();

        if (numSentences == 0)
        {
            $("#numSentences").val(1);
            showErrorModal("Must generate at least one sentence! We've set the number of sentences to one.");
            return;
        }

        if (parseInt(minWords) > parseInt(maxWords))
        {
            $("#numMinWords").val(maxWords);
            showErrorModal("Min words cannot be greater than max words! We've set min words equal to max words.");
            return;
        }

        var url = "http://www.randomtext.me/api/lorem/p-" + numSentences + "/" + minWords + "-" + maxWords;

        $.get(url, data => {
            console.log(data);
            $("#divOutput").html(data.text_out);
            $("#divSpinner").hide();
        });
    });
});

function onError(err) {
    alert(err);
};

function showErrorModal(t) {
    $("#divSpinner").hide();
    $("#errModal-text").text(t);
    $("#errModal").modal("show");
};