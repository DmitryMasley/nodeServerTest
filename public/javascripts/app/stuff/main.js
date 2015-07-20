//Изменение цвета div по нажатию кнопки
define(["helpers"], function(Helpers) {
    var stuff = function (el) {
        this.count = 0;
        this.el = document.createElement("div");
        this.el.className = "content";
        this.el.innerHTML = "<button class='button'>change color</button><div class='red'>DIV</div>"
        if (el instanceof  Element) {
            el.appendChild(this.el);
        } else {
            document.body.appendChild(this.el);
        }
        this.button = this.el.querySelector("button");
        this.div = this.el.querySelector("div");


        stuff.prototype.change = function () {
            this.count++;
            console.log("Count: " + this.count);
            if (this.div.className.indexOf("red") !== -1) {
                this.div.className = this.div.className.replace("red", "green");
            } else if (this.div.className.indexOf("green") !== -1) {
                this.div.className = this.div.className.replace("green", "red");
            }
            /*else {
             this.div.className+=" red";
             }*/
        };
        stuff.prototype.bindClick = function () {
            var self = this;
            this.button.onclick = function () {
                self.change();
            }
        };
        this.bindClick();
    };
    return stuff;
});