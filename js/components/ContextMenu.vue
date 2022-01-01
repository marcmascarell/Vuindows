<template>
    <ul class="ContextMenu custom-menu" v-show="show">
        <li id="1context" data-action="first">Change Background</li>
        <li data-action="second">Second thing</li>
        <li data-action="third">Third thing</li>
    </ul>
</template>

<script>
    export default {
        data () {
            return {
                show: false
            }
        },
        mounted() {
            const $customMenu = document.querySelector(".custom-menu");
            document.addEventListener("contextmenu", (event) => {
                // Avoid the real right click
                event.preventDefault();

                // Show contextmenu
                this.show = !this.show;
                $customMenu.style.top = event.pageY + "px";
                $customMenu.style.left = event.pageX + "px";
            });


            // If the document is clicked somewhere else
            document.body.addEventListener("mousedown", function (e) {
                if (!(e.target.contains($customMenu)) && !($customMenu.contains(e.target))) {
                    this.show = false;
                }
            });

            // If the menu element is clicked
            $customMenu.querySelectorAll(".custom-menu li").forEach(el => {
                el.addEventListener("click", () => {
                    console.log(el.dataset.action);
                    this.show = false;
                });
            });
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>