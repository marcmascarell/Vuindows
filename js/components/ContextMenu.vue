<template>
    <ul class="ContextMenu custom-menu">
        <li id="1context" data-action="first">Change Background</li>
        <li data-action="second">Second thing</li>
        <li data-action="third">Third thing</li>
    </ul>
</template>

<script>
    export default {
        mounted() {
            $(document).bind("contextmenu", function (event) {

                // Avoid the real right click
                event.preventDefault();

                // Show contextmenu
                /*$(".custom-menu").finish().toggle(100).css({
                    top: event.pageY + "px",
                    left: event.pageX + "px"
                });*/
            });


            // If the document is clicked somewhere
            $(document).bind("mousedown", function (e) {

                // If the clicked element is not the menu
                if (!$(e.target).parents(".custom-menu").length > 0) {

                    // Hide it
                    $(".custom-menu").hide(100);
                }
            });


            // If the menu element is clicked
            $(".custom-menu li").click(function(){
                switch($(this).attr("data-action")) {

                    // Case for whatever section is clicked
                    case "first":
                        $("#3app").fadeIn("fast");
                        break;
                    // Haven't done anything here yet
                    case
                    "second":
                        alert("second");
                        break;
                    case "third":
                        alert("third");
                        break;
                }
                // Hide the menu after section was triggered
                $(".custom-menu").hide(100);
            });
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>