/*****************************************************/
/*                  File Upload                      */
/*****************************************************/
var FEFileUpload =
{
    "Init": function () {
        this.UpdateFileName();
    },
    "UpdateFileName": function () {
        $("input:file").on("change", function () {
            // Get the html input file element
            var $input = $(this),
                // Get the fake button
                $button = $input.prev(".js-file-upload"),
                // Get the file name and type, removing rest of path
                filename = $input.val().replace(/\\/g, '/').replace(/.*\//, '');

            // Update the fake button with the name of file e.g file.pdf
            $button.text(filename);
        });
    }
};

/*****************************************************/
/*                  File Upload                      */
/*****************************************************/
var BEFileUpload =
{
    "Init": function () {

    }
};
